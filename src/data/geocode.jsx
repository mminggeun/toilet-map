export const geocodeAddress = async (address) => {
    const API_KEY = '4c06817f7d40beaf89f7b4931de3328a';
    const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(address)}`;

    try {
        const response = await fetch(url, {
            headers: {
                "Authorization": `KakaoAK ${API_KEY}`
            }
        });

        // HTTP 요청이 성공했는지 확인
        if (!response.ok) {
            console.error('API 요청 실패:', response.status, response.statusText);
            return null;
        }

        const data = await response.json();
        console.log('API 응답 데이터:', data);

        if (data.documents && data.documents.length > 0) {
            const { y: latitude, x: longitude } = data.documents[0];
            console.log('변환된 좌표:', { latitude, longitude });
            return { latitude, longitude };
        } else {
            console.error('주소를 찾을 수 없습니다:', address);
            return null;
        }
    } catch (error) {
        console.error('Geocoding error:', error);
        return null;
    }
};
