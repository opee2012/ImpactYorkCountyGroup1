import React, { useState, useEffect } from "react";
import "../styles/Dashboard.css";
import DashboardAccordion from "../components/dashboard-accordion";
import { useDataHandle } from "../hooks/useData";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../context/AuthContext";

/**
* The Dashboard component serves as the main interface for users and staff. It provides
* navigation through a sidebar, user actions in a top panel, and a content section
* for displaying data. It uses various hooks for authentication, data fetching,
* and state management.
* For users, the dashboard allows viewing data, searching, and filtering through the data.
* For staff, the dashboard provides the ability to log in and keep the data updated or make changes as needed.
* The dashboard also handles automatic data refresh in case of errors and provides a logout functionality.
* @returns {JSX.Element} The rendered Dashboard component.
*/

const Dashboard = () => {
  const { logout } = useLogout(); // Hook for logging out the user
  const [selectedMenuItem, setSelectedMenuItem] = useState(0); // State for tracking the selected menu item in the sidebar
  const { fetchData, isLoading, error } = useDataHandle(); // Custom hook for handling data fetching and state management
  const [searchInput, setSearchInput] = useState(""); // State for storing the user's search input for filtering data
  const [categories, setCategories] = useState(null); // State for storing fetched categories to be displayed in the sidebar
  const [tryRefresh, setTryRefresh] = useState(false); // State for triggering a data refresh in case of errors

  /**
  * Updates the search input state based on the user's input.
  * @param {React.ChangeEvent<HTMLInputElement>} event - The input event triggered by the user's typing.
  */
  const handleChange = (event) => {
    setSearchInput(event.target.value);
  };

  /**
  * Updates the state to reflect the user's selection of a menu item in the sidebar.
  * @param {number} menuItemIndex - The index of the selected menu item.
  */
  const handleMenuItemClick = (menuItemIndex) => {
    setSelectedMenuItem(menuItemIndex);
  };

  const { state } = useAuthContext(); // Custom hook for accessing the current user's authentication state
  const { email, admin } = state || {}; // Destructuring to get email and admin status from the authentication state

  /**
  * Fetches categories data on component mount and whenever the tryRefresh state changes.
  * Updates the categories state with the fetched data. If an error occurs during data
  * fetching, it logs the error to the console and attempts to refresh the data.
  */
  useEffect(() => {
    fetchData()
      .then((data) => {
        setCategories(data.out);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [tryRefresh]);

  /**
  * Sets up an interval to try refreshing the data every 5 seconds if there's an error.
  * Clears the interval when the component unmounts or when the error/tryRefresh state changes.
  * This ensures that the dashboard attempts to recover from errors by refreshing
  * the data periodically until the error is resolved.
  */
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (error) setTryRefresh(!tryRefresh);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [error, tryRefresh]);

  return (
    <div className="dashboard-container">
      {/* Sidebar for navigation */}
      <header className="sidebar">
        {/* Logo section */}
        <div id="Logo">
          <img src="IYC-dashboard-icon.png" alt="IYC" />
        </div>
        {/* Navigation menu */}
        <h1>Menu</h1>
        <ul>
          {categories
            ? categories.map((item, index) => {

                /**
                * Renders an individual list item (`<li>`) for each category.
                * - key={index}: Provides a unique key for each list item.
                * - onClick: Updates the selected menu item when this item is clicked.
                * - className: Conditionally adds the 'highlighted' class if this item is the selected menu item.
                */
                return (
                  <li
                    key={index}
                    onClick={() => handleMenuItemClick(index)}
                    {...selectedMenuItem === index ? { className: "highlighted" } : null}
                  >
                    {item.Category}
                  </li>
                );
              })
            : null}
        </ul>
      </header>
  
      {/* Top panel for user actions */}
      <header className="top-panel">
        {/* Button for admin users to manage accounts */}
        {admin && (
          <button
            className="button button-center button-blue"
            onClick={() => window.location.assign("/user-management")}
          >
            Manage Accounts
          </button>
        )}
        {/* Button for logged-in users to change password */}
        {email && (
          <button
            className="button button-center button-purple"
            onClick={() => window.location.assign("/password")}
          >
            Change Password
          </button>
        )}
        {/* Button for logged-in users to upload data */}
        {email && (
          <button
            className="button button-center button-black"
            onClick={() => window.location.assign("/upload")}
          >
            Upload Data
          </button>
        )}
        {/* Button for logged-in users to logout */}
        {email && (
          <button className="button button-center button-red" onClick={() => logout()}>
            Logout
          </button>
        )}
        {/* Button for unauthenticated users to login */}
        {!email && (
          <button className="button button-center button-blue" onClick={() => window.location.assign("/login")}>
            Login
          </button>
        )}
        {/* Search bar */}
        <div className="search-container">
          <input
            className="search-textbox"
            type="text"
            style={{ paddingLeft: "10px" }}
            placeholder="Search for data..."
            onChange={handleChange}
            value={searchInput}
          />
          <button type="submit" className="search-icon-submit">
            <img src="search-icon.png" alt="search-icon" />
          </button>
        </div>
      </header>
  
      {/* Content section for displaying data */}
      <div className="content-section">
        {/* Displays an error message if there's an error */}
        {error ? (
          <p className="wrapper">{error}</p>
        ) : isLoading ? (
          /* Displays a loading message while data is being fetched */
          <p className="wrapper">loading...</p>
        ) : categories ? (
          /* Displays data based on the selected category and search input */
          <DashboardAccordion category={categories[selectedMenuItem]} searchInput={searchInput} />
        ) : null}
      </div>
    </div>
  );
};  

export default Dashboard;
