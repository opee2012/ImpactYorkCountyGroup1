import React, { useEffect , useState } from 'react';
import '../styles/DashboardAccordion.css'; 
import DropdownIcon from '../icons/dropdown.png';
import DropupIcon from '../icons/dropup.png';
import tempData from '../utils/data_temp/test.json';


const  DashboardAccordion = ({ category }) => {
    
    const [selectedSubItems, setSelectedSubItems] = useState([]);
    let data=category.Data;

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

    return (
        <div className="wrapper">
            <div className="accordion">
                {data.map((category, index) => (
                    <div key ={index}>
                        <h2>{category.Key}</h2>
                        {category['Sub-Category'].map((subCategory, subIndex) => (
                            <div key={subIndex} className="sub-category item">
                            <div className="title" onClick={() => toggleSubCategory(subCategory)}>
                                <h3>{subCategory.Name}</h3>
                                <span className="dropdownIcons">
                                    {selectedSubItems.includes(subCategory) ? <img src={DropupIcon} alt="Dropup Icon" /> : <img src={DropdownIcon} alt="Dropdown Icon" />}
                                </span>
                            </div>
                            {selectedSubItems.includes(subCategory) && (
                                <div className="content show">
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
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    </div>
    );
}

export default DashboardAccordion;