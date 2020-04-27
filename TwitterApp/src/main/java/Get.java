import java.io.IOException;

public class Get extends javax.servlet.http.HttpServlet {

    protected void doGet(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {
        response.getOutputStream().println("<html><h2 style='color:blue'>Name is "+ request.getParameter("name") +"</html>");
    }
}
