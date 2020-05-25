document.getElementById("currentUser").innerHTML = localStorage.getItem("currentUser")



localStorage.setItem('currentFilter', null);

document.addEventListener('click', handleDocumentClick);

let logoutButton = document.getElementById("logout-button");
logoutButton.addEventListener('click', () => {
    localStorage.removeItem("currentUser");
    location.href = 'login.html';
    localStorage.setItem('postsCount',10);
})


function storeCurrentFilter(filter) {
    var jsonFilter = JSON.stringify(filter);
    localStorage.setItem('currentFilter', jsonFilter);
}

function getStoredFilterObject() {
    let filter = JSON.parse(localStorage.getItem('currentFilter')) 
    return filter;
}


function handleDocumentClick() {
    let dropDown = document.getElementById("myDropdown") 
    if (dropDown.className == "dropdown-content show" && event.target.id != "button-filter" && event.target.id != "filter-option-button") {
        dropDown.className = "dropdown-content"
    }
    if(event.target.id == "morePosts")
    {        
        handleAddMorePosts();
    }



}

let postsList = new PostsList();

let view = new View();

function addPost(post) {

    if (postsList.add(post))
    {    
        getPage();
    }
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

/*function getPage(filterConfig, skip = 0, top = 10) {
    clearPage();


    let posts = postsList.getPage(filterConfig, skip, top);

    posts.forEach((post) => {
        view.addElement(post);
    }
    );
    view.createAdding();
}*/

function getPage() {
 
    clearPage();
    let posts = [];
    posts = postsList.getPage(getStoredFilterObject(), 0 , parseInt(localStorage.getItem('postsCount')));

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


function showFilterBox() {
    view.showFilterBox();
}


function showFilterOptions() {
    view.showFilterOptions(postsList.authorSet);
}

function getMorePosts() {

}

getPage();

let morePosts = document.getElementById('morePosts');
morePosts.addEventListener('click', handleAddMorePosts)

function handleAddMorePosts() {

    var count = document.querySelectorAll('article').length;
    localStorage.setItem("postsCount", count + 10);
    view.deleteAdding();   
    getPage();
}

let myDropdown = document.getElementById('myDropdown');
myDropdown.addEventListener('click', handleAuthorFilterClick);

function handleAuthorFilterClick(event) {
   
    if (event.target.className == "filterValue") {

        let filter = {
            field: "author",
            filterValue: [event.target.innerHTML]
        }  

        storeCurrentFilter(filter)
        getPage()
        view.deleteAdding();
    }
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
        let article = event.target.closest('.post');
        let id = article.id;
        let post = postsList.get(id)

        view.createPostContent(post)
    }


    function handleEditSaveBtnClick() {
        let article = event.target.closest('.post');
        let id = article.id;

        let text = document.getElementById("editPostText")
        let postForEdit = postsList.get(id);

        postForEdit.description = text.value;

        if (postsList.edit(id, postForEdit))
            view.createPostContent(postForEdit)
    }
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

    view.deleteAdding();
    let addPostArea = view.createAddPostArea();  

    var saveBut = document.querySelector('#savePost');

    saveBut.addEventListener('click', handleSaveBtnClick);

    let titleTextArea = document.getElementById('addPostTitle');
    let postTextArea = document.getElementById('addPostText');

    function handleSaveBtnClick() {

        let post = {
            description: postTextArea.value,
            createdAt: new Date(),
            author: localStorage.getItem("currentUser"),
            photoLink: './resources/graphic/MrNoOne.png',
            likes: 0,
            hashtages: [],
            title: titleTextArea.value,
        }
        addPost(post)
        addPostArea.parentNode.removeChild(addPostArea);
    }

    var cancelBut = document.querySelector('#cancelSavePost');
    cancelBut.addEventListener('click', handleCancelBtnClick);
    function handleCancelBtnClick() {
        addPostArea.parentNode.removeChild(addPostArea);
    }
}