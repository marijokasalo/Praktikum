package com.projekt.praktikum.controller;

import com.projekt.praktikum.model.Notification;
import com.projekt.praktikum.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    @Autowired
    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @PostMapping
    public Notification addNotification(@RequestBody Notification notification) {
        return notificationService.saveNotification(notification);
    }

    @GetMapping
    public List<Notification> getAllNotifications() {
        return notificationService.getAllNotifications();
    }

    @PutMapping("/{id}")
    public Notification updateNotification(@RequestBody Notification newNotification, @PathVariable Long id) {
        return notificationService.updateNotification(id, newNotification);
    }

    @DeleteMapping("/{id}")
    public void deleteNotification(@PathVariable Long id) {
        notificationService.deleteNotification(id);
    }
}
