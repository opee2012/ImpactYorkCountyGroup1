import React, { useState } from "react";
import "../styles/DashboardAccordion.css";
import DropdownIcon from "../icons/dropdown.png";
import DropupIcon from "../icons/dropup.png";
import { useAuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const DashboardAccordion = ({ category, searchInput }) => {
  const [selectedSubItems, setSelectedSubItems] = useState([]);
  const [showImages, setShowImages] = useState({});
  let data = category.Data;
  let categoryName = category.Category;
  const { state } = useAuthContext();
  const { email } = state || {};

  const toggleSubCategory = (subCategory) => {
    const newSelectedSubItems = [...selectedSubItems];
    const index = newSelectedSubItems.indexOf(subCategory);
    if (index > -1) {
      newSelectedSubItems.splice(index, 1);
    } else {
      newSelectedSubItems.push(subCategory);
    }
    setSelectedSubItems(newSelectedSubItems);

    setShowImages((prevState) => ({
      ...prevState,
      [subCategory.Name]: !prevState[subCategory.Name]
    }));
  };

  const filteredData = data
    .map((category) => ({
      ...category,
      SubCategory: category.SubCategory.filter((subCategory) => {
        const name = subCategory.Name || "";
        const searchText = (searchInput || "").toLowerCase();
        return name.toLowerCase().includes(searchText);
      }),
    }))
    .filter((category) => category.SubCategory.length > 0);

  return (
    <div className="wrapper">
      <div className="wrapper-inner">
        <div className="accordion">
          {filteredData.map((category, index) => (
            <div key={index} className="dashboard-area">
              <div className="subcategory">
                <h2>{category.Key}</h2>
              </div>
              {category["SubCategory"].map((subCategory, subIndex) => (
                <div key={subIndex} className="sub-category item">
                  <div
                    className="title"
                    onClick={() => toggleSubCategory(subCategory)}
                  >
                    <h3>{subCategory.Name}</h3>
                    <div className="edit-drop">
                      <div className="edit-button">
                        {email && (
                          <Link
                            to={`/edit/${subCategory.Name}`}
                            state={{
                              subCategoryData: subCategory.Data,
                              categoryName: categoryName,
                              categoryData: data,
                            }}
                          >
                            <button>Edit</button>
                          </Link>
                        )}
                      </div>
                      <div className="drop-icons">
                        {selectedSubItems.includes(subCategory) ? (
                          <img src={DropupIcon} alt="Dropup Icon" />
                        ) : (
                          <img src={DropdownIcon} alt="Dropdown Icon" />
                        )}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`content ${
                      selectedSubItems.includes(subCategory) ? "show" : ""
                    }`}
                  >
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
                      {showImages[subCategory.Name] && (
                        <img
                          id={"image-" + subCategory.Name}
                          src={`/uploadImage/${subCategory.Name}.png`}
                          onError={() => document.getElementById("image-" + subCategory.Name).setAttribute("hidden", true)}
                        />
                      )}
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
};

export default DashboardAccordion;
