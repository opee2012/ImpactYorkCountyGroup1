import React, { useState } from 'react';
import '../styles/DashboardAccordion.css'; 
import DropdownIcon from '../icons/dropdown.png';
import DropupIcon from '../icons/dropup.png';

const DashboardAccordion = ( {data} ) => {
const [selectedSubItem, setSelectedSubItem] = useState(null);

    const toggleSubCategory = (i) => {
        if (selectedSubItem == i) {
            return setSelectedSubItem(null);
        }

        setSelectedSubItem(i);
    }

return(
    <div className="wrapper">
        <div className="accordion">
            {data.map((item, i) => (
                <div className="item">
                    <div className="title" onClick={() => toggleSubCategory(i)}>
                        <h3>{item.title}</h3>
                        <span className="dropdownIcons">{selectedSubItem === i ? <img src={ DropupIcon } /> : <img src={ DropdownIcon } />}</span>
                    </div>
                    <div className={selectedSubItem === i ? 'content show' : 'content'}>{item.description}</div>

                </div>
            ))}
        </div>
    </div>
)
}

export default DashboardAccordion;