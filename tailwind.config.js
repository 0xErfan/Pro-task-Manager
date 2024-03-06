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

            },
            fontFamily: {
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