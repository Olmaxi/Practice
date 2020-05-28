document.getElementById("form_login").addEventListener("submit", loginFunction);
let login = document.getElementById("login");
let password = document.getElementById("password");


function redirect() {

    if(localStorage.getItem("currentUser"))
    location.href = 'content.html'
}

redirect();

function loginFunction() {
    let user = users.find(user =>
        login.value == user.login && password.value == user.password)
    if(user)
      {
       let userString = JSON.stringify(user);
       localStorage.setItem('postsCount', 10);
       localStorage.setItem("currentUser", userString)
        alert(`Welcome ${login.value}`)
      }
      else alert("Inccorect username or password")

 
}

