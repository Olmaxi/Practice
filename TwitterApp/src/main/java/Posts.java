import java.util.ArrayList;
import java.util.Date;

public class Posts {

    static ArrayList<Post> posts = new ArrayList<Post>();

    static public void AddPosts()
    {
        posts.add(new Post(3, "post3", new Date(), "Mr.NoOne", "link"));
        posts.add(new Post(2, "post2", new Date(), "Mr.NoOne", "link"));
        posts.add(new Post(1, "post1", new Date(), "Mr.NoOne", "link"));
        posts.add(new Post(4, "post4", new Date(), "Mr.NoOne", "link"));
      //  posts.add(new Post(5, "съешь", new Date(), "Mr.NoOne", "link"));
    }


}

