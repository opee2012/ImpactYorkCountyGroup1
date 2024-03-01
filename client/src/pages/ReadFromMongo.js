import React, { useState, useEffect } from 'react';
import '../styles/DashboardRework.css';
import DashboardAccordion from '../components/dashboard-accordion';
import testData from '../utils/data_temp/test.json'; // Importing test.json

const Dashboard = () => {
    const [selectedMenuItem, setSelectedMenuItem] = useState(null);
    const [searchInput, setSearchInput] = useState('');
    const [categories, setCategories] = useState([]);

    const handleChange = (event) => {
        setSearchInput(event.target.value);
    }

    const handleMenuItemClick = (menuItem) => {
        setSelectedMenuItem(menuItem);
    };

    useEffect(() => {
        // Set categories from test.json
        setCategories(testData.Category);
    }, []);

    return (
        <div className="dashboard-container">
            <header className="sidebar">
                <div id="Logo">
                    <img src="IYC-dashboard-icon.png" alt="IYC" />
                </div>
                <h1>Menu</h1>
                <ul>
                    <li onClick={() => handleMenuItemClick(testData.Category)}>
                        {testData.Category}
                    </li>
                </ul>
            </header>
            <header className="top-panel">
                <input type="text" placeholder="Search for data..." onChange={handleChange} value={searchInput} />
                <button type="submit">Search</button>
                <div id="Search">
                    <img src="search-icon.png" alt="" />
                </div>
            </header>
            <div className="content-section">
                {/* Pass testData.Data to DashboardAccordion */}
                <DashboardAccordion data={testData.Data} />
            </div>
        </div>
    );
    
    
}

export default Dashboard;
