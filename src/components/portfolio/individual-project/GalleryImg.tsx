/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/autoplay';
import { FreeMode, Navigation, Thumbs, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';

interface GalleryImage {
    id: number;
    url: string;
}

interface ProjectGalleryProps {
    images: GalleryImage[];
}

export default function ProjectGallery({ images }: ProjectGalleryProps) {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

    return (
        <div className="w-full">
            {/* Main Slider */}
            <Swiper
                loop={true}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                modules={[FreeMode, Navigation, Thumbs, Autoplay]}
                className="mySwiper2 overflow-hidden"
            >
                {images.map((image) => (
                    <SwiperSlide key={image.id}>
                        <div className="relative w-full h-0 pb-[56.25%] bg-black">
                            <img
                                src={image.url}
                                alt={`Gallery image ${image.id}`}
                                className="absolute top-0 left-0 w-full h-full object-cover"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Thumbnail Slider */}
            <Swiper
                onSwiper={(swiper) => setThumbsSwiper(swiper)}
                loop={true}
                spaceBetween={0} 
                slidesPerView={5}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >
                {images.map((image) => (
                    <SwiperSlide key={image.id}>
                        <div className="relative w-full h-0 pb-[50%] cursor-pointer overflow-hidden transition-all duration-300 hover:opacity-80">
                            <img
                                src={image.url}
                                alt={`Thumbnail ${image.id}`}
                                className={`absolute top-0 left-0 w-full h-full object-cover`}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
