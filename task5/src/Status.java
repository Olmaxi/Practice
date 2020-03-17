import java.io.IOException;

public class Status extends javax.servlet.http.HttpServlet {

    protected void doGet(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {
        response.getOutputStream().println("<html><h2 style='color:red'>Application is running</html>");
    }
}
