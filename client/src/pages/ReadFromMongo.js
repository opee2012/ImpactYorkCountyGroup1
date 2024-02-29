import React, { useState, useEffect } from 'react';
import '../styles/DashboardRework.css';

import DashboardAccordion from '../components/dashboard-accordion';

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
        fetch('/api/categories')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    return (
        <div className="dashboard-container">
            <header className="sidebar">
                <div id="Logo">
                    <img src="IYC-dashboard-icon.png" alt="IYC" />
                </div>
                <h1>Menu</h1>
                <ul>
                    {categories.map((category, index) => (
                        <li key={index} onClick={() => handleMenuItemClick(category)}>
                            {category.name}
                        </li>
                    ))}
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
                <DashboardAccordion data={dummyData} />
            </div>
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
];


export default Dashboard;
