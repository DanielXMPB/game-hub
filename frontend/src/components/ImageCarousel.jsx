import React, { useState, useEffect } from "react";

export function ImageCarousel({ screenshots }) {

    const slides = screenshots && screenshots.length > 0
        ? screenshots.map((src, idx) => ({
            imgSrc: src,
            imgAlt: `Screenshot ${idx + 1}`,
        }))
        : [];
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    useEffect(() => {
        if (slides.length === 0) return;
        const interval = setInterval(() => {
            setCurrentSlideIndex((prev) =>
                prev < slides.length - 1 ? prev + 1 : 0
            );
        }, 10000);
        return () => clearInterval(interval);
    }, [slides.length]);

    const previous = () => {
        setCurrentSlideIndex((prev) =>
            prev > 0 ? prev - 1 : slides.length - 1
        );
    };

    const next = () => {
        setCurrentSlideIndex((prev) =>
            prev < slides.length - 1 ? prev + 1 : 0
        );
    };

    return (
        <div className="relative w-[85%] overflow-hidden py-2 mr-4">
            <button
                type="button"
                className="absolute left-5 top-1/2 z-20 flex rounded-full -translate-y-1/2 items-center justify-center p-2 transition focus-visible:outline-2 focus-visible:outline-offset-2 active:outline-offset-0 bg-neutral-950/40 text-neutral-300 hover:bg-neutral-950/60 focus-visible:outline-white"
                aria-label="previous slide"
                onClick={previous}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="3" className="size-5 md:size-6 pr-0.5" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
            </button>
            <button
                type="button"
                className="absolute right-5 top-1/2 z-20 flex rounded-full -translate-y-1/2 items-center justify-center p-2 transition focus-visible:outline-2 focus-visible:outline-offset-2 active:outline-offset-0 bg-neutral-950/40 text-neutral-300 hover:bg-neutral-950/60 focus-visible:outline-white"
                aria-label="next slide"
                onClick={next}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="3" className="size-5 md:size-6 pl-0.5" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </button>
            <div className="relative min-h-[50svh] w-full">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ${currentSlideIndex === index ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                        aria-hidden={currentSlideIndex !== index}
                    >
                        <img
                            className="absolute w-full h-full inset-0 object-cover text-neutral-300 rounded-2xl"
                            src={slide.imgSrc}
                            alt={slide.imgAlt}
                        />
                    </div>
                ))}
                <div className="absolute rounded-sm bottom-3 md:bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-4 md:gap-3 px-1.5 py-1 md:px-2 bg-blue-900/75" role="group" aria-label="slides">
                    {slides.map((slide, index) => (
                        <button
                            key={index}
                            className={`size-2 rounded-full transition ${currentSlideIndex === index ? "bg-neutral-600 dark:bg-neutral-300" : "bg-neutral-600/50 dark:bg-neutral-300/50"}`}
                            onClick={() => setCurrentSlideIndex(index)}
                            aria-label={`slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}