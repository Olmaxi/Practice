/*
To change user’s state, you need to click the login button located in header.
*/

let postsList = new PostsList(posts);

let view = new View();

function addPost(post) {
    if (postsList.add(post))
        view.addElement(post);
}

function editPost(id, post) {
    if (postsList.edit(id, post)) {
        let element = document.getElementById(id);
        view.fillItemData(element, post);
    }
}

function likePost(id) {
    postsList.likePost(id)
    let element = document.getElementById(id);
    let post = postsList.get(id);
    view.fillItemData(element, post);
}

function dislikePost(id) {
    postsList.dislikePost(id)
    let element = document.getElementById(id);
    let post = postsList.get(id);
    view.fillItemData(element, post);
}


function deletePost(id) {
    if (postsList.remove(id)) {
        view.deleteElement(id);
    }
}

function getPage(filterConfig, skip = 0, top = 10) {
    clearPage();
    let posts = postsList.getPage(filterConfig, skip, top);

    posts.forEach((post) => {
        view.addElement(post);
    }
    );
    view.createAdding();
}

function getPost(id) {
    clearPage();
    let post = postsList.get(id);
    view.addElement(post);
}

function clearPage() {
    view.clearPage();
}

function login() {
    view.login();
}

function logout() {
    view.logout();
}

function showFilterBox() {
    view.showFilterBox();
}

function showFilterOptions() {
    view.showFilterOptions(postsList.authorSet);
}

function getMorePosts() {

}

getPage();

login();

let morePosts = document.querySelector('#morePosts');
morePosts.addEventListener('click', handleAddMorePosts)

function handleAddMorePosts() {
    var count = document.querySelectorAll('article').length;
    view.deleteAdding();
    getPage("", "", count + 10)
}

let myDropdown = document.getElementById('myDropdown');
myDropdown.addEventListener('click', handleAuthorFilterClick);

function handleAuthorFilterClick(event) {
    if (event.target.className == "filterValue") {
        getPage({ field: "author", filterValue: [event.target.innerHTML] })
        view.deleteAdding();
    }
}

///NO DELEGATE

var aboutCenter = document.querySelectorAll('.aboutCenter');

/* 1. Находим все кнопки для удаления статей */
[].forEach.call(aboutCenter, function (btn) {
    btn.addEventListener('click', handleClick)
});

function handleClick() {
    console.log('Bye');
}

///NO DELEGATE[2]
var articleListNode = document.querySelectorAll('.about');

[].forEach.call(articleListNode, function (btn) {
    btn.addEventListener('click', handleDeleteBtnClick)
});



function handleDeleteBtnClick(event) {
    /*
    event.target это что угодно внутри .article-list,
    надо проверить, что event.target это именно наша кнопка
    */
    if (event.target.tagName !== 'SPAN') {
        return; /* если это была не кнопка, событие обрабатывать не
    надо */
    }
    console.log("hello")
}

var articleContainer = document.querySelector('#container');

articleContainer.addEventListener('click', handleDeleteBtnClick);
articleContainer.addEventListener('click', handleLikeBtnClick);
articleContainer.addEventListener('click', handleDislikeBtnClick);



///EDIT
articleContainer.addEventListener('click', handleEditBtnClick);

function handleEditBtnClick(event) {
    if (event.target.className != 'post-button edit')
        return;

    let editTextArea = view.createEditTextArea(event);
    let saveEditButton = view.createEditSaveButton(event);
    let cancelEditButton = view.createEditCancelButton(event);



    saveEditButton.addEventListener('click', handleEditSaveBtnClick);
    cancelEditButton.addEventListener('click', handleEditCancelBtnClick);


    function handleEditCancelBtnClick() {
        /* let article = event.target.closest('article');
        let data = postsList.get(article.id)*/
    
        let article = event.target.closest('.post');    
        let id = article.id;
        let post = postsList.get(id)

        view.createPostContent(post)    

        
    }








    function handleEditSaveBtnClick() {
        let article = event.target.closest('.post');    
        let id = article.id;

        let text = document.getElementById("editPostText")

        console.log(text)

        let postForEdit = postsList.get(id);

        postForEdit.description = text.value;
        console.log(postForEdit)
        if(postsList.edit(id, postForEdit))
            view.createPostContent(postForEdit) 
        //let post = postsList.get(id)


    }





}














var cancelsaveBut1 = document.querySelector('#cancelEditPost');
function handlecancelEditBtnClick() {
    console.log("ffff");
}





function handleDeleteBtnClick(event) {
    if (event.target.className != 'post-button delete')
        return;
    let id = event.target.closest('article').id
    deletePost(id);
}

function handleLikeBtnClick(event) {
    if (event.target.className != 'post-button like')
        return;
    let id = event.target.closest('article').id
    likePost(id);
}

function handleDislikeBtnClick(event) {
    if (event.target.className != 'post-button dislike')
        return;
    let id = event.target.closest('article').id
    dislikePost(id);
}


var articleAdd = document.querySelector('#button-add');
articleAdd.addEventListener('click', handleAddPostClick);

function handleAddPostClick() {
    let container = document.getElementById('container');
    let article = document.getElementsByClassName('post');
    console.log(container)

    var node = document.createElement("div");
    node.id = "addPost"
    node.style.cssText = "height: 320px; "
    // node.innerHTML = "Add 10 more posts"

    // container.appendChild(node)
    container.insertBefore(node, container.childNodes[0]);

    var titleTextArea = document.createElement("textarea");
    titleTextArea.id = "addPostTitle"
    titleTextArea.style.cssText = "height: 30px; margin: 10px 25px; width: 95%; resize: none;"
    titleTextArea.innerHTML = "title"

    var postTextArea = document.createElement("textarea");
    postTextArea.id = "addPostText"
    postTextArea.style.cssText = "height: 200px; margin: 10px 25px 10px 25px;  width: 95%; resize: none;"
    postTextArea.innerHTML = "postcontent"

    var saveButton = document.createElement("button");
    saveButton.id = "savePost"
    saveButton.style.cssText = "margin-left: 5px; margin-right: 30px; float: right"
    saveButton.innerHTML = "Save"

    var cancelButton = document.createElement("button");
    cancelButton.id = "cancelSavePost"
    cancelButton.style.cssText = "margin-left: 10px; margin-right: 10px; float: right"
    cancelButton.innerHTML = "Cancel"


    node.appendChild(titleTextArea)
    node.appendChild(postTextArea)

    node.appendChild(saveButton)
    node.appendChild(cancelButton)


    var saveBut = document.querySelector('#savePost');
    console.log(saveBut)
    saveBut.addEventListener('click', handleSaveBtnClick);

    function handleSaveBtnClick() {

        let post = {
            description: postTextArea.value,
            createdAt: new Date('2020-03-23T15:50:00'),
            author: 'Mr.NoOne',
            photoLink: './resources/graphic/MrNoOne.png',
            likes: 0,
            hashtages: [],
            title: titleTextArea.value,
        }

        


        addPost(post)
        node.parentNode.removeChild(node);
    }

    var cancelBut = document.querySelector('#cancelSavePost');
    cancelBut.addEventListener('click', handleCancelBtnClick);
    function handleCancelBtnClick() {
        node.parentNode.removeChild(node);
    }
}