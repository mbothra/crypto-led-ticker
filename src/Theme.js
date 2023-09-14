import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    h5: {
      color: 'white',
      fontFamily: 'Digital7',
      backgroundColor: '#000',
      fontSize:'3em'
    }, 
    h4: {
        color: 'white',
        fontFamily: 'Digital7',
        backgroundColor: '#000',
        fontSize:'3.8em',
        marginTop:'12px'
      }, 
    caption: {
      color: 'white',
      fontFamily: 'Digital7',
      backgroundColor: '#000',
      fontSize:'1.8em',
      marginTop:'-50px'
    },
    h2: {
      color: 'white',
      fontFamily: 'Digital7',
      backgroundColor: '#000',
      fontSize:'5.5em'
    }, 
    h1: {
      color: 'white',
      backgroundColor: '#000',
      fontSize:'7em'
    }, 
  },
  sizes: {
    width: "5760px",
    height: "384px",
    card: {
      width: "310px",  // example size, can be adjusted
      height: "344px",  // example size, can be adjusted,
      imgRightMargin: "50px",
      imgLeftMargin: "150px"
    },
    box: {
      leftWidth: "610px",
      specialLeftWidth: "520px", //special len >8
      rightWidth: "830px",
      specialWidth: "680px", //special len =8
      specialRightWidth: "920px",
      specialRWidth:"760px"
    },
    caption: {
      symbol: "",
      others: "",
      special: "1em"
    },
    main: {
      symbolVariant: "h1",
      special: "4.46em",
      priceVariant:"h2",
      otherVariant:"h2",
      specialVariant:"h2",
      exponentFont:"2em"
    },
    price: {
      marginTop: "-31px",
      arrow: {
        borderLeft: "10px",
        borderRight: "10px",
        borderTop: "20px",
        borderBottom: "20px",
        marginLeft: "20px",
        marginTop: {
          upward: "-50px",
          downward: "-50px"
        },
        marginBottom: {
          upward: "30px",
          downward: "20px"
        }
      } 
    },
    brand: {
      height:"436px",
      imgHeight:"300px",
      fontSize: "4em",
      fontFamily: "Montserrat",
      width:"1440px",
      paddingLeft:"100px"
    }
  }
});

export default theme;
