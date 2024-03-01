import React, { useEffect , useState } from 'react';
import '../styles/DashboardAccordion.css'; 
import DropdownIcon from '../icons/dropdown.png';
import DropupIcon from '../icons/dropup.png';
// import { useDataHandle } from '../hooks/useData';

const DashboardAccordion = ({ data }) => {
    // const { error, isLoading, fetchData } = useDataHandle();
    const [selectedSubItem, setSelectedSubItem] = useState(null);

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
        if (selectedSubItem == index) {
            return setSelectedSubItem(null);
        }

        setSelectedSubItem(index);
    }

    return (
        <div className="wrapper">
            <div className="accordion">
                {data.map((category, index) => (
                    <div key={index} className="item">
                        <div className="title" onClick={() => toggleSubCategory(index)}>
                            {category['Sub-Category'].map((subCategory, subIndex) => (
                                <div key={subIndex}>
                                    <h3>{subCategory.Name}</h3>
                                </div>
                            ))}

                            <span className="dropdownIcons">
                                {selectedSubItem === index ? <img src={DropupIcon} alt="Dropup Icon" /> : <img src={DropdownIcon} alt="Dropdown Icon" />}
                            </span>
                        </div>
                        <div className={selectedSubItem === index ? 'content show' : 'content'}>
                            {category['Sub-Category'].map((subCategory, subIndex) => (
                                <div key={subIndex}>
                                    <h4>{subCategory.Name}</h4>
                                    <ul>
                                        {subCategory.Data.map((item, itemIndex) => (
                                            <li key={itemIndex}>
                                                Year: {item.Year}, Value: {item.Value}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DashboardAccordion;