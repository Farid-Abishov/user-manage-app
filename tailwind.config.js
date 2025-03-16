/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'title':['Inter','sans-serif'],
        'entry-title':['Montserrat'],
        'poppin':['poppins']
      },
      colors:{
        'custom-red':'#FF003C',
        'custom-black':'#1F1F1F',
        'input-border':'#E6E9ED',
        'body-bg':'#e5f2fb',
      },
      width:{
        'header-w':'1728px',
        'aside-w':'335px',
        'addbtn':'179px',
      },
     
      height:{
        'input-h':'42px',
        'header-h':'100px',
        'item-h':'650px',
        'content-h':'140px',
        'container-h':'615px'
        },
      boxShadow:{
        'custom-shadow':'0 0 8px 0  rgba(230, 233, 237, 1)'
      },
     
    },
  },
  plugins: [],
}

