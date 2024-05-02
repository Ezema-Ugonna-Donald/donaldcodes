export default function Pagination(props: any) {
    const pageNumbers: number[] = []

    for (let i = 1; i <= Math.ceil(props.totalPosts / props.postsPerPage); i++)
    {
        pageNumbers.push(i)
    }

    const handlePrevClick = ()=>{
        props.onPrevClick();
    }
    const handleNextClick = ()=>{
        props.onNextClick();
    }
    const handlePageClick = (e: any)=>{
        props.onPageChange(Number(e.target.id));
    }

    return (
        <>
            <div className="mb-3">
                <ul className="inline-flex cursor-pointer">
                    {pageNumbers.map(number => (
                        <li key={number} onClick={() => props.paginate(number)} className={props.currentPage === number ? "p-3 text-black bg-[#E4EB15] mx-1" : "p-3 bg-[#FDE8E9] mx-1 text-black"}>
                            {number}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}