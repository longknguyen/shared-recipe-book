package com.sharedrecipebook.app.util;

import java.sql.Connection;
import java.sql.DriverManager;

public class DBUtil {
    public static Connection getConnection() throws Exception {
        // TODO; no need to implement this yet. This needs to be discussed with a TA whether we can use JDBC connections from Spring or the old-school style. Spring one is located in /config/DatabaseConfig
        return DriverManager.getConnection("");
    }
}
