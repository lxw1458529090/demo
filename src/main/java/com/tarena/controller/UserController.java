package com.tarena.controller;

import com.tarena.entity.User;
import com.tarena.service.UserService;
import com.tarena.vo.Page;
import com.tarena.vo.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
@RequestMapping(value ="user/")
public class UserController {
    @Autowired
    private UserService userService;

    /**
     * 登录
     * @param loginName
     * @param password
     * @return
     */
    @RequestMapping(value="login/{name}/{pwd}",method=RequestMethod.GET)
    @ResponseBody
    public Result login(@PathVariable("name") String loginName,@PathVariable("pwd") String password){
        System.out.println(loginName+"   "+password);
        Result result=null;
        result=userService.login(loginName,password);
        return result;
    }


    /**
     * 分页查询用户列表
     */
    @RequestMapping(value = "findUserByPage",method = RequestMethod.GET)
    @ResponseBody
    public  Result findUserByPage(Page page){
        Result result=null;
        result=this.userService.findUserByPage(page);
        return result;
    }


    /**
     * 通过用户id查用户信息
     * @param userId
     * @return
     */
    @RequestMapping(value = "findUserById/{userId}",method = RequestMethod.GET)
    @ResponseBody
    public Result findUserById(@PathVariable("userId") String userId){
        Result result=null;
        result=userService.findUserById(userId);
        return result;
    }

    /**
     * 添加新用户
     */
    @RequestMapping(value = "new",method = RequestMethod.POST)
    public void addUser(User user,
                        String roleId,
                        MultipartFile addPicture,
                        HttpServletRequest request,
                        HttpServletResponse response
                        ){

    }



}
