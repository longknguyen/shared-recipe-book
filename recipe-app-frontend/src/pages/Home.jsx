import Navbar from "../components/home/Navbar.jsx";
import {useNavigate} from "react-router-dom"
import {useState} from "react";

export default function Home() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (!query.trim()) return;
        navigate(`/recipes?query=${encodeURIComponent(query)}`);
    };

    return(
        <>
            <div className={"relative w-full h-screen overflow-hidden bg-[url('./assets/home/background.png')] bg-cover bg-no-repeat"}>
                <Navbar></Navbar>
                <div className={"absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"}>
                    <div className={"text-5xl font-semibold"}>
                        <div className={"mb-1"}>
                            <span className={"text-black"}>Simple </span>
                            <span className={"text-[#F1524A]"}>Recipes </span>
                            <span className={"text-black"}>for</span></div>
                        <div className={"mb-4"}>
                            <span className={"text-[#F1524A]"}>Incredible </span>
                            <span className={"text-black"}>Deliciousness</span>
                        </div>
                    </div>
                    <div className={"mb-4"}>
                        <span className={"text-black max-w-xs"}>
                            Discover easy ways to create special dishes with our simple recipes.
                            Enjoy extraordinary deliciousness in every dish you make.</span>
                    </div>

                    <form onSubmit={handleSearch} className="flex items-center justify-center text-black dark:text-white">
                        <div className={"relative w-full"}>
                            <input type="search"
                                   value={query}
                                   onChange={(e) => setQuery(e.target.value)}
                                   placeholder="Search for your favourite recipes..."
                                   className="w-full py-4 pl-4 pr-32 text-lg border rounded-full focus:outline-none focus:ring-1 focus:ring-[#F1524A]"
                            />
                            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 px-6 py-2 bg-[#F1524A] rounded-full text-white hover:bg-[#D4524D] transition">
                                Search</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}