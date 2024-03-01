import React, { useEffect, useState } from 'react';
import '../styles/DashboardAccordion.css'; 
import DropdownIcon from '../icons/dropdown.png';
import DropupIcon from '../icons/dropup.png';
import { useDataHandle } from '../hooks/useData';

const DashboardAccordion = () => {
    const { error, isLoading, fetchData } = useDataHandle();
    const [selectedSubItem, setSelectedSubItem] = useState(null);

    useEffect(() => {
        // Fetch data when component mounts
        fetchData(/* any necessary parameters */)
            .then((fetchData) => {
                // Update selectedSubItem state with fetched data
                setSelectedSubItem(fetchData);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
        }, []);

    const toggleSubCategory = (i) => {
        if (selectedSubItem == i) {
            return setSelectedSubItem(null);
        }

        setSelectedSubItem(i);
    }

return(
    <div className="wrapper">
        <div className="accordion">
            {fetchData.map((item, i) => (
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