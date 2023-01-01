import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Petition from "./Petition";
import { chakra } from "@chakra-ui/react";

function AllPetitions(props){

    const [petitions,setPetitions] = useState([]);

    const refresh = async () => {
        let pl = [];
        setPetitions(pl);
    }

    return (<>
        {petitions}
        <Button colorScheme='blue' onClick={refresh}>REFRESH</Button>
    </>);
}

export default AllPetitions;