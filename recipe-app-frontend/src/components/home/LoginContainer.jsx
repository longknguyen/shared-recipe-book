import { Link } from "react-router-dom";

export default function LoginContainer(){
    return(
        <div className="min-h-screen flex items-center justify-center" >

            <div className="w-full max-w-4xl min-h-[600px] bg-slate-200 rounded-2xl shadow-xl flex overflow-hidden">
                <div className="w-1/2 flex flex-col justify-center bg-gradient-to-br from-[#940a0a] to-[#FF6161]">
                    <div className="flex justify-center justify">
                        <h1 className=" text-5xl font-bold ">
                        <span className={"text-white"}>Cook</span>
                        <span className={"text-black"}>.</span>
                        <br/>
                        <span className={"text-white"}>Share</span>
                        <span className={"text-black"}>.</span>
                        <br/>
                        <span className={"text-white"}>Enjoy</span>
                        <span className={"text-black"}>.</span>
                        </h1>
                    </div>
                </div>

                <div className="w-1/2 flex flex-col justify-center bg-white">
                    <h3 className="  font-semibold text-4xl text-black text-center mb-2">
                        Log In
                    </h3>
                    <form className=" w-full flex justify-center mt-5 text-black dark:text-white ">
                        <div className={" w-1/2 space-y-4 "}>
                            <input type="text" placeholder="Username"
                                   className="w-full py-2 pl-3 pr-3  text-lg border rounded-2xl focus:outline-none focus:ring-1 focus:ring-[#F1524A] bg-slate-100"/>
                            <input type="password" placeholder="Password"
                                   className="w-full py-2 pl-3 pr-3  text-lg border rounded-2xl focus:outline-none focus:ring-1 focus:ring-[#F1524A] bg-slate-100"/>
                            <button type="submit" className=" w-full m py-2 pl-3 pr-3 bg-[#F1524A] rounded-2xl text-white hover:bg-[#940a0a] text-lg ">
                            Log in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}