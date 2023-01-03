// 0 for home, 1 form to start petition, 2 view petitions by user, 3 profile info
import {React, useState} from 'react';
import { Avatar, Button, Center, Flex, Stack, useDisclosure, Box, Image, Input, Heading, Text } from '@chakra-ui/react'
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
import unstop from '../assets/ud.svg';
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

function MyNavbar(props){
    const { active, account, library, connector, activate, deactivate } = useWeb3React();
    const [state, dispatch] = useStateValue();
    const [contract, setContract] = useState();
    const [web3, setWeb3] = useState();
    const [acc, setAcc] = useState();
    const [profileInfo,setProfileInfo] = useState();
    const [bioInfo,setBioInfo] = useState();

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
       
    } 

    async function connect(wallet_id) {

        if(wallet_id == 1) {
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
            try {
                // console.log('CALLING ACTIVATE FOR INJECTED WALLET');
                await activate(Injected);
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
        <Flex flex='1' style={{height:60, backgroundColor:'lightcyan'}}>
            {/* Insert LOGO */}
            <Center flex='1'>
                <Stack direction='row' spacing={10} >
                        <Link to={`/`}>
                            <Button colorScheme='teal' variant='ghost' onClick={() => {}}>
                                Home
                            </Button>
                        </ Link >
                        
                        {
                            active?
                            <>
                                <Link to={`/startPetition`}>
                                    <Button colorScheme='teal' variant='ghost' onClick={() => {} }>
                                        Start Petition
                                    </Button>
                                </Link>
                                <Link to={`/myPetitions`}>
                                    <Button colorScheme='teal' variant='ghost' onClick={() => {} }>
                                        My Petitions
                                    </Button>
                                </Link>
                            </>
                            :
                            <>
                                <Link to={`/about`}>
                                    <Button colorScheme='teal' variant='ghost' onClick={() => {} }>
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
                        <Button colorScheme='teal' variant='ghost' onClick={() => onOpen() }>
                            Login/Signup
                        </Button>
                        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            
                                <>
                                     <ModalContent>
                                    <ModalHeader>
                                        <Center>
                                        LOGIN/SIGN-UP
                                        </Center>
                                    </ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        <Stack>
                                            {
                                                (state.userExists == -1 )?
                                                    <>
                                                        <WalletButtons onclick={()=>{connect(0)}} icon={metamask} text={"Login with Metamask"}/>
                                                        <WalletButtons onclick={()=>{connect(1)}} icon={coinbase} text={"Login with Coinbase"} size={"4vh"}/>
                                                        <WalletButtons onclick={()=>{console.log("unstop")}} icon={unstop} text={"Login with Unstop"} size={"10vh"}/>
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
                                                    </>
                                                    :
                                                    <>
                                                        <Card
                                                            // direction={{ base: 'column', sm: 'row' }}
                                                            // overflow='hidden'
                                                            variant='outline'
                                                        >

                                                            <Stack>
                                                                <CardBody>
                                                                <Center>
                                                                    <Heading size='md'>Use this wallet?</Heading>
                                                                </Center>
                                                                <Center>
                                                                
                                                                    <Image h={20} src={wallet_img} />
                                                                </Center>
                                                                
                                                                {(acc)?<Text>
                                                                    {acc}
                                                                </Text>:<></>}
                                                                </CardBody>

                                                                <CardFooter>
                                                                </CardFooter>
                                                            </Stack>
                                                        </Card>
                                                    </>
                                                )
                                            }
                                       
                                        <Button colorScheme='teal' onClick={() => callDispatch() }>
                                            Use this Wallet
                                        </Button>
                                        </Stack>
                                    </ModalBody>

                                    <ModalFooter>
                                        
                                    </ModalFooter>
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