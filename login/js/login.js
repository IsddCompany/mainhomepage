
var password = document.getElementById("password")[0];
var email = document.getElementById("email")[0];

function login() {
    if (password.value.length == 0) {
        alert("비밀번호를 입력해주십시오")
    }
    else if (email.value.length == 0) {
        alert("이메일 또는 아이디를 입력해주십시오")
    }
}