package com.projekt.praktikum.repository;

import org.aspectj.weaver.ast.Not;
import org.springframework.data.repository.CrudRepository;
import com.projekt.praktikum.model.Notification;

public interface NotificationRepository extends CrudRepository<Notification, Long> {
}
