package com.examenv.examserver.controller;

import com.examenv.examserver.model.Role;
import com.examenv.examserver.model.User;
import com.examenv.examserver.model.UserRole;
import com.examenv.examserver.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.nio.file.attribute.UserPrincipalNotFoundException;
import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    //creating user
    @PostMapping("/")
    public User createUser(@RequestBody User user) throws Exception {
        user.setProfile("default.png");
        //encoding password with bcryptpasswordencoder

        user.setPassword(this.bCryptPasswordEncoder.encode(user.getPassword()));

        Set<UserRole> roles = new HashSet<>();

        Role role1 = new Role();
        role1.setRoleId(45l);
        role1.setRoleName("NORMAL");

        UserRole userRole = new UserRole();
        userRole.setRole(role1);
        userRole.setUser(user);
        roles.add(userRole);

        return this.userService.createUser(user, roles);
    }

    @GetMapping("{username}")
    public User getUser(@PathVariable("username") String username ){
        return this.userService.getUser(username);
    }

    //delete the user by id
    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable("userId") Long userId) {
        this.userService.deleteUser(userId);
    }


}
