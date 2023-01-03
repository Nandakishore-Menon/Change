import { Button, Card, CardBody, CardFooter,Center,Divider,Flex,Heading, Image, Stack, Stat, Tag, TagLabel, Text,StatLabel,
    StatNumber,
    StatHelpText, } from "@chakra-ui/react";
import { ChatIcon, ArrowUpIcon } from '@chakra-ui/icons'
import { useEffect, useState } from "react";
import { useStateValue } from "../StateProvider";
import axios from "axios";
import {Link} from 'react-router-dom'
import { useNavigate } from "react-router-dom";

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
                    <Link to = {`/petition/${props.pid}`}>
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