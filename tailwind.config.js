/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './index.html',
        './src/**/*.{js, ts, jsx, tsx}',
        './pages/**/*.{js, ts, jsx, tsx}',
        './components/**/*.{js, ts, jsx, tsx}',
    ],
    darkMode: 'media',
    theme: {
        extend: {
            maxWidth: {'1/3': '32.21%', '3/4': '75%', 'max-w-3xl': '48rem'},
            lineClamp: {7: '7', 8: '8', 9: '9', 10: '10'},
        },
    },
}

