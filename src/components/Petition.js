import { Button, Card, CardBody, CardFooter,Center,Divider,Flex,Heading, Image, Stack, Stat, Tag, TagLabel, Text,StatLabel,
    StatNumber,
    StatHelpText,
    VStack, HStack, Box, Spacer, Tooltip, Spinner, SlideFade, useDisclosure} from "@chakra-ui/react";
import { ChatIcon, ArrowUpIcon } from '@chakra-ui/icons'
import { useEffect, useState } from "react";
import { useStateValue } from "../StateProvider";
import axios from "axios";
import {Link} from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { SlLike, SlBubble } from "react-icons/sl";
// import { Tooltip } from "evergreen-ui";
import thumbs from '../assets/thumbs.png';
import thumbsup from '../assets/thumbsup.png';

function Petition(props){
    // petition ID, ownerAddress, signed users count, data hash and comments.
    // data hash contains : title, content, time created and tags.
    const [metadata, setMetadata] = useState();
    const [update, setUpdate] = useState(false);
    const [state,dispatch] = useStateValue();
    const [votes,setVotes] = useState(props.votes);
    const [loading, setLoading] = useState(false);
    const { isOpen, onToggle } = useDisclosure();
    const navigate = useNavigate();

    const somethingChanged = ()=>{

        if(state.contract!=null && state.contract != undefined)state.contract.events.PetitionUpvoted({fromBlock:0}).on(
            'data',
            event => {
                console.log("Recieved Event in AllPetitions(PetitionLiked)",event);
                const get_pet = async () => {
                    if(props.pid === event.returnValues.petitionID){
                        const newVotes = await state.contract.methods.getVotes(props.pid).call({from: state.account});
                        // console.log("New votes",newVotes);
                        setVotes(newVotes);
                    }
                    // console.log("likedddd");
                }

                get_pet();
            }
        )
    }

    useEffect(()=>{
        onToggle();
        axios(props.url)
        .then((response)=>{
            setMetadata(response.data);
        });
        const voted = async () => {
            const hasVoted = await state.contract.methods.hasVoted(props.pid).call({from: state.account});
            console.log("hasVoted", hasVoted);
            setUpdate(hasVoted);
        }
        voted();
        somethingChanged();
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
        setLoading(true);
        if(update!=true) {
            const response = await state.contract.methods.signPetition(props.pid).send({from:state.account});
            setUpdate(true);
        }
        setLoading(false);
    }

    return (
        <>
            <SlideFade in={isOpen} >
            {
                (metadata)?
                <Center>
                <Card
                    direction={{ base: 'column', sm: 'row' }}
                    w='70%'
                    h='270px'
                    m='15px 0px'
                    overflow='hidden'
                    variant='elevated'
                    borderRadius='10px'
                    bg="brand.navbarBG"
                >
                    {/* <Link to = {`/petitions/${props.pid}`}> */}
                    <Image
                        // objectFit='cover'
                        fit='cover'
                        w="100%"
                        maxW={{ base: '100%', sm: '26%' }}
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
                        // alignItems='left' 
                        direction='column'
                        w="74%"
                    >
                        
                            
                    <CardBody onClick={()=>{navigate(`/petitions/${props.pid}`)}}>
                        <HStack
                            // alignItems='center' justifyContent="space-between"
                            // w="100%"
                        >
                            <Box>
                                <Text color="brand.palette3" fontSize='1.7vw'>{metadata.title}</Text>
                                    <HStack>
                                    { (metadata.tags.split(' ')).map((tag, index) => (
                                        <div key={index} style={{padding:"7px 5px 7px 0px",display:'inline-block'}}>
                                            <Tag size='md' key='md' variant='subtle' bgColor='brand.mainBG' >
                                                <TagLabel>{tag}</TagLabel>
                                            </Tag>
                                        </div> 
                                    )) }
                                    </HStack>
                                <Text maxHeight='100%' noOfLines={3}>
                                    {metadata.content}
                                </Text>
                                <Link to = {`/petitions/${props.pid}`}> 
                                    <Button
                                        size="sm"
                                        variant="link"
                                        fontWeight="bold"
                                        colorScheme="slate"
                                        textDecoration="underline"
                                        _hover={{
                                            color: "brand.darkBlue"
                                        }}
                                    >
                                        Show more
                                    </Button>
                                </Link>
                            </Box>
                            
                            <Spacer/>
                            <Flex 
                                direction='column'
                                alignItems='center'
                            >
                                <Text fontSize='4vw' lineHeight='80%'>{votes}</Text>
                                <Text fontSize='1.2vw'>supporters</Text>
                            </Flex>
                        </HStack>
                    </CardBody>
                            

                        <Spacer />

                        <CardFooter pt='0'>
                            <Box mr='25px'
                                _hover={{
                                    cursor: 'pointer'
                                }}
                            >
                                <Tooltip label="Support" placement="bottom">
                                    <span>
                                        {
                                            (loading)?
                                             <Spinner size='xs' />:
                                        ((!update)?
                                        <Image src={thumbs} h="25px" style={{fontSize: '25px'}} onClick={upVote} />
                                        : <Image src={thumbsup} h="25px" style={{fontSize: '25px'}} onClick={upVote} />
                                        )
                                        }
                                    </span>
                                </Tooltip>
                                
                            </Box>
                            <Box mr='25px'
                                _hover={{
                                    cursor: 'pointer'
                                }}
                            >
                                <Tooltip label="Comment" placement="bottom">
                                    <span>
                                    <SlBubble  style={{fontSize: '25px'}} onClick={()=>{navigate(`/petitions/${props.pid}`)}}/>
                                    </span>
                                </Tooltip>
                                
                            </Box>
                            
                            
                        </CardFooter>
                    </Flex>

                    
                </Card>
                </Center>
                : <></>
            }
        </SlideFade>
        </>
    );
}

export default Petition;