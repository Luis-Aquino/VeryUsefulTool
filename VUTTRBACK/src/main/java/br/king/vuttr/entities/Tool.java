package br.king.vuttr.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="tb_tools")
public class Tool {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id_tool")
	private Integer idTool;
	
	@Column(name="title")
	private String title;
	
	@Column(name="link")
	private String link;
	
	@Column(name="description")
	private String description;
	
	@ElementCollection
	private List<String> tags;
	
	public Tool(Integer idTool, String title, String link, String description, List<String> tags) {
		this.idTool = idTool;
		this.title = title;
		this.link = link;
		this.description = description;
		this.tags = tags;
	}
	
	public Tool() {
		
	}
	
	public Integer getIdTool() {
		return idTool;
	}
	
	public void setIdTool(Integer idTool) {
		this.idTool = idTool;
	}
	
	public String getTitle() {
		return this.title;
	}
	
	public void setTitle(String title) {
		this.title = title;
	}
	
	public String getDescription() {
		return description;
	}
	
	public void setDescription(String description) {
		this.description = description;
	}
	
	public List<String> getTags() {
		return this.tags;
	}
	
	public void setTags(List<String> tags) {
		this.tags = tags;
	}
	
	public String getLink() {
		return this.link;
	}
	
	public void setLink(String link) {
		this.link = link;
	}
}
