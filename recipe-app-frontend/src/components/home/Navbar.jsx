import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="flex justify-between items-center p-4">
            <h1 className="font-bold font-serif text-4xl">
                <span className={"text-black"}>Foo</span>
                <span className={"text-[#F1524A]"}>die</span>
            </h1>

            <div className={"absolute left-1/2 transform -translate-x-1/2 flex space-x-14"}>
                <Link
                    to="/"
                    className="text-[#F1524A] transition hover:underline hover:text-black"
                >
                    Home
                </Link>
                <Link
                    to="/recipes"
                    className=" text-black transition hover:underline hover:text-[#E8524A]"
                >
                    Recipes
                </Link>
                <Link
                    to="/about"
                    className=" text-black hover:underline hover:text-[#E8524A] transition"
                >
                    About
                </Link>
                <Link
                    to="/"
                    className="text-black hover:underline hover:text-[#E8524A] transition"
                >
                    Contact Us
                </Link>
            </div>

            <div className={"ml-auto flex space-x-2"}>
                <Link
                    to="/register"
                    className="px-6 py-2 rounded-full border-2 border-black bg-transparent text-black hover:underline hover:border-[#F1524A] hover:text-[#F1524A] transition"
                >
                    Signup
                </Link>
                <Link
                    to="/login"
                    className="px-6 py-2 rounded-full bg-[#F1524A] text-white hover:bg-[#D4524D] hover:underline transition"
                >
                    Login
                </Link>
            </div>
        </nav>
    );
}