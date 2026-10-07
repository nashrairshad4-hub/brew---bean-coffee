import React, { useState } from 'react';
import { Coffee } from 'lucide-react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
  className?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt = 'Brew & Bean Coffee',
  className = '',
  fallbackTitle = 'Brew & Bean Specialty Coffee',
  ...rest
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#2E1D13] to-[#1F140D] text-[#E8DCCB] p-4 text-center select-none ${className}`}
      >
        <div className="w-10 h-10 rounded-full bg-[#422A1D] flex items-center justify-center text-[#C4925D] mb-2 shadow-inner">
          <Coffee className="w-5 h-5" />
        </div>
        <span className="text-xs font-medium tracking-wide text-[#E8DCCB]/90 line-clamp-1">
          {fallbackTitle}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
      loading="lazy"
      {...rest}
    />
  );
};
