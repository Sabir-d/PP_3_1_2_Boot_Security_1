package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.security.SecurityUser;
import ru.kata.spring.boot_security.demo.service.ServiceUser;


@RestController
@RequestMapping("/api/v1/user")
public class UserResource {

    private final ServiceUser userService;

    @Autowired
    public UserResource(ServiceUser userService) {
        this.userService = userService;
    }

    @GetMapping("/{userId}")
    public User findById(@PathVariable long userId) {
        return userService.findOne(userId);
    }
    @GetMapping("/test")
    public User findBytest() {
        return ((SecurityUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUser();
    }
    @PostMapping
    public boolean create(@RequestBody User user) {
         userService.save(user);
         return true;
    }
    @DeleteMapping({"/{id}"})
    public boolean delete(@PathVariable("id") Long id) {
        userService.delete(id);
        return true;
    }
}