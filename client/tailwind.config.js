
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
  plugins: [
    function ({addUtilities}){
      const newUtilities ={
        ".scrollbar-thin":{
          scrollbarWidth:'20px',
          scrollbarColor : "#1976D2 white"
        },
        ".scrollbar-webkit":{
          "&::-webkit-scrollbar":{
            width: "10px"
          },
          "&::-webkit-scrollbar-track":{
            background : "white"
          },
          "&::-webkit-scrollbar-thumb":{
            backgroundColor: "rgb(31 41 55)",
            borderRadius : "20px",
            border: "1px solid white"
          }
        }
      }
      addUtilities(newUtilities, ["responsive","hover"])
    }
  ],
}