
class View {   

    static _template;
    static _container;

    constructor() {       
        this._template = document.getElementById('note-template'); 
        this._container = document.getElementById('notes');
    }

    deleteElement(id) {
        let element = document.getElementById(id);
        element.parentNode.removeChild(element);
    }

    addElement(post) { 

        let newNote = document.importNode(this._template.content, true);
        this.fillItemData(newNote, post);
        this._container.appendChild(newNote);
    }

    fillItemData(item, data) {

        var postElement = item.querySelector(".post");
        if (postElement != null)
            postElement.id = data.id;

        let placeholders = item.querySelectorAll('[data-target]');

        [].forEach.call(placeholders || [], (phElement) => {

            let key = phElement.getAttribute('data-target');

            if (key == 'createdAt' && data[key] != 'No date') {
               // var formated_date = convertDate(data[key]); 
               
               var formated_date = data[key].toISOString();
               formated_date = formated_date.replace("T", " ")
               formated_date = formated_date.replace(".000Z", "")
               phElement.textContent = String(formated_date);
            }

            else if (key == 'photoLink') {
                phElement.src = data[key];
            }

            else {
                phElement.textContent = String(data[key]);
            }
        });
    }

    showAddElements() {
        let element = document.getElementById("addPost");
        element.style.display = "flex";
    }

    hideAddElements() {
        let element = document.getElementById("addPost");
        element.style.display = "none";
    }


clearPage()
{
    document.querySelectorAll('.post').forEach(function (a) {
        a.remove();
    })
}

showFilterBox()
{
    document.getElementById("myDropdown").classList.toggle("show");
}

showFilterOptions(authors)
{
    let filterOptions = document.getElementById("filter-content");
    filterOptions.innerHTML = "";
    authors.forEach(author => {
        let button = document.createElement("button");
        button.innerHTML = author;
        filterOptions.appendChild(button);
    });
}

login() {
    let userButton = document.getElementById("user-button");
    userButton.style.display = "inline";

    let logoutButton = document.getElementById("logout-button");
    logoutButton.style.display = "inline";

    let loginButton = document.getElementById("login-button");
    loginButton.style.display = "none";

    let buttonFilter = document.getElementById("button-filter");
    buttonFilter.style.visibility = "visible";

    let buttonHashtag = document.getElementById("button-hashtag");
    buttonHashtag.style.visibility = "visible";

    let postButtons = document.getElementsByClassName("post-button");

    for (let i = 0; i < postButtons.length; i++) {
        postButtons[i].style.visibility = "visible";
    }

    let currentUserElement = document.getElementById("currentUser");
    currentUserElement.innerHTML = currentUser.name;


}

logout() {
    let logoutButton = document.getElementById("logout-button");
    logoutButton.style.display = "none";

    let userButton = document.getElementById("user-button");
    userButton.style.display = "none";

    let loginButton = document.getElementById("login-button");
    loginButton.style.display = "inline";

    let buttonFilter = document.getElementById("button-filter");
    buttonFilter.style.visibility = "hidden";

    let buttonHashtag = document.getElementById("button-hashtag");
    buttonHashtag.style.visibility = "hidden";

    let postButtons = document.getElementsByClassName("post-button");

    for (let i = 0; i < postButtons.length; i++) {
        postButtons[i].style.visibility = "hidden";
    }

    let currentUserElement = document.getElementById("currentUser");
    currentUserElement.innerHTML = "";
}


}

