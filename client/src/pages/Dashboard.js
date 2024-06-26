import React, { useState, useEffect } from "react";
import "../styles/Dashboard.css";
import DashboardAccordion from "../components/dashboard-accordion";
import { useDataHandle } from "../hooks/useData";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { logout } = useLogout();
  const [selectedMenuItem, setSelectedMenuItem] = useState(0);
  const { fetchData, isLoading, error } = useDataHandle();
  const [searchInput, setSearchInput] = useState("");
  const [categories, setCategories] = useState(null);
  const [tryRefresh, setTryRefresh] = useState(false);
  const handleChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleMenuItemClick = (categoryName) => {
    const index = categories.findIndex((item) => item.Category === categoryName);
    setSelectedMenuItem(index);
  };

  const { state } = useAuthContext();
  const { email, admin } = state || {};

  // console.log(admin);

  useEffect(() => {
    fetchData()
      .then((data) => {
        const sortedCategories = [...data.out].sort((a, b) => a.Category.localeCompare(b.Category));
        setCategories(sortedCategories);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [tryRefresh]);
  //if theres an error, try getting data again after 5 sec
  useEffect(() => {
    const intervalid = setInterval(() => {
      if (error) setTryRefresh(!tryRefresh);
    }, 5000);
    return () => clearInterval(intervalid);
  }, [error, tryRefresh]);

  return (
    <div className="dashboard-container">
      <header className="sidebar">
        <div id="Logo">
          <img src="IYC-dashboard-icon.png" alt="IYC" />
        </div>
        <h1>Menu</h1>
        <ul>
        {categories
          ? categories.map((item, index) => {
              return (
                <li key={index} onClick={() => handleMenuItemClick(item.Category)} className={selectedMenuItem === index ? "highlighted" : undefined}>
                  {item.Category}
                </li>
              );
            })
          : null}

        </ul>
      </header>
      <header className="top-panel">    
        {(admin === true || admin === "true") &&<button className="button button-center button-blue" onClick={() => window.location.assign('/user-management')}>Manage Accounts</button>}
        {email && <button className="button button-center button-purple" onClick={() => window.location.assign('/password')}>Change password</button>}
        {email && <button className="button button-center button-black" onClick={() => window.location.assign('/upload')}>Upload Data</button>}
        {email && <button className="button button-center button-red"  onClick={() => logout()}>Logout</button>}
        {!email && <button className="button button-center button-blue" onClick={() => window.location.assign('/login')}>Login</button>}
        <div class="search-container">
          <input
            className="search-textbox"
            type="text"
            placeholder="Search for data..."
            onChange={handleChange}
            value={searchInput}
          />
          <button type="submit" className="search-icon-submit"><img src="search-icon.png" alt="search-icon" /></button>
        </div>
        <div id="Search">
        </div>
      </header>
      <div className="content-section">
        {error ? (
          <p className="wrapper">{error}</p>
        ) : isLoading ? ( 
          <p className="wrapper">loading...</p>
        ) : categories ? (
          <DashboardAccordion category={categories[selectedMenuItem]} searchInput={searchInput}/>
        ) : <p className="wrapper">no available data...</p>}
      </div>
      
    </div>
  );
};

export default Dashboard;
