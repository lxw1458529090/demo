package com.tarena.dao;

import com.tarena.entity.Role;
import com.tarena.vo.Page;

import java.util.List;

public interface RoleMapper {
    int getCount(Page page);

    List<Role> getRoleByPage(Page page);



    int addRole(Role role);

    int deleteRole(String roleId);
}
