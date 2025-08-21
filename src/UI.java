import java.awt.Color;
import javax.swing.ImageIcon;
import javax.swing.JFrame; 

public class UI extends JFrame {
    public UI() {
        this.setTitle("Aii's Oregon Trail");
        this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        this.setSize(800,600);
        this.setLocationRelativeTo(null);
        this.setVisible(true);
        this.setResizable(false);

        ImageIcon logo = new ImageIcon("images/Aii-logo.jpg");
        this.setIconImage(logo.getImage());
        // frame.getContentPane().setBackground(Color.BLACK);
    }
}
