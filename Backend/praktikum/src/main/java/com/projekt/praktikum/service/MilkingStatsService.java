package com.projekt.praktikum.service;

import com.projekt.praktikum.model.MilkingStats;
import com.projekt.praktikum.repository.MilkingStatsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Date;  // add this line

import java.util.List;

@Service
public class MilkingStatsService {

    private final MilkingStatsRepository milkingStatsRepository;

    @Autowired
    public MilkingStatsService(MilkingStatsRepository milkingStatsRepository) {
        this.milkingStatsRepository = milkingStatsRepository;
    }

    public MilkingStats saveMilkingStats(MilkingStats milkingStats) {
        return milkingStatsRepository.save(milkingStats);
    }

    public List<MilkingStats> getAllMilkingStats() {
        return milkingStatsRepository.findAll();
    }

    @Transactional
    public MilkingStats updateMilkingStats(Long id, MilkingStats newStats) {
        return milkingStatsRepository.findById(id)
                .map(stats -> {
                    stats.setAmountOfMilk(newStats.getAmountOfMilk());
                    stats.setMilker(newStats.getMilker());
                    stats.setCow(newStats.getCow());
                    stats.setDate(newStats.getDate());
                    return milkingStatsRepository.save(stats);
                })
                .orElseGet(() -> {
                    newStats.setId(id);
                    return milkingStatsRepository.save(newStats);
                });
    }

    @Transactional
    public void deleteMilkingStats(Long id) {
        milkingStatsRepository.deleteById(id);
    }


    public List<MilkingStats> getMilkingStatsByDateRange(Date startDate, Date endDate) {
        return milkingStatsRepository.findAllByDateBetween(startDate, endDate);
    }

}
