import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
    fonts: {
      heading: `'DM Sans', sans-serif`,
      body: `'Quicksand', sans-serif`,
    },
    fontSizes: {
      banner: '4.5vw'
    },
    colors: {
      brand: {
        navbarBG: "#ffffff",
        mainBG: '#efe8fe',
        buttonBG: '#000000',
        fontLight: '#ffffff',
        fontDark: '#000000',
        darkBlue: '#6440ed',
        buttonHover: '#e2dafd',
        // ...
        900: "#1a202c",
      },
    //   buttonBG: '#000000',
    },
    radii: {
      buttonRadius: '30px',
      addressRadius: '30px',
      walletRadius: '30px',
      modalRadius: '20px'
    },
    sizes: {
      walletButtonImage: '6vh',
      walletButton: '7vh'
    }

  })


export default theme