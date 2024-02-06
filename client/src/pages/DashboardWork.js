import React, { useState } from 'react';
import '../styles/DashboardRework.css'; 

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
                    <img src="IYC.png" alt="Logo"/>
                </div>
                <h1>Menu</h1>

                <li onClick={() => handleMenuItemClick('Coalition Information')}>
                    <div id="information-icon">
                        <img src="information-icon.png" alt="Information-icon" />
                    </div>
                    Coalition Information
                </li>

                <li onClick={() => handleMenuItemClick('Food Access')}>Food Access</li>
                    <li onClick={() => handleMenuItemClick('Community Guidance')}>Community Guidance</li>
                    <li onClick={() => handleMenuItemClick('Active Living')}>Active Living</li>
                    <li onClick={() => handleMenuItemClick('Chronic Disease Prevention')}>Chronic Disease Prevention</li>
                    <li onClick={() => handleMenuItemClick('Behavioural Health')}>Behavioural Health</li>
                    <li onClick={() => handleMenuItemClick('Injury')}>Injury</li>

            </header>
            <header className="top-panel">
                {/* Modified the input to handle change in input and to set the state with current input  */}
                <input type="text" placeholder="Search for data..."  onChange = {handleChange} value = {searchInput} />
                    <button type="submit">Search</button>
                    <div id="Search">
                        <img src="search-icon.png" alt="Search"/>
                    </div> 
            </header>
        </div>
    );
};    

export default Dashboard;
