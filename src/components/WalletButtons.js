import { Box, Image, Button, Flex, Text, Spacer,Center } from "@chakra-ui/react";
import {useStateValue} from "../StateProvider";
function WalletButtons(props){
    const [state, dispatch] = useStateValue();
    return (<>
    
    <Button 
        colorScheme='black' 
        // sx={{background: "brand.mainBG"}}
        _hover={{
            background: "brand.mainBG",
            color: "brand.fontDark",
          }} 
        variant="outline" 
        borderRadius="walletRadius" 
        m="3px 0px"
        height="walletButton"
        padding="0px"
        leftIcon={
            <Image src={props.icon} height={props.size || "walletButtonImage"} width={props.size || "walletButtonImage"} ></Image>
        } 
        onClick={props.onclick} isLoading={props.loading==props.text} loadingText={"Linking"}>
                {/* <Box >
                    <Center>
                        <Image src={props.icon} height={props.size || "walletButtonImage"} width={props.size || "walletButtonImage"} ></Image>
                    </Center>

                </Box> */}

                    {/* <Text color="black"> */}
                        {props.text}
                        {/* </Text> */}


        </Button>
    
    </>);
}

export default WalletButtons;