
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width:{
        "imageWidth": "60vw",
        "signup_Width":"40vw"
      },
      height:{
        "imageHeight": "100vh"
      },
      colors:{
        "signup":"#0000FF"
      }

    },
  },
  plugins: [],
}