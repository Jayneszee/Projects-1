package com.sa.system.controller;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.sa.system.entity.CancelRepair;
import com.sa.system.entity.CancellationCause;
import com.sa.system.entity.ProductReceiveType;
import com.sa.system.entity.Request;
import com.sa.system.entity.Customer;
import com.sa.system.repository.CancelRepairRepository;
import com.sa.system.repository.CancellationCauseRepository;
import com.sa.system.repository.ProductReceiveTypeRepository;
import com.sa.system.repository.RequestRepository;
import com.sa.system.repository.CustomerRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = {"http://localhost:8080", "http://localhost:4200"})
public class CancelRepairController {

    @Autowired private CancelRepairRepository cancelRepairRepository;
    @Autowired private RequestRepository requestRepository;
    @Autowired private CancellationCauseRepository cancellationCauseRepository;
    @Autowired private ProductReceiveTypeRepository productReceiveTypeRepository;
    @Autowired private CustomerRepository customerRepository;
    @GetMapping("/cancel")
    public List<CancelRepair> findCancelRepairs() {
        return cancelRepairRepository.findAll();
    }

    @GetMapping("/cancel/{id}")
    public Optional<CancelRepair> findCancel(@PathVariable Long id) {
        return cancelRepairRepository.findById(id);
    }

    @PostMapping("/cancel/{requestId}/{cancellationCauseId}/{productReceiveId}/{customerId}")
    public CancelRepair addCancelRepair(@PathVariable long requestId, @PathVariable Long cancellationCauseId, @PathVariable Long productReceiveId, @PathVariable long customerId) {
        CancelRepair newCancelRepair = new CancelRepair();
        Request request = requestRepository.findById(requestId);
        Optional<CancellationCause> cancellationCause = cancellationCauseRepository.findById(cancellationCauseId);
        Optional<ProductReceiveType> productReceiveType = productReceiveTypeRepository.findById(productReceiveId);

        Customer c = customerRepository.findById(customerId);
        
        newCancelRepair.setAsCustomer(c);
        newCancelRepair.setRequestId(request);
        newCancelRepair.setCause(cancellationCause.get());
        newCancelRepair.setType(productReceiveType.get());
        newCancelRepair.setCancelDate(new Date());
        
        return cancelRepairRepository.save(newCancelRepair);
    }

}