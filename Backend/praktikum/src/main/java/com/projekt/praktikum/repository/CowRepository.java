package com.projekt.praktikum.repository;

import org.springframework.data.repository.CrudRepository;
import com.projekt.praktikum.model.Cow;

public interface CowRepository extends CrudRepository<Cow, Long> {
}
