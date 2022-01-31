package br.king.vuttr;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import br.king.vuttr.entities.Tool;
import br.king.vuttr.repositories.ToolRepository;

@Configuration
public class Config implements CommandLineRunner{
	
	@Autowired
	private ToolRepository toolRepository;
	
	@Override
	public void run(String... args) throws Exception {
		/*
		 * INSERIR NO MEU BANCO DE DADOS INFORMAÇÕES INICIAIS...
		 * */
		List<String> tg1 = new ArrayList<String>();
		tg1.add("#organization");
		tg1.add("#planning");
		tg1.add("#collaboration");
		tg1.add("#writing");
		tg1.add("#calendar");
		Tool t1 = toolRepository.save(new Tool(null,"Notion", "https://notion.so","All in one tool to organize teams and ideas.Write, plan, collaborate, and get organized. ", tg1));
		
		List<String> tg2 = new ArrayList<String>();
		tg2.add("#api");
		tg2.add("#json");
		tg2.add("#schema");
		tg2.add("#node");
		tg2.add("#github");
		tg2.add("#rest");
		Tool t2 = toolRepository.save(new Tool(null,"json-server","https://github.com/typicode/json-server", "Fake REST API based on a json schema. Useful for mocking and creating APIs for front-end devs to consume in coding challenges. ", tg2));
		
		List<String> tg3 = new ArrayList<String>();
		tg3.add("#web");
		tg3.add("#framework");
		tg3.add("#node");
		tg3.add("#http2");
		tg3.add("#https");
		tg3.add("#localhost");
		Tool t3 = toolRepository.save(new Tool(null,"fastify", "https://www.fastify.io/","Extremely fast and simple, low-overhead web framework for NodeJs. Supports HTTP2. ", tg3));
		
	}
}
