
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.math.BigInteger;
import java.security.KeyFactory;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Hashtable;
import java.util.Random;
import java.util.Vector;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.xml.crypto.dsig.keyinfo.KeyValue;



public class PEKSInitial {
	private BigInteger primeP;// prime p
	private BigInteger primeQ;// prime q
	private BigInteger primeM;// prime m
	private BigInteger generator;// 生成元G
	private Vector<BigInteger> keyVector = new Vector<BigInteger>();// initial the keyVector
	
	private Hashtable<BigInteger, String> ht = new Hashtable<BigInteger, String>();// initial the hashtable;;
	private BigInteger fainM;// Bluer function of prime m

	PEKSInitial() {
		primeP = BigInteger.probablePrime(512, new Random());// generate a 512
																// bit prime
		primeQ = BigInteger.probablePrime(512, new Random());// generate a 512
																// bit prime
		generator = new BigInteger(512, new Random());// a 512 bit number, may
		 										// not prime
		primeM = primeP.multiply(primeQ);// compute m=p*q
		fainM = (primeP.subtract(BigInteger.ONE)).multiply(primeQ
				.subtract(BigInteger.ONE));// eluer function of m
		//keyVector.add(generator);
		//File outputFile = new File("Data Records\\123456.txt");
		//ht.put(generator,outputFile.getAbsolutePath());
	}
	
	public BigInteger getGenerator(){
		
		return this.generator;
	}
	
	public BigInteger getModules(){
		return this.primeM;
	}
	
	public BigInteger getEulerFunction(){
		return this.fainM;
	}
	public Vector<BigInteger> getKeyVector() {
		return keyVector;
	}
	public Hashtable<BigInteger, String> getHt() {
		return ht;
	}
	public static void main(String[] args){
		PEKSInitial initial=new PEKSInitial();
		try {
			SecretKey key=KeyGenerator.getInstance("DES").generateKey();
			ObjectOutputStream oos=new ObjectOutputStream(new FileOutputStream("initial.data"));
		//	ObjectOutputStream os=new ObjectOutputStream(new FileOutputStream("server.data"));
			oos.writeObject(key);
		//	os.writeObject(key);
			oos.writeObject(initial.getModules());
		//	os.writeObject(initial.getModules());
			oos.writeObject(initial.getGenerator());
		   
		//	os.writeObject(initial.getGenerator());
			oos.writeObject(initial.getEulerFunction());
		//	os.writeObject(initial.getKeyVector());
		//	os.writeObject(initial.getHt());
			oos.close();
		//	os.close();
			try {
				initial.getValues("Initial",key,initial.getModules(),initial.getGenerator());
			} catch (Exception e) {
				e.printStackTrace();
			}
			ObjectInputStream ois=new ObjectInputStream(new FileInputStream("initial.data"));
			for(int i=0;i<4;i++){
				System.out.println(ois.readObject().toString());
			}
		} catch (NoSuchAlgorithmException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		catch(IOException eio){
			eio.printStackTrace();
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public void getValues(String pathName,SecretKey key,BigInteger modules,BigInteger generator) throws Exception {//写入data
		MessageDigest	mds = MessageDigest.getInstance("SHA");
		for (File tempFile : new File(pathName).listFiles()) {
			DesEncrypter encrypter = new DesEncrypter(key);
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
					+ System.currentTimeMillis()*Math.random() + ".txt");
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
}
