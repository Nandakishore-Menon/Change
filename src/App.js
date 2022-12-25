import Navbar from "./components/Navbar";
import { useState } from "react";
import { Center, ChakraProvider, Divider, Stack } from '@chakra-ui/react'
import Petition from "./components/Petition";
import PetitionForm from "./components/PetitionForm";


function App(props) {
    const [displayCount,setDisplayCount] = useState(0);// 0 for home, 1 form to start petition, 2 view petitions by user, 3 profile info

    return (<>
        <ChakraProvider>
            <Navbar onClickFunction={setDisplayCount} />
            {/* <Center >
                <Stack width='4xl'>
                    <Petition/>
                    <Divider></Divider>
                    <Petition/>
                </Stack>
            </Center> */}
            {/* <Center>
                <PetitionForm/>
            </Center> */}
            {displayCount == 0 &&
                (
                    <Center >
                        <Stack width='4xl'>
                            <Petition/>
                            <Divider></Divider>
                            <Petition/>
                        </Stack>
                    </Center>
                )                
            }
            {displayCount == 1 && 
                (
                    <Center>
                        <PetitionForm onClickFunction={setDisplayCount}/>
                    </Center>
                )
            }
            {/* SIMILARLY DO FOR DISPLAYCOUNT = 2 AND DISPLAY COUNT = 3 */}
            {displayCount ==2 && 
                (
                    <Center >
                        <Stack width='4xl'>
                            <Petition/>
                            <Divider></Divider>
                            <Petition/>
                        </Stack>
                    </Center>
                )
            }
            {displayCount ==3 && 
                (
                    <Center>
                        <h1>Profile Page</h1>
                    </Center>
                )
            }
        </ChakraProvider>
    </>);
}

export default App;