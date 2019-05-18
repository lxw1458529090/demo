package com.tarena.controller;

import com.tarena.service.RoleService;
import com.tarena.vo.Page;
import com.tarena.vo.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value = "role/")
public class RoleController {
    @Autowired
    private RoleService roleService;
    @RequestMapping(value = "findRoleByPage",method= RequestMethod.GET)
    @ResponseBody
    public Result findRoleByPage(Page page){
        Result result=null;
        System.out.println(page.getCurrentPage()+" "+page.getRoleKeyword());
        result=roleService.findRoleByPage(page);
        return result;
    }

    @RequestMapping(value = "addRole/newRoleName",method = RequestMethod.POST)
    @ResponseBody
    public  Result addRole(@PathVariable("newRoleName") String roleName){
        Result result=null;
        result=this.roleService.addRole(roleName);
        return  result;
    }

    @ResponseBody
    @RequestMapping(value = "deleteRole", method=RequestMethod.GET)
    public Result deleteRole(@PathVariable("roleId") String roleId){
        Result result=null;
        result=this.roleService.deleteRole(roleId);
        return result;

    }

}
