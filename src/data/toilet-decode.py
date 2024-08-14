import json

# JSON 파일 불러오기
with open('toilet.json', 'r', encoding='utf-8') as file:
    toilets = json.load(file)

# 디코딩된 데이터를 JSON 파일로 저장
with open('toilet_decoded.json', 'w', encoding='utf-8') as file:
    json.dump(toilets, file, ensure_ascii=False, indent=4)

print("JSON 파일이 한글로 디코딩되었습니다.")
