import com.google.gson.Gson;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Iterator;

public class Tweets extends javax.servlet.http.HttpServlet {

    protected void doDelete(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {

        PrintWriter out = response.getWriter();
        int id;
        id = Integer.parseInt(request.getParameter("id"));

        for( int i = 0; i < Posts.posts.size()-1; i++ )
        {
            if (Posts.posts.get(i).id == id)
            {
                Posts.posts.remove(i);
            }
        }
        out.print("Post with id: " + id + " deleted");
        out.flush();
    }


    protected void doGet(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {

        PrintWriter out = response.getWriter();
        int id;
        id = Integer.parseInt(request.getParameter("id"));
        String postJsonString = "";


        for( int i = 0; i < Posts.posts.size()-1; i++ ){
            if (Posts.posts.get(i).id == id)
            {
                postJsonString = postJsonString + new Gson().toJson(Posts.posts.get(i))+"\n";
                break;
            }
        }
        out.print(postJsonString);
        out.flush();
    }
}






