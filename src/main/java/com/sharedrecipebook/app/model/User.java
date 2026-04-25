package com.sharedrecipebook.app.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data // <-- generates getter and setters (and a toString) for you so there's less boilerplate
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    private int usrID;
    private String username;
    private String password = null;
    private int age;
    private String occupation;
}
