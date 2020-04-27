import java.io.IOException;

public class Check extends javax.servlet.http.HttpServlet {

    protected void doPost(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {
        response.getOutputStream().println("{\"sucesss\" : true}");
    }
}
