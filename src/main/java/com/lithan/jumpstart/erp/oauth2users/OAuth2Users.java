package com.lithan.jumpstart.erp.oauth2users;

import java.util.Map;

public abstract class OAuth2Users {
	//Using Map function for all OAuth like Facebook, Google
	protected Map<String, Object> attributes;

	//Constructor
	public OAuth2Users(Map<String, Object> attributes) {
		super();
		this.attributes = attributes;
	}
	
	public Map<String, Object> getAttributes() {
		return attributes;
	}

	public void setAttributes(Map<String, Object> attributes) {
		this.attributes = attributes;
	}

	public abstract String getId();
	public abstract String getName();
	public abstract String getEmail();
	public abstract String getImageUrl();
	
}
