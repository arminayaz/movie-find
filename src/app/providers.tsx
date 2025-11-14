'use client';

import { Provider } from 'react-redux';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { store } from '@/store/store';

export function Providers({children}: {children: React.ReactNode}) {
    return (
        <Provider store={store}>
            <NextThemesProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange={false}>
                {children}
            </NextThemesProvider>
        </Provider>
    );
}
