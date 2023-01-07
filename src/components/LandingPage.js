import React from 'react';
import { useStateValue } from '../StateProvider';
import AllPetitions from './AllPetitions';
import { Box, Center, Text, VStack, HStack, Image, Spacer } from '@chakra-ui/react'
import Banner_img from '../assets/banner.svg'

const LandingPage = props => {
    const [state, dispatch] = useStateValue();
    return (
        <>
            
        {
            (state.web3 == undefined || state.web3 == null)?
            <>
                <Box
                    bg="brand.mainBG"
                    margin='3vh 30px'
                    h='85vh'
                    borderRadius='30px'
                    p="0px"
                >
                <HStack h="100%">
                    <Center
                        fontSize='banner'
                        fontWeight='bold'
                        w='40vw'
                        h='80vh'
                        margin='0px 0px'
                    >

                    <VStack alignItems='left' fontFamily={"heading"} fontSize={"5vw"}>
                        <HStack>
                        <Text as='span' mr='12px' color='brand.darkBlue' >
                        Change
                        </Text>
                        <Text as='span'>
                        is the
                        </Text>
                        </HStack>
                        <HStack>
                        <Text as='span' mr='12px'>
                        only
                        </Text>
                        <Text as='span' color='brand.darkBlue'>
                        Constant
                        </Text>
                        </HStack>

                    </VStack>
                    
                    </Center>
                    <Spacer/>
                    <VStack alignContent={"bottom"}  m="0px" p="0px">
                        <Spacer/>
                        <Image src={Banner_img} h={"35vw"} />
                    </VStack>
                    
                    </HStack>
                </Box>

            </>
            :
            <> <AllPetitions /> </>
        }
        </>
    )
}



export default LandingPage