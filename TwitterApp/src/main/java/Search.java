import com.google.gson.Gson;

import java.io.IOException;
import java.io.PrintWriter;

public class Search extends javax.servlet.http.HttpServlet
{

    protected void doPost(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException
    {
        String employeeJsonString = "";
        PrintWriter out = response.getWriter();

        for (int i = 0 ; i < Posts.posts.size() ; i++)
        {
            employeeJsonString = employeeJsonString + new Gson().toJson(Posts.posts.get(i))+"\n";

        }

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        out.print(employeeJsonString);
        out.flush();


    }
}
