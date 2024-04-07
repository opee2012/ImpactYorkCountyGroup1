import React, { useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { useEdit } from "../hooks/useEdit";
import { MyDropzone } from "../components/image-form";

import "../styles/Edit.css";

/**
 * Edit component for editing data of a specific subcategory.
 * Allows users to add, delete, and modify year and value pairs, and submit changes.
 * @returns {JSX.Element} The rendered Edit component.
 */
const Edit = () => {
  // State and hooks for handling data and navigation
  const { state } = useLocation();
  const { editSelectedCategory } = useEdit();
  const { subcategory } = useParams();

  // Extracting data from the location state
  const subCategoryData = state && state.subCategoryData;
  let categoryData = state && state.categoryData;
  const categoryName = state && state.categoryName;

  // Local state for managing the data being edited
  const [data, setData] = useState(subCategoryData);

  /**
  * Handles the deletion of a data field based on its index.
  * @param {number} index - The index of the data field to be deleted.
  */
  const handleDeleteField = (index) => {
    let newData = data;
    newData.splice(index, 1);
    setData([...newData]);
  };

  /**
  * Handles the change in the year value for a specific data field.
  * @param {object} e - The event object.
  * @param {number} index - The index of the data field being modified.
  */
  const handleYearChange = (e, index) => {
    const newData = [...data];
    newData[index].Year = e.target.value;
    setData(newData);
  };

  /**
  * Handles the change in the value for a specific data field.
  * @param {object} e - The event object.
  * @param {number} index - The index of the data field being modified.
  */
  const handleValueChange = (e, index) => {
    const newData = [...data];
    newData[index].Value = e.target.value;
    setData(newData);
  };

  /**
  * Handles the addition of a new data field with empty year and value.
  */
  const handleAddField = () => {
    let newData = data;
    newData.push({ Year: "", Value: "" });
    setData([...newData]);
  };

  /**
  * Handles the submission of the modified data.
  * Replaces the old category data with the new data and submits the changes.
  */
  const handleSubmit = async () => {
    JSON.stringify(categoryData).replace(
      JSON.stringify(categoryData),
      JSON.stringify(data)
    );
    let res = await editSelectedCategory(categoryName, categoryData);
    if (res.success)
      window.location.assign("/");
  };

  return (
    /**
    * Renders the Edit component with a header, content container, and a dropzone for image uploads.
    * 1. Header: Displays the IYC logo.
    * 2. Header Content: Shows the subcategory being edited.
    * 3. Content Container: Contains a table for editing year and value pairs and buttons for adding fields,
    *    submitting changes, and navigating back to the dashboard.
    * 4. Dropzone: Allows users to upload images.
    */
    <div className="editcontainer">
      <div className="header">
        <div id="logo">
          <img
            className="img-edit"
            src="/IYC.png"
            alt="IYC logo"
          />
        </div>
      </div>
      <div className="header-content">
        <h1>Edit: {subcategory}</h1>
      </div>
      {subCategoryData && (
        <div className="contentcontainer">
          <div className="datacolumns">
            <table className="table-container">
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Value</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        value={item.Year}
                        className="yeardata2"
                        onChange={(e) => handleYearChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item.Value}
                        className="valuedata2"
                        onChange={(e) => handleValueChange(e, index)}
                      />
                    </td>
                    <td>
                      <button className="delete-button" onClick={() => handleDeleteField(index)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              <button onClick={handleAddField}>Add Field</button> <br />
              <button onClick={handleSubmit}>Submit</button> <br />
              <Link to={"/"}>
                <button className="dashboard-button">Dashboard</button>
              </Link>
            </div>
          </div>
          <div className="dropzone">
            <MyDropzone />
          </div>
        </div>
      )}
    </div>
  );
};

export default Edit;