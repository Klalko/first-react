import React from 'react';

function FlexibleLogo({ width = "70", height = "50", primaryColor = "#1A73E8", secondaryColor = "#10B981", glowColor = "rgba(0, 0, 0, 0.5)" }) {
    const gradientUrl = `url(#ultraGradient-${primaryColor}-${secondaryColor})`;
    const glowUrl = `url(#neonGlow-${glowColor})`;

    return (
        <svg viewBox="0 0 700 500" xmlns="http://www.w3.org/2000/svg" style={{ width: width, height: height }}>
            <defs>
                {/* Dynamic Gradient */}
                <linearGradient id={`ultraGradient-${primaryColor}-${secondaryColor}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={primaryColor} stopOpacity="1" />
                    <stop offset="50%" stopColor={secondaryColor} stopOpacity="0.8" />
                    <stop offset="100%" stopColor={primaryColor} stopOpacity="1" />
                </linearGradient>

                {/* Dynamic Glow Effect */}
                <filter id={`neonGlow-${glowColor}`}>
                    <feGaussianBlur stdDeviation="8" result="shadowBlur" />
                    <feColorMatrix type="matrix" values={`0 0 0 0 0
                                      0 0 0 0 0
                                      0 0 0 0 0
                                      0 0 0 0.5 0`} />
                    <feMerge>
                        <feMergeNode in="shadowBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Primary Curved Path */}
            <path d="M100,250
                Q350,100 600,250
                Q350,400 100,250" fill="none" stroke={gradientUrl} strokeWidth="4"
                filter={glowUrl} />

            {/* Intersection Lines */}
            <g stroke={gradientUrl} strokeWidth="2" filter={glowUrl}>
                <path d="M200,150
                  Q350,250 500,150" fill="none" strokeDasharray="10,10" />
                <path d="M200,350
                  Q350,250 500,350" fill="none" strokeDasharray="10,10" />
            </g>

            {/* Connection Nodes */}
            <g fill={gradientUrl} filter={glowUrl}>
                <circle cx="350" cy="250" r="20" />
                <circle cx="200" cy="150" r="12" />
                <circle cx="500" cy="150" r="12" />
                <circle cx="200" cy="350" r="12" />
                <circle cx="500" cy="350" r="12" />
            </g>

            {/* Refined Typography */}
            <text x="350" y="450" textAnchor="middle" fontSize="60" fontWeight="bold" fill={gradientUrl}
                filter={glowUrl} letterSpacing="5">
                VERSALIFE
            </text>

            {/* Subtle Background Grid */}
            <g stroke={gradientUrl} strokeOpacity="0.2" fill="none">
                <path d="M50,50 L650,450
                  M650,50 L50,450
                  M350,50 L350,450" strokeWidth="1" strokeDasharray="5,5" />
            </g>
        </svg>
    );
}

export default FlexibleLogo;