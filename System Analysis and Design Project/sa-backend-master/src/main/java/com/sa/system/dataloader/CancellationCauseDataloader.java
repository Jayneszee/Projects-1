package com.sa.system.dataloader;

import java.util.stream.Stream;

import com.sa.system.entity.CancellationCause;
import com.sa.system.repository.CancellationCauseRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class CancellationCauseDataloader implements ApplicationRunner {

    @Autowired private CancellationCauseRepository cancellationCauseRepository;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        Stream.of("Expensive", "Too long", "Bad fixed", "Mean").forEach(cancel -> {
            CancellationCause cancellationCause = new CancellationCause();
            cancellationCause.setCause(cancel);
            cancellationCauseRepository.save(cancellationCause);
        });

    }

    
}