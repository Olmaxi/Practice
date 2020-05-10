class PostsList {

    _posts = new Array();

    constructor(posts) {
        this._posts = posts;
        this._fillHashtagSet();
        this._fillAuthorSet();
    }

    hashtagSet = new Set();

    _fillHashtagSet() {
        this._posts.forEach(post => {
            post.hashtages?.forEach(hashtag => {
                this.hashtagSet.add(hashtag);
            });
        });
    }

    authorSet = new Set();

    _fillAuthorSet() {
        this._posts.forEach(post => {
            this.authorSet.add(post.author);
        });
    }


    static validateDate(date) {

        date = date.toISOString();
        let regularExp = /^(([1-2]\d{3}-[0]?[1-9]|1[0-2])-([0-2]?[0-9]|3[0-1])T(20|21|22|23|[0-1]?\d{1}):([0-5]?\d{1}):([0-5]?\d{1}).000Z)$/;

        if (date.match(regularExp) != null) {
            return true;
        }
        return false;
    }


    static validatePhotoLink(link) {
        let regularExp = /\/(?:.(?!\/))+([a-zA-Z0-9\s_\\.\-\(\):])+(.png|.gif|.bmp|.jpg)$/;
        if (link.match(regularExp) != null) {
            return true;
        }
        return false;
    }


    static validatePost(post) {

        if (
            post.id &&
            post.description &&
            post.title &&
            post.author &&
            post.createdAt &&
            post.photoLink) {

            if (Number.isInteger(parseInt(post.id)) &&
                post.description.length < 200 &&
                post.title.length < 15 &&
                post.author.length < 15 &&
                PostsList.validateDate(post.createdAt) &&
                PostsList.validatePhotoLink(post.photoLink)) {
                return true;
            }
            return false;
        }
        else return false;
    }

    addAll(posts) {
        var notValidatedPosts = new Array();
        if (posts) {
            posts.forEach(post => {
                if (!this.add(post)) {
                    notValidatedPosts.push(post);
                }
            });
        }
        return notValidatedPosts;
    }


    clear() {
        this._posts = [];
    }


    get(id) {
        return this._posts.find(post =>
            post.id == id);
    }


    likePost(id) {
        const index = this._posts.findIndex(post => post.id == id);
        this._posts[index].likes++;
    }


    dislikePost(id) {
        const index = this._posts.findIndex(post => post.id == id);
        this._posts[index].likes--;
    }

    filterPage(filterConfig) {
        let filteredPosts = [];
        switch (filterConfig.field) {
            case ('hashtag'):
                {
                    let flag = 0;
                    this._posts.forEach(post => {
                        post.hashtages?.forEach(hashtag => {
                            filterConfig.filterValue.forEach(value => {
                                if (hashtag == value) {
                                    flag++;
                                }
                            });
                        });

                        if (flag == filterConfig.filterValue?.length)
                            filteredPosts.push(post);
                        flag = 0;
                    }
                    );
                    break;
                }

            case ('author'):
                {
                    this._posts.forEach(post => {
                        filterConfig.filterValue.forEach(value => {
                            if (post.author == value) {
                                filteredPosts.push(post);
                            }
                        });
                    });
                    break;
                }

            case ('date'):
                {
                    switch (filterConfig.option) {
                        case ("specific"):
                            this._posts.forEach(post => {
                                filterConfig.filterValue.forEach(value => {
                                    value = new Date(value);
                                    if (post.createdAt.getTime() === value.getTime()) {
                                        filteredPosts.push(post);
                                    }
                                });
                            });
                            break;

                        case ("until"):
                            this._posts.forEach(post => {
                                filterConfig.filterValue.forEach(value => {
                                    value = new Date(value);
                                    if (post.createdAt.getTime() <= value.getTime()) {
                                        filteredPosts.push(post);
                                    }
                                });
                            });
                            break;

                        case ("after"):
                            this._posts.forEach(post => {
                                filterConfig.filterValue.forEach(value => {
                                    value = new Date(value);
                                    if (post.createdAt.getTime() >= value.getTime()) {
                                        filteredPosts.push(post);
                                    }
                                });
                            });
                            break;
                    }

                    break;

                }
        }
        return filteredPosts;
    }



    getPage(filterConfig, skip = 0, top = 10) {
        let sortedPosts = [];
        this._posts.sort((a, b) => a.createdAt - b.createdAt)
        if (!filterConfig) {
            return this._posts.slice(skip, skip + top);
        }
        else {
            sortedPosts = this.filterPage(filterConfig);
            return sortedPosts;
        }
    }


    add(post) {
        if (!PostsList.validatePost(post)) {
            return false;
        }

        for (let i = 0; i < this._posts.length; i++) {
            if (this._posts.find(item => item.id === post.id)) {
                return false;
            }
        }

        post.hashtages?.forEach(hashtag => {
            this.hashtagSet.add(hashtag);
        });

        this._posts.push(post);
        this._posts.sort((a, b) => a.createdAt - b.createdAt);

        return true;
    }



    edit(id, post) {
        let postForEdit = this.get(id);

        for (let key in post) {
            if (key) {
                if (postForEdit[key]) {
                    postForEdit[key] = post[key];
                }
            }
        }

        if (!PostsList.validatePost(postForEdit))
            return false;
        else {
            const index = this._posts.findIndex(post => post.id == id);
            posts.splice(index, 1, postForEdit);
        }

        this._posts.sort((a, b) => a.createdAt - b.createdAt);
        return true;
    }


    remove(id) {
        const index = this._posts.findIndex(post => post.id == id);
        if (index < 0) {
            return false;
        }
        this._posts.splice(index, 1);
        return true;
    }
}

let postsList = new PostsList(posts);
console.log(postsList.getPage());

console.log(postsList.add(validatedPostForAdding)); //true

console.log(postsList.add({})); //false
console.log(postsList.add({ id: '1' })); //false
console.log(postsList.add(notValidatedPostForAdding)); //false

console.log(postsList.edit(1, { author: "Mr.One" })); //true
console.log(postsList.get(1));

console.log(postsList.getPage());
console.log(postsList.getPage(0, 2));
console.log(postsList.getPage(2, 4));

console.log(postsList.getPage({}));
console.log(postsList.getPage());

console.log(postsList.remove(20)); //true
console.log(postsList.get(20));

console.log(postsList.addAll());
console.log(postsList.addAll(sameID_Posts));
console.log(postsList.addAll(postsForAdding));

console.log(postsList.getPage());

console.log(postsList.getPage({ field: 'author', filterValue: ['Mr.NoOne'] }))

postsList.clear();
console.log(postsList.getPage());

