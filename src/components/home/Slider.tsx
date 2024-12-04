/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';

const images = [
    '/slider/1.jpg',
    '/slider/2.jpg',
    '/slider/3.jpg',
    '/slider/4.jpg',
    '/slider/5.jpg',
    '/slider/6.jpg',
    '/slider/7.jpg',
    '/slider/8.jpg',
    '/slider/9.jpg',
    '/slider/10.jpg'
];

export default function SliderHome() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-full overflow-hidden">
            {images.map((image, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity  ${currentIndex === index ? 'opacity-100' : 'opacity-0'}`}
                    style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center', transitionDuration: '4s' }}
                />
            ))}
            {/* <TextEffect text='pentimento' /> */}
            <img
                src='/logo/logo-penti.png'
                width={520}
                height={246}
                alt='Logo'
                className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform opacity-90 p-10 lg:p-0'
            />
            {/* GRID DE ENLACES CENTRO DESKTOP  */}
            <div className='hidden md:flex items-center gap-2 ms-auto mt-auto absolute bottom-0 left-1/2 transform -translate-x-1/2 px-6 py-2'>
                <a href="mailto:pentimento@gmail.com" className='flex gap-1 items-center text-neutral-100 p-2 border bg-black/70 hover:bg-red-600 hover:border-green hover:text-white group  transition-all duration-300 ease'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icon-tabler-mail">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
                        <path d="M3 7l9 6l9 -6" />
                    </svg>
                </a>
                <a href="https://www.google.com/maps/search/?api=1&query=Bonpland+2363,+CABA,+Argentina" target="_blank" rel="noopener noreferrer" className='flex gap-1 items-center text-neutral-100 p-2 border bg-black/70 hover:bg-green-600 hover:text-white transition-all duration-300 ease'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icon-tabler-map-pin">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                        <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
                    </svg>
                </a>
                <a href="https://www.facebook.com/pentimentocolorgrading/" target="_blank" rel="noopener noreferrer" className='flex gap-1 items-center text-neutral-100 p-2 border bg-black/70 hover:bg-sky-500  hover:text-white transition-all duration-300 ease'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icon-tabler-brand-facebook">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
                    </svg>
                </a>
                <a href="https://www.instagram.com/pentimentocolorgrading/" target="_blank" rel="noopener noreferrer" className='flex gap-1 items-center text-neutral-100 p-2 border bg-black/70 hover:bg-red-600 hover:text-white transition-all duration-300 ease'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icon-tabler-brand-instagram">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
                        <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                        <path d="M16.5 7.5l0 .01" />
                    </svg>
                </a>
            </div>
            {/* GRID DE ENLACES CENTRO MOBILE  */}
            <div className='w-full border-t absolute bottom-0 md:hidden bg-neutral-900 grid grid-cols-4 py-1'>
                <div className='flex flex-col items-center justify-center py-1'>
                    <a href="mailto:contactoweb@pentimento.cc" className='flex items-center justify-center  text-neutral-100   '>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icon-tabler-mail">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
                            <path d="M3 7l9 6l9 -6" />
                        </svg>
                    </a>
                    <span className='text-white text-xs '>Email</span>
                </div>
                <div className='flex flex-col items-center justify-center py-1'>
                    <a href="https://www.google.com/maps/search/?api=1&query=Bonpland+2363,+CABA,+Argentina" target="_blank" rel="noopener noreferrer" className='flex justify-center gap-1 items-center text-neutral-100'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icon-tabler-map-pin">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                            <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
                        </svg>
                    </a>
                    <span className='text-white text-xs '>Location</span>
                </div>
                <div className='flex flex-col items-center justify-center py-1'>
                    <a href="https://www.facebook.com/pentimentocolorgrading/" target="_blank" rel="noopener noreferrer" className='flex justify-center items-center text-neutral-100'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icon-tabler-brand-facebook">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
                        </svg>
                    </a>
                    <span className='text-white text-xs '>Facebook</span>

                </div>
                <div className='flex flex-col items-center justify-center py-1'>
                    <a href="https://www.instagram.com/pentimentocolorgrading/" target="_blank" rel="noopener noreferrer" className='flex justify-center items-center text-neutral-100'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icon-tabler-brand-instagram">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
                            <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                            <path d="M16.5 7.5l0 .01" />
                        </svg>
                    </a>
                    <span className='text-white text-xs '>Instagram</span>
                </div>
            </div>
        </div >
    );
}
