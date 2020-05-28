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




