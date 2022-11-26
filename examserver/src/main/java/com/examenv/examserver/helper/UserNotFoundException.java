package com.examenv.examserver.helper;

public class UserNotFoundException extends Exception {
    public UserNotFoundException() {
        super("User with this Username not found in DB!!");
    }

    public UserNotFoundException(String msg) { super(msg); }
}
