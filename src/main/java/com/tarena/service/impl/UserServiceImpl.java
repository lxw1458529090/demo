package com.tarena.service.impl;

import com.tarena.dao.UserMapper;
import com.tarena.entity.User;
import com.tarena.service.UserService;
import com.tarena.util.PageUtil;
import com.tarena.vo.Page;
import com.tarena.vo.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private PageUtil pageUtil;
    @Override
    public Result login(String loginName, String password) {
        Result result=new Result();
        /*User user=new User();
        user.setLoginName("loginName");
        user.setPassword("password");*/
       String userId=userMapper.login(loginName,password);
       if (userId!=null){
           result.setStatus(1);
           result.setMessage("登陆成功......");

       }else{
           result.setStatus(0);
           result.setMessage("登陆失败.......");
       }
        return result;
    }

    @Override
    public Result findUserByPage(Page page) {
        Result result=new Result();
        String ukw=page.getUserKeyword();
        String userKeyword="undefined".equals(ukw)? "%%":"%"+ukw+"%";
        page.setUserKeyword(userKeyword);
       page.setPageSize(this.pageUtil.getPageSize());
       int totalCount=this.userMapper.getCount(page);
       page.setTotalCount(totalCount);
       int totalPage=(totalCount%page.getPageSize()==0)? (totalCount/page.getPageSize()):(totalCount/page.getPageSize())+1;
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
        List<User> users=this.userMapper.getUsersByPage(page);
        page.setData(users);
        page.setNums(this.pageUtil.getFenYe_a_Num(page.getCurrentPage(), page.getPageSize(), totalCount, totalPage));
        result.setStatus(1);
        result.setData(page);
        return result;
    }

    @Override
    public Result findUserById(String userId) {
        Result result=new Result();
       User user=this.userMapper.findUserById(userId);
        if (user!=null){
            result.setStatus(1);
            result.setData(user);
        }else{
            result.setStatus(0);
            result.setMessage("没查到数据");
        }

        return null;
    }
}
