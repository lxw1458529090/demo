package com.tarena.service;

import com.tarena.vo.Page;
import com.tarena.vo.Result;

public interface RoleService {
    Result findRoleByPage(Page page);

    Result addRole(String roleName);

    Result deleteRole(String roleId);
}
