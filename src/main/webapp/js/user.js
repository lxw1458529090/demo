//@ sourceURL=user.js

$(function(){
	//无用户的模糊关键词的第一页
	findUsersByPage(1);
 //有模糊查询
$("#userPanel form .input-group button").click(function () {
	findUsersByPage(1);
});
$('#user_tablelist a:eq(1)').click(function (e) {
	e.preventDefault();
	$("#detailPanel .media").html('请选择一个"列表"数据');
});
$('#user_tablelist a:eq(2)').click(function (e) {
	e.preventDefault();
	findAllRole();
});
$("#addUserPanel form").submit(function () {
	return addUser();
});
});
function addUser() {
	var loginName=$("#addUserPanel form #inputEmail").val();
    var password=$("#addUserPanel form #inputPassword").val();
    var password2=$("#addUserPanel form #inputPassword2").val();
    var nickName=$("#addUserPanel form #nickName").val();
    var age=$("#addUserPanel form #age").val();
    var roleId=$("#addUserPanel form #courseCategory").val();
    var sex=$("#addUserPanel form input [name=user-type]:checked").val();
    alert(loginName+" "+password+" "+nickName+" "+age+" "+roleId+" "+sex);
    if(password!==password2){
    	return false;
	}
	if(age<1 || age>100){
    	return false;
	}
	$.ajaxFileUpload({
		url:"user/new",
		secureuri:false,
		fileelementId:"addHeadPicture",
		type:"post",
		data:{
			"loginName":loginName,
			"password":password,
			"nickName":nickName,
			"age":age,
			"sex":sex,
			"roleId":roleId
		},
		dataType:"text",
		success:function (data,status) {
            data=data.replace(/<PRE.*?>/g,'');
            data=data.replace("<PRE>",'');
            data=data.replace("</PRE>",'');
            data=data.replace(/<pre.*?>/g,'');
            data=data.replace("<pre>",'');
            data=data.replace("</pre>",'');
        },
		error:function () {
			alert("请求失败");
        }
		
	});
	return false;
}

function findAllRole() {
	$.ajax({
		url:"role/findAllRole",
		type:"get",
		dataType:"json",
		success:function (result) {
			if(result.status==1){
				$("#addUserPanel form #courseCategory").html("");
				var roles=result.data;
				$(roles).each(function (index,role) {
					var option='<option value="'+role.id+'">'+role.name+'</option>';
                    $("#addUserPanel form #courseCategory").append(option);
                })
			}else if(result.status==0){
				alert("没查到数据");
			}
        },
		error:function () {
           alert("请求失败");
        }
	});
}

function findUserById(uid) {
	$.ajax({
         url:"user/findUserById/"+uid,
		type:"get",
		dataType:"json",
		success:function (result) {
            if (result.status == 1) {
                var user = result.data;
                var roles = user.roles;
                var roleNameString = "";
                $(roles).each(function (n, role) {
                    roleNameString += role.name + ",";
                });
                if (roleNameString.length == 0) {
                    roleNameString = "无角色"
                } else {
                    roleNameString = roleNameString.substring(0, roleNameString.length - 1);
                }
                $('#user_tablist li:eq(1) a').tab('show');
                $("#detailPanel .media").html("");
                var details = '<div class="media-left">' +
                    '<a href="#">' +
                    '<img class="media-object img-circle" src="head/' + user.head + '" alt="头像">' +
                    '</a>' +
                    '</div>' +
                    '<div class="media-body">' +
                    '<h1 class="media-heading">' + user.loginName + '</h1>' +
                    '<br/>' +
                    '<p>账号类型：<span>' + user.loginType + '</span></p>' +
                    '<p>昵称：<span>' + user.nickName + '</span></p>' +
                    '<p>性别：<span>' + user.sex + '</span></p>' +
                    '<p>年龄：<span>' + user.age + '</span></p>' +
                    '<p>积分：<span>' + user.score + '</span></p>' +
                    '<p>注册日期：<span>' + new Date(user.regDate).toLocaleDateString() + '</span></p>' +
                    '<p>锁定：<span>' + user.isLock + '</span></p>' +
                    '<p>角色：<span>' + roleNameString + '</span></p>' +
                    '</div>';
                $("#detailPanel .media").append(details);
            } else if (result.status == 0) {
                alert("没有查询到数据");
            }
        },

		error:function () {
			alert("请求失败");
        }
	});
}

function findUsersByPage(currentPage){
	var userKeyword=$("#userPanel form input[type=text]").val();
	if(userKeyword==""){
		userKeyword="undefined";
	}
	$.ajax({
		url:"user/findUsersByPage",
		type:"get",
		data:{
			"currentPage":currentPage,
			"userKeywprd":userKeyword
		},
		dataType:"json",
		success:function (result) {
          if(result.status==1){
          	var page=result.data;
          	var users=page.data;
          	$("#user_table tbody").html("");
          	$(users).each(function(index,user){
          		var roles=user.roles;
          		var roleNameString="";
          		$(roles).each(function(n,role){
          			roleNameString+=role.name+",";
				});
          		if (roleNameString.length==0){
          			roleNameString="无角色";
				}else{
          			roleNameString=roleNameString.substring(0,roleNameString.length-1);
				}
				var tr='<tr id="tr_"'+user.id+'>\n' +
                    '                <td>'+(index+1)+'</td>\n' +
                    '                <td><a href="javascript:findUserById(\''+user.id+'\')">'+user.loginName+'</a></td>\n' +
                    '                <td>'+user.nickName+'</td>\n' +
                    '                <td>'+user.loginType+'</td>\n' +
                    '                <td>'+login.score+'</td>\n' +
                    '                <td>'+new Date(user.regDate).toLocaleDateString().replace("/","-").replace("/","-")+'</td>\n' +
                    '                <td>'+user.isLock+'</td>\n' +
                    '                <td>'+roleNameString+'</td>\n' +
                    '                <td>\n' +
                    '                  <a href="" data-toggle="modal" data-target="#editUser"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>编辑</a>\n' +
                    '                  <a href="" data-toggle="modal" data-target=".bs-example-modal-sm"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>删除</a>\n' +
                    '                </td>\n' +
                    '              </tr>';
                   ("#user_table tbody").append(tr);
			});
          	$("user_pageinatiion").html("");
          	if (page.totalPage>1){
          		var prevous='<li>'+
                    '<a href="javascript:findUsersByPage('+page.previousPage+')" aria-label="Previous">'+
                    '<span aria-hidden="true">&laquo;</span>'+
                    '</a>'+
                    '</li>';

                $("#user_pageinatiion").append(previous);
                $(page.nums).each(function(n,value){
                    var middle='<li><a href="javascript:findUsersByPage('+value+')">'+value+'</a></li>';
                    $("#user_pageinatiion").append(middle);
			});
                var last='<li>'+
                    '<a href="javascript:findUsersByPage('+page.nextPage+')" aria-label="Next">'+
                    '<span aria-hidden="true">&raquo;</span>'+
                    '</a>'+
                    '</li>';
                $("#user_pageinatiion").append(last);

			}

          }else if(result.status==0){
          	alert("没查到数据");
		  }
        },
        error:function () {
           alert("请求失败");
        }
	});
}