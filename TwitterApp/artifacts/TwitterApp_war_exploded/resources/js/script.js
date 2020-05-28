var currentUser =
{
    name: 'Maxim',
    avatar: "",
}



class PostsList {


    _getPostsFromStorage() {
        var posts = localStorage.getItem("posts");
        this._posts = JSON.parse(posts);
    }

    /*_storePosts() {
        var posts = JSON.stringify(this._posts);
        localStorage.setItem("posts", posts);
    }*/



    async _updateStorage() {
        let posts = await service.getPosts();               
        let postsString = JSON.stringify(posts);         
        localStorage.setItem("posts", postsString); 

    }

    _posts = new Array();

  constructor(posts) {
      this._updateStorage();
      this._posts = posts;
      this._getPostsFromStorage();
      this._fillHashtagSet();
      this._fillAuthorSet();
    }

    hashtagSet = new Set();

    _fillHashtagSet() {
        this._getPostsFromStorage();
        this._posts.forEach(post => {       
            post.hashtages?.forEach(hashtag => {
                this.hashtagSet.add(hashtag);
            });
        });
    }

    authorSet = new Set();

    _fillAuthorSet() {
        this._getPostsFromStorage();
        this._posts.forEach(post => {
            this.authorSet.add(post.author);
        });
    }


    static validateDate(date) {

        if (typeof date != "string")
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
            post.description &&
            post.title &&
            post.author &&
            post.createdAt &&
            post.photoLink) {

            if (
                post.description.length < 200 &&
                post.title.length < 15 &&
                post.author.length < 15 &&
                PostsList.validatePhotoLink(post.photoLink)) {
                return true;
            }
            return false;
        }

        else {
            return false;
        }

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
        this._getPostsFromStorage();
        return this._posts.find(post =>
            post.id == id);
    }


    likePost(id) {
        this._getPostsFromStorage();
        const index = this._posts.findIndex(post => post.id == id);
        ++this._posts[index].likes;
    }


    dislikePost(id) {
        this._getPostsFromStorage();
        const index = this._posts.findIndex(post => post.id == id);
        --this._posts[index].likes;
    }

    filterPage(filterConfig) {
        this._getPostsFromStorage();
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



  async getPage(filterConfig, skip = 0, top = 10) {
        await this._updateStorage();        
        this._getPostsFromStorage();

        let sortedPosts = [];
        this._posts.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
        if (!filterConfig) {
            return this._posts.slice(skip, skip + top);
        }
        else {
            sortedPosts = this.filterPage(filterConfig);
            return sortedPosts;
        }
    }


async add(post) {
        console.log(post)
        this._getPostsFromStorage();
        if (!PostsList.validatePost(post)) { 
            return false;
        }

        let idmax = 0;
        for (let i = 0; i < this._posts.length; i++) {
            if (this._posts[i].id > idmax) {

                idmax = this._posts[i].id;
            }
        }
        post.id = ++idmax
        post.hashtages?.forEach(hashtag => {
            this.hashtagSet.add(hashtag);
        });

        post.likes = 0;
        await service.addPost(post)
        return true;
    }

    async edit(id, post) {
        this._getPostsFromStorage();
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
           await service.editPost(id,post)
        }
        this._posts.sort((a, b) => a.createdAt - b.createdAt);     
        return true;
    }


    async remove(id) {
        this._getPostsFromStorage();
        const index = this._posts.findIndex(post => post.id == id);
        if (index < 0) {
            return false;
        }
        await service.deletePost(id)
        return true;
    }
}





