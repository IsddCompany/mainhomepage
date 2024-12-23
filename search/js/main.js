const URLSearch = new URLSearchParams(location.search);

//url이 ?search= 를 가지고 있다면 totext(search갑) 
if (URLSearch.has('search')){
    document.getElementsByClassName("searchbox")[0].value = URLSearch.get('search');
    totext(URLSearch.get('search'))
}

//국가 코드 맵인데 대안을 찾아야 할거 가틈;
const countryCodeMap = {
    '1': '미국',
    '44': '영국',
    '33': '프랑스',
    '81': '일본',
    '49': '독일',
    '91': '인도',
    '86': '중국',
    '62': '인도네시아',
    '299': '그린란드',
};

//이 함수가 불러지면 키가 엔터키인지 확인후 위치를 isdd.kro.kr/search?search=<d
function enterkey() {
    if (window.event.keyCode == 13) {
    location.href = `https://isdd.kro.kr/search?search=${document.getElementsByClassName("searchbox")[0].value}`
  }
}



function getCountryNameFromCode(code) {
    return countryCodeMap[code];
}

function totext(file) { 
    fetch(`https://raw.githubusercontent.com/IsddCompany/isdddatas/main/isdddatas/${file}.isdo`)
    .then(response => {
        if (!response.ok) {
            if (response.status = 404) {
                throw new Error("파일을 찾을수 없습니다");
            } else {
                throw new Error(`에러!: ${response.status}`);
            }
            
        }
        return response.text();
    })
    .then(data => {
        let hexArray = data.split(' ');
        let text = hexArray.map(byte => String.fromCharCode(parseInt(byte, 16))).join('');
        let finalText = atob(text);

        let a = finalText.split(' ');
        console.log(a)
        const result = a.map(item => {
            if (item.startsWith('GenderType:')) {
                return item.split(':')[1];
            } else if (item.startsWith('Country:')) {
                return item.split(':')[1];
            }
            return item;
        }).filter(item => item !== undefined);

        let gender;
        if (result[3] == '1') { gender = "남성"; }
        else if (result[3] == '2') { gender = "여성"; }
        else if (result[3] == '3') { gender = "간성"; }

        let dataElement = document.getElementsByClassName("data")[0];
        if (dataElement && result.length >= 6) {
            dataElement.innerHTML = `
                <h1>검색결과</h1>
                <h2>${result[0] || '정보 없음'}</h2>
                <p>제작 년도: ${result[1] || '정보 없음'}년</p>
                <p>사용엔진: ${result[2] || '정보 없음'}</p>
                <p>성별: ${gender || '정보 없음'}</p>
                <p>제작 국가: ${getCountryNameFromCode(result[4]) || '알 수 없음'}</p>
            `;
        } else {
            if (dataElement) {
                dataElement.innerHTML = '<p>데이터를 표시할 수 없습니다.</p>';
            }
        }
    })
    .catch(error => {
        let dataElement = document.getElementsByClassName("data")[0];
        if (dataElement) {
            if (error.message == '파일을 찾을수 없습니다') {
                dataElement.innerHTML = `<p>${error.message}</p>`;
            } else {
                dataElement.innerHTML = `<p>파일을 불러오는 중 오류가 발생했습니다: ${error.message}</p>`;
            }
            
        }
    });
}


