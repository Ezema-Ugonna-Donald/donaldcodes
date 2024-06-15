import Link from "next/link";
import { FaAd, FaChartLine, FaChessBishop, FaComment, FaEye, FaHome, FaPencilAlt, FaUserPlus } from "react-icons/fa";

export default function SideNav() {
    return (
        <div className="pt-14 px-10 w-full">
            <Link href="/cms" className="cursor-pointer mb-3 hover:bg-slate-800 p-4 flex justify-start gap-3 text-center w-full"><FaChartLine size={22} /> <span className="align-top">Dashboard</span></Link>
            <Link href="/cms/add-post" className="cursor-pointer mb-3 hover:bg-slate-800 p-4 flex justify-start gap-3 text-center w-full"><FaPencilAlt size={22} /> <span className="align-top">Add New Post</span></Link>
            <Link href="/cms/manage-categories" className="cursor-pointer mb-3 hover:bg-slate-800 p-4 flex justify-start gap-3 text-center w-full"><FaChessBishop size={22} /> <span className="align-top">Manage Categories</span></Link>
            <Link href="/cms/manage-admins" className="cursor-pointer mb-3 hover:bg-slate-800 p-4 flex justify-start gap-3 text-center w-full"><FaUserPlus size={22} /> <span className="align-top">Manage Admins</span></Link>
            <Link href="/cms/comments" className="cursor-pointer mb-3 hover:bg-slate-800 p-4 flex justify-start gap-3 text-center w-full"><FaComment size={22} /> <span className="align-top">Comments</span></Link>
            <Link href="/cms/manage-ads" className="cursor-pointer mb-3 hover:bg-slate-800 p-4 flex justify-start gap-3 text-center w-full"><FaAd size={22} /> <span className="align-top">Manage Ads</span></Link>
            <Link href="/" className="cursor-pointer mb-3 hover:bg-slate-800 p-4 flex justify-start gap-3 text-center w-full"><FaEye size={22} /> <span className="align-top">Live Preview</span></Link>
        </div>
    )
}