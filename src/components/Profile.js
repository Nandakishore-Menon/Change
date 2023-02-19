import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardBody, CardFooter, Heading, Text, Button, Center, Avatar, Spacer, HStack, VStack, List, Grid } from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Image } from '@chakra-ui/react'
import { BellIcon, CheckCircleIcon, SettingsIcon } from '@chakra-ui/icons';
import { useStateValue } from '../StateProvider';
import axios from 'axios';
import Moralis from 'moralis';
import { EvmChain } from '@moralisweb3/evm-utils';
import { Network, Alchemy } from "alchemy-sdk";
import badge from '../assets/badge.png'
import { borderRadius } from 'ui-box';
import { useNavigate } from 'react-router-dom';



const Profile = (props) => {
    const [state, dispatch] = useStateValue();
    const [profile, setProfile] = useState();
    const [nfts, setNfts] = useState([]);
    const navigate = useNavigate();

    const getData = async (tokenId) => {
        try {
            const settings = {
                apiKey: `${process.env.REACT_APP_ALCHEMY_API_KEY}`, // Replace with your Alchemy API Key.
                network: Network.MATIC_MUMBAI, // Replace with your network.
              };
              
              const alchemy = new Alchemy(settings);
              
              // Print NFT metadata returned in the response:
              const metadata = await alchemy.nft.getNftMetadata(
                `${process.env.REACT_APP_NFT_CONTRACT_ADDRESS}`,
                tokenId
              );
              const data = await axios.get(metadata.rawMetadata.metadataHash)
              return data.data;
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(()=> {
        
        console.log("profile", state.profile)
        
        const temp = async () => {
            var metadata_arr = []
            await state.nftsOwned.map(async (nft_id)=>{
                const met = await getData(nft_id);
                // console.log("met", met)
                metadata_arr.push(met)
                setNfts([...metadata_arr])
            })
            
            console.log(nfts);
        }
        temp();
        
    }, []);
    // useEffect(()=>{
    //     const set_pet = async () =>{
    //         const get_profile = async () => {
    //             console.log("methods in contract",state.contract.methods);
    //             const user = await state.contract.methods.getUser(state.account).call({from:state.account});
    //             console.log(user);
    //             axios(user.userHash).then(
    //                 async (response) => {
    //                     setProfile(await response.data);
    //                     console.log('response', response.data.image)
    //                 }
    //             );
    //         }
    //         await get_profile();
    //     }
    //     set_pet();

    // }, []);


    
    return (
        <>
        {
            (state.profile) ?
            <>
            <Center>
                <Card align='center' h={"50%"} w={"50%"} mt={'8vh'}>
                <CardBody >
                    <VStack justifyContent={'space-between'}>
                    <Center>
                    <Avatar boxSize={20} src={state.profile.image}/>
                    </Center>

                    <Center>
                        <Heading size='md'> {state.profile.profile}</Heading>
                    </Center>
                    <Spacer/>
                    <Center>
                        <Text size='md'> {state.profile.bio}</Text>
                    </Center>
                    </VStack>
                    
                </CardBody>
                <CardFooter>
                </CardFooter>
            </Card>
            </Center>
            <Center>
            <Tabs mt={"2vh"} w={"100%"} variant='soft-rounded' colorScheme={'purple'}>
                <TabList>
                <Spacer/>
                    <Tab><HStack><CheckCircleIcon/> <Text>My NFTS</Text></HStack></Tab>
                    <Spacer/>
                    <Tab><HStack><SettingsIcon/> <Text>App Settings</Text></HStack></Tab>
                    
                    <Spacer/>
                </TabList>
                <TabPanels>
                    <TabPanel>
                    
                    <Grid templateColumns='repeat(5, 1fr)' gap={6} mt='4vh' ml='8vw'>
                    {(!nfts.empty)?(nfts.map((metadata, index) => {
                        console.log("nfts", metadata)
                        return (
                            <Card borderRadius='15px'>
                                <CardBody >
                                    <VStack>
                                        <Text fontFamily={"heading"} fontSize={'1.7vw'} fontWeight='700'>{metadata.title}</Text>
                                        {/* <Image src={metadata.image} borderRadius='15px'></Image> */}
                                        <Image w={'12'} src={badge}></Image>
                                        <p align='center'> Created on {metadata.time}</p>
                                    </VStack>

                                </CardBody>
                                <CardFooter>

                                </CardFooter>
                            </Card>
                        );
                    })):(<></>)}
                    </Grid>
                    </TabPanel>
                    <TabPanel>
                        <Center mt='20vh'>
                        <Button bgColor="brand.buttonBG" color={'white'} onClick={async () => {
                            console.log(state.web3)
                            // state.web3.eth.currentProvider.disconnect();
                            await dispatch({
                                type: "setWeb3",
                                payload: {
                                  web3: null,
                                },
                              });
                            await dispatch({
                                type: "setAccount",
                                payload: {
                                  account: null,
                                },
                              });
                              await dispatch({
                                type: "setUserExists",
                                payload: {
                                    userExists: null,
                                },
                              });
                              await dispatch({
                                type: "setProfile",
                                payload: {
                                    profile: null,
                                },
                              });
                              state.disconnect();
                            navigate("/");

                        }} borderRadius={'buttonRadius'} >Logout</Button>
                        </Center>
                    </TabPanel>
                </TabPanels>
            </Tabs>
            </Center>
            </>
        :<></>
        }
        </>
    );
}


export default Profile