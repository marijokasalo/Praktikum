package com.projekt.praktikum.controller;

import com.projekt.praktikum.model.Maintenance;
import com.projekt.praktikum.service.MaintenanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/maintenance")
public class MaintenanceController {

    private final MaintenanceService maintenanceService;

    @Autowired
    public MaintenanceController(MaintenanceService maintenanceService) {
        this.maintenanceService = maintenanceService;
    }

    @PostMapping
    public Maintenance addMaintenance(@RequestBody Maintenance maintenance) {
        return maintenanceService.saveMaintenance(maintenance);
    }

    @GetMapping
    public List<Maintenance> getAllMaintenance() {
        return maintenanceService.getAllMaintenance();
    }
    @PutMapping("/{id}")
    public Maintenance updateMaintenance(@RequestBody Maintenance newMaintenance, @PathVariable Long id) {
        return maintenanceService.updateMaintenance(id, newMaintenance);
    }

    @DeleteMapping("/{id}")
    public void deleteMaintenance(@PathVariable Long id) {
        maintenanceService.deleteMaintenance(id);
    }
}
