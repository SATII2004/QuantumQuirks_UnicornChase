package com.quantumquirks.engine.model;

import lombok.Data;

@Data
public class InsuranceTrigger {
    private String condition; 
    private double rainfallMm; 
    private String location;   
}