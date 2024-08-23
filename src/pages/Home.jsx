import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ToiletMap from '../components/ToiletMap';
import './Home.css';

const Home = () => {
    const [location, setLocation] = useState(null); // 위치 정보를 저장할 상태 추가

    const handleLocationSelect = (coords) => {
        setLocation(coords); // Sidebar에서 전달된 좌표를 상태로 설정
    };

    return (
        <div className="home-container">
            <Sidebar onLocationSelect={handleLocationSelect} /> {/* Sidebar에 함수 전달 */}
            <ToiletMap location={location} /> {/* location 상태를 Map에 전달 */}
        </div>
    );
};

export default Home;