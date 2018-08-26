package com.visualbusiness.pano.process.web.rest;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.visualbusiness.common.web.auth.AuthBaseRestController;

@RestController
@RequestMapping("/auth")
public class AuthRestController extends AuthBaseRestController {
	@Override
	protected String getLoginPermision() {
		return "pano-process:login";
	}
}
