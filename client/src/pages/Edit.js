import React, { useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { useEdit } from "../hooks/useEdit";
import { MyDropzone } from "../components/image-form";

import "../styles/Edit.css";

const Edit = () => {
  const { state } = useLocation();
  const { editSelectedCategory } = useEdit();
  const { subcategory } = useParams();

  const subCategoryData = state && state.subCategoryData;
  let categoryData = state && state.categoryData;
  const categoryName = state && state.categoryName;
  const [data, setData] = useState(subCategoryData);

  const handleDeleteField = (index) => {
    let newData = data;
    newData.splice(index, 1);
    setData([...newData]);
  };

  const handleYearChange = (e, index) => {
    const newData = [...data];
    newData[index].Year = e.target.value;
    setData(newData);
  };

  const handleValueChange = (e, index) => {
    const newData = [...data];
    newData[index].Value = e.target.value;
   
    setData(newData);
  };

  const handleAddField = () => {
    let newData = data;
    newData.push({ Year: "", Value: "" });
    setData([...newData]);
  };

  const handleSubmit = async () => {
    JSON.stringify(categoryData).replace(
      JSON.stringify(categoryData),
      JSON.stringify(data)
    );
    let res = await editSelectedCategory(categoryName, categoryData);
    if(res.success)
      window.location.assign("/");
  };

  return (
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
