package com.projekt.praktikum.service;

import org.springframework.stereotype.Service;
import com.projekt.praktikum.model.Cow;
import com.projekt.praktikum.repository.CowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Optional;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CowService {

    private final CowRepository cowRepository;

    @Autowired
    public CowService(CowRepository cowRepository) {
        this.cowRepository = cowRepository;
    }

    public Cow saveCow(Cow cow) {
        return cowRepository.save(cow);
    }

    public List<Cow> getCows() {
        return (List<Cow>) cowRepository.findAll();
    }

    public Optional<Cow> getCowById(Long id) {
        return cowRepository.findById(id);
    }

    public void deleteCow(Long id) {
        cowRepository.deleteById(id);
    }

    @Transactional
    public Cow updateCow(Long id, Cow newCow) {
        return cowRepository.findById(id)
                .map(cow -> {
                    cow.setName(newCow.getName());
                    cow.setAge(newCow.getAge());
                    return cowRepository.save(cow);
                })
                .orElseGet(() -> {
                    newCow.setId(id);
                    return cowRepository.save(newCow);
                });
    }


}
