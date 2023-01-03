import {React, useState} from 'react'
import Homepage from './Homepage';
import Navbar from './Navbar';
import LandingPage from './LandingPage';
import { useStateValue } from '../StateProvider';

const MainPage = (props) => {
    const [state, dispatch] = useStateValue();
    const [displayCount,setDisplayCount] = useState(0);// 0 for home, 1 form to start petition, 2 view petitions by user, 3 profile info

    console.log("state in main page Component",state);
    return (
        <>
        <Navbar onClickFunction={setDisplayCount}  />
        
        { ((state!= null || state!=undefined) && state.account)?
                <>
                
                <Homepage setDisplayCount={setDisplayCount} displayCount={displayCount}></Homepage>
                </>
                :
                <>
                {/* <Login></Login> */}
                <LandingPage></LandingPage>

                </>
            }
        </>
    );
}

export default MainPage;