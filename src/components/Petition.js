import { Button, Card, CardBody, CardFooter,Center,Divider,Flex,Heading, Image, Stack, Stat, Tag, TagLabel, Text,StatLabel,
    StatNumber,
    StatHelpText, } from "@chakra-ui/react";
import { ChatIcon, ArrowUpIcon } from '@chakra-ui/icons'
import { useState } from "react";

function Petition(props){
    // petition ID, ownerAddress, signed users count, data hash and comments.
    // data hash contains : title, content, time created and tags. 

    const [votes,setVotes] = useState(["sdf","sdfa","ferg"]);
    const [title,setTitle] = useState("The Perfect Petition");
    const [imagelink,setImageLink] = useState('https://cdn.nba.com/teams/legacy/www.nba.com/warriors/sites/warriors/files/20201202-curry-1280.jpg');
    const [content,setContent] = useState("No Homo,\"No homo\" is a slang phrase used at the end of a sentence to assert the statement spoken by the speaker had no intentional homosexual implications. The phrase is also \"added to a statement in order to rid [oneself] of a possible homosexual double-entendre\". As with many attributes of hip hop culture, the use of \"no homo\" has become integrated into the mainstream North American vernacular. One reason for this as proposed by Brown is that the integration and reception of the specific phrase no homo into the conversational dialect of North American English was simple and due in part to its phonetic resonance");
    const [tags,setTags] = useState(["Basketball","GOAT","No Homo"]);

    return (
        <>
           <Card
            // direction={{ base: 'column', sm: 'row' }}
            // direction={{ sm: 'row' }}
            // direction={{ base: 'column' }}
            overflow='hidden'
            variant='outline'
            >
                <Center style={{width:'100%',height:'300px'}}>
                    <Image
                        padding='20px 0px 0px 0px'
                        // objectFit='cover'
                        fit='contain'
                        // maxW={{ base: '100%' }}
                        // maxW={{sm: '800px' }}
                        style={{height:'300px',width:'100%'}}
                        // maxW={{ base: '100%', sm: '200px' }}
                        src={imagelink}
                        alt='Caffe Latte'
                    />
                </Center>

                <Stack>
                    <Flex flexDirection='column'>
                    <CardBody flex='1'>
                    <Heading size='xl' style={{padding:"0px 10px 0px 0px"}}>{title}</Heading>

                    {/* Insert tags from list of tags from ipfs */}
                    <div className="tags-input-container">
                        { tags.map((tag, index) => (
                            <div key={index} style={{padding:"5px",display:'inline-block'}}>
                                <Tag size='md' key='md' variant='subtle' colorScheme='cyan' >
                                    <TagLabel>{tag}</TagLabel>
                                </Tag>
                            </div> 
                        )) }
                    </div>

                    <Divider></Divider>
                    <Text py='2' style={{padding:"20px"}}>
                       {content}
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
                        <Button flex='1' variant='ghost' leftIcon={<ArrowUpIcon></ArrowUpIcon>}>
                            Vote
                        </Button>
                        <Button flex='1' variant='ghost' leftIcon={<ChatIcon></ChatIcon>}>
                            Comment
                        </Button>
                        <Center >
                            <Stat >
                                <StatLabel>Votes</StatLabel>
                                <StatNumber>{votes.length}</StatNumber>
                            </Stat>
                        </Center>
                    </CardFooter>
                    </Flex>
                </Stack>
            </Card>
        </>
    );
}

export default Petition;