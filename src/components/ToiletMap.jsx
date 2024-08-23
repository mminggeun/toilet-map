import React, { useEffect, useState } from 'react';
import './ToiletMap.css';
import toiletData from '../data/toilet_geocoded.json';
import customMarkerImage from '../assets/images/yy-pin.png'; // 이미지 경로를 import

const ToiletMap = ({ location }) => {
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
          level: 5,
        };

        const mapInstance = new window.kakao.maps.Map(container, options);
        setMap(mapInstance);

        // 동일한 위치의 화장실 데이터를 그룹화
        const locationMap = new Map(); // Map 객체 사용

        toiletData.forEach((toilet) => {
          const positionKey = `${toilet.latitude},${toilet.longitude}`;
          if (!locationMap.has(positionKey)) {
            locationMap.set(positionKey, []);
          }
          locationMap.get(positionKey).push(toilet);
        });

        // 마커와 오버레이 설정
        locationMap.forEach((toilets, positionKey) => {
          const [latitude, longitude] = positionKey.split(',').map(Number);
          const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);

          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
          });

          marker.setMap(mapInstance);

          let currentIndex = 0; // 현재 표시 중인 화장실의 인덱스

          const createOverlayContent = () => {
            const toilet = toilets[currentIndex];
            const name = toilet['화장실명'] || '이름 없음';
            const address = toilet['소재지도로명주소'] || toilet['소재지지번주소'] || '주소 정보 없음';
            const openingHours = toilet['개방시간'] || '개방시간 정보 없음';
            const openingHoursDetail = toilet['개방시간상세'] || '정보 없음';

            // 다음 화장실 정보 버튼은 여러 개일 경우에만 표시
            const buttons = toilets.length > 1 ? `
              <button class="next-button" style="position:absolute; bottom:5px; right:5px;">다음</button>
            ` : '';

            const content = document.createElement('div');
            content.className = 'toilet-info-window';
            content.innerHTML = `
              <button class="close-button" style="position:absolute; right:5px; top:5px;">X</button>
              <strong>${name}</strong><br/>
              주소: ${address}<br/>
              개방시간: ${openingHours}<br/>
              개방시간 상세: ${openingHoursDetail}<br/>
              ${buttons}
            `;

            // 닫기 버튼 이벤트 설정
            content.querySelector('.close-button').onclick = () => {
              customOverlay.setMap(null);
            };

            // 다음 버튼 이벤트 설정
            if (toilets.length > 1) {
              const nextButton = content.querySelector('.next-button');
              if (nextButton) {
                nextButton.onclick = (e) => {
                  e.stopPropagation(); // 클릭 이벤트 버블링 방지
                  currentIndex = (currentIndex + 1) % toilets.length;
                  customOverlay.setContent(createOverlayContent());
                };
              }
            }

            return content;
          };

          const customOverlay = new window.kakao.maps.CustomOverlay({
            position: markerPosition,
            content: createOverlayContent(),
            xAnchor: 0.5,
            yAnchor: 1.0,
            clickable: true,
          });

          window.kakao.maps.event.addListener(marker, 'click', () => {
            customOverlay.setMap(mapInstance);
          });
        });
      });
    };
  }, []);

  // 사용자가 입력한 위치에 따른 지도 중심 이동 및 마커 표시
  useEffect(() => {
    if (map && location) {
      const coords = new window.kakao.maps.LatLng(location.latitude, location.longitude);

      // 지도 중심을 사용자가 입력한 위치로 이동
      map.setCenter(coords);

      // 마커 이미지 설정
      const imageSize = new window.kakao.maps.Size(44, 49); // 마커 이미지의 크기
      const imageOption = { offset: new window.kakao.maps.Point(27, 69) }; // 마커 이미지에서 좌표에 일치시킬 점의 위치

      // 마커 이미지를 생성
      const markerImage = new window.kakao.maps.MarkerImage(customMarkerImage, imageSize, imageOption);

      // 현재 위치 마커 표시
      const marker = new window.kakao.maps.Marker({
        position: coords,
        image: markerImage, // 마커 이미지 설정
      });

      marker.setMap(map);

      // 인포윈도우 추가
      const infowindow = new window.kakao.maps.InfoWindow({
        content: '<div style="padding:5px;">현위치</div>',
      });

      infowindow.open(map, marker);
    }
  }, [map, location]);

  return <div id="map" style={{ width: '100%', height: '100vh' }}></div>;
};

export default ToiletMap;
