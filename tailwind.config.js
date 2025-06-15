

// cat > tailwind.config.js << EOL
// /** @type {import('tailwindcss').Config} */
// export const content = ["./src/**/*.{html,js,jsx,ts,tsx}"];
// export const theme = {
//     extend: {},
// };
// export const plugins = [];
// EOL

import scrollbarHide from 'tailwind-scrollbar-hide'

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [scrollbarHide],
}