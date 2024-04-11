/**
 * A React component that renders an accordion-style list of categories and subcategories. It allows users to expand/collapse subcategories and provides an option to edit them if the user is authenticated.
 */

import React, { useState } from 'react';
import '../styles/DashboardAccordion.css';
import DropdownIcon from '../icons/dropdown.png';
import DropupIcon from '../icons/dropup.png';
import { useAuthContext } from "../context/AuthContext";
import { Link } from 'react-router-dom';

/**
 * DashboardAccordion component that displays categories with their subcategories in an accordion format.
 * @param {Object} props - Component properties.
 * @param {Object} props.category - Category object containing category data.
 * @param {string} props.searchInput - Search input used to filter subcategories.
 * @returns {React.Component} A DashboardAccordion component.
 */
const DashboardAccordion = ({ category, searchInput }) => {
  // State hook for selected subcategories
  const [selectedSubItems, setSelectedSubItems] = useState([]);

  // Extract data and category name from the category prop
  let data = category.Data;
  let categoryName = category.Category;

  // Use the AuthContext to determine if a user is authenticated
  const { state } = useAuthContext();
  const { email } = state || {};

  /**
   * Toggles the selection state of a subcategory.
   * @param {Object} subCategory - The subcategory to toggle.
   */
  const toggleSubCategory = (subCategory) => {
    const newSelectedSubItems = [...selectedSubItems];
    const index = newSelectedSubItems.indexOf(subCategory);
    if (index > -1) {
      newSelectedSubItems.splice(index, 1);
    } else {
      newSelectedSubItems.push(subCategory);
    }
    setSelectedSubItems(newSelectedSubItems);
  };

  // Filter data based on search input and ensure that subcategories contain at least one item
  const filteredData = data.map(category => ({
    ...category,
    SubCategory: category.SubCategory.filter(subCategory => {
      const name = subCategory.Name || '';
      const searchText = (searchInput || '').toLowerCase();
      return name.toLowerCase().includes(searchText);
    })
  })
  ).filter(category => category.SubCategory.length > 0);

  /**
   * Renders an image for a subcategory.
   * @param {Object} subCategory - The subcategory to render the image for.
   * @returns {React.Component|null} An image component or null if the image is not found.
   */
  const renderimg = (subCategory) => {
    try {
      return <img className='content-image' src={images(`./${subCategory.Name}.png`)} />
    } catch (error) {
      return null;
    }
  }

  /**
  * Renders the accordion with categories and subcategories.
  * Each subcategory can be expanded to show a table of data and an image.
  * Authenticated users can edit the subcategory data.
  */
  return (
    <div className="wrapper">
      <div className='wrapper-inner'>
        <div className="accordion">
          {filteredData.map((category, index) => (
            <div key={index} className='dashboard-area'>
              <div className="subcategory">
                <h2>{category.Key}</h2>
              </div>
              {category['SubCategory'].map((subCategory, subIndex) => (
                <div key={subIndex} className="sub-category item">
                  <div className="title" onClick={() => toggleSubCategory(subCategory)} >
                    <h3>{subCategory.Name}</h3>
                    <div className='edit-drop'>
                      <div className='edit-button'>
                        {email &&
                          (<Link to={`/edit/${subCategory.Name}`} state={{ subCategoryData: subCategory.Data, categoryName: categoryName, categoryData: data }}>
                            <button>
                              Edit</button>
                          </Link>)}
                      </div>
                      <div className='drop-icons'>
                        {selectedSubItems.includes(subCategory) ? <img src={DropupIcon} alt="Dropup Icon" /> : <img src={DropdownIcon} alt="Dropdown Icon" />}
                      </div>
                    </div>
                  </div>
                  <div className={`content ${selectedSubItems.includes(subCategory) ? 'show' : ''}`}>
                    <div className="content-inner">
                      <table>
                        <thead>
                          <tr>
                            <th>Year</th>
                            <th>Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          {subCategory.Data.map((item, index) => (
                            <tr key={index}>
                              <td>{item.Year}</td>
                              <td>{item.Value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div>
                        {renderimg(subCategory)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardAccordion;
