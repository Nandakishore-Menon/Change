import { Card, CardBody, CardHeader, Heading, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Flex,Avatar,Box } from "@chakra-ui/react";


function Comment(props){
    const [comment,setComment] = useState("Initial Comment");
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
        <Card variant="elevated" h={20}>
            <CardBody>
            <Flex gap='4' alignItems='center' flexWrap='wrap' direction='row' >
                    <Avatar name={user} src={""} size="sm"/>
                    <Box flex='1' h={5}>
                        <Text size='sm' fontWeight={500}>{user}</Text>
                    </Box>
                </Flex>
                <Text>{comment}</Text>
            </CardBody>
        </Card>: <></>
    }
    </>);
}

export default Comment;