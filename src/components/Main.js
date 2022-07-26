import React, { useState, useEffect } from 'react';
import Header from './mainComponents/Header.js';
import Closet from './mainComponents/Closet.js';
import Community from './mainComponents/Community.js';
import MyPage from './mainComponents/MyPage.js';
import Sales from './mainComponents/Sales.js';


const Main = () => {
    const [mainComponents, setMainComponents] = useState("Closet");

    const returnComponets = (componentName) => {
        if (componentName === "Closet") {
            return (<Closet />)
        }
        else if (componentName === "Community") {
            return (<Community />)
        }
        else if (componentName === "MyPage") {
            return (<MyPage />)
        }
        else if (componentName === "Sales") {
            return (<Sales />)
        }
    }

    return (
        <div>
            Main
            <Header
                mainComponents={mainComponents}
                setMainComponents={setMainComponents}
            />
            <div id="mainComponentBox">
                {returnComponets(mainComponents)}
            </div>
        </div>
    )
}

export default Main;