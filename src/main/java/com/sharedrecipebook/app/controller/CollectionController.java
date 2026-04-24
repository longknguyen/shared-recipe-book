package com.sharedrecipebook.app.controller;

import com.sharedrecipebook.app.model.Collection;
import com.sharedrecipebook.app.service.CollectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/collections")
@CrossOrigin(origins = "http://localhost:5173")
public class CollectionController {
    @Autowired
    private CollectionService collectionService;

    @GetMapping                             
    public List<Collection> getCollectionsForUser(@RequestParam int usrId) throws Exception {
        return collectionService.getCollectionsForUser(usrId);
    }

    @PostMapping
    public void createCollection(@RequestBody Collection collection) throws Exception {
        collectionService.createCollection(collection);
    }

    @DeleteMapping
    public void deleteCollection(@RequestParam int usrId, @RequestParam String collName) throws Exception {
        collectionService.deleteCollection(usrId, collName);
    }
}
