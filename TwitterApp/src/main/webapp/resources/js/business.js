document.getElementById("currentUser").innerHTML = JSON.parse(localStorage.getItem("currentUser")).login

localStorage.setItem('currentFilter', null);
localStorage.setItem('filterField', null);
localStorage.setItem('postsCount', 10);

let postsList = new PostsList();
let view = new View();

/*  DOCUMENT CLICKS*/
document.addEventListener('click', handleDocumentClick);

function handleDocumentClick() {
    let dropDown = document.getElementById("myDropdown")

    if (dropDown.className == "dropdown-content show" && event.target.id != "button-filter" && event.target.className != "filter-option-button") {
        dropDown.className = "dropdown-content"
    }
    if (event.target.id == "morePosts") {
        handleAddMorePosts();
    }
}

let logoutButton = document.getElementById("logout-button");
logoutButton.addEventListener('click', () => {
    localStorage.removeItem("currentUser");
    location.href = 'login.html';
    localStorage.setItem('postsCount', 10);    
})

function storeCurrentFilter(filter) {
    var jsonFilter = JSON.stringify(filter);
    localStorage.setItem('currentFilter', jsonFilter);
}

function getStoredFilterObject() {
    let filter = JSON.parse(localStorage.getItem('currentFilter'))
    return filter;
}

function addPost(post) {
    if (postsList.add(post)) {
        getPage();
    }
}

function likePost(id) {
    postsList.likePost(id)
    {
        let element = document.getElementById(id);
        let post = postsList.get(id);
        view.fillItemData(element, post);
    }
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

function getPage() {

    clearPage();
    let posts = [];
    posts = postsList.getPage(getStoredFilterObject(), 0, parseInt(localStorage.getItem('postsCount')));
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

    let filterButtons = document.getElementById("filter-option")
    filterButtons.addEventListener('click', showFilterOptions)
}

function showFilterOptions() {
    switch (event.target.getAttribute("option")) {

        case "author":
            localStorage.setItem('filterField', "author");
            view.showFilterOptions(postsList.authorSet);
            break;

        case "date":
            break;

        case "hashtag":
            localStorage.setItem('filterField', "hashtag");
            view.showFilterOptions(postsList.hashtagSet);
            break;
    }
}

function getMorePosts() {
}

getPage();


let morePosts = document.getElementById('morePosts');
morePosts.addEventListener('click', handleAddMorePosts)

function handleAddMorePosts() {
    let count = localStorage.getItem("postsCount")
    localStorage.setItem("postsCount", count + 10);
    view.deleteAdding();
    getPage();
}

let myDropdown = document.getElementById('myDropdown');
myDropdown.addEventListener('click', handleAuthorFilterClick);

function handleAuthorFilterClick(event) {
    if (event.target.className == "filterValue") {

        let filter = {
            field: localStorage.getItem('filterField'),
            filterValue: [event.target.innerHTML]
        }

        storeCurrentFilter(filter)
        getPage()
        view.deleteAdding();
    }
}

/* POST BUTTONS */
var articleContainer = document.querySelector('#container');

articleContainer.addEventListener('click', handleDeleteBtnClick);

/* DELETE */
function handleDeleteBtnClick(event) {
    if (event.target.className != 'post-button delete')
        return;
    let id = event.target.closest('article').id
    deletePost(id);
}

articleContainer.addEventListener('click', handleLikeBtnClick);

function handleLikeBtnClick(event) {
    if (event.target.className != 'post-button like')
        return;
    let id = event.target.closest('article').id
    likePost(id);
}

function findHashTags(text) {
    let result = text.match(/(?<=[\s>]|^)#(\w*[A-Za-z_]+\w*)/g);
    return result;
}

function addHashTagsToPost(post, hashtags) {
    let postHashtagSet = new Set(post.hashtages);
    hashtags.forEach(hashtag => postHashtagSet.add(hashtag))
    return Array.from(postHashtagSet);
}


/* EDIT */
articleContainer.addEventListener('click', handleEditBtnClick);

function handleEditBtnClick(event) {
    if (event.target.className != 'post-button edit')
        return;

    let editTextArea = view.createEditTextArea(event);
    let saveEditButton = view.createEditSaveButton(event);
    let cancelEditButton = view.createEditCancelButton(event);

    let article = event.target.closest('.post');
    let id = article.id;


    cancelEditButton.addEventListener('click', handleEditCancelBtnClick);

    function handleEditCancelBtnClick() {
        let post = postsList.get(id)
        view.createPostContent(post)
    }

    saveEditButton.addEventListener('click', handleEditSaveBtnClick);

    function handleEditSaveBtnClick() {

        let postForEdit = postsList.get(id);

        let foundHashTags = findHashTags(editTextArea.value);

        if (foundHashTags)
            postForEdit.hashtages = addHashTagsToPost(postForEdit, foundHashTags)
        else
            postForEdit.hashtages = []

        postForEdit.description = editTextArea.value;

        if (postsList.edit(id, postForEdit)) {
            view.createPostContent(postForEdit)
        }

    }
}

/* ADD */
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
            author: JSON.parse(localStorage.getItem("currentUser")).login,
            photoLink: './resources/graphic/MrNoOne.png',
            likes: [],
            hashtages: [],
            title: titleTextArea.value,
        }

        let foundHashTags = findHashTags(postTextArea.value);

        if (foundHashTags)
            post.hashtages = foundHashTags;

        addPost(post)
        addPostArea.parentNode.removeChild(addPostArea);
    }

    var cancelBut = document.querySelector('#cancelSavePost');
    cancelBut.addEventListener('click', handleCancelBtnClick);
    function handleCancelBtnClick() {
        addPostArea.parentNode.removeChild(addPostArea);
    }
}