package com.example.FinalIntegradorBackEnd;

import org.apache.log4j.*;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class FinalIntegradorBackEndApplication {

	public static void main(String[] args) {
		PropertyConfigurator.configure("log4j.properties");
		SpringApplication.run(FinalIntegradorBackEndApplication.class, args);
	}

}
