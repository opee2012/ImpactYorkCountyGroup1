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
      <div id="logo">
        <img
          className="img-edit"
          src="/IYC.png"
          alt="IYC logo"
        />
      </div>
      <h1>Edit: {subcategory}</h1>
      {subCategoryData && (
        <div className="contentcontainer">
          <div className="datacolumns">
              <div className="yearcolumn">
                <h2>Year</h2>
                  {data.map((item, index) => (
                    <div className="yeardata" key={index}>
                      <input
                        type="text"
                        value={item.Year}
                        className="yeardata2"
                        onChange={(e) => handleYearChange(e, index)}
                      />
                    </div>
                  ))}
                  
                </div>
                <div>
                  <h2>Value</h2>
                  <div className="valuecolumn">
                    {data.map((item, index) => (
                      <div className="valuedata" key={index}>
                        <input
                          type="text"
                          value={item.Value}
                          className="valuedata2"
                          onChange={(e) => handleValueChange(e, index)}
                        />
                      </div>
                    ))}
                  </div>
              </div>
            
          </div>
          <button onClick={handleAddField}>Add Field</button> <br /> <br />
          <button onClick={handleSubmit}>Submit</button> <br />
          <Link to={"/"}>
            <button>Dashboard</button>
          </Link>
          <MyDropzone />
        </div>
      )}
    </div>
  );
};

export default Edit;
