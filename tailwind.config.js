import scrollbarHide from 'tailwind-scrollbar-hide'
// import type { Config } from 'tailwindcss';

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                montserrat: ['"Montserrat"', 'sans-serif'],
                major: ['"Major Mono Display"', 'monospace'],
            }
        },
    },
    plugins: [scrollbarHide],
}