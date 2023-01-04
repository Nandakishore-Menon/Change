import { Card, CardBody, CardHeader, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

function Comment(props){
    const [comment,setComment] = useState("Initial Comment");
    const [user, setUser] = useState("Initial User");
    useEffect(()=>{
        const getData = async () => {
            // get the data using ipfs
            // setComment(c);
            // setUser(u);
        }
        getData();
    });

    return (<>
        <Card variant="elevated">
            <CardHeader>
                <Heading size='md'> {user}</Heading>
            </CardHeader>
            <CardBody>
                <Text>variant = {comment}</Text>
            </CardBody>
        </Card>
    </>);
}

export default Comment;