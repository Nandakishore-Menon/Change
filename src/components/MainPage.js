import {React, useState} from 'react'
import Homepage from './Homepage';
import MyNavbar from './MyNavbar';
import LandingPage from './LandingPage';
import { useStateValue } from '../StateProvider';
import {Router, Routes, Route} from 'react-router-dom';
import AllPetitions from './AllPetitions';
import PetitionForm from './PetitionForm';
import MyPetitions from './MyPetitions';
import Profile from './Profile';
// import Navbar from './Navbar';

const MainPage = (props) => {
    const [state, dispatch] = useStateValue();
    const [displayCount,setDisplayCount] = useState(0);// 0 for home, 1 form to start petition, 2 view petitions by user, 3 profile info

    console.log("state in main page Component",state);
    return (
        <>
        
        {/* { ((state!= null || state!=undefined) && state.account)? */}
                <>
                <Router>
                    <Routes>
                        <Route path={`/`} element={<><MyNavbar/><AllPetitions/></>} />
                        <Route path={`/start`} element={<><MyNavbar/><PetitionForm/></>}/>
                        <Route path ={`/mypetitions`} element={<><MyNavbar /><MyPetitions/></>} />
                        <Route path={`/:name`} element={<><MyNavbar/><Profile/></>} />
                        <Route path="/" element={<><h1>test</h1></>} />
                        {/* <Route path="/petition" element={<>Test</>}/> */}
                        {/* <Route path ="/mypetitions" element={<>Test</>} /> */}
                        {/* <Route path="/:name" element={<>Test</>} /> */}
                    </Routes>
                </Router>
                {/* <Homepage></Homepage> */}
{/* <></> */}
                </>
                {/* : */}
                {/* <> */}
                {/* <Login></Login> */}
                {/* <LandingPage></LandingPage> */}

                {/* </> */}
            {/* } */}
        </>
    );
}

export default MainPage;