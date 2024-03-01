import React, { useEffect , useState } from 'react';
import '../styles/DashboardAccordion.css'; 
import DropdownIcon from '../icons/dropdown.png';
import DropupIcon from '../icons/dropup.png';
// import { useDataHandle } from '../hooks/useData';
import Data from '../utils/data_temp/test.json';

const data = Data;

const DashboardAccordion = ({ data }) => {
    // const { error, isLoading, fetchData } = useDataHandle();
    const [selectedSubItems, setSelectedSubItems] = useState([]);

   /* useEffect(() => {
        // Fetch data when component mounts
        fetchData(/* any necessary parameters ) */
          /*  .then((data) => {
                // Update selectedSubItem state with fetched data
                setSelectedSubItem(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
        }, []);
*/

    const toggleSubCategory = (index) => {
        const newSelectedSubItems = [...selectedSubItems];
        if (newSelectedSubItems.includes(index)) {
        newSelectedSubItems.splice(newSelectedSubItems.indexOf(index), 1);
        } else {
        newSelectedSubItems.push(index);
        }
        setSelectedSubItems(newSelectedSubItems);
    };

    return (
        <div className="wrapper">
            <div className="accordion">
                {data.map((category, index) => (
                    <div key={index} className="item">
                        <div className='category-header'>
                            <h2>{category.Key}</h2>
                        </div>
                        {category['Sub-Category'].map((subCategory, subIndex) => (
                            <div key={subIndex} className="sub-category">
                            <div className="title" onClick={() => toggleSubCategory(subIndex)}>
                                <h3>{subCategory.Name}</h3>
                                <span className="dropdownIcons">
                                    {selectedSubItems === index ? <img src={DropupIcon} alt="Dropup Icon" /> : <img src={DropdownIcon} alt="Dropdown Icon" />}
                                </span>
                            </div>
                            {selectedSubItems.includes(subIndex) && (
                                <div className="content show">
                                  <ul>
                                    {subCategory.Data.map((item, itemIndex) => (
                                      <li key={itemIndex}>
                                        Year: {item.Year}, Value: {item.Value}
                                      </li>
                                    ))}
                                  </ul>
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