import { Games } from '../assets/icons.jsx';

export default function Navbar() {
    return (
        <nav className="bg-tc1 text-tc6 shadow-xl">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Games className="w-8 h-8 text-tc6" />
                    <span className="self-center text-2xl font-semibold text-tc6">GameHub</span>
                </a>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-row p-0 mt-0 space-x-8">
                        <li>
                            <a href="/" className="block py-2 px-3 bg-blue-700 rounded-sm md:bg-transparent md:p-0 text-tc6 md:text-blue-500" aria-current="page">Home</a>
                        </li>
                        <li>
                            <a href="/list" className="block py-2 px-3 text-tc6 rounded-sm hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-500 md:p-0 hover:text-tc6">List</a>
                        </li>
                        <li>
                            <a href="/" className="block py-2 px-3 text-tc6 rounded-sm hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-500 md:p-0 hover:text-tc6">About</a>
                        </li>
                        <li>
                            <a href="/" className="block py-2 px-3 text-tc6 rounded-sm hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-500 md:p-0 hover:text-tc6">Services</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    );
}