const Dashboard = () => {
    return (
        <div className="dashboard">
            <div className="sidebar">
                <div id="logo">
                    <img src="IYC.png" alt="Logo" />
                </div>
                <h1>Menu</h1>
                <ul>
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