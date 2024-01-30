import React, { useState } from 'react';
import '../styles/Dashboard.css'; 

const Dashboard = () => {
    // State to track which menu item is selected
    const [selectedMenuItem, setSelectedMenuItem] = useState(null);

    // Handler function to update selected menu item
    const handleMenuItemClick = (menuItem) => {
        setSelectedMenuItem(menuItem);
    };

    /* 
    // Content to be displayed based on selected menu item
    const getContentForMenuItem = () => {
        switch (selectedMenuItem) {
            case "Coalition Information":
                return <div>Coalition Information Content</div>;
            case "Food Access":
                return <div>Food Access Content</div>;
            case "Community Guidance":
                return <div>Community Guidance Content</div>;
            case "Active Living":
                return <div>Active Living Content</div>;
            case "Chronic Disease Prevention":
                return <div>Chronic Disease Prevention Content</div>;
            case "Behavioural Health":
                return <div>Behavioural Health Content</div>;
            case "Injury":
                return <div>Injury Content</div>;
            default:
                return <div></div>;
        }
    };
    */

    return (
        <div className="dashboard">
            <div className="sidebar">
                <div id="logo">
                    <img src="IYC.png" alt="Logo" />
                </div>
                <h1>Menu</h1>
                <ul>
                    <li onClick={() => handleMenuItemClick('Coalition Information')}>
                        <div id="search-icon">
                            <img src="search-icon.png.png" alt="Search-icon" />
                        </div>
                        Coalition Information
                    </li>
                    
                    <li onClick={() => handleMenuItemClick('Food Access')}>Food Access</li>
                    <li onClick={() => handleMenuItemClick('Community Guidance')}>Community Guidance</li>
                    <li onClick={() => handleMenuItemClick('Active Living')}>Active Living</li>
                    <li onClick={() => handleMenuItemClick('Chronic Disease Prevention')}>Chronic Disease Prevention</li>
                    <li onClick={() => handleMenuItemClick('Behavioural Health')}>Behavioural Health</li>
                    <li onClick={() => handleMenuItemClick('Injury')}>Injury</li>
                </ul>
            </div>
            <div className="content">
                <div className="top-panel">
                <div className="search-bar">
                    <input type="text" placeholder="Search..." />
                    <button type="submit">Search</button> 
                </div>
            </div>
            </div>
        </div>
    );
};

export default Dashboard;
