import java.util.Date;

public class DetailedPost {
    int id ;
    String description;
    Date createdAt;
    String author;
    String photoLink;
    int authorId;
    String avatarLink;

    public DetailedPost () {};

    public DetailedPost (int id, String description, Date createdAt, String author, String photoLink, int authorId, String avatarLink )
    {
        this.id = id;
        this.description = description;
        this.createdAt = createdAt;
        this.author = author;
        this.authorId = authorId;
        this.avatarLink = avatarLink;
        this.photoLink = photoLink;
    }
}
