$(function(){
	//window.onload=function(){}
	$(".container form #inputName").val(getCookie("loginName"));
	//给登录表单添加submit事件
	$(".container form").submit(function(){
		return login();
		//false:不用html的页面的表单提交,而是是用js的submit方法提交表单
		//true:用html的页面的表单提交,而是不用js的submit方法提交表单
	});	
});
//登录的js方法
function login(){
	//alert("login()");
	//获取页面表单中的文本框的内容
	var loginName=$(".container form #inputName").val();
	var password=$(".container form #inputPassword").val();
	//获取表单中的记住密码的值
	var remember=$(".container form input[type=checkbox]:checked").val();
	alert(loginName+"   "+password+ "    "+remember);	
	//把数据异步发送给服务端
	$.ajax({
		url:"user/login/"+loginName+"/"+password,
		type:"get",
		dataType:"json",
		success:function(result){
			if(result.status==1){
				//服务端正确返回
				//跳转页面
				window.location.href="index.html";
				//判断是否记住账号是否打了对勾了
				if(remember=="记住账号"){
					addCookie("loginName",loginName,5);
				}
				
			}else if(result.status==0){
				alert(result.message);
			}
		},
		error:function(){
			alert("请求失败!");
		}		
	});
	return false;
}