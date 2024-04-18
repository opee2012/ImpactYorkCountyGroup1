import React, { useState } from "react";
import "../styles/DashboardAccordion.css";
import DropdownIcon from "../icons/dropdown.png";
import DropupIcon from "../icons/dropup.png";
import { useAuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const DashboardAccordion = ({ category, searchInput }) => {
  const [selectedSubItems, setSelectedSubItems] = useState([]);
  const [showImages, setShowImages] = useState({});
  const [imageErrors, setImageErrors] = useState({});

  let data;
  let categoryName;
  if(category) {
    data = category.Data;
    categoryName = category.Category;
  }
  
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
      [subCategory.Name]: !prevState[subCategory.Name],
    }));
  };

  const handleDeleteImage = async (imageName) => {
    if (!window.confirm("Are you sure you want to delete this image?")) {
        return;
    }

    try {
        const response = await fetch(`/deleteImage/${encodeURIComponent(imageName)}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            setShowImages((prevState) => ({
                ...prevState,
                [imageName]: false,
            }));
            // window.location.reload(); <------- Fixes visual glitch but worsens UX
            alert('Image deleted successfully.');
        } else {
            throw new Error('Failed to delete the image.');
        }
    } catch (error) {
        console.error('Error deleting image:', error);
        alert('Error deleting image.');
    }
};


  const filteredData = data
    ? data
        .map((category) => ({
          ...category,
          SubCategory: category.SubCategory.filter((subCategory) => {
            const name = subCategory.Name || "";
            const searchText = (searchInput || "").toLowerCase();
            return name.toLowerCase().includes(searchText);
          }),
        }))
        .filter((category) => category.SubCategory.length > 0)
    : null;


  return (
    <div className="wrapper">
      <div className="wrapper-inner">
        <div className="accordion">
          {category
            ? filteredData.map((category, index) => (
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
                                to={`/edit/${encodeURIComponent(
                                  subCategory.Name
                                )}`}
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
                            <div>
                              <img
                                src={`/uploadImage/${subCategory.Name}.png`}
                                onError={() => setImageErrors(prev => ({ ...prev, [subCategory.Name]: true }))}
                                onLoad={() => setImageErrors(prev => ({ ...prev, [subCategory.Name]: false }))}
                                alt={subCategory.Name}
                                style={{ display: imageErrors[subCategory.Name] ? 'none' : 'block' }}
                              />
                              <div className="delete-button">
                              {email && !imageErrors[subCategory.Name] && (
                                <button onClick={() => handleDeleteImage(subCategory.Name)}>Delete Image</button>
                              )}
                              </div>
                            </div>
                        )}

                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default DashboardAccordion;
