document.getElementById("form_login").addEventListener("submit", loginFunction);
let login = document.getElementById("login");
let password = document.getElementById("password");


function redirect() {

    if (localStorage.getItem("currentUser"))
        location.href = 'index.html'
}

redirect();

function loginFunction() {

    let currentUser = users.find(user =>
        login.value == user.login && password.value == user.password)
    if (currentUser) {
        localStorage.setItem('postsCount', 10);
        let userString = JSON.stringify(currentUser);
        localStorage.setItem("currentUser", userString)

        currentUser = undefined;
        alert(`Welcome ${login.value}`)
    }

    else alert("Inccorect username or password")


}

