import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useStateValue } from '../StateProvider';
import { Button, Card, CardBody, CardFooter,Center,Divider,Flex,Heading, Image, Stack, Stat, Tag, TagLabel, Text,StatLabel,
    StatNumber,
    StatHelpText, } from "@chakra-ui/react";
import { ChatIcon, ArrowUpIcon } from '@chakra-ui/icons'
import axios from "axios";
const FullPetition = props => {
    const {pid} = useParams();
    const [state, dispatch] = useStateValue();
    const [petition, setPetition] = useState();
    const [metadata, setMetadata] = useState();
    const [update, setUpdate] = useState(false);
    const [votes,setVotes] = useState(0);

    useEffect(()=>{
        const getPid = async() => {
            if(petition == null || petition == undefined) {
                const petition = await state.contract.methods.getPetitionByPid(pid).call({from:state.account});
                setPetition(petition);
                axios(props.url)
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
                console.log("pet", petition)
                setVotes(petition.signedUsersAddress.length);
            }
            else {
                const petition_count = await state.contract.methods.getVotes(pid).call({from: state.account});
                setVotes(petition_count);
            }
            
        }
        getPid();
    }, [update])

    const upVote = async () => {
        const response = await state.contract.methods.signPetition(props.pid).send({from:state.account});
        setUpdate(true);
    }

    return (
        <>

            {
                (metadata)?
           <Card
            overflow='hidden'
            variant='outline'
            >
                <Center style={{width:'100%',height:'300px'}}>
                    <Image
                        padding='20px 0px 0px 0px'
                        fit='contain'
                        style={{height:'300px',width:'100%'}}
                        src={metadata.image}
                        alt='Caffe Latte'
                    />
                </Center>
                <Stack>
                    
                    <Flex flexDirection='column'>
                    <CardBody flex='1'>
                    <Heading size='xl' style={{padding:"0px 10px 0px 0px"}}>New {metadata.title}</Heading>

                    {/* Insert tags from list of tags from ipfs */}
                    <div className="tags-input-container">
                        { (metadata.tags.split(' ')).map((tag, index) => (
                            <div key={index} style={{padding:"5px",display:'inline-block'}}>
                                <Tag size='md' key='md' variant='subtle' colorScheme='cyan' >
                                    <TagLabel>{tag}</TagLabel>
                                </Tag>
                            </div> 
                        )) }
                    </div>

                    <Divider></Divider>
                    <Text py='2' style={{padding:"20px"}}>
                       {metadata.content}
                    </Text>
                    </CardBody>
                    <Divider></Divider>
                    <CardFooter
                        justify='space-between'
                        flexWrap='wrap'
                        sx={{
                        '& > button': {
                            minW: '136px',
                        },
                        }}>
                        <Button flex='1' variant='ghost' leftIcon={<ArrowUpIcon></ArrowUpIcon>} onClick={upVote}>
                            Vote
                        </Button>
                        <Button flex='1' variant='ghost' leftIcon={<ChatIcon></ChatIcon>}>
                            Comment
                        </Button>
                        <Center >
                            <Stat >
                                <StatLabel>Votes</StatLabel>
                                <StatNumber>{votes}</StatNumber>
                            </Stat>
                        </Center>
                    </CardFooter>
                    </Flex>
                </Stack>
            </Card>
            : <></>
            }
        </>
    )
}

export default FullPetition