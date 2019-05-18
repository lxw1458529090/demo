package com.tarena.vo;

public class Result {
	/**
	 * 1:成功
	 * 0:失败
	 */
	private int status;
	//提示的消息
	private String message;
	//要操作的数据
	private Object data;
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public Object getData() {
		return data;
	}
	public void setData(Object data) {
		this.data = data;
	}
	
}
