import java.io.IOException;
import java.sql.*;

public class Page extends javax.servlet.http.HttpServlet {

    protected void doGet(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {
        javax.servlet.RequestDispatcher rd = request.getRequestDispatcher("/WEB-INF/page.html");
        rd.include(request, response);






    }
}
