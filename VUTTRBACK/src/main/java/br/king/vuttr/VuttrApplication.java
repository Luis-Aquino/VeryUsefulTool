package br.king.vuttr;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
//Classe principal do springboot
@SpringBootApplication
@OpenAPIDefinition(info = @Info(title = "Tools API", version = "1.0", description = "Rest Api's to maintain a system for tools. Developed by: Luis Aquino."))
public class VuttrApplication {

	public static void main(String[] args) {
		SpringApplication.run(VuttrApplication.class, args);
	}

}
