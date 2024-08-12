// src/components/ToiletList.jsx
import React from 'react';
import toiletData from '../data/toilet.json'; // JSON 파일을 임포트

const ToiletList = () => {
  return (
    <div>
      <h1>화장실 목록</h1>
      <ul>
        {toiletData.map((toilet, index) => (
          <li key={index}>
            <h2>{toilet.화장실명}</h2>
            <p>주소: {toilet.소재지도로명주소}</p>
            <p>구분: {toilet.구분}</p>
            <p>개방시간: {toilet.개방시간 || '정보 없음'}</p>
            <p>개방시간 상세: {toilet.개방시간상세}</p>
            <p>설치 연월: {toilet.설치연월}</p>
            <p>비상벨 설치 여부: {toilet.비상벨설치여부}</p>
            <p>화장실 입구 CCTV 설치 유무: {toilet.화장실입구CCTV설치유무}</p>
            <h3>남성용 시설 정보</h3>
            <p>대변기 수: {toilet['남성용-대변기수']}</p>
            <p>소변기 수: {toilet['남성용-소변기수']}</p>
            <p>장애인용 대변기 수: {toilet['남성용-장애인용대변기수']}</p>
            <p>장애인용 소변기 수: {toilet['남성용-장애인용소변기수']}</p>
            <p>어린이용 대변기 수: {toilet['남성용-어린이용대변기수']}</p>
            <p>어린이용 소변기 수: {toilet['남성용-어린이용소변기수']}</p>
            <h3>여성용 시설 정보</h3>
            <p>대변기 수: {toilet['여성용-대변기수']}</p>
            <p>장애인용 대변기 수: {toilet['여성용-장애인용대변기수']}</p>
            <p>어린이용 대변기 수: {toilet['여성용-어린이용대변기수']}</p>
            <h3>관리 정보</h3>
            <p>관리 기관명: {toilet['관리기관명']}</p>
            <p>데이터 기준 일자: {toilet['데이터기준일자']}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToiletList;
