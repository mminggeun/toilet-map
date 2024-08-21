import React, { useEffect, useState } from 'react';
import './Map.css';
import toiletData from '../data/toilet_geocoded.json';
import customMarkerImage from '../assets/images/nowlo.png'; // 이미지 경로를 import

const Map = ({ location }) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=fc608c2e76a5e1df209e3a7213732249&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(35.2285, 128.6812), // 초기 지도 중심
          level: 5
        };

        const mapInstance = new window.kakao.maps.Map(container, options);
        setMap(mapInstance);

        // 기존 화장실 데이터 마커 표시
        const uniquePositions = new Set();

        toiletData.forEach(toilet => {
          const positionKey = `${toilet.latitude},${toilet.longitude}`;

          if (!uniquePositions.has(positionKey)) {
            uniquePositions.add(positionKey);

            const markerPosition = new window.kakao.maps.LatLng(parseFloat(toilet.latitude), parseFloat(toilet.longitude));

            const marker = new window.kakao.maps.Marker({
              position: markerPosition
            });

            marker.setMap(mapInstance);

            // 데이터 유효성 검사 및 기본값 설정
            const name = toilet['화장실명'] || '이름 없음';
            const address = toilet['소재지도로명주소'] || toilet['소재지지번주소'] || '주소 정보 없음';
            const openingHours = toilet['개방시간'] || '개방시간 정보 없음';
            const openingHoursDetail = toilet['개방시간상세'] || '정보 없음';

            // HTML 문자열로 변환 (커스텀 오버레이에 사용될)
            const content = `
              <div class="toilet-info-window">
                <strong>${name}</strong><br/>
                주소: ${address}<br/>
                개방시간: ${openingHours}<br/>
                개방시간 상세: ${openingHoursDetail}
              </div>
            `;

            const customOverlay = new window.kakao.maps.CustomOverlay({
              position: markerPosition,
              content: content,
              xAnchor: 0.5,
              yAnchor: 1.0
            });

            window.kakao.maps.event.addListener(marker, 'click', () => {
              customOverlay.setMap(mapInstance);
            });

            // 지도 클릭 시 오버레이 닫기
            window.kakao.maps.event.addListener(mapInstance, 'click', () => {
              customOverlay.setMap(null);
            });
          }
        });
      });
    };
  }, []);

  // 사용자가 입력한 위치에 따른 지도 중심 이동 및 마커 표시
  useEffect(() => {
    if (map && location) {
      const coords = new window.kakao.maps.LatLng(location.latitude, location.longitude);

      // 마커 이미지 설정
      const imageSize = new window.kakao.maps.Size(44, 49); // 마커 이미지의 크기
      const imageOption = { offset: new window.kakao.maps.Point(27, 69) }; // 마커 이미지에서 좌표에 일치시킬 점의 위치

      // 마커 이미지를 생성
      const markerImage = new window.kakao.maps.MarkerImage(customMarkerImage, imageSize, imageOption);

      // 현재 위치 마커 표시
      const marker = new window.kakao.maps.Marker({
        position: coords,
        image: markerImage // 마커 이미지 설정
      });

      marker.setMap(map);

      // 인포윈도우 추가
      const infowindow = new window.kakao.maps.InfoWindow({
        content: '<div style="padding:5px;">현재 위치</div>'
      });

      infowindow.open(map, marker);
    }
  }, [map, location]);

  return <div id="map" style={{ width: '100%', height: '100%' }}></div>;
};

export default Map;
