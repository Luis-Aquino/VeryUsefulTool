package br.king.vuttr.business;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.king.vuttr.entities.Tool;
import br.king.vuttr.exceptions.ToolException;
import br.king.vuttr.repositories.ToolRepository;

@Service
public class ToolBusiness {
	
	@Autowired
	private ToolRepository repository;
	
	public List<Tool> findAll(){
		return repository.findAll();		
	}
	
	public List<Tool> findByTitle(String str){
		str = str.toLowerCase();
		return repository.findByTitle(str);
	}
	
	public List<Tool> findByTag(String str){
		str = str.toLowerCase();
		return repository.findByTag(str);
	}
	
	public Tool findById(Integer id) {
		Optional<Tool> retorno = repository.findById(id);
		return retorno.get();
	}
	//Método para inserir ferramentas, passando sempre o campo tag, para lowercase
	//para melhoras a exepriência do usuário nas consultas
	public Tool insert(Tool tool) throws ToolException {
		List<String> tags = new ArrayList<String>();
		for (int i = 0; i < tool.getTags().size(); i++ ) {
			tags.add(tool.getTags().get(i).toLowerCase());
		}
		tool.setTags(tags);

		this.validateTool(tool);
		return repository.save(tool);
	}
	
	public Tool update(Tool tool) throws ToolException {
		this.validateTool(tool);
		return repository.save(tool);
	}
	
	public void delete(Integer id) {
		repository.deleteById(id);
	}
	
	private void validateTool(Tool tool) throws ToolException {
		if(tool.getTitle() == null || tool.getTitle().length() == 0) {
			throw new ToolException("0003");
		}
	}
}
