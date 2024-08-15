/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                background: '#dbdbdb',
                foreground: '#1f1f1f',
                accent: '#216880',
            },
        },
    },
    plugins: [],
}
