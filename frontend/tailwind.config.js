/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        colors: {
            'black': '#1E1E1E'
        },
        extend: {
            colors: {
                'primary-blue': '#4265D6',
                'secondary-yellow': '#EFBE69',
                'accent1-neon-blue': '#78F1F1',
                'accent2-indigo': '#293855',
                'accent3-purple': '#8E54E9',
                'white': '#FFFFFF',
                'dirty-white': '#F4F7F9',
                'off-white': '#BABABA',
                'black': '#1E1E1E',
                'grey': '#404040',
                'input-grey': '#E2E5E6'
            }
        }
    },
    plugins: []
}
