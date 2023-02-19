import { Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Petition from "./Petition";
import { useStateValue } from "../StateProvider";

function AllPetitions(props) {
  const [state, dispatch] = useStateValue();
  const [petitions, setPetitions] = useState([]);

  const somethingChanged = async () => {
    if (state.contract != null && state.contract != undefined)
      state.contract.events
        .PetitionAdded({ fromBlock: 0 })
        .on("data", (event) => {
          console.log("Recieved Event in AllPetitions(PetitionAdded)", event);
          const get_pet = async () => {
            const petition_list = await state.contract.methods
              .getAllPetitions()
              .call({ from: state.account });
            setPetitions([]);
            setPetitions(petition_list);
            console.log("petitionAdded");
          };

          get_pet();
        });
  };

  useEffect(() => {
    const get_pet = async () => {
      const petition_list = await state.contract.methods
        .getAllPetitions()
        .call({ from: state.account });
      setPetitions(petition_list);
    };
    somethingChanged();
    get_pet();
  }, []);

  const refresh = async () => {
    let pl = [];
    // let tempPetitions = await state.contract.methods.getAllPetitions().send({from:state.account});
    const web3 = state.web3;
    // console.log("Network",await web3.eth.net.getId());
    // // const contract = new state.web3.eth.Contract(abi,process.env.REACT_APP_CONTRACT_ADDRESS);
    // console.log("contract network",state.contract) ;
    // console.log("web3:",web3);

    // let tempPetitions = await contract.methods.getAllPetitions;
    // console.log("temp petitions:",tempPetitions);
    // setPetitions(pl);
  };

  return (
    <>
      {/* {petitions} */}
      {/* <Button colorScheme='blue' onClick={refresh}>REFRESH</Button> */}
      {/* <Box
                    // bg="#f7f3fe"
                    pt="20px"
                    // margin='10px 30px'
                    h='91vh'
                    // w="70%"
                    // borderRadius='40px'
                > */}
      <Heading
        fontFamily="banner"
        color="#5e448d"
        ml="15%"
        fontSize="3.0vw"
        mb="25px"
        mt="40px"
      >
        See the Change Around the World
      </Heading>
      {petitions.map((petition) => {
        return (
          <Petition
            key={petition.petitionID}
            url={petition.petitionHash}
            votes={petition.signedUsersAddress.length}
            pid={petition.petitionID}
          />
        );
      })}
      {/* </Box> */}
    </>
  );
}

export default AllPetitions;
