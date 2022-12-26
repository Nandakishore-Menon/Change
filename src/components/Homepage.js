import { Center, Divider, Stack } from "@chakra-ui/react";
import Petition from "./Petition";
import PetitionForm from "./PetitionForm";


function Homepage(props){// send props displaycount
    return (
        <>
        { props.displayCount == 0 &&
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
        { props.displayCount == 1 && 
            (
                <Center>
                    <PetitionForm onClickFunction={props.setDisplayCount}/>
                </Center>
            )
        }
        {/* SIMILARLY DO FOR DISPLAYCOUNT = 2 AND DISPLAY COUNT = 3 */}
        {props.displayCount ==2 && 
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
        {props.displayCount ==3 && 
            (
                <Center>
                    <h1>Profile Page</h1>
                </Center>
            )
        }
        </>
    );
}

export default Homepage;