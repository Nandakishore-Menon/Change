import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
    fonts: {
      heading: `'DM Sans', sans-serif`,
      body: `'Quicksand', sans-serif`,
    },
    fontSizes: {
      banner: '70px'
    },
    colors: {
      brand: {
        navbarBG: "#ffffff",
        mainBG: '#efe8fe',
        buttonBG: '#000000',
        fontLight: '#ffffff',
        fontDark: '#000000',
        darkBlue: '#6440ed',
        // ...
        900: "#1a202c",
      },
    //   buttonBG: '#000000',
    },
    radii: {
      buttonRadius: '30px'
    }

  })


export default theme