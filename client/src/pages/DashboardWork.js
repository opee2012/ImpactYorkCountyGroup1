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
            
            </header>

            <header className="top-panel">

            </header>
        </div>
    );
};

export default Dashboard;
