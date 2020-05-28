

class HttpService {

    constructor() {
    }

async getPosts(amount) {
    const myInit = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(amount)
    };
    const response = await fetch('http://localhost:8080/TwitterApp_war_exploded/getposts', myInit);
    if (!response.ok) {
        throw new Error(response.statusText);
    }

    let result = await response.json()
    console.log(result)
    return result
}

async addPost(post) {
        console.log(post)
    const myInit = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },    
        body: JSON.stringify(post)
        };
        console.log(JSON.stringify(post))
    const response = await fetch(`http://localhost:8080/TwitterApp_war_exploded/post`, myInit);
    
    if (!response.ok) {
    throw new Error(response.statusText);
    }
    const result = await response;
    return result
}

async  editPost(id, post) {
        console.log(post)
    const myInit = {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },    
        body: JSON.stringify(post)
        };
    const response = await fetch(`http://localhost:8080/TwitterApp_war_exploded/post?id=${id}`,myInit);
    if (!response.ok) {
    throw new Error(response.statusText);
    }
    const result = await response;
    console.log(result);
    return result
}

async deletePost(id) {
    const myInit = {
        method: 'DELETE',      
        };
    const response = await fetch(`http://localhost:8080/TwitterApp_war_exploded/post?id=${id}`,myInit);
    if (!response.ok) {
    throw new Error(response.statusText);
    }
    const result = await response;
    console.log(result);
    return result
}
}