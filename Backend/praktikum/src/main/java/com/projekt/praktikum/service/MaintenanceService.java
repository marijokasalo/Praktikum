package com.projekt.praktikum.service;

import com.projekt.praktikum.model.Maintenance;
import com.projekt.praktikum.repository.MaintenanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;


import java.util.List;

@Service
public class MaintenanceService {

    private final MaintenanceRepository maintenanceRepository;

    @Autowired
    public MaintenanceService(MaintenanceRepository maintenanceRepository) {
        this.maintenanceRepository = maintenanceRepository;
    }

    public Maintenance saveMaintenance(Maintenance maintenance) {
        return maintenanceRepository.save(maintenance);
    }

    public List<Maintenance> getAllMaintenance() {
        List<Maintenance> maintenances = new ArrayList<>();
        maintenanceRepository.findAll().forEach(maintenances::add);
        return maintenances;
    }


    @Transactional
    public Maintenance updateMaintenance(Long id, Maintenance newMaintenance) {
        return maintenanceRepository.findById(id)
                .map(maintenance -> {
                    maintenance.setPersonnel(newMaintenance.getPersonnel());
                    maintenance.setDate(newMaintenance.getDate());
                    maintenance.setType(newMaintenance.getType());
                    maintenance.setLastChanged(newMaintenance.getLastChanged());
                    return maintenanceRepository.save(maintenance);
                })
                .orElseGet(() -> {
                    newMaintenance.setId(id);
                    return maintenanceRepository.save(newMaintenance);
                });
    }


    @Transactional
    public void deleteMaintenance(Long id) {
        maintenanceRepository.deleteById(id);
    }

}
