import com.google.gson.Gson;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Locale;

public class GetPosts extends javax.servlet.http.HttpServlet
{

    protected void doGet(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException
    {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/testdb","root","05Aenkzhbot13");
            Statement statement = connection.createStatement();


            ResultSet rs = statement.executeQuery("SELECT * FROM POST WHERE");
            String json = "[";

            while (rs.next()) {
                Post post = new Post();
                post.id =  Integer.parseInt(rs.getString("POST_ID"));
                post.description = rs.getString("DESCRIPTION");

                DateFormat format = new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH);
                post.createdAt = format.parse(rs.getString("CREATED_AT"));

                post.author = rs.getString("NAME");
                post.photoLink = rs.getString("PHOTO_LINK");
                json = json + new Gson().toJson(post)+"\n";
            }

            json = json + "]";
            response.getOutputStream().println(json);
        }

        catch (ClassNotFoundException e){
            response.getOutputStream().println(e.toString());
        }

        catch (SQLException ex){
            response.getOutputStream().println(ex.getMessage());
        }

        catch (ParseException ex){
            response.getOutputStream().println(ex.getMessage());
        }


    }
}
