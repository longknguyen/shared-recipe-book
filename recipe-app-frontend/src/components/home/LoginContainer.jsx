import { Link } from "react-router-dom";

export default function LoginContainer(){
    return(
        <div className="text-black m-4 ">
            <Link
                to="/"
                className="transition  hover:text-black hover:bg-[#F3C0BE] text-2xl bg-slate-300 pr-3 pl-3  pt-1 pb-1 rounded-2xl"
            >
                &#8592;
            </Link>
        <div className="min-h-screen flex items-center justify-center" >

            <div className="w-full max-w-4xl min-h-[600px] bg-slate-200 rounded-2xl shadow-xl flex overflow-hidden">
                <div className="w-1/2 flex flex-col justify-center bg-gradient-to-bl from-[#F1524A] to-[#F3C0BE]">
                    <h1 className=" flex justify-center  font-serif text-4xl">
                        <span className={"text-black"}>Cook</span>
                        <span className={"text-green-800"}>. &nbsp; </span>
                        <span className={"text-black"}>Share   </span>
                        <span className={"text-green-800"}>. &nbsp; </span>
                        <span className={"text-black"}>Enjoy</span>
                        <span className={"text-green-800"}>. &nbsp; </span>
                    </h1>
                </div>

                <div className="w-1/2 flex flex-col justify-center bg-white">
                    <h3 className=" font-serif text-4xl text-black text-center mb-2">
                        Log In
                    </h3>
                    <form className=" w-full flex justify-center  text-black dark:text-white ">
                        <div className={" w-1/2 space-y-4 "}>
                            <input type="text" placeholder="username"
                                   className="w-full py-2 pl-3 pr-3  text-lg border rounded-full focus:outline-none focus:ring-1 focus:ring-[#F1524A] bg-slate-100"/>
                            <input type="" placeholder="password"
                                   className="w-full py-2 pl-3 pr-3  text-lg border rounded-full focus:outline-none focus:ring-1 focus:ring-[#F1524A] bg-slate-100"/>
                            <button type="submit" className=" w-1/2 mx-auto block py-2 pl-3 pr-3 bg-[#F1524A] rounded-full text-white hover:bg-[#D4524D] ">
                                Log in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </div>
    )

}