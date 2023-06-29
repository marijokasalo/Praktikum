package com.projekt.praktikum.controller;

import com.projekt.praktikum.model.MilkingStats;
import com.projekt.praktikum.service.MilkingStatsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/milking-stats")
public class MilkingStatsController {

    private final MilkingStatsService milkingStatsService;

    @Autowired
    public MilkingStatsController(MilkingStatsService milkingStatsService) {
        this.milkingStatsService = milkingStatsService;
    }

    @PostMapping
    public MilkingStats addMilkingStats(@RequestBody MilkingStats milkingStats) {
        return milkingStatsService.saveMilkingStats(milkingStats);
    }

    @GetMapping
    public List<MilkingStats> getAllMilkingStats() {
        return milkingStatsService.getAllMilkingStats();
    }

    @PutMapping("/{id}")
    public MilkingStats updateMilkingStats(@RequestBody MilkingStats newStats, @PathVariable Long id) {
        return milkingStatsService.updateMilkingStats(id, newStats);
    }

    @DeleteMapping("/{id}")
    public void deleteMilkingStats(@PathVariable Long id) {
        milkingStatsService.deleteMilkingStats(id);
    }

    @GetMapping("/milking-reminder")
    public String sendMilkingReminder() {

        return "Milking reminder sent.";
    }

    @GetMapping("/maintenance-reminder")
    public String sendMaintenanceReminder() {
        return "Maintenance reminder sent.";
    }
}
