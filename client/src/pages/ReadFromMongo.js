import React, { useState, useEffect } from "react";
import "../styles/DashboardRework.css";
import DashboardAccordion from "../components/dashboard-accordion";
// import testData from '../utils/data_temp/test.json';
import { useDataHandle } from "../hooks/useData";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { Navigate } from "react-router-dom";


const Dashboard = () => {
  const { username } = useAuthContext();
  const { logout } = useLogout();
  const [selectedMenuItem, setSelectedMenuItem] = useState(0);
  const { fetchData, isLoading, error } = useDataHandle();
  const [searchInput, setSearchInput] = useState("");
  const [categories, setCategories] = useState(null);
  const [tryRefresh, setTryRefresh] = useState(false);
  const handleChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleMenuItemClick = (menuItemIndex) => {
    setSelectedMenuItem(menuItemIndex);
  };

  useEffect(() => {
    fetchData()
      .then((data) => {
        setCategories(data.out);
        console.log(data.out);
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
  }, [error]);

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
                  <li key={index} onClick={() => handleMenuItemClick(index)} {...selectedMenuItem === index ? {className:"highlighted"}:null}>
                    {item.Category}
                  </li>
                );
              })
            : null}
        </ul>
      </header>
      <header className="top-panel">
      {username && <button onClick={() => logout()}>Logout</button>}
      {!username && <button onClick={() => window.location.assign('/login')}>Login</button>}
        {username && <button>Edit</button>}
        {username && <button onClick={() => window.location.assign('/upload')}>Upload</button>}
        <input
          type="text"
          placeholder="Search for data..."
          onChange={handleChange}
          value={searchInput}
        />
        <button type="submit">Search</button>
        <div id="Search">
          <img src="search-icon.png" alt="" />
        </div>
      </header>
      <div className="content-section">
        {error ? (
          <p className="wrapper">{error}</p>
        ) : isLoading ? (
          <p className="wrapper">loading...</p>
        ) : categories ? (
          <DashboardAccordion category={categories[selectedMenuItem]} />
        ) : null}
      </div>
    </div>
  );
};

export default Dashboard;
