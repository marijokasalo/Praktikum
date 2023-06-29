package com.projekt.praktikum.repository;

import com.projekt.praktikum.model.MilkingStats;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface MilkingStatsRepository extends JpaRepository<MilkingStats, Long> {
    @Query("SELECT m FROM MilkingStats m WHERE m.date BETWEEN :startDate AND :endDate")
    List<MilkingStats> findAllByDateBetween(@Param("startDate") Date startDate, @Param("endDate") Date endDate);
}
