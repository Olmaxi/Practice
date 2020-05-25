import java.util.Date;

public class Post {
    int id ;
    String description;
    Date createdAt;
    String author;
    String photoLink;

    public Post() {};

    public Post(int id, String description, Date createdAt, String author, String photoLink)
    {
        this.id = id;
        this.description = description;
        this.createdAt = createdAt;
        this.author = author;
        this.photoLink = photoLink;
    }
}
