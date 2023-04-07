package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.security.SecurityUser;
import ru.kata.spring.boot_security.demo.service.Service;

import javax.swing.*;
import java.util.Collections;


@Controller

public class UserController {

    private final Service serviceUser;

    @Autowired
    public UserController(Service serviceUser) {
        this.serviceUser = serviceUser;
    }






    @GetMapping("/admin")
    public String admin(Model model) {
        User role = ((SecurityUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUser();

        model.addAttribute("role", role);
        model.addAttribute("user", serviceUser.findAll());
        return "admin";
    }
    @GetMapping("/user")
    public String user(Model model) {
       User role = ((SecurityUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUser();

        model.addAttribute("role", role);
        model.addAttribute("user", serviceUser.findAll());
        return "user";
    }
    @GetMapping("/{userId}")
    public User findById(@PathVariable long userId) {
        return serviceUser.findOne(userId);
    }

}