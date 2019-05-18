package com.tarena.service;

import com.tarena.vo.Page;
import com.tarena.vo.Result;

public interface UserService {
    Result login(String userName, String password);

    public Result findUserByPage(Page page);

    Result findUserById(String userId);
}
