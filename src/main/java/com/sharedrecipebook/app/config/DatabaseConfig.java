package com.sharedrecipebook.app.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import javax.sql.DataSource;

@Configuration
public class DatabaseConfig {
    @Bean
    public DataSource dataSource() {
        String jdbcUrl = firstNonBlank("JDBC_DATABASE_URL", "SRB_DB_URL");
        String host = env("SRB_DB_HOST", "localhost");
        String port = env("SRB_DB_PORT", "3306");
        String username = firstNonBlank("JDBC_DATABASE_USERNAME", "SRB_DB_USER");
        String password = firstNonBlank("JDBC_DATABASE_PASSWORD", "SRB_DB_PASSWORD");
        String database = (jdbcUrl != null && !jdbcUrl.isBlank())
                ? env("SRB_DB_NAME", "")
                : requiredEnv("SRB_DB_NAME");

        DriverManagerDataSource ds = new DriverManagerDataSource();
        ds.setDriverClassName("com.mysql.cj.jdbc.Driver");
        ds.setUrl((jdbcUrl != null && !jdbcUrl.isBlank())
                ? jdbcUrl
                : String.format(
                "jdbc:mysql://%s:%s/%s?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true",
                host,
                port,
                database
        ));
        ds.setUsername(username);
        ds.setPassword(password);
        return ds;
    }

    private String env(String key, String fallback) {
        String value = System.getenv(key);
        return (value == null || value.isBlank()) ? fallback : value;
    }

    private String requiredEnv(String key) {
        String value = System.getenv(key);
        if (value == null || value.isBlank()) {
            throw new IllegalStateException("Missing required environment variable: " + key);
        }
        return value;
    }

    private String firstNonBlank(String... keys) {
        for (String key : keys) {
            String value = System.getenv(key);
            if (value != null && !value.isBlank()) {
                return value;
            }
        }
        throw new IllegalStateException("Missing required environment variables: " + String.join(", ", keys));
    }
}
