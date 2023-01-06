import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
    fonts: {
      heading: `'DM Sans', sans-serif`,
      body: `'Quicksand', sans-serif`,
    },
    fontSizes: {
      banner: '4.5vw',
      headings: '2.6vw'
    },
    colors: {
      brand: {
        navbarBG: "#ffffff",
        mainBG: '#efe8fe',
        buttonBG: '#000000',
        fontLight: '#ffffff',
        fontDark: '#000000',
        // darkBlue: '#6440ed',
        darkBlue: '#8259e1',
        buttonHover: '#e2dafd',
        palette2: '#cebbf6',
        palette3: '#8259e1',
        // contrast1: '#ff897f'
        contrast1: '#caed7f'
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