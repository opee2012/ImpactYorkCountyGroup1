import React, {useState, useEffect} from "react";
import { useParams,useLocation, Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

import "../styles/Edit.css"


const Edit = () => {

    const { name } = useParams();
    const { state } = useLocation();

    const subCategoryData = state && state.subCategoryData;
    const [data, setData] = useState(subCategoryData);

    const handleDeleteField = (index) => {
        const newData = [...data];
        newData.splice(index, 1);
        setData(newData);
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
      console.log(data);
    };

    const handleAddField = () => {
      setData([...data, { Year: '', Value: '' }]);
    };


  return (
    <div className="editcontainer">
      <div id="logo">
        <img className="img-edit" src="/IYC.png" alt="IYC logo" style={{width: '265px', height: 'auto'}}/>
      </div>
      <h1>Edit Page: {name}</h1>
      {subCategoryData && (
        <div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            {data.map((item, index) => (
              <div key={index} style={{ marginLeft: '10px', marginBottom: '20px' }}>
                <div style={{ marginBottom: '10px' }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Year:</label>
                  <input
                    type="text"
                    value={item.Year}
                    style={{ width: '50px', padding: '5px' }}
                    onChange={(e) => handleYearChange(e, index)}
                  />
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Value:</label>
                  <input
                    type="text"
                    value={item.Value}
                    style={{ width: '50px', padding: '5px' }}
                    onChange={(e) => handleValueChange(e, index)}
                  />
                </div>
                <button onClick={() => handleDeleteField(index)}>Delete</button>
              </div>
            ))}
          </div>
          <button onClick={handleAddField}>Add Field</button> <br/> <br />
          <button onClick>Submit</button> <br />
          <Link to={"/"}> 
            <button> 
              Back to Dashboard
            </button>
          </Link>
          
        </div>
      )}
    </div>
  );
      
      
      
      
};

export default Edit;