package br.king.vuttr.ctrl;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
import org.springframework.web.bind.annotation.RestController;

import br.king.vuttr.business.ToolBusiness;
import br.king.vuttr.entities.Tool;
import br.king.vuttr.exceptions.ToolException;
import br.king.vuttr.Messages;

@CrossOrigin
@RestController
@RequestMapping(value="tools")
public class ToolCtrl {
	
	@Autowired
	private ToolBusiness business;
	
	@GetMapping
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

	@PostMapping
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

	@PutMapping
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

	@DeleteMapping("/{id}")
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
	
	@GetMapping("/title/{str}")
	public ResponseEntity<List<Tool>> findByTitle(@PathVariable String str){
		HttpHeaders headers = new HttpHeaders();
		HttpStatus status = HttpStatus.OK;
		List<Tool> list = new ArrayList<Tool>();
		try {
			list = business.findByTitle(str);
			if(list.size() == 0) {
				headers.add("message", Messages.get("0001"));
			}
		}catch (Exception e) {
			status = HttpStatus.BAD_REQUEST;
			headers.add("message", Messages.get("0002"));
		}
		return new ResponseEntity<List<Tool>>(list, headers, status);

	}
	
	@GetMapping("/tag/{str}")
	public ResponseEntity<List<Tool>> findByTag(@PathVariable String str){
		HttpHeaders headers = new HttpHeaders();
		HttpStatus status = HttpStatus.OK;
		List<Tool> list = new ArrayList<Tool>();
		try {
			list = business.findByTag(str);
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
