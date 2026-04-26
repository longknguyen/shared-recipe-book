import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";

export default function CompleteProfile() {
    const [age, setAge] = useState("");
    const [occupation, setOccupation] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const submitHandle = async (e) => {
        e.preventDefault();
        setErrorMessage("");


        const tempUser = JSON.parse(localStorage.getItem("temp_user"));
        if(!tempUser){
            setErrorMessage("Problem occured!");
            return;
        }

        if(!age ||!occupation){
            setErrorMessage("Please select age and occupation to complete the setup");
            return;
        }

        console.log("TEMP USER:", tempUser);
        console.log("AGE:", age);
        console.log("OCCUPATION:", occupation);

        try {
            const response = await fetch("http://localhost:8080/api/users/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: tempUser.username,
                        password: tempUser.password,
                        age: Number(age),
                        occupation: occupation
                    })
                });
            if (response.ok) {
                const user = {username: tempUser.username, age: Number(age), occupation: occupation}
                localStorage.removeItem("temp_user")
                localStorage.setItem("user",JSON.stringify(user))
                navigate("/profile");
            } else {
                const msg = await response.text()
                setErrorMessage(msg);
            }
        } catch (error) {
            setErrorMessage("Site not working!");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-200 ">
            <div className="relative w-full max-w-3xl h-[600px] bg-slate-100 rounded-2xl shadow-xl overflow-hidden flex flex-col">
                <h2 className="text-4xl font-semibold mt-6 text-black text-center">Complete Profile</h2>

                <div className="relative flex flex-col flex-1 items-center justify-center">

                    <form onSubmit={submitHandle} className="flex flex-row gap-6">
                        <div className="w-72 text-center">
                            <label className="block text-2xl font-medium text-black mb-4">Age</label>
                            <select className="w-full rounded-2xl  py-3 px-3 text-black shadow-2xl bg-slate-300"
                                    value={age} onChange={(e => setAge(e.target.value))}>
                                <option value="">Select Age</option>
                                {Array.from({length: 200}, (_, i) => i + 15).map(num => (
                                    <option key={num} value={num}>
                                        {num}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="w-72 text-center">
                            <label className="block text-2xl font-medium text-black mb-4">Occupation</label>
                            <select className="w-full rounded-2xl  py-3 px-3 text-black shadow-2xl bg-slate-300"
                                    value={occupation} onChange={(e => setOccupation(e.target.value))}>
                                <option value="">Select Occupation</option>
                                <option value="tech">tech</option>
                                <option value="unemployed" >unemployed</option>
                                <option value="mother">mother</option>
                            </select>
                        </div>
                        <button type="submit"
                                className="absolute bottom-4 right-4 py-2 pl-3 pr-3 bg-[#F1524A] rounded-xl text-white hover:bg-[#940a0a] text-lg shadow-xl">
                            Continue
                        </button>
                    </form>
                    {errorMessage && <p className="text-red-600  text-sm text-center mt-5">{errorMessage}</p>}

                </div>

            </div>
        </div>
    );
}