package com.tarena.service.impl;

import com.tarena.dao.RoleMapper;
import com.tarena.entity.Role;
import com.tarena.service.RoleService;
import com.tarena.util.PageUtil;
import com.tarena.util.UUIDUtil;
import com.tarena.vo.Page;
import com.tarena.vo.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {
    @Autowired
    private RoleMapper roleMapper;

    @Autowired
    private PageUtil pageUtil;
    @Override
    public Result findRoleByPage(Page page) {
        Result result=new Result();

        //处理rolekeyword
        String rkw=page.getRoleKeyword();
        String roleKeyword="undefined".equals(rkw)? "%%":"%"+rkw+"%";
        page.setRoleKeyword(roleKeyword);
        //从page.properties属性文件获取每页的条数
        int pageSize=this.pageUtil.getPageSize();
        page.setPageSize(pageSize);
        int totalCount=this.roleMapper.getCount(page);
        page.setTotalCount(totalCount);
        int totalPage=(totalCount%page.getPageSize()==0? (totalCount%pageSize):(totalCount%pageSize)+1);
        page.setTotalPage(totalPage);
        if (page.getCurrentPage()==1){
            page.setPreviousPage(1);
        }else{
            page.setPreviousPage(page.getCurrentPage()-1);
        }
        if (page.getCurrentPage()==totalPage){
            page.setNextPage(totalPage);
        }else{
            page.setNextPage(page.getCurrentPage()+1);
        }

        List<Role> roles=this.roleMapper.getRoleByPage(page);
           page.setData(roles);

           page.setNums(this.pageUtil.getFenYe_a_Num(page.getCurrentPage(),page.getPageSize(),totalCount,totalPage));
           result.setStatus(1);
           result.setData(page);

        return result;
    }
    @Transactional(propagation= Propagation.REQUIRED,rollbackFor=Exception.class)
    @Override
    public Result addRole(String roleName) {
        Result result=new Result();
        Role role=new Role();
        role.setId(UUIDUtil.getUUID());
        role.setName(roleName);
        int i=this.roleMapper.addRole(role);
        if (i==1){
            result.setStatus(1);
            result.setMessage("角色添加成功!!!");
        }else{
            result.setStatus(0);
            result.setMessage("添加角色失败");

        }
        return result;
    }
    @Transactional(propagation= Propagation.REQUIRED,rollbackFor=Exception.class)
    @Override
    public Result deleteRole(String roleId) {
        Result result=new Result();
        int i=this.roleMapper.deleteRole(roleId);
        if (i==1){
            result.setStatus(1);
            result.setMessage("删除成功");
        }else{
            result.setStatus(0);
            result.setMessage("删除失败");
        }
        return result;
    }
}
