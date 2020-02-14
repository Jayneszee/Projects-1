package com.sa.system.controller;

import java.util.List;
import java.util.Optional;

import com.sa.system.entity.CancellationCause;
import com.sa.system.repository.CancellationCauseRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = {"http://localhost:8080", "http://localhost:4200"})
public class CancellationCauseController {

    @Autowired private CancellationCauseRepository cancellationCauseRepository;

    @GetMapping("/cause")
    public List<CancellationCause> getCancellationCauses() {
        return cancellationCauseRepository.findAll();
    }

    @GetMapping("/cause/{id}")
    public Optional<CancellationCause> getCancellationCause(@PathVariable Long id) {
        return cancellationCauseRepository.findById(id);
    }
}