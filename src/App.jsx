// src/App.jsx
import React from 'react';
import ToiletList from './components/ToiletList'; // ToiletList 컴포넌트 임포트

const App = () => {
  return (
      <>
      <h1>공공 화장실 목록</h1>
      <ToiletList /> {/* ToiletList 컴포넌트 렌더링 */}
      </>
  );
};

export default App;
