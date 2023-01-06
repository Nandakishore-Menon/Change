import React from 'react';
import { useStateValue } from '../StateProvider';
import AllPetitions from './AllPetitions';
import { Box, Center, Text, VStack, HStack } from '@chakra-ui/react'


const LandingPage = props => {
    const [state, dispatch] = useStateValue();
    return (
        <>
            
        {
            (state.web3 == undefined || state.web3 == null)?
            <>
                <Box
                    bg="brand.mainBG"
                    margin='10px 30px'
                    h='85vh'
                    borderRadius='40px'
                >
                    <Center
                        fontSize='banner'
                        fontWeight='bold'
                        w='40vw'
                        h='80vh'
                        margin='0px 0px'
                    >

                    <VStack alignItems='left' >
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
                </Box>

            </>
            :
            <> <AllPetitions /> </>
        }
        </>
    )
}



export default LandingPage