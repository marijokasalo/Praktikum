package com.projekt.praktikum.repository;

import org.springframework.data.repository.CrudRepository;
import com.projekt.praktikum.model.Maintenance;

public interface MaintenanceRepository extends CrudRepository<Maintenance, Long> {
}
