var posts = [

    {
   
      id: '1',
   
      description: 'съешь ещё этих мягких французских булок, да выпей чаю',
   
      createdAt: new Date('2020-03-23T10:00:00'),
   
      author: 'Mr.NoOne',    
   
      photoLink: './graphic/MrNoOne.png'
   
     },
   
     {
   
        id: '2',
     
        description: 'ещё этих мягких французских булок, да выпей чаю',
     
        createdAt: new Date('2020-03-23T11:00:00'),
     
        author: 'Mr.NoOne',    
     
        photoLink: './graphic/MrNoOne.png'
     
       },

       {
   
        id: '3',
     
        description: 'этих мягких французских булок, да выпей чаю',
     
        createdAt: new Date('2020-03-23T11:20:00'),
     
        author: 'Mr.NoOne',    
     
        photoLink: './graphic/MrNoOne.png'
     
       },

       {
   
        id: '4',
     
        description: 'этих мягких французских булок, да выпей чаю',
     
        createdAt: new Date('2020-03-23T15:50:00'),
     
        author: 'Mr.NoOne',    
     
        photoLink: './graphic/MrNoOne.png'
     
       },

       {
   
        id: '5',
     
        description: 'ещё этих мягких французских булок, да выпей чаю',
     
        createdAt: new Date('2020-03-23T13:34:00'),
     
        author: 'Mr.NoOne',    
     
        photoLink: './graphic/MrNoOne.png'
     
       },

       {
   
        id: '6',
     
        description: 'этих мягких французских булок, да выпей чаю',
     
        createdAt: new Date('2020-03-23T16:35:00'),
     
        author: 'Mr.NoOne',    
     
        photoLink: './graphic/MrNoOne.png'
     
       },

       {
   
        id: '7',
     
        description: 'мягких французских булок, да выпей чаю',
     
        createdAt: new Date('2020-03-23T17:20:00'),
     
        author: 'Mr.NoOne',    
     
        photoLink: './graphic/MrNoOne.png'
     
       },

       {
   
        id: '8',
     
        description: 'французских булок, да выпей чаю',
     
        createdAt: new Date('2020-03-23T14:10:00'),
     
        author: 'Mr.NoOne',    
     
        photoLink: './graphic/MrNoOne.png'
     
       },

       {
   
        id: '9',
     
        description: 'этих мягких французских булок, да выпей чаю',
     
        createdAt: new Date('2020-03-23T13:10:00'),
     
        author: 'Mr.NoOne',    
     
        photoLink: './graphic/MrNoOne.png'
     
       },

       {
   
        id: '10',
     
        description: 'этих мягких французских булок, да выпей чаю',
     
        createdAt: new Date('2020-03-23T10:00:00'),
     
        author: 'Mr.NoOne',    
     
        photoLink: './graphic/MrNoOne.png'
     
       },

       {
   
        id: '11',
     
        description: 'мягких французских булок, да выпей чаю',
     
        createdAt: new Date('2020-03-23T10:00:00'),
     
        author: 'Mr.NoOne',    
     
        photoLink: './graphic/MrNoOne.png'
     
       },

       {
   
        id: '12',
     
        description: 'этих мягких французских булок, да выпей чаю',
     
        createdAt: new Date('2020-03-23T10:00:00'),
     
        author: 'Mr.NoOne',    
     
        photoLink: './graphic/MrNoOne.png'
     
       },

       {
   
        id: '13',
     
        description: 'мягких французских булок, да выпей чаю',
     
        createdAt: new Date('2020-03-23T10:00:00'),
     
        author: 'Mr.NoOne',    
     
        photoLink: './graphic/MrNoOne.png'
     
       },

       {
   
        id: '14',
     
        description: 'съешь ещё этих мягких французских булок, да выпей чаю',
     
        createdAt: new Date('2020-03-23T10:00:00'),
     
        author: 'Mr.One',    
     
        photoLink: './graphic/MrNoOne.png'
     
       },

       {
   
        id: '15',
     
        description: 'этих мягких французских булок, да выпей чаю',
     
        createdAt: new Date('2020-03-23T10:00:00'),
     
        author: 'Mr.NoOne',    
     
        photoLink: './graphic/MrNoOne.png'
     
       },

       {
   
        id: '16',
     
        description: 'мягких французских булок, да выпей чаю',
     
        createdAt: new Date('2020-03-23T10:00:00'),
     
        author: 'Mr.NoOne',    
     
        photoLink: './graphic/MrNoOne.png'
     
       },

       {
   
        id: '17',
     
        description: 'этих мягких французских булок, да выпей чаю',
     
        createdAt: new Date('2020-03-23T10:00:00'),
     
        author: 'Mr.NoOne',    
     
        photoLink: './graphic/MrNoOne.png'
     
       },

       {
   
        id: '18',
     
        description: 'съешь ещё этих мягких французских булок, да выпей чаю',
     
        createdAt: new Date('2020-03-23T10:00:00'),
     
        author: 'Mr.NoOne',    
     
        photoLink: './graphic/MrNoOne.png'
     
       },

       {
   
        id: '19',
     
        description: 'ещё этих мягких французских булок, да выпей чаю',
     
        createdAt: new Date('2020-03-23T10:00:00'),
     
        author: 'Mr.NoOne',    
     
        photoLink: './graphic/MrNoOne.png'
     
       },

       {
   
        id: '20',
     
        description: 'французских булок, да выпей чаю',
     
        createdAt: new Date('2020-03-23T10:00:00'),
     
        author: 'Mr.NoOne',    
     
        photoLink: './graphic/MrNoOne.png'
     
       },
   
   ];

   let Module = (function () {

    let counter = 0;

    let increaseCounter = function () {
        alert("")
    }

    function getPosts(skip = 0, top = 10, filterConfig) {
      let sortedArray = [];
      posts.sort((a,b) => a.createdAt - b.createdAt)
      if (filterConfig == undefined)
      {
        for(let i=0;i<top;i++) {

            console.log(posts[i+skip]);
            sortedArray[i]=posts[i+skip];

        }
        return sortedArray;
      }
      else 
      {

        if(filterConfig.rule == 'autor')


        {
          for(let i=0;i<top;i++)
          {
            if (posts[i].author == filterConfig.filterValue)
            console.log(posts[i+skip]);
            sortedArray[i]=posts[i+skip];
          }
        }
      
        return sortedArray;
      }

      }
    
    function getPost(id)
    {
      for(let i=0;i<posts.length;i++)
      {
        if(posts[i].id==id)
        {
          console.log(posts[i]);
          return posts[i]
        }
      }
    }

    function validatePost(post)
    {
      if(Number.isInteger(parseInt(post.id)) &&
         post.description.length < 200 &&
         post.author.length < 15)
         {
           return true;
         }
      else
      {
        return false;
      }
    }



    function addPost(post){
      if(validatePost(post)==true)
      {
        for(let i=0;i<posts.length;i++)
        {
          if(posts[i].id==post.id)
          {
            return false;
          }
        }
        posts.push(post);
        posts.sort((a,b) => a.createdAt - b.createdAt)
        return true;
      }
      else{
        return false;
      }
      
    }

    function editPost(id, post){
      if(!validatePost(post))
        return false;

      for(let i=0;i<posts.length;i++)
      {
        if(posts[i].id==id)
        {
          
          for (key in post) {
           if(key != 'id')
           {
             if (key != undefined)
             {
                posts[i][key]=post[key];             

             }
           }
          }
        }
      }
    
      posts.sort((a,b) => a.createdAt - b.createdAt)
      return true;
    }


    function removePost(id) {  

      for(let i = 0 ; i < posts.length; i++) {

        if(posts[i].id == id)
        {
          posts.splice(i, 1);
          return true;
        }
      
      }
      return false;
    }


    return {
      getPosts: getPosts,
      increaseCounter: increaseCounter,
      getPost: getPost,
      validatePost: validatePost,
      addPost: addPost,
      editPost: editPost,
      removePost: removePost,
    }
  })();

 
