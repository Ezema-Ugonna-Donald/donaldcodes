import "@/app/(main)/components/Loader/Loader.css"

export default function Loader() {
    return (
        <div className="flex items-center justify-center w-full min-h-screen">
            <span className="loader"></span>
        </div>
    )
}