import { useNavigate } from "react-router-dom"

const Notfound = () => {
    const navigate = useNavigate();
  return (
    <div className=" w-screen h-screen grid place-content-center bg-teal-600 text-white">
        <div className="grid place-items-center gap-8">
            <h1 className=" text-3xl sm:text-4xl font-bold text-center">
                404<br/>Page Not Found
            </h1>
            <button onClick={()=> navigate(-1)} className=" font-light bg-white text-teal-600 w-fit px-2 py-1 text-sm sm:text-base sm:px-4 sm:py-2 rounded-md hover:shadow-xl hover:shadow-teal-800 ">Click to go back</button>
        </div>
    </div>
  )
}

export default Notfound