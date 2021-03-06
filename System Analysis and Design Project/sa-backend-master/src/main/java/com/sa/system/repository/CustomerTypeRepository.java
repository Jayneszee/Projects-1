package com.sa.system.repository;

import com.sa.system.entity.CustomerType;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface CustomerTypeRepository extends JpaRepository<CustomerType, Long>{

    
}