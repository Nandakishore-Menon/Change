import { Card, CardBody, CardHeader, Divider, Heading, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Flex,Avatar,Box, Stack, StackDivider } from "@chakra-ui/react";


function Comment(props){
    const [comment,setComment] = useState("");
    const [user, setUser] = useState("Initial User");
    useEffect(()=>{
        const getData = async () => {
            // get the data using ipfs
            var com_data = "";
            await axios(props.commentURL).then(
                (response)=> {
                    com_data = response.data;
                }
            )
            console.log("comm_data", com_data)
            setComment(com_data.comment);
            // setComment(c);
            setUser(props.commentedBy);
            // setUser(u);
        }
        getData();
    });

    return (<>
    {
        ((comment != null && comment != undefined) && (user != null && user != undefined))?
        // <Card variant="elevated" h={20}>
        //     <CardBody>
            <Stack direction={"column"}
                m="10px 0px"
            >
                <Flex 
                    alignItems={"center"}
                >
                    <Avatar 
                        // name={user}
                        src={""} 
                        size="md"
                        mr="13px"
                    />
                    <Text fontWeight={"bold"}
                        color="brand.palette3"
                        fontSize={"18px"}
                    >
                        Username
                    </Text>
                </Flex>
                
                <Text 
                    // borderLeft={"2px"} 
                    borderColor={"brand.heading"}
                    pt="2px"
                    pl = "10px"
                    fontSize={"18px"}
                >
                    {comment}
                </Text>
                {/* <Divider/> */}
            </Stack>
            
        //     </CardBody>
        // </Card>
        : <></>
    }
    </>);
}

export default Comment;