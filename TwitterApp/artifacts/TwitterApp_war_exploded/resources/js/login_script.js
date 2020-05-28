document.getElementById("form_login").addEventListener("submit", loginFunction);
let login = document.getElementById("login");
let password = document.getElementById("password");


function redirect() {

    if(localStorage.getItem("currentUser"))
    location.href = 'content.html'
}

redirect();

function loginFunction() {

    if(
        users.find(user => 
            login.value == user.login)   &&
        users.find(user => 
            password.value == user.password)   
      ) 
      {
       localStorage.setItem('postsCount', 10);
       localStorage.setItem("currentUser", login.value)
        alert(`Welcome ${login.value}`)
      }
      else alert("Inccorect username or password")

 
}

