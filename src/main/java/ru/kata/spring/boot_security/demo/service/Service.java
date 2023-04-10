package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

public interface Service  {
    public List<User> findAll();
    public User findOne(Long id);
    public void save(User user);
    public void update(Long id, User user);
    public void delete(Long id);

}
