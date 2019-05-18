//@ sourceURL=role.js
//alert("role.js");
var roleId;
$(function(){
    //第一次点击角色管理查询没有模糊关键字的第一页数据
    findRolesByPage(1)
    //给模糊搜索的按钮添加事件
    $("#rolePanel .row button").click(function(){
        //模糊关键字框中可能有模糊关键字,也有可能没有模糊关键字
        findRolesByPage(1);
    });
    //给新增角色的表单添加submit事件
    $("#addPanel form").submit(function(){
        return addRole();
    });
    //给删除的modal框的确定按钮添加事件
    $(".bs-example-modal-sm button:eq(1)").click(function(){
        deleteRole();
    });
    //给删除的modal框添加事件
    $('.bs-example-modal-sm').on('hidden.bs.modal', function (e) {
        alert("哈哈,藏完了!!");
    });
});
function updateClick(rid){
    roleId=rid;
    //获取页面上的旧值
    var oldRoleName=$("#tr_"+roleId).find("td:eq(2)").text();
    //把旧值赋值给文本框
    $("#editRole form input[type=text]").val(oldRoleName);
}
function deleteClick(rid){
    roleId=rid;
}
function deleteRole(){
    //发送异步请求,删除角色
    $.ajax({
        url:"role/deleteRole/"+roleId,
        type:"delete",
        dataType:"json",
        success:function(result){
            if(result.status==1){
                //说明角色删除成功
                //删除对应页面上的行
                $("#tr_"+roleId).remove();
                //关闭删除的modal框
                $('.bs-example-modal-sm').modal('hide');

            }else if(result.status==0){
                alert("角色删除失败!!")
            }
        },
        error:function(){
            alert("请求失败!!!");
        }
    });
}
//添加角色
function addRole(){
    var newRole=$("#addPanel form #roleName").val();
    $.ajax({
        url:"role/addRole/"+newRole,
        type:"post",
        dataType:"json",
        success:function(result){
            if(result.status==1){
                //角色添加成功
                alert(result.message);
            }else if(result.status==0){
                alert("角色添加失败!!!")
            }
        },
        error:function(){
            alert("请求失败!!");
        }
    });
    return false;
}
function findRolesByPage(currentPage){
    var roleKeyword=$("#rolePanel .row input[type=text]").val();
    if(roleKeyword==""){
        roleKeyword="undefined";
    }
    //alert("roleKeyword-->"+roleKeyword);
    //发送异步请求分页查询
    $.ajax({
        url:"role/findRolesByPage",
        type:"get",
        data:{
            "currentPage":currentPage,
            "roleKeyword":roleKeyword
        },
        dataType:"json",
        success:function(result){
            if(result.status==1){
                //说明,服务端的数据正确返回
                var page=result.data;
                var roles=page.data;
                //先清空页面上的缘由的表格信息
                $("#role_table tbody").html("");
                //给表格添加新的数据信息
                $(roles).each(function(index,role){
                    //index:遍历到那个元素的索引下表,从0开始
                    //role:遍历到的那个元素对象
                    if(role.name!='超级管理员' && role.name!='讲师' && role.name!="学员"){
                        var tr2='<tr id="tr_'+role.id+'">'+
                            '<td>'+(index+1)+'</td>'+
                            '<td>'+role.id+'</td>'+
                            '<td>'+role.name+'</td>'+
                            '<td>'+
                            '<a onclick="updateClick(\''+role.id+'\')" href="" data-toggle="modal" data-target="#editRole" ><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>编辑</a>'+
                            '<a onclick="deleteClick(\''+role.id+'\')" href="" data-toggle="modal" data-target=".bs-example-modal-sm"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>删除</a>'+
                            '</td>'+
                            '</tr>'
                        $("#role_table tbody").append(tr2);
                    }else{
                        var tr1='<tr>'+
                            '<td>'+(index+1)+'</td>'+
                            '<td>'+role.id+'</td>'+
                            '<td>'+role.name+'</td>'+
                            '<td>'+
                            '</td>'+
                            '</tr>';

                        $("#role_table tbody").append(tr1)
                    }
                });

                //清空分页组件
                $("#role_pagination").html('');
                //组装分页组件
                if(page.totalPage>1){
                    var previous='<li>'+
                        '<a href="javascript:findRolesByPage('+page.previousPage+')" aria-label="Previous">'+
                        '<span aria-hidden="true">&laquo;</span>'+
                        '</a>'+
                        '</li>';
                    $("#role_pagination").append(previous);
                    $(page.nums).each(function(n,value){
                        var middle='<li><a href="javascript:findRolesByPage('+value+')">'+value+'</a></li>';
                        $("#role_pagination").append(middle);
                    })
                    var middle='<li><a href="#">2</a></li>';

                    var last='<li>'+
                        '<a href="javascript:findRolesByPage('+page.nextPage+')" aria-label="Next">'+
                        '<span aria-hidden="true">&raquo;</span>'+
                        '</a>'+
                        '</li>';
                    $("#role_pagination").append(last);
                }
            }else if(result.status==0){
                alert("没有查询到数据!")
            }
        },
        error:function(){
            alert("请求失败!!");
        }
    });
}
