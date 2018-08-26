import java.awt.BorderLayout;
import java.awt.Container;
import java.awt.Label;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.math.BigInteger;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.security.MessageDigest;
import java.util.Random;
import javax.crypto.SecretKey;
import javax.swing.JButton;
import javax.swing.JFileChooser;
import javax.swing.JFrame;
import javax.swing.JList;
import javax.swing.JMenu;
import javax.swing.JMenuBar;
import javax.swing.JMenuItem;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTabbedPane;
import javax.swing.JTextArea;
import javax.swing.JTextField;
import javax.swing.SwingUtilities;
import javax.swing.UIManager;
import javax.swing.UnsupportedLookAndFeelException;

class PEKSCFrame extends JFrame implements ActionListener {
	JTextArea jta;
	JScrollPane jsp;
	JPanel eastPanel;
	JTextArea jta1;
	JScrollPane jsp1;
	JButton connect;
	JButton plainText;
	JButton cipherText;
	JPanel buttonPanel;
	BigInteger modules, eulermodules, generator;// system parameters
	ObjectInputStream ois;
	ObjectOutputStream oos;
	SecretKey key;
	Socket clientS;
	InputStream is;
	InetSocketAddress inetsa;
	String keyword;// keyword for search
	MessageDigest mdc;// hash function ( SHA1)
	boolean tempB;
	JPanel centerPanel;
	JPanel displayPanel;
	JPanel updatePanel;
	JPanel searchPanel;
	JPanel resultPanel;
	JTabbedPane jtp;
	JFileChooser result;
	JFileChooser update;
	JButton search;
	JTextField keywordField;
	DesEncrypter encrypter;
	boolean connected = true;

	PEKSCFrame() {// constructor, initial the graphic user interface
		setTitle("PEKSClient");
		try {

			UIManager.setLookAndFeel("com.sun.java.swing.plaf.windows.WindowsLookAndFeel");
			SwingUtilities.updateComponentTreeUI(rootPane);
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InstantiationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (UnsupportedLookAndFeelException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		jta = new JTextArea(10, 10);
		jsp = new JScrollPane(jta1);
		jta.setLineWrap(true);
		jta.setEditable(true);
		jta.append("success!");

		jta1 = new JTextArea(10, 10);
		jsp1 = new JScrollPane(jta1);
		jta1.setLineWrap(true);
		displayPanel = new JPanel();
		displayPanel.setLayout(new BorderLayout());
		displayPanel.add(jsp1, BorderLayout.CENTER);
		connect = new JButton("Connect");
		displayPanel.add(connect, BorderLayout.SOUTH);
		connect.addActionListener(this);

		updatePanel = new JPanel(new BorderLayout());
		update = new JFileChooser("Initial");//本地文件夹
		update.setApproveButtonText("Update");
		updatePanel.add(update, BorderLayout.CENTER);
	
		
		
		
		searchPanel = new JPanel();
		keywordField = new JTextField(20);
		searchPanel.add(keywordField);
		search = new JButton("Search");
		searchPanel.add(search);
		search.addActionListener(this);

		resultPanel = new JPanel(new BorderLayout());
		result = new JFileChooser("Search Result");
		result.setControlButtonsAreShown(false);
		resultPanel.add(result, BorderLayout.CENTER);
		buttonPanel = new JPanel();
		cipherText = new JButton("Open the File");
		plainText = new JButton("Decrypt and Open");
		buttonPanel.add(cipherText);
		cipherText.addActionListener(this);
		buttonPanel.add(plainText);
		plainText.addActionListener(this);
		resultPanel.add(buttonPanel, BorderLayout.SOUTH);

		jtp = new JTabbedPane();
		jtp.add("Initial Information", displayPanel);
		jtp.add("Update File", updatePanel);
		jtp.add("Search Encrypted File", searchPanel);
		jtp.add("Results", resultPanel);

		centerPanel = new JPanel();
		centerPanel.setLayout(new BorderLayout());
		centerPanel.add(jtp, BorderLayout.CENTER);
		add(centerPanel, BorderLayout.CENTER);
		inetsa = new InetSocketAddress("127.0.0.1", 8901);

		setLocation(300, 10);
		pack();
		setResizable(false);

		tempB = false;
		loadParameters();
		displayInitialInformation();
	}

	public void loadParameters() {
		try {
			ois = new ObjectInputStream(new FileInputStream("initial.data"));
			key = (SecretKey) ois.readObject();
			modules = (BigInteger) ois.readObject();
			generator = (BigInteger) ois.readObject();// read in the system//
														// parameters
			eulermodules = (BigInteger) ois.readObject();
			
			ois.close();
			mdc = MessageDigest.getInstance("SHA");

		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	@Override
	public void actionPerformed(ActionEvent e) {
		// TODO Auto-generated method stub

		if (e.getSource() == connect) {// response of initial
	
				clientS = new Socket();
				try {
					clientS.connect(inetsa, 5000);
					oos = new ObjectOutputStream(clientS.getOutputStream());
					ois = new ObjectInputStream(clientS.getInputStream());

				} catch (Exception e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}

				connect.setEnabled(false);
			
		}
		if (e.getSource() == search) {// generate token for search

			if (keywordField.getText().length() == 0) {
				JOptionPane
						.showMessageDialog(null,
								"Sorry, you have not input a valid keyword! Please try again!");
			}

			else {
				keyword = keywordField.getText().trim();
				mdc.update(keyword.getBytes());
				BigInteger temp1 = new BigInteger(mdc.digest()).abs()
						.nextProbablePrime();// h(w)
				mdc.reset();
				BigInteger temp2 = temp1.modInverse(eulermodules);// generate
																	// -h(w)
				BigInteger temp3 = new BigInteger(512, new Random());// generate
																		// r
				BigInteger temp4 = temp2.multiply(temp3);// -r*h(w)
				BigInteger temp5 = generator.modPow(temp3, modules);// generate
																	// g^r
				Trapdoor t = new Trapdoor(temp4, temp5);

				try {
					oos.writeObject(t);
					oos.flush();
					tempB = ois.readBoolean();
					if (tempB) {//
						JOptionPane
								.showMessageDialog(jtp, "Search successed!");
						String fileName = (String) ois.readObject();
						File tempFile = new File(fileName);
						FileInputStream fis = new FileInputStream(tempFile);
						FileOutputStream fos = new FileOutputStream(
								"Search Result\\"      //输出结果文件夹D:\\java\\233\\
										+ tempFile.getName());
						int i = 0;
						while ((i = fis.read()) != -1) {
							fos.write(i);
						}
						fis.close();
						fos.close();

					} else {
						JOptionPane.showMessageDialog(jtp,
								"No data matches your keywords!");
					}

				} catch (Exception e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}

			}
		}
		if (e.getSource() == cipherText) {// 
			if (result.getSelectedFile() == null) {
				JOptionPane.showMessageDialog(jtp,
						"No Files selected, Please try again!");
			} else {
				String[] command = { "notepad",
						result.getSelectedFile().getAbsolutePath() };
				try {
					Runtime.getRuntime().exec(command);
				} catch (IOException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
			}
		}

		if (e.getSource() == plainText) {//resoult
			if (result.getSelectedFile() == null) {
				JOptionPane.showMessageDialog(jtp,
						"No Files selected, Please try again!");
			} else {
				try {
					encrypter = new DesEncrypter(key);
					encrypter.decrypt(
							new FileInputStream(result.getSelectedFile()),
							new FileOutputStream("decrypt"
									+ result.getSelectedFile().getName()));
					String[] command = { "notepad",
							"decrypt" + result.getSelectedFile().getName() };
					Runtime.getRuntime().exec(command);
					result.rescanCurrentDirectory();
				} catch (Exception e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
			}
		}
	}

	private void displayInitialInformation() {// display the encryption key and
		// generator,modules,eulermodules;
		byte[] keyBytes = key.getEncoded();
		jta1.append("DES Key:\t");
		for (int i = 0; i < keyBytes.length; i++) {// 閿熸枻鎷风ず閿熸枻鎷烽敓鏉板拰鏂ゆ嫹閿熸枻鎷烽敓鏂ゆ嫹閽ラ敓鏂ゆ嫹jta閿熸枻鎷�
			jta1.append(byte2HexStr(keyBytes[i]));
		}
		jta1.append("\n\n Modules:\t" + modules.toString(16));// 閿熸枻鎷风ず妯￠敓鏂ゆ嫹
		jta1.append("\n\n EulerModules:\t" + eulermodules.toString(16));// 閿熸枻鎷风ず娆ч敓鏂ゆ嫹閿熸枻鎷烽敓鏂ゆ嫹
		jta1.append("\n\n Generator:\t" + generator.toString(16));// 閿熸枻鎷风ず閿熸枻鎷烽敓鐨嗭拷
	}

	private String byte2HexStr(byte binary) {
		StringBuffer sb = new StringBuffer();
		int hex;

		hex = (int) binary & 0x000000ff;
		if (0 != (hex & 0xfffffff0)) {
			sb.append(Integer.toHexString(hex));
		} else {
			sb.append("0" + Integer.toHexString(hex));
		}
		return sb.toString();
	}

}

public class PEKSClient {
	public static void main(String[] args) {
		new Thread() {
			public void run() {
				PEKSCFrame peksc = new PEKSCFrame();
				peksc.setVisible(true);
				peksc.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
			}
		}.start();
	}
}