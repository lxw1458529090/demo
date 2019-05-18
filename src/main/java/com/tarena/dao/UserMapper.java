package com.tarena.dao;

import com.tarena.entity.User;
import com.tarena.vo.Page;
import com.tarena.vo.Result;

import java.util.List;

public interface UserMapper {


  //  String login(User user);

    String login(String loginName, String password);

    int getCount(Page page);

    List<User> getUsersByPage(Page page);

    User findUserById(String userId);
}
