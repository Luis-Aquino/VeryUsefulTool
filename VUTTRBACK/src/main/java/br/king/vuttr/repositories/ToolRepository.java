package br.king.vuttr.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.king.vuttr.entities.Tool;

//Classe de persistência utilizando a implementação da especificação jpa do spring
public interface ToolRepository extends JpaRepository<Tool, Integer>{
	
	//Query que retorna a tool pelo título 
	@Query("SELECT t FROM Tool t WHERE t.title LIKE %:str%")
	public List<Tool> findByTitle(@Param("str") String str);
	
	//Query que retorna a tool dado o nome de uma tag
	@Query("SELECT DISTINCT t FROM Tool t JOIN t.tags tag WHERE tag LIKE CONCAT('%', :str, '%')")
	public List<Tool> findByTag(@Param("str") String str);
}
