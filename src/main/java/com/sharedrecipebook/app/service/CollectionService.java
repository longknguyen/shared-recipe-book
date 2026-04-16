package com.sharedrecipebook.app.service;

import com.sharedrecipebook.app.dao.CollectionDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CollectionService {
    @Autowired
    private CollectionDAO collectionDAO;
}
