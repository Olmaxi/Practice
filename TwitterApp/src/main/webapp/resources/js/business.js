let userString = localStorage.getItem("currentUser")
console.log(userString)
let user = JSON.parse((userString))

document.getElementById("currentUser").innerHTML = user.login
localStorage.setItem('currentFilter', null);

let service = new HttpService();



let postsList = new PostsList();
let view = new View();

/*  DOCUMENT CLICKS*/
document.addEventListener('click', handleDocumentClick);

function handleDocumentClick() {
    let dropDown = document.getElementById("myDropdown")
    console.log(event.target)
    if (dropDown.className == "dropdown-content show" && event.target.id != "button-filter" && event.target.id != "filter-option-button") {
        dropDown.className = "dropdown-content"
    }
    if (event.target.id == "morePosts") {
        handleAddMorePosts();
    }
    if (event.target.id == "button-add") {
        handleAddPostClick();
    }

}

let logoutButton = document.getElementById("logout-button");
logoutButton.addEventListener('click', () => {
    localStorage.removeItem("currentUser");
    location.href = 'index.html';
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

 async function addPost(post) {
    if (await postsList.add(post)) {
      getPage();
    }
}

async function editPost(id, post) {
    if (await postsList.edit(id, post)) {
     getPage(); 
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


async function deletePost(id) {
    if (await postsList.remove(id)) {
        view.deleteElement(id);
    }
}

async function getPage() {

    clearPage();
    let posts = [];
    posts = await postsList.getPage(getStoredFilterObject(), 0, parseInt(localStorage.getItem('postsCount')));

    console.log(posts)
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
//morePosts.addEventListener('click', handleAddMorePosts)

function handleAddMorePosts() {
    var count = document.querySelectorAll('article').length;
    // let count = localStorage.getItem("postsCount")
    console.log(count)
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

articleContainer.addEventListener('click', handleDislikeBtnClick);

function handleDislikeBtnClick(event) {
    if (event.target.className != 'post-button dislike')
        return;
    let id = event.target.closest('article').id
    dislikePost(id);
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
        postForEdit.description = editTextArea.value;

        if (postsList.edit(id, postForEdit))
            view.createPostContent(postForEdit)
    }
}

/* ADD */

var articleAdd = document.querySelector('#button-add');
articleAdd.addEventListener('click', handleAddPostClick);

function handleAddPostClick() {

    view.deleteAdding();
    let addPostArea = view.createAddPostArea();

    var saveBut = document.querySelector('#savePost');
    console.log(saveBut)
    saveBut.addEventListener('click', handleSaveBtnClick);

    let titleTextArea = document.getElementById('addPostTitle');
    let postTextArea = document.getElementById('addPostText');

    let userString = localStorage.getItem("currentUser");
    let user = JSON.parse(userString);

    function handleSaveBtnClick() {
        let post = {
            description: postTextArea.value,
            createdAt: new Date(),
            authorId: user.id,
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