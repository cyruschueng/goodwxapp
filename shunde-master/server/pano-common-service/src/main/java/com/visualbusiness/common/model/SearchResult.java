package com.visualbusiness.common.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class SearchResult<T> implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private T result;

	private List<MyPair> aggs = null;

    public List<MyPair> getAggs() {
        return aggs;
    }

    public SearchResult setAggs(List<MyPair> aggs) {
        this.aggs = aggs;
        return this;
    }

    private long total;
	
	public SearchResult(T result, long total) {
		this.result = result;
		this.total = total;
	}

	public T getResult() {
		return result;
	}

	public void setResult(T result) {
		this.result = result;
	}

	public long getTotal() {
		return total;
	}

	public void setTotal(long total) {
		this.total = total;
	}

	public static class MyPair implements Serializable {
	    private String key;
	    private Object value;

        public String getKey() {
            return key;
        }

        public MyPair setKey(String key) {
            this.key = key;
            return this;
        }

        public Object getValue() {
            return value;
        }

        public MyPair setValue(Object value) {
            this.value = value;
            return this;
        }
    }
}
