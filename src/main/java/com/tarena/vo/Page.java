package com.tarena.vo;

import java.io.Serializable;
import java.util.List;

public class Page implements Serializable {

	private static final long serialVersionUID = 1L;
	private int currentPage;//当前页号
	private int pageSize;//每页显示的条数
	private int totalCount;//总记录数
	private int totalPage;//总页数
	private int previousPage;//前一页
	private int nextPage;//下一页
	
	private String roleKeyword;//角色的模糊关键字
	private String userKeyword;//用户的模糊关键字
	
	private Object data;//当前页的那些数据
	
	private int begin;//分页从第begin的下一条开始
	
	private List<Integer> nums;
	

	public String getUserKeyword() {
		return userKeyword;
	}

	public void setUserKeyword(String userKeyword) {
		this.userKeyword = userKeyword;
	}

	public List<Integer> getNums() {
		return nums;
	}

	public void setNums(List<Integer> nums) {
		this.nums = nums;
	}

	public int getBegin() {
		int begin=(currentPage-1)*pageSize;
		return begin;
	}

	public void setBegin(int begin) {
		this.begin = begin;
	}

	public int getCurrentPage() {
		return currentPage;
	}

	public void setCurrentPage(int currentPage) {
		this.currentPage = currentPage;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}

	public int getTotalPage() {
		return totalPage;
	}

	public void setTotalPage(int totalPage) {
		this.totalPage = totalPage;
	}

	public int getPreviousPage() {
		return previousPage;
	}

	public void setPreviousPage(int previousPage) {
		this.previousPage = previousPage;
	}

	public int getNextPage() {
		return nextPage;
	}

	public void setNextPage(int nextPage) {
		this.nextPage = nextPage;
	}

	public String getRoleKeyword() {
		return roleKeyword;
	}

	public void setRoleKeyword(String roleKeyword) {
		this.roleKeyword = roleKeyword;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}
	
	
}
