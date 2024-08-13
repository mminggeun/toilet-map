import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebartitle">
            <h2 className="sidebartitle1">창원시 </h2>
            <h2 className="sidebartitle2">공중화장실 지도</h2>
            <div className="search-container">
                <input 
                    type="text" 
                    className="search-input" 
                    placeholder="현재 위치 입력" 
                />
            </div>
            </div>
        </div>
    )
}

export default Sidebar;