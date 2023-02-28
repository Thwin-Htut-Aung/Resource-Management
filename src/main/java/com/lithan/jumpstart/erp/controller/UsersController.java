package com.lithan.jumpstart.erp.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
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
    @PreAuthorize("hasRole('USER')")
    public Users getUser(@CurrentUser UsersPrincipal usersPrincipal) {
    	return userRepository.findById((usersPrincipal.getUserId())) 
                .orElseThrow(() -> new ResourceNotFoundException("Users", "userId", usersPrincipal.getUserId()));
    }
}
