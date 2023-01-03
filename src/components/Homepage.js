import {
    BrowserRouter as Router,
    Routes,
    Route,
    Redirect,
  } from "react-router-dom";
import { Center, Divider, Portal, Stack } from "@chakra-ui/react";
import AllPetitions from "./AllPetitions";
import Petition from "./Petition";
import PetitionForm from "./PetitionForm";
import { useStateValue } from "../StateProvider";
import MyPetitions from "./MyPetitions";
import Profile from "./Profile";
import FullPetition from "./FullPetition";

// import Web3 from "web3";
function Homepage(props){// send props displaycount
    // console.log("props in home page",props);
    // const web3 = props.initialState.web3;
    // const tw3 = new Web3(provider);
    // tw3.
    const [state, dispatch] = useStateValue();
    console.log("logging props in home page :", props);
    // console.log(web3.);
    // console.log("calling all petitions ", props.initialState.contract.methods.getAllPetitions().call({from:'0xcf09305128cf1CF5fe1c53CA400F9b219e3FC6Bb'}));
    return (
        <>
        { props.displayCount == 0 &&
            (
                <>
                    <Router>
                    <Routes>
                    <Route path="/petitions/:petitionId" element={<FullPetition/>}/>
                    <Route path="/" element={<AllPetitions></AllPetitions>} />
                </Routes>
                        
                    </Router>
                    
                    {/* <Center >
                        <Stack width='4xl'>
                            <Petition/>
                            <Divider></Divider>
                            <Petition/>
                        </Stack>
                    </Center> */}
                </>

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

            ( <MyPetitions/>          
                // <Center >
                //     <Stack width='4xl'>
                //         <Petition/>
                //         <Divider></Divider>
                //         <Petition/>
                //     </Stack>
                // </Center>
            )
        }
        {props.displayCount ==3 && 
            (
                <Profile />
            )
        }
        </>
    );
}

export default Homepage;