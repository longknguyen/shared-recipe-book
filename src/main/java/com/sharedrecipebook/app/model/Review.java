package com.sharedrecipebook.app.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.sql.Time;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Review {
    private int usrId;
    private int recId;
    private Date date;
    private Time time;
    private String content;
}
