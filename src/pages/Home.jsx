import React from 'react';
import Sidebar from '../components/Sidebar';
import Map from '../components/Map';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <Sidebar/>
            <Map/>
        </div>
    )
}

export default Home;