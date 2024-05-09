var password = document.getElementsByClassName("password")[0];
var email = document.getElementsByClassName("email")[0];

function login() {
    if (email.value == '' && password.value == 0){
        alert("이메일 또는 아이디, 비밀번호를 입력해주십시오")
    }
    else if(password.value == 0) {
        alert("비밀번호를 입력해주십시오")
    }
    else if (email.value == '') {
        alert("이메일을 입력해 주십시오")
    }
    else if(email.value == "0" && password.value == "0") {
        //이건 나중에 집가서 ㄱㄱ        
    }
    else{
        alert("비밀번호 또는 아이디가 옳지 않습니다.")
    }
}