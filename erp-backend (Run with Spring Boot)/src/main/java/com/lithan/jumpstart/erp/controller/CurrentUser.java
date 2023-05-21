package com.lithan.jumpstart.erp.controller;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import org.springframework.security.core.annotation.AuthenticationPrincipal;

//Create CurrentUser interface to use as @CurrentUser in UsersController
//Avoid type mismatch
//meta-annotation
//Spring Security provides @AuthenticationPrincipal to access current authenticated user in controller
@Target({ElementType.PARAMETER, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@AuthenticationPrincipal
public @interface CurrentUser {
	
}
