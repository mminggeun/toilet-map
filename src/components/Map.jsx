import React, { useEffect } from 'react';
import './Map.css'; 

const Map = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=fc608c2e76a5e1df209e3a7213732249&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(35.2285, 128.6812),
          level: 5
        };

        const map = new window.kakao.maps.Map(container, options);
      });
    };
  }, []);

  return <div id="map"></div>;
};

export default Map;
