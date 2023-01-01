import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardBody, CardFooter, Heading, Text, Button, Center } from '@chakra-ui/react';
import { useStateValue } from '../StateProvider';
import axios from 'axios';

const Profile = (props) => {
    const [state, dispatch] = useStateValue();
    const [profile, setProfile] = useState();
    useEffect(()=>{
        const get_profile = async () => {
            console.log("methods in contract",state.contract.methods);
            const user = await state.contract.methods.getUser(state.account).call({from:state.account});
            console.log(user);
            axios(user.userHash).then(
                (response) => {
                    setProfile(response.data);
                }
            );
        }
        get_profile();
    }, []);
    return (
        <>
        {
            (profile) ?
                <Card align='center'>
                <CardHeader>
                    <Center>
                        <Heading size='md'> {profile.profile}</Heading>
                    </Center>
                    
                </CardHeader>
                <CardBody>
                    <Text>{profile.bio}</Text>
                </CardBody>
                <CardFooter>
                </CardFooter>
            </Card>
        :<></>
        }
        </>
    );
}


export default Profile