import { Link,useNavigate } from "react-router-dom";
import {useState} from "react";

export default function CompleteProfile(){
    return(
        <div className="min-h-screen flex items-center justify-center bg-slate-200 " >
            <div className="relative w-full max-w-3xl h-[600px] bg-slate-100 rounded-2xl shadow-xl overflow-hidden flex flex-col">
                <h2 className="text-4xl font-semibold mt-6 text-black text-center">Complete Profile</h2>

                <div className="flex flex-1 items-center justify-center">
                   <form  className="flex flex-row gap-6">
                       <div className="w-72 text-center">
                           <label className="block text-2xl font-medium text-black mb-4">Age</label>
                            <select onclassName="w-full rounded-2xl  py-3 px-3 text-black shadow-2xl bg-slate-300">
                                <option>Select Age</option>
                                {Array.from({length:200},(_,i)=>i+15).map(num=>(
                                    <option key={num} value={num}>
                                        {num}
                                    </option>
                                ))}
                            </select>
                       </div>
                       <div className="w-72 text-center">
                           <label className="block text-2xl font-medium text-black mb-4">Occupation</label>
                           <select className="w-full rounded-2xl  py-3 px-3 text-black shadow-2xl bg-slate-300">
                                <option>Retail</option>
                                <option>Retail</option>
                                <option>Retail</option>
                                <option>Retail</option>
                                <option>Retail</option>
                                <option>Retail</option>
                                <option>Retail</option>
                            </select>
                       </div>
                   </form>
                    <button type="submit" className="absolute bottom-4 right-4 m py-2 pl-3 pr-3 bg-[#F1524A] rounded-xl text-white hover:bg-[#940a0a] text-lg shadow-xl">
                        Continue
                    </button>
                </div>

            </div>
        </div>
    );
}