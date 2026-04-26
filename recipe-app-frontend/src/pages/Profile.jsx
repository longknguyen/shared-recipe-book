import Navbar from "../components/home/Navbar.jsx";
import {useNavigate} from "react-router-dom"
import {useState} from "react";
import { User,KeyRound,Edit,Balloon,BriefcaseBusiness} from 'lucide-react';

export default function Profile() {

    return(
        <div className="flex flex-row w-full h-screen overflow-hidden bg-slate-50 bg-cover ">
            <div className="flex flex-col bg-slate-50 w-[380px] border-r-[1px] border-grey-500 mt-3 mb-3">
                <h2 className=" ml-4 text-2xl">Explore</h2>
                <hr className="mt-3 pl-3 pr-3 mr-3 ml-3 border-grey-500"></hr>
            </div>


            <div className="flex flex-col bg-slate-50 mt-3 mb-3 w-full min-h-screen">
                <h2 className=" ml-4 text-2xl">Manage My Account</h2>
                <hr className="mt-3 pl-3 pr-3 mr-3 ml-3 border-grey-500"></hr>


                <div className="flex flex-1 justify-center items-center ">
                    <div className=" flex flex-col  w-[650px] bg-white p-10 space-y-8 rounded-2xl shadow-xl">
                        <div>
                            <div className="flex flex-row gap-2 ">
                                <p><User/></p>
                                <div className="flex flex-col">
                                    <p>Username</p>
                                    <p>[NAME]</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="flex flex-row gap-2 ">
                                <p><KeyRound/></p>
                                <div className="flex flex-col w-full">
                                    <p>Password</p>
                                    <div className="flex flex-row justify-between items-center w-full">
                                        <p className="">[pwdEDIT]</p>
                                        <button type="submit" className="gap-1 items-center pl-4 pr-4 bg-blue-950 text-white rounded-md alig">
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
                                    <p>[age]</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="flex flex-row gap-2 ">
                                <p><BriefcaseBusiness/></p>
                                <div className="flex flex-col">
                                    <p>Occupation</p>
                                    <p>[occupation]</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}