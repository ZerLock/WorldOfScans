import { useEffect, useState, useRef } from "react";

interface LazyImageProps {
  src: string;
  style?: React.CSSProperties;
}

const LazyImage = ({ src, style }: LazyImageProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: '300px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <img
      ref={imgRef}
      alt=""
      src={isVisible ? src : undefined}
      data-src={src}
      loading="lazy"
      style={style}
    />
  );
};

export default LazyImage;
