import { Card, CardBody, CardHeader, Divider, Heading, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Flex,Avatar,Box, Stack, StackDivider } from "@chakra-ui/react";
import { useStateValue } from "../StateProvider";


function Comment(props){
    const [comment,setComment] = useState("");
    const [user, setUser] = useState();
    const [user_addr, setUser_addr] = useState();
    const [state, dispatch] = useStateValue();

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
            // setUser(u);
        }
        getData();
    });

    useEffect(()=>{
        const set_prof = async () =>{
            const get_profile = async () => {
                console.log("methods in contract",state.contract.methods);
                const user = await state.contract.methods.getUser(props.commentedBy).call({from:state.account});
                console.log(user);
                axios(user.userHash).then(
                    async (response) => {
                        setUser(await response.data);
                        console.log('response', response.data.image)
                    }
                );
            }
            await get_profile();
        }
        set_prof();

    }, []);

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
                        src={user.image} 
                        size="md"
                        mr="13px"
                    />
                    <Text fontWeight={"bold"}
                        color="brand.palette3"
                        fontSize={"18px"}
                    >
                        {user.profile}
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