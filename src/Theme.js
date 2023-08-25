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
      marginTop:'-25px'
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
      height: "384px",  // example size, can be adjusted,
      imgRightMargin: "50px",
      imgLeftMargin: "50px"
    },
    box: {
      leftWidth: "720px",
      specialLeftWidth: "540px", //special len >8
      rightWidth: "750px"
    },
    caption: {
      symbol: "",
      others: "",
      special: "1.4em"
    },
    main: {
      symbolVariant: "h1",
      special: "4em",
      priceVariant:"h2",
      otherVariant:"h2",
      specialVariant:"h2"
    },
    price: {
      marginTop: "-35px",
      arrow: {
        borderLeft: "10px",
        borderRight: "10px",
        borderTop: "20px",
        borderBottom: "20px",
        marginLeft: "20px",
        marginTop: "-36px",
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
      width:"600px",
      paddingLeft:"100px"
    }
  }
});

export default theme;
