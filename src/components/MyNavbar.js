// 0 for home, 1 form to start petition, 2 view petitions by user, 3 profile info
import {React, useState} from 'react';
import { Avatar, Button, Center, Flex, Stack, useDisclosure, Box, Image, Input, Heading, Text, HStack, Spacer } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
  import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import metamask from "../assets/metamask.svg"
import coinbase from "../assets/coinbase.svg"
import WalletButtons from './WalletButtons';
import unstop from '../assets/unstop.png';
import {  useWeb3React } from '@web3-react/core'
import Web3 from "web3";
import { abi } from "../contract/petition";
import {CoinbaseWallet, Injected} from "../components/wallet/Connector"
import { useStateValue } from '../StateProvider';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react'

import wallet_img from '../assets/wallet.gif';
import { uploadUserData } from '../util/ipfs';
import {Link} from 'react-router-dom';
import { background } from 'ui-box';
import Logo from '../assets/Logo.png'

function MyNavbar(props){
    const { active, account, library, connector, activate, deactivate } = useWeb3React();
    const [state, dispatch] = useStateValue();
    const [contract, setContract] = useState();
    const [web3, setWeb3] = useState();
    const [acc, setAcc] = useState();
    const [profileInfo,setProfileInfo] = useState();
    const [bioInfo,setBioInfo] = useState();
    const [loading, setLoading] = useState("");

    const userExist = async (param_contract, param_account)=>{
        var exists = false;
        console.log("Account in USER EXIST",param_account);
        try {
            var a = parseInt(param_account, 16);
            exists = await param_contract.methods.userExists(param_account).call({from:param_account});
        } catch (error) {
            console.log(error);            
        }
        console.log(exists);
        // return exists;
        var exist_val = (exists)? 1: 0;
        await dispatch({
            type: "setUserExists",
            payload: {
                userExists: exist_val
            },
        });

    }

    const onProfileChange = (e) => {
        let inputValue = e.target.value;
        setProfileInfo(inputValue);
    }
    const onBioChange = (e) => {
        let inputValue = e.target.value;
        setBioInfo(inputValue);
    }


    const callDispatch = async () => {
        // call uploadUserData
        setLoading("Uploading");
        if(state.userExists == 0){
            const userInfoURL = await uploadUserData(acc,profileInfo,bioInfo);
            console.log(acc);
            await contract.methods.addUser(acc,userInfoURL).send({from:acc});
        }
        try{
            await dispatch({
                type: "setContract",
                payload: {
                    
                  contract: contract,
                },
              });
            await dispatch({
                type: "setWeb3",
                payload: {
                  web3: web3,
                },
              });
              await dispatch({
                type: "setAccount",
                payload: {
                  account:acc,
                },
              });
        }
        catch(ex){
            console.log(ex);
        }
        setLoading("");
       
    } 

    async function connect(wallet_id) {
        
        if(wallet_id == 1) {
            setLoading("Login with Coinbase");
            try {
                await activate(CoinbaseWallet);
                const temp_web3 = new Web3( CoinbaseWallet.provider);
                const cntrct = new temp_web3.eth.Contract(abi, process.env.REACT_APP_CONTRACT_ADDRESS);
                
                const tempAcc = await CoinbaseWallet.getAccount();
                console.log("temp ACC",tempAcc);
                setWeb3(temp_web3);
                setAcc(tempAcc);
                setContract(cntrct);
                userExist(cntrct,tempAcc);
                
            } catch (ex) {
                console.log(ex)
            }
        }
        else {
            setLoading("Login with Metamask");
            try {
                // console.log('CALLING ACTIVATE FOR INJECTED WALLET');
                await activate(Injected);
                // const tw3 = new Web3( (await Injected.getProvider()));//.providerMap.get("MetaMask"));
                const tw3 = new Web3( (await Injected.getProvider()).providerMap.get("MetaMask"));
                const cntrct = new tw3.eth.Contract(abi, process.env.REACT_APP_CONTRACT_ADDRESS);
                const tempAcc = await Injected.getAccount();
                console.log("temp ACC",tempAcc);
                
                setWeb3(tw3);
                setContract(cntrct);
                setAcc(tempAcc);
                userExist(cntrct,tempAcc);
                
                
            } catch (ex) {
                console.log(ex)
            }
        }
        setLoading("");

    }
        
    async function disconnect() {
        try {
            deactivate()
        } catch (ex) {
            console.log(ex)
        }
    }





    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <Flex
            bgColor="brand.navbarBG"
            minH='80px'
            maxH='100px'
            h='9vh'
            p="30px 70px"
            borderBottom="1px"
            borderColor="brand.mainBG"
            style={{boxShadow: "0 2px 6px 0 #efe8fe"}}
            // style={{height:60, backgroundColor:'lightcyan'}}
        >
            {/* Insert LOGO */}
            
            <Center>
                <Link to="/">
                        <Image src={Logo} h={"3.4vw"} p="0px" m="0px"></Image>
                </Link>
            </Center>
            <Center>
                <Link to="/">
                    <Text pl="20px" fontWeight="700" fontSize={'logo'}>ChangeWay</Text>
                </Link>
            </Center>
            

            <Center flex='1' >
                <Stack direction='row' spacing={10} fontFamily="heading">
                        <Link to={`/`}>
                            <Button colorScheme='black' variant='ghost' onClick={() => {}} fontSize="navbar">
                                Home
                            </Button>
                        </ Link >

                        {
                            active?
                            <>
                                <Link to={`/startPetition`}>
                                    <Button colorScheme='black' variant='ghost' onClick={() => {} } fontSize="navbar">
                                        Start Petition
                                    </Button>
                                </Link>
                                <Link to={`/myPetitions`}>
                                    <Button colorScheme='black' variant='ghost' onClick={() => {} } fontSize="navbar">
                                        My Petitions
                                    </Button>
                                </Link>
                            </>
                            :
                            <>
                                <Link to={`/about`}>
                                    <Button colorScheme='black' variant='ghost' onClick={() => {} } fontSize="navbar">
                                        About Us
                                    </Button>
                                </Link>
                            </>
                        }

                </Stack>
            </Center>
            <Center>
                {
                    state.account ?
                    // access name somehow
                    <Link to={`/profile`}>
                    <Button colorScheme='teal' variant='ghost' onClick={() => {}}>
                            <Avatar size='sm' ></Avatar>
                    </Button>
                    </Link>
                    :
                    <>
                        <Button
                            bgColor='black'
                            color='brand.fontLight'
                            borderRadius='buttonRadius'
                            border="2px"
                            borderColor="white"
                            fontFamily={"heading"}
                            p='25px 25px' variant='solid'
                            onClick={() => onOpen() }
                            _hover={{
                                background: "brand.navbarBG",
                                color: "brand.fontDark",
                                border: "2px",
                                borderColor: "black",
                                margin: "0px",
                              }}
                        >
                            Login / Signup
                        </Button>
                        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />

                                <>
                                     <ModalContent maxH="450px" borderRadius="modalRadius" p="20px 30px 30px 30px">
                                    <ModalHeader >
                                        <Center fontSize="30px" fontWeight="700" fontFamily='heading'>
                                            {
                                            (state.userExists != 1)?<Text>Let's get started</Text>:<Text>Use this Wallet?</Text>
                                            }
                                        </Center>
                                    </ModalHeader>
                                    <ModalCloseButton />
                                    <Center>
                                    <ModalBody  w={"100%"} m="0px" p="0px">
                                        <Center >
                                        <Stack  maxH={"280px"} h={"40vh"} w={"100%"} justifyContent="space-around" p="0px">
                                    
                                            {
                                                (state.userExists == -1 )?
                                                    <>
                                                        
                                                            <Stack w={"100%"}>
                                                            <Center>
                                                        <WalletButtons onclick={()=>{connect(0)}} icon={metamask} loading={loading} text={"Login with Metamask"} size={"3.5vh"}/>
                                                        </Center>
                                                        <Center>
                                                        <WalletButtons onclick={()=>{connect(1)}} icon={coinbase} loading={loading} text={"Login with Coinbase"} size={"6vh"}/>
                                                        </Center>
                                                        <Center>
                                                        <WalletButtons onclick={()=>{console.log("unstop")}} icon={unstop} text={"Login with Unstop"} size={"4vh"} />
                                                        </Center>
                                                        </Stack>
                                                        
                                                    </>
                                                :(
                                                    (state.userExists == 0 )?
                                                    <>
                                                        <FormControl>
                                                            <FormLabel>Profile Name</FormLabel>
                                                            <Input type='Profile Name ' onChange={onProfileChange}/>
                                                            <FormHelperText>We'll never share your email.</FormHelperText>
                                                            <FormLabel>Bio</FormLabel>
                                                            <Input type='Bio' onChange={onBioChange}/>
                                                            <FormHelperText>Tell us about yourself</FormHelperText>
                                                        </FormControl>
                                                        <Button 
                                                                            bgColor='brand.buttonBG'
                                                                            color='brand.fontLight'
                                                                            border='2px'
                                                                            borderRadius='buttonRadius'
                                                                            p='25px 25px' 
                                                                            variant='solid'
                                                                            onClick={() => callDispatch()}
                                                                            _hover={{
                                                                                background: "brand.mainBG",
                                                                                color: "brand.fontDark",
                                                                                border: "2px",
                                                                                borderColor: "brand.buttonHover",
                                                                              }}
                                                                              isLoading={loading != ""}
                                                                            >
                                                                            Continue
                                                                        </Button>
                                                    </>
                                                    :
                                                    <>
                                                            <Stack w={"100%"} maxH={"250px"} h={"30vh"} >
                                                                <Center>
                                                                
                                                                    <Image h={"14vh"} src={wallet_img} />
                                                                </Center>
                                                                <Center>
                                                                <Card borderRadius="addressRadius" borderWidth="1px" borderColor="brand.mainBG" w={"100%"} maxH="70px">
                                                                        <></>
                                                                        <HStack w={"100%"} p="10px">
                                                                            <Avatar size="sm" margin="0px 0px 0px 5px"></Avatar>
                                                                            <Spacer/>
                                                                            {(acc)?<Text align='center' fontSize="14px" margin="0px 0px 0px 5px">
                                                                                {acc}
                                                                            </Text>:<></>}

                                                                        </HStack>


                                                                
                                                                </Card>
                                                                </Center>
                                                                <Center>
                                                                        <Button 
                                                                            bgColor='brand.buttonBG'
                                                                            color='brand.fontLight'
                                                                            border='2px'
                                                                            borderRadius='buttonRadius'
                                                                            p='25px 25px' 
                                                                            mt='15px'
                                                                            variant='solid'
                                                                            onClick={() => callDispatch()}
                                                                            _hover={{
                                                                                background: "brand.mainBG",
                                                                                color: "brand.fontDark",
                                                                                border: "2px",
                                                                                borderColor: "brand.buttonHover",
                                                                              }}
                                                                            >
                                                                            Continue
                                                                        </Button>
                                                                    </Center>


                                                                    
                                                                
                                                            </Stack>
                                                    </>
                                                )
                                            }
                                       
                                        
                                        </Stack>
                                        </Center>
                                    </ModalBody>
                                    </Center>
                                    </ModalContent>
                                </>
                        </Modal>
                        {/* <Button colorScheme='teal' variant='ghost' onClick={() => props.connectWallet(0) }>
                            Connect a wallet
                        </Button>
                        <Button colorScheme='teal' variant='ghost' onClick={() => props.connectWallet(1) }>
                            Coinbase wallet
                        </Button> */}
                    </>

                }
                
            </Center>
        </Flex>
    );
}

export default MyNavbar;