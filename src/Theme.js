import { extendTheme } from '@chakra-ui/react'


const theme = extendTheme({
    fonts: {
      banner: `'neufreit', sans-serif`,
      navbar: 'Mulish',
      body: `'Mulish', sans-serif`,
    },
    fontSizes: {
      banner: '4.5vw',
      headings: '2.6vw',
      navbar: "1.25vw",
      logo: "1.3vw"
    },
    colors: {
      brand: {
        navbarBG: "#ffffff",
        mainBG: '#efe8fe',
        formBG: '#f3f0f8',
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