import {useNavigate,Link} from "react-router-dom"
import {useEffect, useState} from "react";
import { User,KeyRound,Balloon,BriefcaseBusiness, X} from 'lucide-react';
export default function Profile() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    useEffect(() => {
        const currentUser = localStorage.getItem("user");

        if(!currentUser){
            setError("User not found!");
            return;
        }
        if(currentUser)
        {
            try{
                setUser(JSON.parse(currentUser));
            }
            catch (e)
            {

                console.log("Data not stored");
                setError("Data got lost!")
                localStorage.removeItem("user");
            }
        }
    }, []);

    if(error){
        return <p>{error}</p>
    }
    if(!error && !user){
        return <p>Loading....</p>
    }
    return(
        <div className="flex flex-row w-full h-screen overflow-hidden bg-slate-50 bg-cover ">
            <div className="flex flex-col bg-slate-50 w-[380px] border-r-[1px] border-grey-500 mt-3 mb-3">
                <h2 className=" ml-4 text-2xl text-gray-600">Explore</h2>
                <hr className="mt-3 pl-3 pr-3 mr-3 ml-3 border-grey-500"></hr>
                <div className="flex flex-col space-y-4 ml-5 mt-4 gap-2">
                    <ul className=" w-full">
                    <li className="cursor-pointer hover:bg-slate-100 text-lg hover:text-black mr-3 pl-2 pb-1 pt-1 rounded-sm hover:shadow-2xl">Manage recipes</li>
                    </ul>
                </div>
            </div>


            <div className="flex flex-col bg-slate-50 mt-3 mb-3 w-full min-h-screen">
                <div className="flex justify-between">
                    <h2 className=" ml-4 text-2xl text-gray-600 ">Manage My Account</h2>
                    <Link to="/"><X className="cursor-pointer text-black mr-5 hover:text-red-600"/>
                    </Link>
                </div>
                <hr className="mt-3 pl-3 pr-3 mr-3 ml-3 border-grey-500"></hr>
                <div className="flex flex-1 justify-center items-center text-black">
                    <div className=" flex flex-col  w-[650px] bg-white p-10 space-y-8 rounded-2xl shadow-xl">
                        <div>
                            <div className="flex flex-row gap-2 ">
                                <p><User/></p>
                                <div className="flex flex-col">
                                    <p>Username</p>
                                    <p>{user?.username}</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="flex flex-row gap-2 ">
                                <p><KeyRound/></p>
                                <div className="flex flex-col w-full">
                                    <p>Password</p>
                                    <div className="flex flex-row justify-between items-center w-full">
                                        <p className="">******</p>
                                        <button type="submit" className="gap-1 items-center pl-5 pr-5 pt-1 pb-1 bg-red-400 text-white rounded-md alig hover:bg-red-600">
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="flex flex-row gap-2 ">
                                <p><Balloon/></p>
                                <div className="flex flex-col">
                                    <p>Age</p>
                                    <p>{user?.age}</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="flex flex-row gap-2 ">
                                <p><BriefcaseBusiness/></p>
                                <div className="flex flex-col">
                                    <p>Occupation</p>
                                    <p>{user?.occupation}</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}