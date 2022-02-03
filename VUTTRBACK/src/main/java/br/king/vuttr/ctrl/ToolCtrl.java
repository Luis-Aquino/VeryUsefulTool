package br.king.vuttr.ctrl;

import java.util.ArrayList;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.king.vuttr.business.ToolBusiness;
import br.king.vuttr.entities.Tool;
import br.king.vuttr.exceptions.ToolException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import br.king.vuttr.Messages;
//Principal classe de serviços 
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value="tools")
public class ToolCtrl {
	
	@Autowired
	private ToolBusiness business;
	//Método para retornar todas as ferramentas cadastradas.
	@GetMapping("/findAll")
	@Operation(summary="Find all tools created.")
	@ApiResponses(value= {@ApiResponse(responseCode = "200",
						  description ="Fetched all the tools created."),
						  @ApiResponse(responseCode = "400",
						  description ="Not Available.")})
	public ResponseEntity<List<Tool>> findAll(){
		HttpHeaders headers = new HttpHeaders();
		HttpStatus status = HttpStatus.OK;
		List<Tool> list = new ArrayList<Tool>();
		try {
			list = business.findAll();
			if(list.size() == 0) {
				headers.add("message", Messages.get("0001"));
			}
		}catch (Exception e) {
			status = HttpStatus.BAD_REQUEST;
			headers.add("message", Messages.get("0002"));
		}
		return new ResponseEntity<List<Tool>>(list, headers, status);
	}
	//Método para inserir ferramenta
	@PostMapping
	@Operation(summary="Create a new tool.")
	@ApiResponses(value= {@ApiResponse(responseCode = "201",
	  description ="Tool created with success."),
	  @ApiResponse(responseCode = "400",
	  description ="Not Available."),
	  @ApiResponse(responseCode = "500",
	  description ="Error to create tool.")})
	public ResponseEntity<Tool> insert(@RequestBody Tool tool){
		HttpHeaders headers = new HttpHeaders();
		HttpStatus status = HttpStatus.CREATED;
		
		try {
			tool = business.insert(tool);
			headers.add("message", Messages.get("0004"));
		} catch (ToolException e) {
			headers.add("message", Messages.get(e.getMessage()));
			status = HttpStatus.BAD_REQUEST;
		} catch (Exception e) {
			headers.add("message", Messages.get("0005"));
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<Tool>(tool, headers, status);
	}
	//Método para atualizar ferramenta 
	@Operation(summary="Update Tool.")
	@ApiResponses(value= {@ApiResponse(responseCode = "200",
	  description ="Tool updated with success."),
	  @ApiResponse(responseCode = "400",
	  description ="Not Available."),
	  @ApiResponse(responseCode = "500",
	  description ="Error to update tool.")})
	public ResponseEntity<Tool> update(@RequestBody Tool tool){
		HttpHeaders headers = new HttpHeaders();
		HttpStatus status = HttpStatus.OK;
		
		try {
			tool = business.update(tool);
			headers.add("message", Messages.get("0006"));
		} catch (ToolException e) {
			headers.add("message", Messages.get(e.getMessage()));
			status = HttpStatus.BAD_REQUEST;
		} catch (Exception e) {
			headers.add("message", Messages.get("0007"));
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<Tool>(tool, headers, status);
	}
	//Método para deletar ferramenta por id
	@DeleteMapping("/{id}")
	@Operation(summary="Delete Tool.")
	@ApiResponses(value= {@ApiResponse(responseCode = "204",
	  description ="Tool deleted with success."),
	  @ApiResponse(responseCode = "500",
	  description ="Error to delete tool.")})
	public ResponseEntity<Void> delete(@PathVariable Integer id){
		HttpHeaders headers = new HttpHeaders();
		HttpStatus status = HttpStatus.NO_CONTENT;
		
		try {
			business.delete(id);
			headers.add("message", Messages.get("0008"));
		} catch (Exception e) {
			headers.add("message", Messages.get("0009"));
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<Void>(headers, status);
	}
	//Método para buscar ferramentas de acordo com o título inserido
	@GetMapping("/title/{str}")
	@Operation(summary="Search tool by title.")
	@ApiResponses(value= {@ApiResponse(responseCode = "200",
	  description ="The search doesn't bring any results for tools."),
	  @ApiResponse(responseCode = "400",
	  description ="System Error.")})
	public ResponseEntity<List<Tool>> findByTitle(@PathVariable String str){
		HttpHeaders headers = new HttpHeaders();
		HttpStatus status = HttpStatus.OK;
		List<Tool> list = new ArrayList<Tool>();
		try {
			list = business.findByTitle(str);
			if(list.size() == 0) {
			}
			headers.add("message", Messages.get("0001"));
		}catch (Exception e) {
			status = HttpStatus.BAD_REQUEST;
			headers.add("message", Messages.get("0002"));
		}
		return new ResponseEntity<List<Tool>>(list, headers, status);

	}
	//Método para buscar ferramentas de acordo com a tag inserida
	@GetMapping
	@Operation(summary="Search tool by tag.")
	@ApiResponses(value= {@ApiResponse(responseCode = "200",
	  description ="The search doesn't bring any results for tools."),
	  @ApiResponse(responseCode = "400",
	  description ="System Error.")})
	public ResponseEntity<List<Tool>> findTag(@RequestParam String tag){
		HttpHeaders headers = new HttpHeaders();
		HttpStatus status = HttpStatus.OK;
		List<Tool> list = new ArrayList<Tool>();
			try {
				list = business.findByTag(tag);
				if(list.size() == 0) {
					headers.add("message", Messages.get("0001"));
				}
			}catch (Exception e) {
				status = HttpStatus.BAD_REQUEST;
				headers.add("message", Messages.get("0002"));
			}
			return new ResponseEntity<List<Tool>>(list, headers, status);
	}
	
}	
