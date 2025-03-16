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
        'header-black':'#323232'
      },
      width:{
        "login-container-width":'1414px',
        'entry-container-width':'432px',
        'header-w':'1728px',
        'frsearch-w':'1400px',
        'content-w':'660px',
        'profile-w':'220px',
        'aside-w':'335px',
        'addbtn':'179px',
        'qstnmngInput':'460px',
      },
     
      height:{
        'input-h':'42px',
        'header-h':'100px',
        'frbox-h':'897px',
        'item-h':'650px',
        'content-h':'140px',
        'profile-h':'172px',
        'container-h':'615px'
        },
      maxWidth:{
        'frbox-w':'1500px ',
        }
        ,
      boxShadow:{
        'custom-shadow':'0 0 8px 0  rgba(230, 233, 237, 1)'
      },
     
     
    },
  },
  plugins: [],
}

