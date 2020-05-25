import java.io.IOException;
import java.sql.*;

public class Status extends javax.servlet.http.HttpServlet {

    protected void doGet(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {


        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/testdb","root","05Aenkzhbot13");
            Statement statement = connection.createStatement();
            ResultSet rs = statement.executeQuery("SELECT DESCRIPTION FROM POST WHERE POST_ID = 1");
            String some = "";
            while (rs.next()) {
                some = rs.getString(1);

            }
            response.getOutputStream().println("<html><h2 style='color:red'>Application is running"+some+"</html>");
    }

        catch (ClassNotFoundException e){
            response.getOutputStream().println(e.toString());
        }

        catch (SQLException ex){
            response.getOutputStream().println(ex.getMessage());
        }

    }
}
