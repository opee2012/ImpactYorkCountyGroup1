import React, { useState, useEffect } from "react";
import "../styles/DashboardRework.css";
import DashboardAccordion from "../components/dashboard-accordion";
// import testData from '../utils/data_temp/test.json';
import { useDataHandle } from "../hooks/useData";

const Dashboard = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState(0);
  const { fetchData } = useDataHandle();
  const [searchInput, setSearchInput] = useState("");
  const [categories, setCategories] = useState(null);
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
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

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
                return <li key={index} onClick={() => handleMenuItemClick(index)}>{item.Category}</li>;
              })
            : null}
        </ul>
      </header>
      <header className="top-panel">
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
      {categories ? <DashboardAccordion category={categories[selectedMenuItem]} /> : null}
      </div>
    </div>
  );
};

export default Dashboard;
