
class View {

    static _template;
    static _container;
    tempEdit;

    constructor() {
        this._template = document.getElementById('note-template');
        this._container = document.getElementById('container');
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
         
        if (item.tagName == 'ARTICLE')
        {         
            item.id = data.id
        }
            


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


    clearPage() {
        document.querySelectorAll('.post').forEach(function (a) {
            a.remove();
        })
    }

    showFilterBox() {
        document.getElementById("myDropdown").classList.toggle("show");
    }

    showFilterOptions(authors) {
        let filterOptions = document.getElementById("filter-content");
        filterOptions.innerHTML = "";
        authors.forEach(author => {
            let button = document.createElement("button");
            button.classList.add("filterValue");
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

        let buttonAdd = document.getElementById("button-add");
        buttonAdd.style.visibility = "visible";


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

        let buttonAdd = document.getElementById("button-add");
        buttonAdd.style.visibility = "hidden";

        let currentUserElement = document.getElementById("currentUser");
        currentUserElement.innerHTML = "";
    }

    createAdding() {
        let container = document.getElementById('container');
        console.log(container)

        var node = document.createElement("button");
        node.id = "morePosts"
        node.style.cssText = "margin:auto; display:block; margin-bottom: 10px"
        node.innerHTML = "Add 10 more posts"

        container.appendChild(node)
    }

    deleteAdding() {
        let adding = document.getElementById('morePosts');
        adding.parentNode.removeChild(adding);
    }


    createEditTextArea(event) {
        let article = event.target.closest('article');

        let editTextArea = document.createElement("textarea");
        editTextArea.id = "editPostText"
        editTextArea.style.cssText = "height: 200px; margin: 10px 25px 30px 25px;  width: 95%; resize: none;"

        let mainContent = article.getElementsByClassName("main-content")[0]
        editTextArea.innerHTML = mainContent.innerHTML;
        console.log(mainContent)
        let parent = mainContent.parentNode

        this.tempEdit = parent;
        console.log(this.tempEdit)

        console.log(parent)

        parent.innerHTML = '';



        parent.appendChild(editTextArea)

        return editTextArea
    }

    createEditSaveButton(event) {
        let article = event.target.closest('article');
        console.log(article)

        var saveEditButton = document.createElement("button");
        saveEditButton.id = "editPost"
        saveEditButton.style.cssText = "margin-left: 5px; margin-right: 30px; margin-bottom: 20px; float: right;"
        saveEditButton.innerHTML = "Save"

        //
        let mainContent = document.getElementById("editPostText")

        let parent = mainContent.parentNode

        console.log(saveEditButton)

        parent.appendChild(saveEditButton)

        saveEditButton = document.querySelector('#editPost');
        return saveEditButton
    }

    createEditCancelButton(event) {
        let article = event.target.closest('article');
        var cancelEditButton = document.createElement("button");
        cancelEditButton.id = "cancelEditPost"
        cancelEditButton.style.cssText = "margin-left: 10px; margin-right: 10px; margin-bott    om: 20px; float: right"
        cancelEditButton.innerHTML = "Cancel"


        //
        let mainContent = document.getElementById("editPostText")
        let parent = mainContent.parentNode
        parent.appendChild(cancelEditButton)

        cancelEditButton = document.querySelector('#cancelEditPost');
        return cancelEditButton
    }

    createPostContent(data) {
        let newNote = document.importNode(this._template.content, true);
        var postElement = newNote.querySelector(".post");

        let article = event.target.closest(".post")
        console.log(article)
        console.log(postElement)
        //article.innerHTML = ''

        article.parentNode.replaceChild(postElement, article)
        let newarticle = event.target.closest(".post")

        this.fillItemData(postElement, data)
        /// article = postElement;
        console.log(postElement)

        // this.fillItemData(postElement,data)

        /*console.log(event.target)
        let postMain = event.target.closest('.post-main');
        console.log(this.tempEdit)
        console.log(postMain)
        postMain = '';
        postMain = this.tempEdit;*/







        /*
        this.deleteElement(post.id)
        this.addElement(post)*/

    }


/*
    createMainContent() {

        var template = document.getElementById('note-template')
        var article = template.getElementsByClassName('post')[0]
        console.log(template)
        console.log(article)

        var item = document.createElement("div");
        item.className = "main-content"
        item.setAttribute("data-target", "description");

        let mainContent = document.getElementById("editPostText")
        let parent = mainContent.parentNode

        parent.innerHTML = '';
        parent.appendChild(item)

        item.innerHTML = data.description




        //view.fillItemData(item, data)

    }*/



}

