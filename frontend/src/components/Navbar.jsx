import { Games } from '../assets/icons.jsx';

export default function Navbar() {
    return (
        <nav className="min-w-screen bg-blue-950 ">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Games className="w-8 h-8 text-blue-100" />
                    <span className="self-center text-2xl font-semibold text-blue-100">GameHub</span>
                </a>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-row p-0 mt-0 space-x-8 bg-blue-950">
                        <li>
                            <a href="/" className="block py-2 px-3 bg-blue-700 rounded-sm md:bg-transparent md:p-0 text-blue-100 md:text-blue-500" aria-current="page">Home</a>
                        </li>
                        <li>
                            <a href="/" className="block py-2 px-3 text-blue-100 rounded-sm hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-500 md:p-0 hover:text-blue-100">About</a>
                        </li>
                        <li>
                            <a href="/" className="block py-2 px-3 text-blue-100 rounded-sm hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-500 md:p-0 hover:text-blue-100">Services</a>
                        </li>
                        <li>
                            <a href="/" className="block py-2 px-3 text-blue-100 rounded-sm hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-500 md:p-0 hover:text-blue-100">Pricing</a>
                        </li>
                        <li>
                            <a href="/" className="block py-2 px-3 text-blue-100 rounded-sm hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-500 md:p-0 hover:text-blue-100">Contact</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    );
}