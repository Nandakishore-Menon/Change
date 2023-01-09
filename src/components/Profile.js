import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardBody, CardFooter, Heading, Text, Button, Center, Avatar, Spacer, HStack, VStack } from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { BellIcon, SettingsIcon } from '@chakra-ui/icons';
import { useStateValue } from '../StateProvider';
import axios from 'axios';

const Profile = (props) => {
    const [state, dispatch] = useStateValue();
    const [profile, setProfile] = useState();
    // useEffect(()=>{
    //     const set_pet = async () =>{
    //         const get_profile = async () => {
    //             console.log("methods in contract",state.contract.methods);
    //             const user = await state.contract.methods.getUser(state.account).call({from:state.account});
    //             console.log(user);
    //             axios(user.userHash).then(
    //                 async (response) => {
    //                     setProfile(await response.data);
    //                     console.log('response', response.data.image)
    //                 }
    //             );
    //         }
    //         await get_profile();
    //     }
    //     set_pet();

    // }, []);
    return (
        <>
        {
            (state.profile) ?
            <>
            <Center>
                <Card align='center' h={"50%"} w={"50%"} mt={'8vh'}>
                <CardBody >
                    <VStack justifyContent={'space-between'}>
                    <Center>
                    <Avatar boxSize={20} src={state.profile.image}/>
                    </Center>

                    <Center>
                        <Heading size='md'> {state.profile.profile}</Heading>
                    </Center>
                    <Spacer/>
                    <Center>
                        <Text size='md'> {state.profile.bio}</Text>
                    </Center>
                    </VStack>
                    
                </CardBody>
                <CardFooter>
                </CardFooter>
            </Card>
            </Center>
            {/* <Center>
            <Tabs mt={"2vh"} w={"100%"} variant='soft-rounded' colorScheme={'purple'}>
                <TabList>
                <Spacer/>
                    <Tab><HStack><BellIcon/> <Text>Notifications</Text></HStack></Tab>
                    <Spacer/>
                    <Tab><HStack><SettingsIcon/> <Text>App Settings</Text></HStack></Tab>
                    
                    <Spacer/>
                </TabList>
                <TabPanels>
                    <TabPanel>
                    Notifications
                    </TabPanel>
                    <TabPanel>
                        Settings
                    </TabPanel>
                </TabPanels>
            </Tabs>
            </Center> */}
            </>
        :<></>
        }
        </>
    );
}


export default Profile