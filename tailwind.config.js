/** @type {import('tailwindcss').Config} */
export default {

    important: true,

    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],

    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: "20px",
                "lg": "10px",
            },
        },

        extend: {
            screens: {
                "xs": "460px",
            },
            boxShadow: {
                regular: "0px 10px 30px -17px",
                regular2: "0 4px 15px 2px"
            },
            colors: {
                "primary": "#8875FF",
                "milky": "rgba(255, 255, 255, 87%)",
                "milky-dark": "rgba(255, 255, 255, 44%)",
                "border": "#979797",
                "dark-light": "#1D1D1D",
                "primary-gray": "#363636",
                "primary-black": "#121212"
            },
            fontFamily: {
                "lato": "lato",
                "lato-bold": "lato-bold",
            }
        }
    },

    plugins: [
        function ({ addVariant }) {
            addVariant('ch', '& > *');
            addVariant('ch-hover', '& > *:hover');
        }
    ],
    
}