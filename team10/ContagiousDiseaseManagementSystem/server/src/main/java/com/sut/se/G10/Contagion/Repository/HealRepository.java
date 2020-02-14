package com.sut.se.G10.Contagion.Repository;

import com.sut.se.G10.Contagion.Entity.Heal;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;   

@RepositoryRestResource 
public 
interface HealRepository extends JpaRepository<Heal, Long> {	
    Heal findById(long id);
}