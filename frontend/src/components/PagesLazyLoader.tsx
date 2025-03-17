import { useEffect, useState, useRef, useCallback } from "react";
import { EngineContext } from "../libs/engine/EngineContext";
import LazyImage from "./LazyImage";
import { Spinner } from "@chakra-ui/react";

interface LazyLoaderProps {
    manga: string;
    chapter: number;
    nbPages: number;
    loadFinished: () => void;
}

export const LazyLoader = ({ manga, chapter, nbPages, loadFinished }: LazyLoaderProps) => {
    const [loadedImages, setLoadedImages] = useState<string[]>([]);
    const observer = useRef<IntersectionObserver | null>(null);
    const isLoading = useRef(false);
    const hasFinishedLoading = useRef(false);
    const BATCH_SIZE = 5;

    const generateImageUrls = (start: number, count: number): string[] => {
        return Array.from({ length: count }, (_, i) => EngineContext.getPageUrl(manga, chapter, start + i + 1));
    };

    const loadNextBatch = useCallback(() => {
        if (isLoading.current || loadedImages.length >= nbPages) return;

        isLoading.current = true;
        const nextBatch = generateImageUrls(loadedImages.length, Math.min(nbPages - loadedImages.length, BATCH_SIZE));
        let loadedCount = 0;
        const tempLoadedImages: string[] = new Array(nextBatch.length);

        nextBatch.forEach((src, index) => {
            const img = new Image();
            img.src = src;
            img.onload = img.onerror = () => {
                tempLoadedImages[index] = src;
                loadedCount++;

                if (loadedCount === nextBatch.length) {
                    setLoadedImages((prev) => {
                        const newImages = [...prev, ...tempLoadedImages];
                        if (newImages.length >= nbPages && !hasFinishedLoading.current) {
                            hasFinishedLoading.current = true;
                            loadFinished();
                        }
                        return newImages;
                    });
                    isLoading.current = false;
                }
            };
        });
    }, [loadedImages, nbPages, manga, chapter, loadFinished]);

    useEffect(() => {
        loadNextBatch();
    }, [nbPages, manga, chapter]);

    useEffect(() => {
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                loadNextBatch();
            }
        }, { rootMargin: '500px' });

        const images = document.querySelectorAll("#pages-container img");
        const lastImage = images[images.length - 1];

        if (lastImage) observer.current.observe(lastImage);

        return () => observer.current?.disconnect();
    }, [loadedImages, loadNextBatch]);

    return (
        <>
            {loadedImages.length === 0 && <Spinner mt="100px" size="xl" />}
            <div id="pages-container" className="grid grid-cols-2 gap-4 p-4">
                {loadedImages.map((src, index) => (
                    <LazyImage key={index} src={src} style={{ width: '100%' }} />
                ))}
            </div>
        </>
    );
};
