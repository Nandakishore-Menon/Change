import React from 'react';
import { useStateValue } from '../StateProvider';
import AllPetitions from './AllPetitions';
const LandingPage = props => {
    const [state, dispatch] = useStateValue();
    return (
        <>
        {
            (state.web3 == undefined || state.web3 == null)?
            <>
            {/* <Navbar onClickFunction={setDisplayCount} isConnected={active} connectWallet={connect} initialState={initialState} /> */}
                <h1>Landing Page rendered</h1>
            </>
            :
            <> <AllPetitions /> </>
        }
        </>
    )
}



export default LandingPage