import { Button, Card, CardBody, CardFooter,Center,Divider,Flex,Heading, Image, Stack, Stat, Tag, TagLabel, Text,StatLabel,
    StatNumber,
    StatHelpText,
    VStack, HStack, Box, Spacer} from "@chakra-ui/react";
import { ChatIcon, ArrowUpIcon } from '@chakra-ui/icons'
import { useEffect, useState } from "react";
import { useStateValue } from "../StateProvider";
import axios from "axios";
import {Link} from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { SlLike, SlBubble } from "react-icons/sl";

function Petition(props){
    // petition ID, ownerAddress, signed users count, data hash and comments.
    // data hash contains : title, content, time created and tags.
    const [metadata, setMetadata] = useState();
    const [update, setUpdate] = useState(false);
    const [state,dispatch] = useStateValue();
    const [votes,setVotes] = useState(props.votes);
    const navigate = useNavigate();
    useEffect(()=>{
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
        setVotes(props.votes);
    }, []);

    useEffect(()=>{
        const updateVote = async () => {
            console.log(props);
            const petition_count = await state.contract.methods.getVotes(props.pid).call({from: state.account});
            console.log("Petition Count :",petition_count);
            setVotes(petition_count);
        }
        updateVote();
    }, [update]);
    // const [title,setTitle] = useState("The Perfect Petition");
    // const [imagelink,setImageLink] = useState('https://cdn.nba.com/teams/legacy/www.nba.com/warriors/sites/warriors/files/20201202-curry-1280.jpg');
    // const [content,setContent] = useState("No Homo,\"No homo\" is a slang phrase used at the end of a sentence to assert the statement spoken by the speaker had no intentional homosexual implications. The phrase is also \"added to a statement in order to rid [oneself] of a possible homosexual double-entendre\". As with many attributes of hip hop culture, the use of \"no homo\" has become integrated into the mainstream North American vernacular. One reason for this as proposed by Brown is that the integration and reception of the specific phrase no homo into the conversational dialect of North American English was simple and due in part to its phonetic resonance");
    // const [tags,setTags] = useState(["Basketball","GOAT","No Homo"]);

    const upVote = async () => {
        const response = await state.contract.methods.signPetition(props.pid).send({from:state.account});
        setUpdate(true);
    }

    return (
        <>

            {
                (metadata)?
                <Center>
                <Card
                    direction={{ base: 'column', sm: 'row' }}
                    w='70vw'
                    h='270px'
                    m='10px 0px'
                    overflow='hidden'
                    variant='outline'
                    borderRadius='10px'
                >
                    {/* <Link to = {`/petitions/${props.pid}`}> */}
                    <Image
                        // objectFit='cover'
                        fit='cover'
                        maxW={{ base: '100%', sm: '300px' }}
                        src={metadata.image}
                        alt='Caffe Latte'
                        onClick={()=>{navigate(`/petitions/${props.pid}`)}}
                        _hover={{
                            cursor: 'pointer'
                        }}
                    />
                    {/* </Link> */}

                    
                    <Flex
                        p='0px 20px 0px 15px'
                        alignItems='left' 
                        direction='column'
                    >
                        <Flex
                            alignItems='center' 
                        >
                            
                            <CardBody>
                            <Heading fontSize='1.7vw'>{metadata.title}</Heading>

                            { (metadata.tags.split(' ')).map((tag, index) => (
                                <div key={index} style={{padding:"7px 5px 7px 0px",display:'inline-block'}}>
                                    <Tag size='md' key='md' variant='subtle' bgColor='brand.mainBG' >
                                        <TagLabel>{tag}</TagLabel>
                                    </Tag>
                                </div> 
                            )) }
                            <Text maxHeight='100%' noOfLines={3}>
                                {metadata.content}
                                Caffè latte is a coffee beverage of Italian origin made with espresso
                                and steamed milk.Caffè latte is a coffee beverage of Italian origin made with espresso
                                and steamed milk.Caffè latte is a coffee beverage of Italian origin made with espresso
                                and steamed milk.
                            </Text>
                            <Link to = {`/petitions/${props.pid}`}> 
                                <Button
                                    size="sm"
                                    variant="link"
                                    fontWeight="bold"
                                    colorScheme="slate"
                                    textDecoration="underline"
                                    // onClick={handleToggle}
                                >
                                    Show more
                                </Button>
                            </Link>
                            </CardBody>

                            <Flex 
                            direction='column'
                            alignItems='center'
                            >
                                <Text fontSize='4vw' lineHeight='80%'>30</Text>
                                <Text fontSize='1.2vw'>supporters</Text>
                            </Flex>
                        </Flex>

                        <Spacer />

                        <CardFooter pt='0'>
                            <Box  mr='25px'>
                                <SlLike style={{fontSize: '25px'}} onClick={upVote}/>
                                <span style={{visibility: 'hidden'}}>Support</span>
                            </Box>
                            <Box>
                            <SlBubble style={{fontSize: '25px'}} onClick={()=>{navigate(`/petitions/${props.pid}`)}}/>
                            </Box>
                            
                        {/* <Button variant='solid' colorScheme='blue'>
                            Buy Latte
                        </Button> */}
                        </CardFooter>
                    </Flex>

                    
                </Card>
                </Center>
                : <></>
            }

            {
                (metadata)?
           <Card
            overflow='hidden'
            variant='outline'
            >
                <Link to = {`/petitions/${props.pid}`}>
                <Center style={{width:'100%',height:'300px'}}>
                    <Image
                        padding='20px 0px 0px 0px'
                        fit='contain'
                        style={{height:'300px',width:'100%'}}
                        src={metadata.image}
                        alt='Caffe Latte'
                    />
                </Center>
                </Link>
                <Stack>
                    
                    <Flex flexDirection='column'>
                    <Link to = {`/petitions/${props.pid}`}>
                    <CardBody flex='1'>
                    <Heading size='xl' style={{padding:"0px 10px 0px 0px"}}>{metadata.title}</Heading>

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
                    </Link>
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
                        <Button flex='1' variant='ghost' leftIcon={<ChatIcon></ChatIcon>} onClick={()=>{navigate(`/petitions/${props.pid}`)}}>
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
    );
}

export default Petition;