import { Link,useNavigate } from "react-router-dom";
import {useState} from "react";
import {useForm} from "react-hook-form";

export default function SignupContainer(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] =useState("");

    const navigate = useNavigate();

    const onSubmitHandle = async (data) =>
    {
        setError("");
        if(!username || !password){
            setError("please enter input");
            return;
        }

        localStorage.setItem("temp_user", JSON.stringify({username, password}));

        navigate("/completeprofile")
    }

    return(
        <div className="min-h-screen flex items-center justify-center" >
            <div className="w-full max-w-3xl min-h-[600px] bg-slate-200 rounded-2xl shadow-xl flex overflow-hidden">
                <div className="w-1/2 flex flex-col justify-center bg-gradient-to-br from-[#940a0a] to-[#FF6161]">
                    <div>

                    </div>
                    <div className="flex justify-center justify">
                        <h1 className=" text-5xl font-bold ">
                            <span className={"text-white"}>Your&nbsp;recipes,</span>{" "}
                            <br />
                            <span className={"text-white"}>together.</span>{" "}
                             </h1>
                    </div>
                </div>

                <div className="w-1/2 flex flex-col justify-center bg-white">
                    <h3 className=" font-semibold text-4xl text-black text-center mb-2">
                        Sign Up
                    </h3>
                    <form onSubmit={onSubmitHandle} className=" w-full flex justify-center text-black dark:text-white ">
                        <div className={" w-3/4 space-y-4 "}>
                            <input type="text"
                                   placeholder="Username"
                                   value = {username}
                                   onChange ={(e)=>setUsername(e.target.value)}
                                   className="w-full py-2 pl-3 pr-3  text-lg border rounded-2xl focus:outline-none focus:ring-1 focus:ring-[#F1524A] bg-slate-100"/>
                            <input type="password"
                                   placeholder="Password"
                                   value = {password}
                                   onChange ={(e)=>setPassword(e.target.value)}
                                   className="w-full py-2 pl-3 pr-3  text-lg border rounded-2xl focus:outline-none focus:ring-1 focus:ring-[#F1524A] bg-slate-100"/>
                            {error && <p>{error}</p>}
                            <button type="submit" className=" w-full m py-2 pl-3 pr-3 bg-[#F1524A] rounded-2xl text-white hover:bg-[#940a0a] text-lg ">
                                Sign Up
                            </button>
                        </div>
                    </form>
                    <div className="py-3 pl-3 pr-3  flex items-center text-sm text-gray-800 before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-white dark:before:border-neutral-600 dark:after:border-neutral-600 mr-3 ml-3"> or </div>
                    <span className="text-center "> Already have Foodie? &nbsp;
                    <Link to="/login" className="text-gray-800 font-bold hover:underline">
                        Login
                    </Link></span>
                </div>
            </div>
        </div>
    )

}