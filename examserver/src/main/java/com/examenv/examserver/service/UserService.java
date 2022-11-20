package com.examenv.examserver.service;

import com.examenv.examserver.model.User;
import com.examenv.examserver.model.UserRole;

import java.util.Set;

public interface UserService {

    //Create User
    public User createUser(User user, Set<UserRole> userRoles) throws Exception;

    //get user by username
    public User getUser(String username);


    //delete user by id
    public void deleteUser(Long userId);
}
