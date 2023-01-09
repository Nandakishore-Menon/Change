import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useStateValue } from '../StateProvider';
import { Button, Card, CardBody, CardFooter,Center,Divider,Flex,Heading, Image, Stack, Stat, Tag, TagLabel, Text,StatLabel,
    StatNumber,
    StatHelpText,
    Textarea, Box, HStack, CircularProgress, CircularProgressLabel, Spacer, VStack, Avatar} from "@chakra-ui/react";
import { ChatIcon, ArrowUpIcon } from '@chakra-ui/icons'
import axios from "axios";
import {uploadComment} from '../util/ipfs'

import AllComments from './AllComments';


const FullPetition = props => {
    const {pid} = useParams();
    const [state, dispatch] = useStateValue();
    const [petition, setPetition] = useState();
    const [metadata, setMetadata] = useState();
    const [update, setUpdate] = useState(false);
    const [votes,setVotes] = useState(0);
    const [comment, setComment] = useState("");
    const [dummy, setDummy] = useState(false);
    const [commentFocus, setCommentFocus] = useState(false);
    const [recievedCommentAdded,setRecievedCommentAdded] = useState(false);

    const somethingChanged = () => {
        if(state.contract!=null && state.contract != undefined)state.contract.events.PetitionUpvoted({fromBlock:0}).on(
            'data',
            async (event) => {
                console.log("Recieved Event in FullPetition(PetitionLiked)",event);
                if(petition == null || petition == undefined) {
                    const pet= await state.contract.methods.getPetitionByPid(pid).call({from:state.account});
                    setPetition(pet);
                    axios(pet.petitionHash)
                    .then((response)=>{
                        setMetadata(response.data);
                    });
                    // axios({
                    //     method: 'get',
                    //     url: props.url,
                    //     responseType: 'stream'
                    //   })
                    //     .then(function (response) {
                    //       response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
                    //     });
                    console.log("pet", pet);
                    setVotes(0);
                    setVotes(pet.signedUsersAddress.length);
                }
                else {
                    const petition_count = await state.contract.methods.getVotes(pid).call({from: state.account});
                    setVotes(0);
                    setVotes(petition_count);
                }
            }
        )
    
        
    }

    useEffect(()=>{
        const getPid = async() => {
            if(petition == null || petition == undefined) {
                const pet= await state.contract.methods.getPetitionByPid(pid).call({from:state.account});
                setPetition(pet);
                axios(pet.petitionHash)
                .then((response)=>{
                    setMetadata(response.data);
                });
                // axios({
                //     method: 'get',
                //     url: props.url,
                //     responseType: 'stream'
                //   })
                //     .then(function (response) {
                //       response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
                //     });
                console.log("pet", pet);
                setVotes(pet.signedUsersAddress.length);
            }
            else {
                const petition_count = await state.contract.methods.getVotes(pid).call({from: state.account});
                setVotes(petition_count);
            }
            somethingChanged();
        }
        getPid();
    }, [update])

    const upVote = async () => {
        const response = await state.contract.methods.signPetition(pid).send({from:state.account});
        setUpdate(true);
    }

    const submitComment = async () => {
        // send the data to ipfs 
        const commentURL = await uploadComment(comment,state.account);
        const res = await state.contract.methods.addComment(commentURL,pid).send({from:state.account});
        setComment("");
        setDummy(!dummy);
    }

    return (
        <>
            {
                (petition && metadata)?
                <Box w="70%" m="auto" >
                    <Heading fontFamily="banner" color="brand.heading" fontSize="3.0vw" mb="10px" mt="40px" //ml="13%" mb="25px" mt="40px"
                    >
                        {metadata.title}
                    </Heading>
                    <HStack pb="10px">
                                <Text>
                                Tags:
                                </Text>
                                <HStack>
                                    { (metadata.tags.split(' ')).map((tag, index) => (
                                        <div key={index} style={{padding:"7px 5px 7px 0px",display:'inline-block'}}>
                                            <Tag size='md' key='md' variant='subtle' bgColor='brand.mainBG' >
                                                <TagLabel>{tag}</TagLabel>
                                            </Tag>
                                        </div> 
                                    )) }
                                </HStack>
                            </HStack>
                    <Flex 
                        alignItems={"center"}
                        mb="25px" 
                    >
                        <Avatar 
                            // name={user}
                            src={""} 
                            size="sm"
                            mr="13px"
                        />
                        <Text 
                            fontWeight={"bold"}
                            color="brand.palette3"
                        >
                            Username
                        </Text>
                    </Flex>

                    <HStack alignItems={"top"}>
                        <Box w="65%">
                            <Box w="100%" m="0px 20px 20px 0px" style={{float:"left"}}>
                                <Image 
                                    // padding='20px 0px 0px 0px'
                                    fit='fill'
                                    style={{width:'100%', float:"left"}}
                                    src={metadata.image}
                                    alt='Caffe Latte'
                                />
                            </Box>
                            <Text fontSize={"20px"}>
                                {metadata.content}
                            </Text>
                        </Box>
                        <Spacer/>
                        <VStack>                        
                            <CircularProgress 
                                capIsRound={true} 
                                value={(votes/metadata.target_support)*100} 
                                size='20vw' 
                                color='brand.heading' 
                                trackColor={"brand.mainBG"} 
                                thickness='12px' 
                                mb="15px"
                            >
                                <CircularProgressLabel>
                                    <Flex 
                                        direction='column'
                                        alignItems='center'
                                    >
                                        <Text fontSize='100%' lineHeight='80%'>{votes}</Text>
                                        <Text mt="5px" fontSize='25%'>out of {metadata.target_support}</Text>
                                    </Flex>
                                </CircularProgressLabel>
                            </CircularProgress>
                            <Button
                                bgColor='brand.heading'
                                color='brand.fontLight'
                                borderRadius='buttonRadius'
                                border="2px"
                                borderColor="white"
                                fontFamily={"heading"}
                                p='25px 25px' 
                                variant='solid'
                                onClick={upVote}
                                _hover={{
                                    background: "brand.navbarBG",
                                    color: "brand.heading",
                                    border: "2px",
                                    borderColor: "brand.heading",
                                    // margin: "0px",
                                  }}
                            >
                                Support
                            </Button>

                            {/* <HStack pt="10px">
                                <Text>
                                Tags:
                                </Text>
                                <HStack>
                                    { (metadata.tags.split(' ')).map((tag, index) => (
                                        <div key={index} style={{padding:"7px 5px 7px 0px",display:'inline-block'}}>
                                            <Tag size='md' key='md' variant='subtle' bgColor='brand.mainBG' >
                                                <TagLabel>{tag}</TagLabel>
                                            </Tag>
                                        </div> 
                                    )) }
                                </HStack>
                            </HStack> */}
                        </VStack>
                    </HStack>

                    <Box 
                    //comment section
                        mt="30px"
                        mb="30px"
                        w="85%"
                    > 
                        <Text 
                            fontSize={"2vw"}
                            color="brand.heading"
                            fontWeight={"bold"}
                        >
                            Comments
                        </Text>

                        <Stack mt="20px">
                            <Stack direction={"row"}>
                                <Avatar src={""} size="md"/>
                                <Stack direction={"column"}
                                    // gap="4px"
                                    w="100%"
                                >
                                    <Textarea 
                                        border={"0px"}
                                        // borderBottom="4px"
                                        // borderRadius="0"
                                        focusBorderColor="brand.heading"
                                        borderColor="brand.heading"
                                        placeholder={"Write comment..."}
                                        // resize={"none"}  
                                        value={comment} 
                                        onChange={(e)=>{setComment(e.target.value)}}
                                        onFocus={()=>{setCommentFocus(true)}} 
                                        //onBlur={()=>setCommentFocus(false)}
                                    ></Textarea>
                                    {
                                        (commentFocus)?
                                        <Button 
                                            bgColor='brand.heading'
                                            // colorScheme={"black"}
                                            color='brand.fontLight'
                                            border='2px'
                                            // width="6vw"
                                            borderRadius='buttonRadius'
                                            variant='solid'
                                            // disabled={titleValue == ""}
                                            m="0px"
                                            p="20px"
                                            w="85px"
                                            _hover={{
                                                background: "white",
                                                color: "brand.heading",
                                                borderColor: "brand.heading",
            
                                            }}
                                            isDisabled={comment==""}
                                            onClick={submitComment}
                                        >
                                            Post
                                        </Button>:<></>
                                    }
                                </Stack>
                            </Stack>
                            <Center>
                                <AllComments dummy={dummy} petitionID={pid}></AllComments>
                            </Center>
                        </Stack>
                    </Box>
                </Box>
                : <></>
            }

            {/* {
                (petition && metadata)?
           <Card
            overflow='hidden'
            variant='outline'
            >
                
                <Stack>
                      
                    <Stack>
                        <Center>
                            <Box overflow={"scroll"} h={400} w={"75%"}>
                                <AllComments dummy={dummy} petitionID={pid}></AllComments>
                            </Box>
                        </Center>
                        <Stack direction={"horizontal"}>
                            <Textarea resize={"none"} placeholder={"Comment here..."} value={comment} onChange={(e)=>{setComment(e.target.value)}}></Textarea>
                            <Button flex='1' variant='ghost' leftIcon={<ArrowUpIcon></ArrowUpIcon>} onClick={submitComment}>
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>
            </Card>
            : <></>
            } */}
        </>
    )
}

export default FullPetition