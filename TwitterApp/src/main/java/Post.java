import java.util.Date;

public class Post {
    int id ;
    String description;
    Date createdAt;
    int authorId;
    String photoLink;

    public Post() {};

    public Post(int id, String description, Date createdAt, int authorId, String photoLink)
    {
        this.id = id;
        this.description = description;
        this.createdAt = createdAt;
        this.authorId = authorId;
        this.photoLink = photoLink;
    }
}

