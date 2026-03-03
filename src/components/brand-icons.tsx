
import React from 'react';

export function GoogleLogo(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" width="24" height="24" {...props}>
            <path
                fill="currentColor"
                d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81Z"
            />
        </svg>
    );
}

export function YouTubeLogo(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" width="24" height="24" {...props}>
            <path
                fill="currentColor"
                d="M22.95 5.67a2.86 2.86 0 0 0-2-2C19.16 3 12 3 12 3s-7.16 0-8.95.67a2.86 2.86 0 0 0-2 2C.41 7.94 0 12 0 12s.41 4.06 1.05 6.33a2.86 2.86 0 0 0 2 2C4.84 21 12 21 12 21s7.16 0 8.95-.67a2.86 2.86 0 0 0 2-2C23.64 16.06 24 12 24 12s-.41-4.06-1.05-6.33ZM9.56 15.63V8.37L16 12l-6.44 3.63Z"
            />
        </svg>
    );
}

export function BingLogo(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" width="24" height="24" {...props}>
            <path fill="currentColor" d="M3.5 3v16l5 2 11-4V5H9l-5.5 2V3H3.5Zm12 3L18 7.5v10l-6.5 2.5-4-2.5V7l2.1-1 4.4 2 1.5-2Z" />
            <path fill="currentColor" d="M11.6 6.5 8 5l5-2 3.5 1-4.9 2.5Z" />
            {/* Simplified conceptual Bing - often just a 'b' but keeping generic shape for now to avoid complexity errors if not standard path */}
        </svg>
    );
}
// Actually Bing has a specific 'b' shape
export function BingLogoV2(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" width="24" height="24" {...props}>
            <path fill="currentColor" d="M5 3v16.1l13.6 3.1-.3-8.8-4.8-2.6 1.8-4.5L5 3z" />
        </svg>
    )
}


export function AmazonLogo(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" width="24" height="24" {...props}>
            <path
                fill="currentColor"
                d="M13.6 13.5c-3.1 0-3.3-2.1-3.3-2.1s.1-1.4 2.2-1.4c1.6 0 2.2.8 2.2.8v2.7h-1.1zm6 3.9c-.3.4-1.2.4-1.5.1-.3-.3-.1-1.1.1-1.4 2.1-1.8 2.2-4.8 2.2-4.8s.1-2.9-1.9-4.3c-2.4-1.6-6-1-6-1s-4.6-.3-7.5 2.3c-.6.6 0 1.2 0 1.2s.8.8 1.4.3c2.4-1.8 5.7-1.6 5.7-1.6 2.4.2 3.3 2 3.3 2s1 2.3-1.6 4.3c-2.6 1.9-6.3 1.2-6.3 1.2-3.1-.5-4.4-3.5-4.4-3.5S2 10.3 3.6 8.3c.3-.4-.1-1-.5-1-.4 0-.9.2-1.2.6-1.5 2.2-1.2 6-1.2 6 .5 3.9 3.5 5.5 6.3 5.9 0 0 2.9.6 4.8 0 0 .5.1 1.6-.9 2.1-1.1.5-2.7 0-3.5-.8-.7-.9-1.3-2.7-1.3-2.7s-.6-1-.9-.2c-.3.7.2 1.5.2 1.5.8 2 2.3 3.2 2.3 3.2 2.8 2.2 6.6.6 6.6.6 2.6-1.2 2.8-5 2.8-5 .5 1.7 2.2 2.1 2.9 2 1-.3.9-1.3.6-1.7"
            />
        </svg>
    );
}

export function EbayLogo(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" width="24" height="24" {...props}>
            {/* Simple text representation or simplified path */}
            <path fill="currentColor" d="M4.5 9h2v6h-2V9m3.5 0h2v6H8V9m3.5 0h2v6h-2V9m3.5 0h2v6h-2V9z" />
        </svg>
    );
}

export function GooglePlayLogo(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" width="24" height="24" {...props}>
            <path
                fill="currentColor"
                d="M3.8 2.8a1.3 1.3 0 0 0-.8 1.2v16c0 .5.3.9.8 1.2l.1.1 9.4-9.3v-.2L3.8 2.8zM15 13.9l-1.7-1.7L4.5 21l10.5-7.1zM5 3l8.3 8.3 1.7-1.7L4.5 3 5 3zm11.3 7.6 3.4 1.9c.7.4.7 1.1 0 1.5l-3.4 1.9-1.5-1.5V12l1.5-1.4z"
            />
        </svg>
    );
}

export function AppStoreLogo(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" width="24" height="24" {...props}>
            <path fill="currentColor" d="M18.7 17.6c.9 1.3 1.3 2.6.4 4-.9 1.3-2.6 1.3-3.6.4l-4.2-3.8c-.9-.9-2.2-.9-3 0l-4.2 3.8c-1 .9-2.7 1-3.6-.4-.9-1.4-.5-2.6.4-4 .9-1.3 7.4-11.2 7.4-11.2 1.3-2 3.5-2 4.8 0 0 .1 4.7 9.9 5.6 11.2zm-4.4-2.8L12 7.6l-2.3 7.2h4.6z" />
        </svg>
    );
}

export function InstagramLogo(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" width="24" height="24" {...props}>
            <path
                fill="currentColor"
                d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8 0 3.2 0 3.6-.1 4.9-.1 3.3-1.7 4.8-4.9 4.9-1.3 0-1.6 0-4.9.1-3.2 0-3.6 0-4.9-.1-3.3-.1-4.8-1.7-4.9-4.9 0-1.3 0-1.6-.1-4.8 0-3.2 0-3.6.1-4.9.1-3.3 1.7-4.8 4.9-4.9 1.3 0 1.6-.1 4.8-.1Zm0 2.2c-3.1 0-3.5 0-4.7.1-2.2.1-3.2 1.1-3.3 3.3-.1 1.2-.1 1.6-.1 4.7 0 3.1 0 3.5.1 4.7.1 2.2 1.1 3.2 3.3 3.3 1.2.1 1.6.1 4.7.1 3.1 0 3.5 0 4.7-.1 2.2-.1 3.2-1.1 3.3-3.3.1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c0-2.2-1.1-3.2-3.3-3.3-1.2 0-1.6-.1-4.7-.1Zm0 3.7c3.4 0 6.2 2.7 6.2 6.2 0 3.4-2.7 6.2-6.2 6.2-3.4 0-6.2-2.7-6.2-6.2 0-3.4 2.7-6.2 6.2-6.2Zm0 9.8c2 0 3.6-1.6 3.6-3.6 0-2-1.6-3.6-3.6-3.6-2 0-3.6 1.6-3.6 3.6 0 2 1.6 3.6 3.6 3.6Zm6.2-9c0 .8-.6 1.4-1.4 1.4-.8 0-1.4-.6-1.4-1.4 0-.8.6-1.4 1.4-1.4.8 0 1.4.6 1.4 1.4Z"
            />
        </svg>
    );
}

export function TwitterLogo(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" width="24" height="24" {...props}>
            <path
                fill="currentColor"
                d="M22 5.8a8.49 8.49 0 0 1-2.36.64 4.13 4.13 0 0 0 1.81-2.27 8.21 8.21 0 0 1-2.61 1 4.1 4.1 0 0 0-7 3.74 11.64 11.64 0 0 1-8.45-4.29 4.16 4.16 0 0 0 1.27 5.48 4.09 4.09 0 0 1-1.87-.5v.05a4.12 4.12 0 0 0 3.3 4.03 4.1 4.1 0 0 1-1.86.07 4.1 4.1 0 0 0 3.83 2.85A8.25 8.25 0 0 1 2 18.04a11.63 11.63 0 0 0 6.29 1.85c7.55 0 11.67-6.26 11.67-11.67v-.53A8.34 8.34 0 0 0 22 5.8Z"
            />
        </svg>
    );
}

export function PinterestLogo(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" width="24" height="24" {...props}>
            <path
                fill="currentColor"
                d="M12 2a10 10 0 0 0-3.6 19.34c-.15-.84-.28-2.12.06-3.56l1.22-5.2s-.3-.62-.3-1.52c0-1.43.83-2.5 1.86-2.5.88 0 1.3.66 1.3 1.45 0 .89-.57 2.22-.86 3.45-.25 1.03.52 1.87 1.54 1.87 1.84 0 3.26-1.95 3.26-4.75 0-2.48-1.78-4.22-4.33-4.22-3.15 0-5 2.37-5 4.83 0 .96.37 1.98.83 2.54.1.1.11.2.08.35l-.32 1.28c-.05.2-.17.24-.38.15-1.43-.67-2.32-2.76-2.32-4.44 0-3.62 2.63-6.94 7.6-6.94 4 0 7.1 2.85 7.1 6.66 0 3.97-2.5 7.17-5.96 7.17-1.17 0-2.27-.6-2.64-1.32l-.72 2.73c-.26 1-.96 2.26-1.43 3.03A9.97 9.97 0 0 0 12 22a10 10 0 1 0 0-20Z"
            />
        </svg>
    );
}
