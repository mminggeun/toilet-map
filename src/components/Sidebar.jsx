import React, { useState } from 'react';
import './Sidebar.css';
import { geocodeAddress } from '../data/geocode'; // geocode 유틸리티 가져오기

const Sidebar = ({ onLocationSelect }) => {
    const [inputValue, setInputValue] = useState('');

    const handleSearch = async () => {
        const coords = await geocodeAddress(inputValue);
        if (coords) {
            onLocationSelect(coords); // 변환된 좌표를 Map.jsx로 전달
        } else {
            alert('해당 주소를 찾을 수 없습니다.');
        }
    };

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
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button onClick={handleSearch}>검색</button>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
