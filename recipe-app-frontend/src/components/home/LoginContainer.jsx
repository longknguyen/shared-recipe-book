import { Link,useNavigate } from "react-router-dom";
import {useState} from "react";
import {useForm} from "react-hook-form";

export default function LoginContainer(){

    const {register, handleSubmit, formState: {errors},} = useForm();
    const[errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const onSubmit = async ( data ) =>
    {
        console.log("FORM SUBMITTED", data);
        try{
            const response = await fetch("http://localhost:8080/api/users/login",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({username: data.username, password: data.password})
            });

            if(!response.ok)
            {
                const errormsg = await response.text();
                setErrorMessage(errormsg)
                return;
            }
            else
            {
                const user = await response.json();
                localStorage.setItem("user", JSON.stringify(user))
                setErrorMessage("");
                navigate("/profile");
            }
        }
        catch (err){
            setErrorMessage("Site not working!");
        }
    };

    return(
        <div className="min-h-screen flex items-center justify-center" >

            <div className="w-full max-w-3xl min-h-[600px] bg-slate-200 rounded-2xl shadow-xl flex overflow-hidden">
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
                    <form onSubmit={handleSubmit(onSubmit)} className=" w-full flex justify-center mt-5 text-black dark:text-white text-center">
                        <div className={" w-3/4 space-y-4 "}>
                            <input type="text" placeholder="Username" {...register("username", { required: true })}
                                   className="w-full py-2 pl-3 pr-3  text-lg border rounded-2xl focus:outline-none focus:ring-1 focus:ring-[#F1524A] bg-slate-100"/>
                            {errors.username && <p>Username required</p>}
                            <input type="password" placeholder="Password" {...register("password", { required: true })}
                                   className="w-full py-2 pl-3 pr-3  text-lg border rounded-2xl focus:outline-none focus:ring-1 focus:ring-[#F1524A] bg-slate-100"/>
                            {errors.password && <p>password required</p>}

                            <button type="submit" className=" w-full m py-2 pl-3 pr-3 bg-[#F1524A] rounded-2xl text-white hover:bg-[#940a0a] text-lg ">
                            Log in
                            </button>

                            <span className="text-center text-sm text-gray-600 "> Dont have an account? &nbsp;
                                <Link to="/register" className="text-gray-800 font-bold hover:underline text-sm">Sign Up</Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}