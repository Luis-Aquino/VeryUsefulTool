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
	//Busta todas as ferramentas cadastradas
	public List<Tool> findAll(){
		return repository.findAll();		
	}
	//Procura ferramenta pelo título
	public List<Tool> findByTitle(String str){
		str = str.toLowerCase();
		return repository.findByTitle(str);
	}
	//Procura ferramenta pela tag
	public List<Tool> findByTag(String str){
		str = str.toLowerCase();
		return repository.findByTag(str);
	}
	//Procura ferramenta por id
	public Tool findById(Integer id) {
		Optional<Tool> retorno = repository.findById(id);
		return retorno.get();
	}
	//Inserção de ferramenta no banco
	public Tool insert(Tool tool) throws ToolException {

		this.validateTool(toLowerCase(tool));
		return repository.save(toLowerCase(tool));
	}
	//Atualização de ferramenta
	public Tool update(Tool tool) throws ToolException {
		this.validateTool(toLowerCase(tool));
		return repository.save(toLowerCase(tool));
	}
	//Deleção de ferramenta por id
	public void delete(Integer id) {
		repository.deleteById(id);
	}
	//validações de feraramentas
	private void validateTool(Tool tool) throws ToolException {
		if(tool.getTitle() == null || tool.getTitle().length() == 0) {
			throw new ToolException("0003");
		}
	}
	//Método para inserir ferramentas, passando sempre o campo tag, para lowercase
	//para melhoras a exepriência do usuário nas consultas
	private Tool toLowerCase(Tool t){
		List<String> tags = new ArrayList<String>();
		for (int i = 0; i < t.getTags().size(); i++ ) {
			tags.add(t.getTags().get(i).toLowerCase());
		}
		t.setTags(tags);
		return t;
	}
}
