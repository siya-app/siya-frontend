// cat > postcss.config.js << EOL
// export const plugins = {
//     tailwindcss: {},
//     autoprefixer: {},
// };
// EOL

// export default {
//     plugins: {
//         tailwindcss: {},
//         autoprefixer: {},
//     },
// }

import tailwindcss from '@tailwindcss/postcss'
import autoprefixer from 'autoprefixer'

export default {
    plugins: [
        tailwindcss,
        autoprefixer,
    ]
}