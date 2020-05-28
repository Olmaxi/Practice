

class HttpService {

    constructor() {
    }

async getPosts() {
    const response = await fetch('http://localhost:8080/TwitterApp_war_exploded/getposts');
    if (!response.ok) {
    throw new Error(response.statusText);
    }

    let result = await response.json()
    console.log(result)
    return result
}

async addPost(post) {
    const myInit = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },    
        body: JSON.stringify(post)
        };
    const response = await fetch(`http://localhost:54528/api/values/`, myInit);
    
    if (!response.ok) {
    throw new Error(response.statusText);
    }
    const result = await response.json();
    return result
}

async  editPost(id, post) {
    const myInit = {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },    
        body: JSON.stringify(post)
        };
    const response = await fetch(`http://localhost:54528/api/values/${id}`,myInit);
    if (!response.ok) {
    throw new Error(response.statusText);
    }
    const result = await response.json();
    console.log(result);
    return result
}

async deletePost(id) {
    const myInit = {
        method: 'DELETE',      
        };
    const response = await fetch(`http://localhost:54528/api/values/${id}`,myInit);
    if (!response.ok) {
    throw new Error(response.statusText);
    }
    const result = await response.json();
    console.log(result);
    return result
}
}