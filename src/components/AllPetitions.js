import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Petition from "./Petition";
import { chakra } from "@chakra-ui/react";
import {useStateValue} from '../StateProvider';
import { abi } from "../contract/petition";

function AllPetitions(props){
    const [state, dispatch] = useStateValue();
    const [petitions,setPetitions] = useState([]);

    const refresh = async () => {
        let pl = [];
        // let tempPetitions = await state.contract.methods.getAllPetitions().send({from:state.account});
        const web3 = state.web3;
        console.log("Network",await web3.eth.net.getId());
        // const contract = new state.web3.eth.Contract(abi,process.env.REACT_APP_CONTRACT_ADDRESS);
        console.log("contract network",state.contract) ;
        console.log("web3:",web3);
        console.log(await state.contract.methods.getAllPetitions().call({from : state.account}));
        // let tempPetitions = await contract.methods.getAllPetitions;
        // console.log("temp petitions:",tempPetitions);
        // setPetitions(pl);
    }

    return (<>
        {petitions}
        <Button colorScheme='blue' onClick={refresh}>REFRESH</Button>
    </>);
}

export default AllPetitions;