package com.projekt.praktikum.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Entity
public class MilkingStats {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;
    private Date date;
    private float quantity;
    private String cow;
    private String milker;
    private double amountOfMilk;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getCow() {
        return cow;
    }

    public void setCow(String cow) {
        this.cow = cow;
    }

    public String getMilker() {
        return milker;
    }

    public void setMilker(String milker) {
        this.milker = milker;
    }

    public double getAmountOfMilk() {
        return amountOfMilk;
    }

    public void setAmountOfMilk(double amountOfMilk) {
        this.amountOfMilk = amountOfMilk;
    }
}