package com.sl.util;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;
public class DBLink {
	static Connection conn;
	private static final String fileName = "db.properties";

	public static Connection getConnection() {
		Properties props = new Properties();
		InputStream is = DBLink.class.getClassLoader().getResourceAsStream(fileName);
		try {
			props.load(is);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		try {
			Class.forName(props.getProperty("driver")).newInstance();
		} catch (InstantiationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		String url = props.getProperty("url");
		String uName = props.getProperty("uName");
		String uPass = props.getProperty("uPass");

//		String url="jdbc:mysql://localhost:3306/community";
//		String uName="root";
//		String uPass="";

		try {
			try {
				Class.forName("com.mysql.jdbc.Driver");
			} catch (ClassNotFoundException e) {
				e.printStackTrace();
			}
			conn = DriverManager.getConnection(url, uName, uPass);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return conn;
	}
}
