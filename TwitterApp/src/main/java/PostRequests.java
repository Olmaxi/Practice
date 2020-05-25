import com.google.gson.Gson;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.sql.*;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Locale;

public class PostRequests extends javax.servlet.http.HttpServlet
{
    protected void doDelete(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {

        String id = request.getParameter("id");

        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/testdb","root","05Aenkzhbot13");
            Statement statement = connection.createStatement();


           int rows =  statement.executeUpdate("DELETE FROM POST WHERE POST_ID="+id);

            if(rows > 0){
                response.getOutputStream().println("Post: "+id + " has been deleted");
            }
            else
                response.getOutputStream().println("Could not find post "+id+ " for delete");

        }

        catch (ClassNotFoundException e){
            response.getOutputStream().println(e.toString());
        }

        catch (SQLException ex){
            response.getOutputStream().println(ex.getMessage());
        }
    }

    protected void doGet(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException
    {
        String id = request.getParameter("id");

        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/testdb","root","05Aenkzhbot13");
            Statement statement = connection.createStatement();


            ResultSet rs = statement.executeQuery("SELECT POST_ID, DESCRIPTION, NAME, CREATED_AT, PHOTO_LINK\n" +
                    "\n" +
                    "FROM POST \n" +
                    "INNER JOIN USER ON POST.USER_ID = USER.USER_ID WHERE POST_ID = "+id);
            String json = "";

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

    protected void doPost(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException
    {
        StringBuilder sb = new StringBuilder();
        BufferedReader br;

        String line;
        br = new BufferedReader(new InputStreamReader(request.getInputStream(), "UTF-8"));
        while ((line = br.readLine()) != null) {
            sb.append(line);
        }

        Gson g = new Gson();
        Post p = g.fromJson(sb.toString(), Post.class);

        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/testdb","root","05Aenkzhbot13");
            Statement statement = connection.createStatement();


            DateFormat dateFormat = new SimpleDateFormat("yyyy-mm-dd");
            String strDate = dateFormat.format(p.createdAt);

            statement.executeUpdate("INSERT INTO POST(USER_ID,PHOTO_LINK, DESCRIPTION,CREATED_AT)\n" +
                    "VALUES ("+p.author+",\'"+p.photoLink+"\'"+",\'"+p.description+"\'"+",\'"+strDate+"\')");
        }

        catch (ClassNotFoundException e){
            response.getOutputStream().println(e.toString());
        }

        catch (SQLException ex){
            response.getOutputStream().println(ex.getMessage());
        }
    }

    protected void doPut(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException
    {
        String id = request.getParameter("id");

        StringBuilder sb = new StringBuilder();
        BufferedReader br;

        String line;
        br = new BufferedReader(new InputStreamReader(request.getInputStream(), "UTF-8"));
        while ((line = br.readLine()) != null) {
            sb.append(line);
        }

        Gson g = new Gson();
        Post p = g.fromJson(sb.toString(), Post.class);

        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/testdb","root","05Aenkzhbot13");
            Statement statement = connection.createStatement();

            statement.executeUpdate("UPDATE POST SET DESCRIPTION = \'" +p.description+ "\' WHERE POST_ID ="+id);
        }
        catch (ClassNotFoundException e){
            response.getOutputStream().println(e.toString());
        }

        catch (SQLException ex){
            response.getOutputStream().println(ex.getMessage());
        }
    }
}
