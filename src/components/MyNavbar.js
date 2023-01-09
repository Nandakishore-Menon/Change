// 0 for home, 1 form to start petition, 2 view petitions by user, 3 profile info
import {React, useState} from 'react';
import { FileUploader, FileCard} from "evergreen-ui";

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
import { nft_abi } from "../contract/nft";
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
import { Uauth } from '../components/wallet/Connector';
import Notifications from './Notifications';
import { Buffer } from 'buffer';
import { FilePicker } from 'evergreen-ui';
import {base64} from '../util/ipfs'

function MyNavbar(props){
    const { active, account, library, connector, activate, deactivate } = useWeb3React();
    const [state, dispatch] = useStateValue();
    const [contract, setContract] = useState();
    const [NFTContract, setNFTContract] = useState();
    const [web3, setWeb3] = useState();
    const [acc, setAcc] = useState();
    const [profileInfo,setProfileInfo] = useState();
    const [bioInfo,setBioInfo] = useState();
    const [loading, setLoading] = useState("");
    const [usingUnstoppable, setUsingUnstoppable ] = useState(false);
    const [image, setImage] = useState();

    let handleRemove = (e) => {
        setImage(undefined);
        // console.log("IMAGE:\n",image);
    }

    let handleImageChange = async (e) => {
        let inputValue = e;
        console.log(e);
        setImage(inputValue);
        base64(inputValue[0]).then((base)=>{
            console.log(base);
        })
    }

    const userExist = async (param_contract, param_account)=>{
        var exists = false;
        console.log("Account in USER EXIST",param_account);
        try {
            // var a = parseInt(param_account, 16);
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
            const b64image = await base64(image[0]);
            console.log("Image:",b64image);
            const userInfoURL = await uploadUserData(acc,profileInfo,bioInfo, b64image);
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
            type: "setNFTContract",
            payload: {
                
                nft_contract: NFTContract,
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

                // const url = process.env.REACT_APP_NODE_URL;
                // const username = process.env.REACT_APP_NODE_USERNAME;
                // const password = process.env.REACT_APP_NODE_PASSWORD;

                // // Create base64 string of project credentials
                // const string = `${username}:${password}`;
                // const base64String = Buffer.from(string).toString("base64");

                // Options
                // const options = {
                // keepAlive: true,
                // withCredentials: true,
                // timeout: 20000, // ms
                // headers: [
                //     {
                //         name: 'Authorization',
                //         value: `Basic ${base64String}`
                //     },
                // ]
                // };

                // Create web3 node provider using project credentials
                // const web3Provider = await new Web3.providers.HttpProvider(url, options);
                // console.log(await web3Provider);
                const temp_web3 = new Web3( CoinbaseWallet.provider);
                // const temp_web3 = await new Web3( web3Provider);
                console.log(await temp_web3);
                const cntrct = new temp_web3.eth.Contract(abi, process.env.REACT_APP_CONTRACT_ADDRESS);
                const nft_cntrct = new temp_web3.eth.Contract(nft_abi, process.env.REACT_APP_NFT_CONTRACT_ADDRESS);
                
                // const tempAcc = await CoinbaseWallet.getAccount();
                const tempAcc = await temp_web3.eth.getAccounts();
                console.log("temp ACC",tempAcc);
                setWeb3(temp_web3);
                setAcc(tempAcc[0]);
                setContract(cntrct);

                setNFTContract(nft_cntrct);
                userExist(cntrct,tempAcc[0]);
                
            } catch (ex) {
                console.log(ex)
            }
        }
        else if(wallet_id== 0) {
            setLoading("Login with Metamask");
            try {
                // console.log('CALLING ACTIVATE FOR INJECTED WALLET');
                await activate(Injected);
                // const tw3 = new Web3( (await Injected.getProvider()));//.providerMap.get("MetaMask"));
                const tw3 = new Web3( (await Injected.getProvider()).providerMap.get("MetaMask"));
                const cntrct = new tw3.eth.Contract(abi, process.env.REACT_APP_CONTRACT_ADDRESS);
                const nft_cntrct = new tw3.eth.Contract(nft_abi, process.env.REACT_APP_NFT_CONTRACT_ADDRESS);

                const tempAcc = await Injected.getAccount();
                console.log("temp ACC",tempAcc[0]);
                
                setWeb3(tw3);
                setContract(cntrct);
                setNFTContract(nft_cntrct);

                setAcc(tempAcc[0]);
                
                userExist(cntrct,tempAcc[0]);
                
                
            } catch (ex) {
                console.log(ex)
            }
        }
        else {
            setLoading("Login with Unstoppable");
            try {
                const authorization = await Uauth.loginWithPopup()
                console.log(authorization)
                const profileName = authorization.idToken.name;
                const profileDescription = authorization.idToken.description;
                const profilePicture = authorization.idToken.picture;
                const profileDomain = authorization.idToken.profile;

                await setProfileInfo(await authorization.idToken.name);
                await setBioInfo(await authorization.idToken.description);
                // console.log(profileDescription);
                // console.log(profileName);
                // console.log("profileInfo ",profileInfo);
                // console.log("bioInfo ",bioInfo);

                await window.ethereum.enable();
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                // const account = accounts[0];
                console.log(accounts)
                const tw3 = new Web3( await window.ethereum.providers[0]);
                const cntrct = await (new tw3.eth.Contract(abi, process.env.REACT_APP_CONTRACT_ADDRESS));
                const nft_cntrct = new tw3.eth.Contract(nft_abi, process.env.REACT_APP_NFT_CONTRACT_ADDRESS);

                const tempAcc = await accounts[0];
                console.log(tw3);
                console.log(cntrct);
                console.log(tempAcc);
                await setWeb3(tw3);
                await setContract(cntrct);
                await setNFTContract(nft_cntrct);

                await setAcc(accounts[0]);
                console.log("acc", acc);
                console.log("web3",web3);
                console.log("contract",contract);
                setUsingUnstoppable(true);
                console.log(usingUnstoppable);

                userExist(cntrct,tempAcc);
                if(state.userExists == 1){
                    callDispatch();
                }
                else {
                    
                    const userInfoURL = await uploadUserData(tempAcc,profileName,profileDescription);
                    console.log(acc);
                    await cntrct.methods.addUser(tempAcc,userInfoURL).send({from:tempAcc});
                    
                    await dispatch({
                        type: "setUserExists",
                        payload: {
                            userExists: 1,
                        },
                    });
                    // await dispatch({
                    //     type: "setUserExists",
                    //     payload: {
                    //         userExists: 1,
                    //     },
                    // });
                    await dispatch({
                        type: "setContract",
                        payload: {
                            
                          contract: cntrct,
                        },
                      });
                    await dispatch({
                        type: "setWeb3",
                        payload: {
                          web3: tw3,
                        },
                      });
                      await dispatch({
                        type: "setAccount",
                        payload: {
                          account:tempAcc,
                        },
                      });
                    // await callDispatch();

                }
                
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
                <Stack direction='row' spacing={10} fontFamily="navbar" fontWeight="bold">
                        

                        {
                            active || usingUnstoppable?
                            <>
                                <Link to={`/`}>
                                <Button colorScheme='black' variant='ghost' onClick={() => {}} fontSize="navbar">
                                    Home
                                </Button>
                            </ Link >
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
                                {/* <Link to={`/about`}>
                                    <Button colorScheme='black' variant='ghost' onClick={() => {} } fontSize="navbar">
                                        About Us
                                    </Button>
                                </Link> */}
                            </>
                        }

                </Stack>
            </Center>
            <Center>
                {
                    state.account ?
                    // access name somehow
                    <>
                    <Notifications/>
                    <Link to={`/profile`}>
                    <Button colorScheme='teal' variant='ghost' onClick={() => {}}>
                            <Avatar size='sm' ></Avatar>
                    </Button>
                    </Link>
                    
                    </>
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
                                     <ModalContent maxH="500px" borderRadius="modalRadius" p="20px 30px 30px 30px">
                                    <ModalHeader >
                                        <Center fontSize="30px" fontWeight="700" fontFamily='heading'>
                                            {
                                            (state.userExists != 1)?<Text>Let's get started</Text>:<Text>Use this Wallet?</Text>
                                            }
                                        </Center>
                                    </ModalHeader>
                                    <ModalCloseButton />
                                    <Center>
                                    <ModalBody  w={"120%"} m="0px" p="0px">
                                        <Center >
                                        <Stack  maxH={"380px"} h={"50vh"} w={"100%"} justifyContent="space-around" p="0px">
                                    
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
                                                        <WalletButtons onclick={()=>{connect(2)}} icon={unstop} text={"Use Unstoppable profile"} size={"4vh"} />
                                                        </Center>
                                                        </Stack>
                                                        
                                                    </>
                                                :(
                                                    (state.userExists == 0 )?
                                                    <>
                                                        <FormControl>
                                                            <FormLabel>Profile Name</FormLabel>
                                                            <Input type='Profile Name ' onChange={onProfileChange} mb={'10px'}/>
                                                            <FormLabel>Bio</FormLabel>
                                                            <Input type='Bio' onChange={onBioChange} />
                                                            <FormHelperText mb={'20px'}>Tell us about yourself</FormHelperText>
                                                            <Text>Profile picture</Text>


                                                            {/* <FileUploader
                                                                label="Upload File"
                                                                description="Accepted types: jpg, jpeg, png. You can upload 1 file (up to 50 MB)."
                                                                maxSizeInBytes={50 * 1024 ** 2}
                                                                maxFiles={1}
                                                                onChange={handleImageChange}
                                                                type="image"
                                                                acceptedMimeTypes={"[image/png, image/jpg, image/jpeg]"}
                                                                renderFile={(file) => {
                                                                    const { name, size, type } = file
                                                                    const { message } = (size < 50 * 1024 ** 2) ? `Image of size ${size} bytes uploaded` :"File too large";
                                                                    return (
                                                                    <FileCard
                                                                        key={name}
                                                                        isInvalid={size > 50 * 1024 ** 2}
                                                                        name={name}
                                                                        onRemove={handleRemove}
                                                                        sizeInBytes={size}
                                                                        type={type}
                                                                        validationMessage={message}
                                                                    />
                                                                    )
                                                                }}
                                                                values={image}
                                                            /> */}





                                                            <FilePicker  height={40} name='Profile picture' width={'100%'} onChange={(file) => setImage(file)} placeholder="Select an image!" />
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