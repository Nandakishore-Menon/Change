import { Box, Image, Button, Flex, Text, Spacer,Center } from "@chakra-ui/react";
function WalletButtons(props){
    return (<>
    
    <Button colorScheme='teal' variant="outline"
        // leftIcon={} 
        onClick={props.onclick}>
                <Box >
                    <Center>
                        <Image src={props.icon} height={props.size||"3vh"} width={props.size||"3vh"}></Image>
                    </Center>
                    {/* <Spacer></Spacer> */}
                </Box>
                <Center>
                    <Text flex='1' color="black">{props.text}</Text>
                </Center>

        </Button>
    
    </>);
}

export default WalletButtons;