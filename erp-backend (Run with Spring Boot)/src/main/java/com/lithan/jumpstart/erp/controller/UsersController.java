package com.lithan.jumpstart.erp.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lithan.jumpstart.erp.entity.Users;
import com.lithan.jumpstart.erp.exception.ResourceNotFoundException;
import com.lithan.jumpstart.erp.repository.UsersRepository;
import com.lithan.jumpstart.erp.service.UsersPrincipal;

@RestController
@RequestMapping(value="/jumpstart")
public class UsersController {
	@Autowired
    private UsersRepository userRepository;

	//Profile API <<Get Current User Profile>>
    @GetMapping("/user/me")
    public Users getUser(@CurrentUser UsersPrincipal usersPrincipal) {
    	return userRepository.findById((usersPrincipal.getUserId())) 
                .orElseThrow(() -> new ResourceNotFoundException("Users", "userId", usersPrincipal.getUserId()));
    }
    
    //Get users for Admin
    @GetMapping("/get-users")
    public List<Users> getAllUsers() {
    	return userRepository.findAll();
    }
    
    //Add as admin or demote to user
    @PostMapping("/change-role")
    public void changeRole(@RequestBody Users user) {
    	Users targetUser = userRepository.getById(user.getUserId());
    	if(targetUser.getRole().equals("Role_User")) {
    		targetUser.setRole("Role_Admin");
    	}
    	else {
    		targetUser.setRole("Role_User");
    	}
    	userRepository.save(targetUser);
    }
}
