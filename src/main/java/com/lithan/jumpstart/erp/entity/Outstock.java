package com.lithan.jumpstart.erp.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "outstock")
public class Outstock {

	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	@Column(name="product_id")
	private long productId;
	
	@NotBlank
	@Column(name="name")
	private String productName;
	
	@NotBlank
	@Column(name="price")
	private String productPrice;
	
	@NotBlank
	@Column(name="last_date")
	private String productLastDate;

	
	public long getProductId() {
		return productId;
	}

	public void setProductId(long productId) {
		this.productId = productId;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public String getProductPrice() {
		return productPrice;
	}

	public void setProductPrice(String productPrice) {
		this.productPrice = productPrice;
	}

	public String getProductLastDate() {
		return productLastDate;
	}

	public void setProductLastDate(String productLastDate) {
		this.productLastDate = productLastDate;
	}

	
	
}
