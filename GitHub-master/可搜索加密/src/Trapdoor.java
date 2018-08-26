import java.io.Serializable;
import java.math.BigInteger;

class Trapdoor implements Serializable {
	BigInteger first;
	BigInteger second;

	public Trapdoor(BigInteger first, BigInteger second) {
		this.first = first;
		this.second = second;
	}

	public BigInteger getFirst() {
		return first;
	}

	public BigInteger getSecond() {
		return second;
	}
}