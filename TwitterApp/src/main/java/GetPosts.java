import com.google.gson.Gson;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.sql.*;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Locale;

public class GetPosts extends javax.servlet.http.HttpServlet
{

    protected void doPost(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException
    {
        try {

            StringBuilder sb = new StringBuilder();
            BufferedReader br;

            String line;
            br = new BufferedReader(new InputStreamReader(request.getInputStream(), "UTF-8"));
            while ((line = br.readLine()) != null) {
                sb.append(line);
            }

            int amount = Integer.parseInt(sb.toString());

            Class.forName("com.mysql.jdbc.Driver");
            Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/testdb","root","root");
            Statement statement = connection.createStatement();


            ResultSet rs = statement.executeQuery("SELECT POST_ID, DESCRIPTION, CREATED_AT, USER.USER_ID, NAME, AVATAR_LINK \n" +
                    "FROM POST inner JOIN USER ON POST.USER_ID = USER.USER_ID\n" +
                    "ORDER BY CREATED_AT desc LIMIT " + amount);
            String json = "[";

            while (rs.next()) {
                DetailedPost post = new DetailedPost();
                post.id =  Integer.parseInt(rs.getString("POST_ID"));
                post.description = rs.getString("DESCRIPTION");

                DateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.ENGLISH);
                post.createdAt = format.parse(rs.getString("CREATED_AT"));

                post.authorId = Integer.parseInt(rs.getString("USER_ID"));
                post.author = rs.getString("NAME");
                post.avatarLink = rs.getString("AVATAR_LINK");

                json = json + new Gson().toJson(post)+",\n";
            }


            json = json.substring(0, json.length() - 2) + "]";
            response.getOutputStream().println(json);
        }

        catch (ClassNotFoundException e){
            response.getOutputStream().println(e.toString());
        }

        catch (SQLException ex){
            response.getOutputStream().println(ex.getMessage());
        }
        catch (ParseException ex) {
            response.getOutputStream().println(ex.getMessage());
        }


    }
}
