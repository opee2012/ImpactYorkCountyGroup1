import React, { useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { useEdit } from "../hooks/useEdit";
import { MyDropzone } from "../components/image-form";
import { useImgUpload } from "../hooks/useImgUpload";

import "../styles/Edit.css";

const Edit = () => {
  const { state } = useLocation();
  const [files, setFiles] = useState([]);
  const { editSelectedCategory } = useEdit();
  const { subcategory } = useParams();
  const { uploadSelectedImage, status, error } = useImgUpload();

  const subCategoryData = state && state.subCategoryData;
  let categoryData = state && state.categoryData;
  const categoryName = state && state.categoryName;
  const [data, setData] = useState(subCategoryData);

  const handleDeleteField = (index) => {
    let newData = data;
    newData.splice(index, 1);
    setData([...newData]);
    console.log(data);
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
    console.log(newData);
  };

  const handleSubmit = async () => {
    // console.log("subcategorydata", subCategoryData);
    // console.log("data", data);
    // console.log("categorydata", categoryData);
    
      

    console.log(files);
    if (files.length > 0) {
      for (let i in files) {
        const formData = new FormData();
        formData.append("file", files[i]);
      let res =  await uploadSelectedImage(formData);
      }
    }
    for (let i in categoryData) {
      if (categoryData[i].SubCategory[0].Data == subCategoryData) {
        // console.log("attemp", categoryData[i].SubCategory[0].Data);
        categoryData[i].SubCategory[0].Data = data;
      }
    }
    // console.log(categoryData);
    let res = await editSelectedCategory(categoryName, categoryData);
    // if (res.success) window.location.assign("/");
  };

  return (
    <div className="editcontainer">
      <div className="header">
        <div id="logo">
          <img className="img-edit" src="/IYC.png" alt="IYC logo" />
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
                      <button
                        className="delete-button"
                        onClick={() => handleDeleteField(index)}
                      >
                        Delete
                      </button>
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
            <MyDropzone files={files} setFiles={setFiles} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Edit;
