import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import NoScript from '@/components/NoScript';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollButton from '@/components/ScrollButton';
import ScrollRestoration from '@/components/ScrollRestoration';
import localFont from 'next/font/local';

const notoSans = localFont({
    src: [
        {path: '../stuff/fonts/NotoSans-Light.woff2', weight: '300', style: 'normal'},
        {path: '../stuff/fonts/NotoSans-Regular.woff2', weight: '400', style: 'normal'},
        {path: '../stuff/fonts/NotoSans-SemiBold.woff2', weight: '600', style: 'normal'},
        {path: '../stuff/fonts/NotoSans-Bold.woff2', weight: '700', style: 'normal'},
        {path: '../stuff/fonts/NotoSans-ExtraBold.woff2', weight: '800', style: 'normal'}
    ],
    variable: '--font-noto-sans',
    display: 'swap',
    fallback: ['system-ui', 'sans-serif'],
    preload: false,
});

export const metadata: Metadata = {
    title: {
        template: '%s - Movie Find',
        default: 'Movie Find App',
    },
    description: 'You can find information about movies in this website',
    icons: {
        apple: [
            {url: '/logo192.png', sizes: '192x192'},
            {url: '/logo512.png', sizes: '512x512'}
        ]
    },
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
    return (
        <html lang='en' className={`${notoSans.variable}`} suppressHydrationWarning>
            <body>
                <Providers>
                    <NoScript />
                    <Header />
                    {children}
                    <Footer />
                    <ScrollButton />
                    <ScrollRestoration />
                </Providers>
            </body>
        </html>
    );
}
