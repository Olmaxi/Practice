import com.google.gson.Gson;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.sql.*;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Locale;

public class PostRequests extends javax.servlet.http.HttpServlet
{
    protected void doDelete(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {

        String id = request.getParameter("id");

        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/testdb","root","root");
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
            Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/testdb","root","root");
            Statement statement = connection.createStatement();


            DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.ENGLISH);
            String strDate = dateFormat.format(p.createdAt);

            statement.executeUpdate("INSERT INTO POST(USER_ID,PHOTO_LINK, DESCRIPTION,CREATED_AT)\n" +
                    "VALUES ("+p.authorId+",\'"+p.photoLink+"\'"+",\'"+p.description+"\'"+",\'"+strDate+"\')");
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
            Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/testdb","root","root");
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
