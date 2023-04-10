package ru.kata.spring.boot_security.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.repositories.RoleRepository;
import ru.kata.spring.boot_security.demo.repositories.UserRepository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.*;

@Service
@Transactional(readOnly = true)

public class ServiceUser implements ru.kata.spring.boot_security.demo.service.Service {
    @PersistenceContext
    private EntityManager em;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;

    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(12);


    @Override

    public List<User> findAll() {
        return userRepository.findAll();
    }


    public User findOne(Long id) {
        Optional<User> foundUser = userRepository.findById(id);
        return foundUser.orElse(null);
    }


    @Transactional
    @Override
    public void save(User user) {

        if (user.getId() != null) {
            if (user.getRoles().size() == 0) {
                user.setRoles(findOne(user.getId()).getRoles());
            }
            if (!findOne(user.getId()).getPassword().equals(user.getPassword())) {

                user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            }
        } else {
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        }

        userRepository.save(user);

    }


    @Transactional
    @Override
    public void update(Long id, User user) {
        user.setId(id);
        userRepository.save(user);
    }

    @Transactional
    @Override
    public void delete(Long id) {
        userRepository.deleteById(id);
    }


}
