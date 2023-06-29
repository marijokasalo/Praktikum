package com.projekt.praktikum.service;

import com.projekt.praktikum.model.Notification;
import com.projekt.praktikum.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;

    @Autowired
    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    public Notification saveNotification(Notification notification) {
        return notificationRepository.save(notification);
    }

    public List<Notification> getAllNotifications() {
        return (List<Notification>) notificationRepository.findAll();
    }


    @Transactional
    public Notification updateNotification(Long id, Notification newNotification) {
        return notificationRepository.findById(id)
                .map(notification -> {
                    notification.setMessage(newNotification.getMessage());

                    return notificationRepository.save(notification);
                })
                .orElseGet(() -> {
                    newNotification.setId(id);
                    return notificationRepository.save(newNotification);
                });
    }

    @Transactional
    public void deleteNotification(Long id) {
        notificationRepository.deleteById(id);
    }
}
