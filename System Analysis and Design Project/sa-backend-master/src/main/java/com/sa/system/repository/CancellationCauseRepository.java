package com.sa.system.repository;

import com.sa.system.entity.CancellationCause;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface CancellationCauseRepository extends JpaRepository<CancellationCause, Long> {

}