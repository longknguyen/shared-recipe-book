package com.sharedrecipebook.app.service;

import com.sharedrecipebook.app.dao.CollectionDAO;
import com.sharedrecipebook.app.model.Collection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;

@Service
public class CollectionService {
    @Autowired
    private CollectionDAO collectionDAO;

    public List<Collection> getCollectionsForUser(int usrId) throws SQLException {
        return collectionDAO.findByUserId(usrId);
    }

    public void createCollection(Collection collection) throws SQLException {
        collectionDAO.insert(collection.getUsrId(), collection.getCollName());
    }

    public void deleteCollection(int usrId, String collName) throws SQLException {
        collectionDAO.deleteCollection(usrId, collName);
    }
}
