package com.examenv.examserver.helper;

public class UserFoundException extends Exception{
    public UserFoundException() {
        super("User with this Username is already there in DB!! please try with an unique username");
    }

    public UserFoundException(String msg) { super(msg); }
}
