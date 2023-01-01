// 0 for home, 1 form to start petition, 2 view petitions by user, 3 profile info
import {React} from 'react';
import { Avatar, Button, Center, Flex, Stack, useDisclosure, Box } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
import metamask from "../assets/metamask.svg"
import coinbase from "../assets/coinbase.svg"
import WalletButtons from './WalletButtons';
import unstop from '../assets/ud.svg';
import {  useWeb3React } from '@web3-react/core'
import Web3 from "web3";
import { abi } from "../contract/petition";
import {CoinbaseWallet, Injected} from "../components/wallet/Connector"
import { useStateValue } from '../StateProvider';



function Navbar(props){
    const { active, account, library, connector, activate, deactivate } = useWeb3React();
    const [state, dispatch] = useStateValue()
    async function connect(wallet_id) {

        if(wallet_id == 1) {
            try {
                // console.log('CALLING ACTIVATE FOR COINBASE');
                // await activate(CoinbaseWallet)
                await activate(CoinbaseWallet);
                console.log("coinbase wallet",CoinbaseWallet.provider);
                // const temp_web3 = new Web3((await Injected.getProvider()).providerMap.get("CoinbaseWallet"));
                const temp_web3 = new Web3( CoinbaseWallet.provider);
                console.log("TempWEB3",temp_web3)
                // const account = await Injected.getAccount();
                const account = await CoinbaseWallet.getAccount();
                const cntrct = new temp_web3.eth.Contract(abi, process.env.REACT_APP_CONTRACT_ADDRESS);
                console.log("CONTRACT",cntrct);
                console.log("library:",library);
                // try {
                //     await library.provider.request({
                //       method: "wallet_switchEthereumChain",
                //       params: [{ chainId: "5" }],
                //     });
                // } catch (switchError) {
                //     console.log("Switch Error",switchError);
                // }


                // console.log("ADDRESS: ",await CoinbaseWallet.getAccount());
                await dispatch({
                    type: "setContract",
                    payload: {
                        
                      contract: cntrct,
                    },
                  });
                await dispatch({
                    type: "setWeb3",
                    payload: {
                      web3: temp_web3,
                    },
                  });
                  await dispatch({
                    type: "setAccount",
                    payload: {
                      account:account,
                    },
                  });
                
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
                await dispatch({
                    type: "setWeb3",
                    payload: {
                      web3: tw3,
                    },
                  });

                  await dispatch({
                    type: "setContract",
                    payload: {
                      contract: cntrct,
                    },
                  });
                  await dispatch({
                    type: "setAccount",
                    payload: {
                      account: await Injected.getAccount(),
                    },
                  });
                
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
                        <Button colorScheme='teal' variant='ghost' onClick={() => props.onClickFunction(0) }>
                            Home
                        </Button>
                        
                        {
                            active?
                            <>
                                <Button colorScheme='teal' variant='ghost' onClick={() => props.onClickFunction(1) }>
                                    Start Petition
                                </Button>
                                <Button colorScheme='teal' variant='ghost' onClick={() => props.onClickFunction(2) }>
                                    My Petitions
                                </Button>
                            </>
                            :
                            <>
                                <Button colorScheme='teal' variant='ghost' onClick={() => {console.log("Asking About us hehe")} }>
                                    About Us                                
                                </Button>
                            </>
                        }
                            
                </Stack>
            </Center>
            <Center>
                {
                    active ? 
                    <Button colorScheme='teal' variant='ghost' onClick={() => props.onClickFunction(3) }>
                            <Avatar size='sm' ></Avatar>
                    </Button>
                    : 
                    <>
                        <Button colorScheme='teal' variant='ghost' onClick={() => onOpen() }>
                            Login/Signup
                        </Button>
                        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent>
                            <ModalHeader>
                                <Center>
                                LOGIN/SIGN-UP
                                </Center>
                            </ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Stack>
                                {/* <Button colorScheme='blue' leftIcon={} onClick={()=>console.log("metamask")}>Metamask Wallet</Button>  */}
                                <WalletButtons onclick={()=>{connect(0)}} icon={metamask} text={"Login with Metamask"}/>
                                <WalletButtons onclick={()=>{connect(1)}} icon={coinbase} text={"Login with Coinbase"} size={"4vh"}/>
                                <WalletButtons onclick={()=>{console.log("unstop")}} icon={unstop} text={"Login with Unstop"} size={"10vh"}/>
                                {/* {/* <Button colorScheme='blue' leftIcon={<svg src="../assets/coinbase.svg"></svg>}  onClick={()=>console.log("CoinBase")}>CoinBase</Button> */}
                                {/* <Box as='button' borderRadius='md'  color='white' onClick={()=>{console.log("metamask_box")}}>
                                    <img src={metamask} height="50vh" width="50vh"/>
                                    Button
                                </Box> */}
                                </Stack>
                            </ModalBody>

                            <ModalFooter>
                                
                            </ModalFooter>
                            </ModalContent>
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

export default Navbar;