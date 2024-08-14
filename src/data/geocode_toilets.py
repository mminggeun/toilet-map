import json
import requests
import time
from requests.utils import quote

# Kakao API 키
API_KEY = '4c06817f7d40beaf89f7b4931de3328a'

# 지오코딩 함수
def geocode_address(address):
    url = f'https://dapi.kakao.com/v2/local/search/address.json?query={quote(address)}'
    headers = {
        "Authorization": f"KakaoAK {API_KEY}"
    }
    response = requests.get(url, headers=headers)
    data = response.json()
    
    if data['documents']:
        lat = data['documents'][0]['y']
        lng = data['documents'][0]['x']
        return lat, lng
    else:
        return None, None

# toilet.json 파일 불러오기
with open('toilet.json', 'r', encoding='utf-8') as file:
    toilets = json.load(file)

# 주소를 지오코딩하여 좌표로 변환
for toilet in toilets:
    # '소재지도로명주소'가 null이면 '소재지지번주소'를 사용
    address = toilet.get('소재지도로명주소') or toilet.get('소재지지번주소')
    
    if address:  # 주소가 존재하는 경우
        lat, lng = geocode_address(address)
        if lat is None or lng is None:
            print(f"Geocoding failed for address: {address}")
        else:
            toilet['latitude'] = lat
            toilet['longitude'] = lng
    else:
        print(f"No address available for: {toilet}")

    time.sleep(1)  # API 요청 사이에 지연을 두어 제한을 피함

# 업데이트된 데이터를 JSON 파일로 저장
with open('toilet_geocoded.json', 'w', encoding='utf-8') as file:
    json.dump(toilets, file, ensure_ascii=False, indent=4)

print("Geocoding complete and JSON file updated.")
