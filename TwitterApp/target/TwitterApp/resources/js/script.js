class PostsList {

    _posts = new Array();
    constructor(posts) {
        this._posts = posts;
    }


    static validateDate(date) {
        date = new Date(date.getTime() - 3000000);

        let stringDate = date.getFullYear().toString() +
            "-" + ((date.getMonth() + 1).toString().length == 2 ? (date.getMonth() + 1).toString() : "0" + (date.getMonth() + 1).toString()) +
            "-" + (date.getDate().toString().length == 2 ? date.getDate().toString() : "0" + date.getDate().toString()) +
            "T" + (date.getHours().toString().length == 2 ? date.getHours().toString() : "0" + date.getHours().toString()) +
            ":" + ((parseInt(date.getMinutes() / 5) * 5).toString().length == 2 ? (parseInt(date.getMinutes() / 5) * 5).toString() : "0" +
                (parseInt(date.getMinutes() / 5) * 5).toString()) + ":00";

        let regularExp = /^(([1-2]\d{3}-[0]?[1-9]|1[0-2])-([0-2]?[0-9]|3[0-1])T(20|21|22|23|[0-1]?\d{1}):([0-5]?\d{1}):([0-5]?\d{1}))$/;

        if (stringDate.match(regularExp) != null) {
            return true;
        }
        return false;
    }


    static validatePhotoLink(link) {
        let regularExp = /\/(?:.(?!\/))+([a-zA-Z0-9\s_\\.\-\(\):])+(.png|.gif|.bmp)$/;
        if (link.match(regularExp) != null) {
            return true
        }
        return false;
    }


    static validatePost(post) {

        if (
            post.id &&
            post.description &&
            post.author &&
            post.createdAt &&
            post.photoLink) {

            if (Number.isInteger(parseInt(post.id)) &&
                post.description.length < 200 &&
                post.author.length < 15 &&
                PostsList.validateDate(post.createdAt) &&
                PostsList.validatePhotoLink(post.photoLink)) {
                return true;
            }

            else {
                return false;
            }

        }

        else false;
    }


    addAll(posts) {
        var notValidatedPosts = new Array();
        if(posts)
        {
            for (let i = 0; i < posts.length; i++) {
                if (PostsList.validatePost(posts[i])) {
                    if (!this.add(posts[i])) {
                        notValidatedPosts.push(posts[i]);
                    }
                }
                else {
                    notValidatedPosts.push(posts[i]);
                }
            }
        }        
    
        return notValidatedPosts;
    }


    clear() {
        this._posts = [];
    }


    get(id) {
        var foundPost = this._posts.find((post) => {
            return post.id == id;
        });
        return foundPost;
    }


    getPage(skip = 0, top = 10, filterConfig) {
        let sortedPosts = [];
        this._posts.sort((a, b) => a.createdAt - b.createdAt)
        if (!filterConfig) {
            for (let i = 0; i < top; i++) {
                sortedPosts[i] = this._posts[i + skip];
            }
            return sortedPosts;
        }
        else {
            if (filterConfig.rule == 'autor') {
                for (let i = 0; i < top; i++) {
                    if (this._posts[i].author == filterConfig.filterValue)
                        sortedPosts[i] = this._posts[i + skip];
                }
            }
            return sortedPosts;
        }
    }


    add(post) {
        if (PostsList.validatePost(post)) {

            for (let i = 0; i < this._posts.length; i++) {
                if (this._posts[i].id == post.id) {
                    return false;
                }
            }
            this._posts.push(post);
            this._posts.sort((a, b) => a.createdAt - b.createdAt)
            return true;
        }
        else {
            return false;
        }
    }


    edit(id, post) {
        let postForEdit = this.get(id)
        for (let key in post) {
            if (key) {
                if (postForEdit[key]) {
                    postForEdit[key] = post[key]
                }
            }
        }

        if (!PostsList.validatePost(postForEdit))
            return false;
        else {
            for (let i = 0; i < this._posts.length; i++) {
                if (this._posts[i].id == id) {
                    this._posts[i] = postForEdit;
                }
            }
        }

        this._posts.sort((a, b) => a.createdAt - b.createdAt)
        return true;
    }


    remove(id) {

        for (let i = 0; i < this._posts.length; i++) {

            if (this._posts[i].id == id) {
                this._posts.splice(i, 1);
                return true;
            }
        }
        return false;
    }

}


let postsList = new PostsList(posts)
console.log(postsList.getPage());

console.log(postsList.add(validatedPostForAdding)) //true

console.log(postsList.add({})) //false
console.log(postsList.add({ id: '1' })) //false
console.log(postsList.add(notValidatedPostForAdding)) //false

console.log(postsList.edit(1, { author: "Mr.One" })) //true
console.log(postsList.get(1))

console.log(postsList.getPage());
console.log(postsList.getPage(0, 2));
console.log(postsList.getPage(2, 4));

console.log(postsList.getPage({}));
console.log(postsList.getPage());

console.log(postsList.remove(20)); //true
console.log(postsList.get(20)); 

console.log(postsList.addAll())
console.log(postsList.addAll(sameID_Posts))
console.log(postsList.addAll(postsForAdding ))

console.log(postsList.getPage());
postsList.clear()
console.log(postsList.getPage());