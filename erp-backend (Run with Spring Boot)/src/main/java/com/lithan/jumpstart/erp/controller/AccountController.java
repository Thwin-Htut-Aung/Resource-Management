package com.lithan.jumpstart.erp.controller;

import java.net.URI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.lithan.jumpstart.erp.entity.AuthProvider;
import com.lithan.jumpstart.erp.entity.Users;
import com.lithan.jumpstart.erp.exception.BadRequestException;
import com.lithan.jumpstart.erp.jwtsecurity.TokenProvider;
import com.lithan.jumpstart.erp.payload.Login;
import com.lithan.jumpstart.erp.payload.LoginResponse;
import com.lithan.jumpstart.erp.payload.Register;
import com.lithan.jumpstart.erp.payload.RegisterResponse;
import com.lithan.jumpstart.erp.repository.UsersRepository;

@RestController
@RequestMapping("/jumpstart")
public class AccountController {
	@Autowired
	private UsersRepository usersRepository;
	
	@Autowired
	private TokenProvider tokenProvider;
	
	@Autowired
	private PasswordEncoder passwordEncoder;                     
	
	@Autowired 
	private AuthenticationManager authenticationManager;
	
	//Register User for Local (not Google or Facebook signup)
	@PostMapping(value="/register")
	public ResponseEntity<?> registerUser(@RequestBody Register register){
		//Checking duplicate email
		if(usersRepository.existsByEmail(register.getEmail())) {
			throw new BadRequestException("Email has already registered before so kindly try anthoner email");
		}
		
		//Create new register user
		Users users = new Users();
		users.setUserName(register.getUserName());
		users.setEmail(register.getEmail());
		users.setPassword(register.getPassword());
		users.setRole("Role_User");
		users.setProvider(AuthProvider.local);
		
		//Encode Password
		users.setPassword(passwordEncoder.encode(users.getPassword()));
		
		//Save new user in the database
		Users newUser = usersRepository.save(users);
		
		URI location = ServletUriComponentsBuilder
				.fromCurrentContextPath().path("/user/me")
				.buildAndExpand(newUser.getUserId()).toUri();
		
		//Return to RegisterResponse Payload
		return ResponseEntity.created(location)
				.body(new RegisterResponse(true, "User has successfully registered!!!"));
	}
	
	//Local Login (not Google or Facebook)
	@PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Login login) {

		//Checking Authentication 
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                		login.getEmail(),
                		login.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        //If authorized user, create token
        String token = tokenProvider.createToken(authentication);
        
        //Return to LoginResponse Payload
        return ResponseEntity.ok(new LoginResponse(token));
    }
	
}
