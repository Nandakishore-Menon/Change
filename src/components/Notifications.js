import React, { useEffect, useState } from 'react'
import { Center, useDisclosure, Text } from '@chakra-ui/react'
import { BellIcon } from '@chakra-ui/icons'
import axios from 'axios'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
import { useStateValue } from '../StateProvider'

const Notifications = props => {
    const [state, dispatch] = useStateValue();
    const [petitions, setPetitions] = useState();
    const [notifs, setNotifs] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure()
    useEffect(()=> {
        const get_pet = async () => {
            const petition_list = await state.contract.methods.getPetitionByUser(state.account).call({from : state.account});
            setPetitions(petition_list);
        }

        const get_threshold_and_make_notifs = async () => {
            let tempNotif = [];
            for(let i=0;i<petitions.length;++i){
                // petitions[i].petitionHash;
                let metadata;
                axios(petitions[i].petitionHash)
                .then((response)=>{
                    // setMetadata(response.data);
                    metadata = response.data;
                });
                console.log("Metadata in notifs = ",metadata);
                const threshold = metadata.target_support;
                console.log(threshold);
                const petitionVotes = await state.contract.methods.getVotes(petitions[i].pid).call({from: state.account});
                console.log("petition votes in notif",petitionVotes);
                if(petitionVotes>=threshold){
                    const isMinted = await state.contract.methods.isMinted(petitions[i].pid).call({from: state.account});
                    if(!isMinted)tempNotif.push(`Minimum votes accquired, can mint NFT now for petition ${petitions[i].pid}!!`);
                }
            }
            setNotifs(tempNotif);
        }
        get_pet();
        console.log("Petitions set : ",petitions);
        // get_threshold_and_make_notifs();
        // get threshold from ipfs
        // call contract to see if threshold is crossed
        
    },[])
    return (
        <>
            
            <BellIcon boxSize={7} onClick={onOpen} color='black' _hover={{
                                                                                color: "brand.heading",
                                                                              }}/>
            <Modal
            isCentered
            onClose={onClose}
            isOpen={isOpen}
            motionPreset='slideInBottom'
        >
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>
                <Center color='brand.heading'>
                Notifications
                </Center>
                </ModalHeader>
            {/* <ModalCloseButton /> */}
            <ModalBody>
                {
                    notifs.map((element,index) => {
                        return(<Text><h1>Notification {index}</h1> : {element}</Text>);
                    })
                }
            </ModalBody>
            <ModalFooter>
            </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    )
}


export default Notifications