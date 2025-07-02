/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}",  
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors:{
        primary:'#030014',
        secondary:'#151312',
        light:{
          '100':"#D6C6FF",
          '200':"#A8B5DB",
          '300':"#9CA4AB", 
        },
        dark:{
          100:'#221f3d',
          200:'#0f0d23'
        },
        accent:'#AB8BFF',
        white:'#F2F2F2',
        black:'#030014',
        gray:'#A8B5DB',
        red:'#FF0000', 
        yellow:'#FFFF00',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}