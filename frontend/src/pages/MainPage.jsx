import { useEffect, useState } from "react";
import axios from "axios";
import { GameCarousel } from "../components/GameCarousel";

const API_URL = import.meta.env.VITE_API_URL;

export default function MainPage() {
    const [mainGames, setMainGames] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const params = { limit: 10 };
                const res = await axios.get(`${API_URL}/search`, { params });
                setMainGames(res.data.results);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="max-w-screen-xl mx-auto">
            <div className="mt-4">
                <h1 className="text-3xl font-bold text-tc6 ml-17 mb-3">Featured</h1>
                <div className="flex justify-center"><GameCarousel games={mainGames} /></div>
            </div>
        </div>
    );
}
