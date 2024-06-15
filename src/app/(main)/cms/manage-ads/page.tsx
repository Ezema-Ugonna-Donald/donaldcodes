"use client"

import { useState, FormEvent, useEffect } from "react"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import axios from "@/app/(main)/api/axios";
import Pagination from "@/app/(main)/components/show/post/pagination";
import parse from "html-react-parser"
import Link from "next/link";
import { FaEdit, FaTrash } from "react-icons/fa";

type User = {
    id: number
    name: string
    email: string
    password: string
    created_by: string
    created_at: string
}

type Ad = {
    id: number
    user_id: number
    companyname: string
    companyEmail: string
    companyPhone: string
    companyWebsite: string
    adImage: string
    body: string
    user: User,
    created_at: string
    updated_at: string
}

const s3Client = new S3Client({
    region: process.env.NEXT_PUBLIC_AWS_S3_REGION!,
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID!,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY!
    }
})

export default function ManageAds() {
    const [success, setSuccess] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [companyname, setcompanyname] = useState<string>("")
    const [companyEmail, setCompanyEmail] = useState<string>("")
    const [companyPhone, setCompanyPhone] = useState<string>("")
    const [companyWebsite, setCompanyWebsite] = useState<string>("")
    const [adImage, setAdImage] = useState<File | null>(null)
    const [adBody, setAdBody] = useState<string>("")
    const [ads, setAds] = useState<Ad[]>([])

    const [currentPage, setCurrentPage] = useState(1)
    const [adsPerPage, setAdsPerPage] = useState(4)
    const AD_GET_URL: string = "/ads"
    const AD_CREATE_URL: string = "/ads/create-ad"


    const options: any = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

    const paginationAttributes = {
        currentPage,
        adsPerPage,
        totalPosts: ads.length
    }

    const indexOfLastAd = currentPage * adsPerPage
    const indexOfFirstAd = indexOfLastAd - adsPerPage
    const currentAds = ads.slice(indexOfFirstAd, indexOfLastAd)

    let no: number = 0

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber)
    }

    const onPageChange= (pageNumber: number)=>{
        setCurrentPage(pageNumber);
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) setAdImage(e.target.files[0]) 
    }

    const uploadImage = async (e: FormEvent<HTMLFormElement>, companyname: string, companyEmail: string, companyPhone: string, companyWebsite: string, adImage: File, adBody: string) => {
        e.preventDefault()

        if (adImage.size > 0)
        {
            const buffer = Buffer.from(await adImage.arrayBuffer())

            const fileBuffer = buffer

            const key = `${adImage.name}`

            const params = {
                Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME!,
                Key: key,
                Body: fileBuffer
            }

            const command = new PutObjectCommand(params)

            try
            {
                const response = await s3Client.send(command)

                await addAd(companyname, companyEmail, companyPhone, companyWebsite, `https://donaldcodes-blog.s3.eu-west-2.amazonaws.com/${key}`, adBody)
            }
            catch(error)
            {
                throw error
            }
        }
    }

    const addAd = async (companyname: string, companyEmail: string, companyPhone: string, companyWebsite: string, adImage: string, adBody: string) => {
        try 
        {
            const response = await axios.post(AD_CREATE_URL, {
                user_id: 5,
                companyname: companyname,
                companyEmail: companyEmail,
                companyPhone: companyPhone,
                companyWebsite:companyWebsite,
                adImage: adImage,
                body: adBody
            })

            if (response?.status === 201)
            {
                setSuccess(true)
                setError(false)
                await getAds()
            }
            else 
            {
                setError(true)
                setSuccess(false)
            } 
        } 
        catch (error) 
        {
            console.error(error)   
        }
    }

    const getAds = async () => {
        try 
        {
            const response = await axios.get(AD_GET_URL)

            if (response?.status === 200)
            {
                setAds(response.data)
            }
        } 
        catch (error) 
        {
            console.error(error)   
        }
    }

    const deleteAd = async (id: number) => {
        try 
        {
            const response = await axios.delete(`${AD_GET_URL}/${id}`)

            if (response?.status === 200)
            {
                await getAds()
            }
        } 
        catch (error) 
        {
            console.error(error)   
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            await getAds()
        }

        fetchData()
    }, [currentAds])

    return (
        <section className="p-8">
            <h1 className="font-[Lato-Bold] text-xl">Manage Ads</h1>
            {success ? (<div className="bg-green-500 p-4 mx-2 text-black my-5 w-1/2">Ad Created Successfully.</div>): null}
            {error ? (<div className="bg-red-500 p-4 mx-2 text-black my-5 w-1/2">Failed to create ad</div>): null}
            <form method="post" onSubmit={(e: FormEvent<HTMLFormElement>) => uploadImage(e, companyname, companyEmail, companyPhone, companyWebsite, adImage!, adBody)}>
                <div className="mb-3">
                    <label className="block" htmlFor="companyname">Company Name:</label>
                    <input className="w-1/2 outline-none h-12 border border-black p-3 rounded-md" type="text" name="companyname" id="companyname" placeholder="Enter company name..." value={companyname} onChange={(e) => setcompanyname(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="block" htmlFor="companyEmail">Company Email:</label>
                    <input className="w-1/2 outline-none h-12 border border-black p-3 rounded-md" type="email" name="companyEmail" id="companyEmail" placeholder="Enter company email..." value={companyEmail} onChange={(e) => setCompanyEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="block" htmlFor="companyPhone">Company Phone:</label>
                    <input className="w-1/2 outline-none h-12 border border-black p-3 rounded-md" type="text" name="companyPhone" id="companyPhone" placeholder="Enter company phone..." value={companyPhone} onChange={(e) => setCompanyPhone(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="block" htmlFor="companyWebsite">Company Website:</label>
                    <input className="w-1/2 outline-none h-12 border border-black p-3 rounded-md" type="text" name="companyWebsite" id="companyWebsite" placeholder="Enter company website..." value={companyWebsite} onChange={(e) => setCompanyWebsite(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="block" htmlFor="adImage">Ad Image:</label>
                    <input className="w-1/2 outline-none h-12 border mb-3 border-black p-3 rounded-md" type="file" name="adImage" id="adImage" accept="image/*" onChange={handleFileChange} />
                </div>
                <div className="mb-3">
                    <label className="block" htmlFor="adBody">Ad Body:</label>
                    <textarea className="w-1/2 outline-none h-28 border mb-3 border-black p-3 rounded-md" value={adBody} onChange={(e) => setAdBody(e.target.value)} placeholder="Please enter ad body here..."></textarea>
                </div>
                <button disabled={!companyname && !companyEmail && !companyPhone && !adBody} className="w-1/2 bg-[#15eb5c] disabled:bg-[#6cf098] border border-black rounded-md h-12" type="submit">Submit</button>
            </form>
            <div className="mt-8">
                <table className="table-fixed border-collapse border-spacing-2">
                    <thead className="bg-[#E4EB15]">
                        <tr className="">
                            <th className="p-4">No.</th>
                            <th className="p-4">Ad Image</th>
                            <th className="p-4">Company Name</th>
                            <th className="p-4">Company Email</th>
                            <th className="p-4">Company Phone</th>
                            <th className="p-4">Ad Body</th>
                            <th className="p-4">Created At</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentAds.map(ad => {
                                no++

                                return (
                                    <tr key={ad.id}>
                                        <td className="p-4">{no + indexOfFirstAd}</td>
                                        <td className="p-4"><img src={ad.adImage} className="h-[100px] w-[200px]" alt="" /></td>
                                        <td className="p-4">{ad.companyname}</td>
                                        <td className="p-4">{ad.companyEmail}</td>
                                        <td className="p-4">{ad.companyPhone}</td>
                                        <td className="p-4 w-80">{parse(ad.body.substring(0, 100))}...</td>
                                        <td className="p-4">{new Date(ad.created_at).toLocaleDateString("en-GB", options)}</td>
                                        <td className="p-4 flex align-middle pt-14">
                                            {/* <Link href={`/cms/edit-ad/${ad.id}`} className="mr-3">
                                                <FaEdit color="#4b6dca" />
                                            </Link> */}
                                            <span className="cursor-pointer" onClick={() => deleteAd(ad.id)}>
                                                <FaTrash color= "#f76186" />
                                            </span>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <Pagination {...paginationAttributes}
                    onPageChange={onPageChange}
                    paginate={paginate}
                />
            </div>
        </section>
    )
}