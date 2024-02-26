import React, { useState } from 'react';
import '../styles/DashboardRework.css'; 

import DashboardAccordion from '../components/dashboard-accordion';

const Dashboard = () => {
    // State to track which menu item is selected
    const [selectedMenuItem, setSelectedMenuItem] = useState(null);

    // State to set the text entered in the search bar
    const [searchInput, setSearchInput] = useState(null);

    // handle change and set the sate with current info
    const handleChange = (event) => {
        event.preventDefault();
        setSearchInput(event.target.value);

    }

    // Handler function to update selected menu item
    const handleMenuItemClick = (menuItem) => {
        setSelectedMenuItem(menuItem);
    };

    return (
        <div className="dashboard-container">
            <header className="sidebar">
            <div id="Logo">
                    <img src="IYC-dashboard-icon.png" alt="IYC"/>
                </div>
                <h1>Menu</h1>

                <li onClick={() => handleMenuItemClick('Coalition Information')}>
                    <div id="information-icon">
                        <img src="information-icon.png" alt="Information-icon" />
                    </div>
                    Coalition Information
                </li>

                <li onClick={() => handleMenuItemClick('Food Access')}>
                    <div id="food-access-icon">
                        <img src="food-access-icon.png" alt="" />
                    </div>
                    Food Access
                </li>

                <li onClick={() => handleMenuItemClick('Community Guidance')}>
                    <div id="community-icon">
                        <img src="community-icon.png" alt="" />
                    </div>
                    Community Guidance
                </li>

                <li onClick={() => handleMenuItemClick('Active Living')}>
                    <div id="active-living-icon">
                        <img src="active-living-icon.png" alt="" />
                    </div>
                    Active Living
                </li>

                    <li onClick={() => handleMenuItemClick('Chronic Disease Prevention')}>
                        <div id="disease-icon">
                            <img src="disease-icon.png" alt="" />
                        </div>
                        Chronic Disease Prevention
                    </li>

                    <li onClick={() => handleMenuItemClick('Behavioural Health')}>
                        <div id="behavioural-health-icon">
                            <img src="behavioural-health-icon.png" alt="" />
                        </div>
                        Behavioural Health
                    </li>
                    <li onClick={() => handleMenuItemClick('Injury')}>
                        <div id="injury-icon">
                            <img src="injury-icon.png" alt="" />
                        </div>
                        Injury
                    </li>

            </header>
            <header className="top-panel">
                {/* Modified the input to handle change in input and to set the state with current input  */}
                <input type="text" placeholder="Search for data..."  onChange = {handleChange} value = {searchInput} />
                    <button type="submit">Search</button>
                    <div id="Search">
                        <img src="search-icon.png" alt=""/>
                    </div> 
            </header>
            <DashboardAccordion data = {dummyData} />
        </div>
    );
};    

const dummyData = [
    {
        title: 'Suicide Deaths',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ac orci at nisi suscipit eleifend sed ut dolor. Vivamus aliquet justo et fringilla consectetur. Mauris quis urna nec massa tempor semper ut at magna. Duis volutpat libero felis, ac ornare tellus pharetra sed. Proin eu dui pretium, mollis nunc fringilla, accumsan nunc. Praesent id varius lectus. Nunc elementum leo metus, nec volutpat tortor gravida eu. Maecenas ut feugiat metus.'
    },
    {
        title: 'Coronary Heart Disease',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ac orci at nisi suscipit eleifend sed ut dolor. Vivamus aliquet justo et fringilla consectetur. Mauris quis urna nec massa tempor semper ut at magna. Duis volutpat libero felis, ac ornare tellus pharetra sed. Proin eu dui pretium, mollis nunc fringilla, accumsan nunc. Praesent id varius lectus. Nunc elementum leo metus, nec volutpat tortor gravida eu. Maecenas ut feugiat metus.'
    }
    
]

export default Dashboard;