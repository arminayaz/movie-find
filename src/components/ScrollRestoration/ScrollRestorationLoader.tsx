'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const scrollPositions = new Map<string, number>();

export function ScrollRestorationLoader() {
    const pathname = usePathname();

    useEffect(() => {
        const pos = scrollPositions.get(pathname);
        if(pos) window.scrollTo(0, pos);

        const saveScroll = () => scrollPositions.set(pathname, window.scrollY);
        window.addEventListener('scroll', saveScroll);

        return () => window.removeEventListener('scroll', saveScroll);
    }, [pathname]);

    return null;
}
