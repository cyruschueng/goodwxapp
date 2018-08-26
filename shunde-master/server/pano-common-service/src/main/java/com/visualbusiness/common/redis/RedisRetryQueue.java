package com.visualbusiness.common.redis;

/**
 * 基于Redis实现的带重试功能的队列。
 * 
 * @author dengbo
 *
 */
public class RedisRetryQueue {
	private String listName;
	private String hashName;
	private int retryTime;
	private boolean retryPriorityHigh;
	
	public RedisRetryQueue(String listName, String hashName, int retryTime, boolean retryPriorityHigh) {
		this.listName = listName;
		this.hashName = hashName;
		this.retryTime = retryTime;
		this.retryPriorityHigh = retryPriorityHigh;
	}
	
	public Long add(String s) {
		return Redis.lpush(this.listName, s);
	}
	
	public String next() {
		String s = Redis.rpop(this.listName);
		if (s == null) {
			return s;
		}
		
		long times = Redis.hincrBy(this.hashName, s, 1L);

		if(times > this.retryTime) {
			Redis.hdel(this.hashName, s);
			return null;
		}
		
		return s;
	}
	
	public void ack(String s) {
		Redis.hdel(this.hashName, s);
	}
	
	public Long readd(String s) {
		if(this.retryPriorityHigh) {
			return Redis.rpush(this.listName, s);
		} else {
			return Redis.lpush(this.listName, s);
		}
	}
}
