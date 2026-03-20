package com.quantumquirks.engine.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PolicyStatus {
    private String policyId;
    private String status;
    private double currentRainfall;
    private double threshold;
    private double payoutAmount;
    private boolean triggerActive;
}