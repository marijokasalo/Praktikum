package com.projekt.praktikum.controller;
import org.springframework.web.bind.annotation.*;
import com.projekt.praktikum.service.CowService;
import com.projekt.praktikum.model.Cow;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

@RestController
@RequestMapping("/api/cows")
public class CowController {

    private final CowService cowService;

    @Autowired
    public CowController(CowService cowService) {
        this.cowService = cowService;
    }

    @PostMapping
    public Cow addCow(@RequestBody Cow cow) {
        return cowService.saveCow(cow);
    }

    @GetMapping
    public List<Cow> getAllCows() {
        return cowService.getCows();
    }

    @GetMapping("/{id}")
    public Cow getCow(@PathVariable Long id) {
        return cowService.getCowById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid cow Id:" + id));
    }

    @DeleteMapping("/{id}")
    public void deleteCow(@PathVariable Long id) {
        cowService.deleteCow(id);
    }
    @PutMapping("/{id}")
    public Cow updateCow(@RequestBody Cow newCow, @PathVariable Long id) {
        return cowService.updateCow(id, newCow);
    }


}
