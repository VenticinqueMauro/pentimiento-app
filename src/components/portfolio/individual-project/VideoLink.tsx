'use client';

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

export default function VideoLink({ videoLink }: { videoLink: string }) {
    const [isClient, setIsClient] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    return (
        <div className="aspect-video relative">
            {isLoading && (
                <div className="absolute inset-0 animate-pulse bg-gray-100 flex items-center justify-center">
                    <div className="w-full h-full bg-gray-200"></div>
                </div>
            )}
            <ReactPlayer
                url={videoLink}
                width="100%"
                height="100%"
                controls
                playing={false}
                className="rounded-lg"
                onReady={() => setIsLoading(false)} // Se oculta el skeleton cuando el video está listo
                config={{
                    youtube: {
                        playerVars: {
                            modestbranding: 1,
                            rel: 0,
                            showinfo: 0,
                            iv_load_policy: 3,
                            vq: 'hd1080',
                        },
                    },
                    vimeo: {
                        playerOptions: {
                            quality: '1080p',
                            byline: false,
                            portrait: false,
                            title: false,
                        },
                    },
                }}
            />
        </div>
    );
}
