import java.awt.BorderLayout;
import java.awt.Container;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.math.BigInteger;
import java.net.ServerSocket;
import java.net.Socket;
import java.security.MessageDigest;
import java.util.Hashtable;
import java.util.Random;
import java.util.Vector;

import javax.crypto.SecretKey;
import javax.swing.BorderFactory;
import javax.swing.JButton;
import javax.swing.JDialog;
import javax.swing.JFileChooser;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JList;
import javax.swing.JMenu;
import javax.swing.JMenuBar;
import javax.swing.JMenuItem;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JProgressBar;
import javax.swing.JScrollPane;
import javax.swing.JTabbedPane;
import javax.swing.JTextArea;
import javax.swing.UIManager;
import javax.swing.UnsupportedLookAndFeelException;

class PEKSSFrame extends JFrame implements ActionListener {

	private JFileChooser jfc;
	private JScrollPane jsp;
	private JTextArea jta;
	private JMenuBar jmb;
	private JMenu jm1;
	private JMenuItem jmi1, jmi2;// jmi1 initial, jmi2 exit
	private BigInteger modules, generator;// the public parameters modules
											// received from the client;
	private ObjectInputStream ois;
	private ServerSocket ss;
	private Socket servs;
	private Vector<BigInteger> keyVector;// an vector to stand for the keywords
											// stored
	// on the server
	private MessageDigest mds;
	private Hashtable<BigInteger, String> ht;
	DesEncrypter encrypter;
	SecretKey key;
	JPanel southPanel;
	JButton openButton;

	public PEKSSFrame() {// constructor
		try {
			UIManager.setLookAndFeel("com.sun.java.swing.plaf.windows.WindowsLookAndFeel");
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

		setTitle("PEKS服务器");
		jfc = new JFileChooser("Data records");
		jta = new JTextArea(10, 10);
		jsp = new JScrollPane(jta);
		jta.setEditable(false);
		jta.setLineWrap(true);

		jmi1 = new JMenuItem("initial");
		jmi2 = new JMenuItem("exit");
		jm1 = new JMenu("System");
		jm1.add(jmi1);
		jm1.add(jmi2);
		jm1.addSeparator();
		jmb = new JMenuBar();
		jmb.add(jm1);// add the menu bar
		jmi1.addActionListener(this);
		jmi2.addActionListener(this);// add action listener
		setJMenuBar(jmb);
		add(jsp, BorderLayout.EAST);
		keyVector = new Vector<BigInteger>();// initial the keyVector
		ht = new Hashtable<BigInteger, String>();// initial the hashtable
		jfc = new JFileChooser("Data Records");
		southPanel = new JPanel();
		openButton = new JButton("打开");
		openButton.addActionListener(this);
		southPanel.add(openButton);
		add(southPanel, BorderLayout.SOUTH);
		jfc.setControlButtonsAreShown(false);
		add(jfc);
		pack();
		setLocation(300, 100);
		setResizable(false);

	}

	public void loadParameters() {// if the system has not been initialed ,load
									// the system parameters
		try {
			ObjectInputStream ois = new ObjectInputStream(new FileInputStream("server.data"));
			key = (SecretKey) ois.readObject();
			modules = (BigInteger) ois.readObject();
			generator = (BigInteger) ois.readObject();
			keyVector=(Vector<BigInteger>) ois.readObject();
			ht=(Hashtable<BigInteger, String>) ois.readObject();
			ois.close();
			mds = MessageDigest.getInstance("SHA");// initial the
													// messagedigester
			jta.append("System initial successed! Wait for connectting");
		} catch (Exception e2) {
			e2.printStackTrace();
		}
	}

	public void getValues(String pathName) throws Exception {//写入data

		for (File tempFile : new File(pathName).listFiles()) {
			encrypter = new DesEncrypter(key);
			String tempString = tempFile.getName();
			int dot = tempString.lastIndexOf(".");
			String tempString1 = tempString.substring(0, dot);
			mds.update(tempString1.getBytes());
			BigInteger tempBigInteger1 = new BigInteger(mds.digest()).abs()
					.nextProbablePrime();
			mds.reset();
			BigInteger tempBigInteger2 = generator.modPow(tempBigInteger1,
					modules);
			keyVector.add(tempBigInteger2);
			File outputFile = new File("Data Records\\"
					+ System.currentTimeMillis()*Math.random() + ".txt");//每次服务器端初始化生成
			encrypter.encrypt(new FileInputStream(tempFile),
					new FileOutputStream(outputFile));
			ht.put(tempBigInteger2, outputFile.getAbsolutePath());
		}
		ObjectOutputStream o = new ObjectOutputStream(new FileOutputStream(
				"server.data"));
		o.writeObject(key);
		o.writeObject(modules);
		o.writeObject(generator);
		o.writeObject(keyVector);
		o.writeObject(ht);
		o.close();
	}

	public void genKeyVector() {// generate the vector list of the keywords of
								// awd1990

		try {
			
			//getValues("e:\\workspace\\peks\\awd1990");
			getValues("Initial");  //与客户端abc对应   D:\\java\\233\\abc
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	@Override
	public void actionPerformed(ActionEvent e) {
		// TODO Auto-generated method stub
		if (e.getSource() == jmi1) {//服务器端初始化
			
			loadParameters();
			genKeyVector();//每一次对data矫正
			socketThread st = new socketThread();
			Thread socketT = new Thread(st);
			socketT.start();
		}

		if (e.getSource() == jmi2) {
			System.exit(0);
		}
		if (e.getSource() == openButton) {
			if (jfc.getSelectedFile() == null) {
				JOptionPane.showMessageDialog(null,
						"No File Choosed! please try again!");
			} else {
				String[] command = { "notepad",
						jfc.getSelectedFile().getAbsolutePath() };
				try {
					Runtime.getRuntime().exec(command);
				} catch (Exception e1) {
					e1.printStackTrace();
				}
			}
		}
	}

	private class socketThread implements Runnable {// this thread is to initial
													// the socket to listen to
													// the port, the
													// mainframe can respond the
													// close operation at the
													// same time.
		@Override
		public void run() {
			// TODO Auto-generated method stub
			try {
				ss = new ServerSocket(8901);
				servs = ss.accept();
				jta.append("\n" + servs.getLocalSocketAddress()
						+ "has connected to the searver!");
			} catch (Exception es) {
				JOptionPane.showMessageDialog(null,
						"socket error has taken place!");
			}
			serverThread st = new serverThread(servs);
			Thread t = new Thread(st);
			t.start();
		}

	}

	private class serverThread implements Runnable {// create a thread for each
													// client
		Socket s;
		ObjectInputStream ois1;
		ObjectOutputStream oos1;
		FileInputStream fis;
		FileOutputStream fos;
		String fileName;
		File tempFile;
		int i;
		JDialog jdg;
		JProgressBar jpb;

		JTextArea showArea;
		JScrollPane jscp;

		public serverThread(Socket s) {
			this.s = s;
			try {
				ois1 = new ObjectInputStream(s.getInputStream());
				oos1 = new ObjectOutputStream(s.getOutputStream());
				jdg = new JDialog();
				jpb = new JProgressBar();
				jpb.setBorderPainted(true);
				//jpb.setBorder(BorderFactory.createTitledBorder("当前目录搜索完成度"));
				jpb.setValue(0);
				jpb.setStringPainted(true);
				jdg.setTitle("搜索");
				jdg.add(jpb,BorderLayout.NORTH);
				jpb.setMinimum(0);
				jpb.setMaximum(keyVector.size());
				showArea = new JTextArea(10, 10);
				showArea.setLineWrap(true);
				showArea.setBorder(BorderFactory.createTitledBorder("当前搜索文件"));
				jscp = new JScrollPane(showArea);
				jdg.add(jscp, BorderLayout.SOUTH);
				jdg.setDefaultCloseOperation(JDialog.DO_NOTHING_ON_CLOSE);
				jdg.pack();
				jdg.setLocationRelativeTo(getParent());
				jdg.setDefaultLookAndFeelDecorated(true);
			} catch (IOException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
		}

		@Override
		public void run() {
			// TODO Auto-generated method stub

			while (!s.isClosed()) {
				try {
					Trapdoor t = (Trapdoor) ois1.readObject();
					BigInteger temp1 = t.getFirst();
					BigInteger temp2 = t.getSecond();
					jta.append("\ncomplete reading the trapdoor!\nStarting to seach!");
					boolean searchState = false;
					i = 0;
					jpb.setValue(i);
					jdg.setVisible(true);
					for (BigInteger tempb : keyVector) {
						if (tempb.modPow(temp1, modules).equals(temp2)) {//匹配
							oos1.writeBoolean(true);
							fileName = ht.get(tempb);
							tempFile = new File(fileName);
							oos1.writeObject(fileName);
							oos1.flush();
							searchState = true;
							jpb.setValue(jpb.getMaximum());
							showArea.setText(tempb.toString(10)
									+ "match success!");
							Thread.sleep(2000);
							jdg.setVisible(false);
							break;
						} else {
							i++;
							jpb.setValue(i);
							showArea.setText("当前匹配:"+tempb.toString(10));
	
						}
					}
					if (!searchState) {
						jpb.setValue(keyVector.size());
						showArea.setText("complete searching! No file matches!");
						Thread.sleep(2000);
						jdg.setVisible(false);
						oos1.writeBoolean(false);
						oos1.flush();
					}
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
	}
}

// 实例化服务器
public class PEKSServer {
	public static void main(String[] args) {
		new Thread() {
			public void run() {
				PEKSSFrame pekss = new PEKSSFrame();
			//	pekss.genKeyVector();
				pekss.setVisible(true);
				pekss.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
			}
		}.start();
	}
}
