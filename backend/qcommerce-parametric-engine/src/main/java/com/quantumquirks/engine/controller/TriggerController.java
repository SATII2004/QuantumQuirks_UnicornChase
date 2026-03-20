package com.quantumquirks.engine.controller;

import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/insurance")
@CrossOrigin(origins = "http://localhost:5173")
public class TriggerController {

    @PostMapping("/trigger")
    public Map<String, Object> evaluateRisk(@RequestBody Map<String, String> payload) {
        String type = payload.get("type");
        Map<String, Object> response = new HashMap<>();
        Map<String, Double> metrics = new HashMap<>();
        
        response.put("walletBalance", 12450.00);

        switch (type) {
            case "RAIN":
                response.put("activePeril", "RAIN");
                response.put("payoutStatus", "PRECIPITATION_TRIGGER_HIT");
                response.put("payoutAmount", 1200.0);
                metrics.put("rain", 8.5); metrics.put("temp", 24.0); metrics.put("aqi", 30.0);
                break;
            case "HEAT":
                response.put("activePeril", "HEAT");
                response.put("payoutStatus", "THERMAL_DISRUPTION_ACTIVE");
                response.put("payoutAmount", 1500.0);
                metrics.put("rain", 0.0); metrics.put("temp", 47.5); metrics.put("aqi", 60.0);
                break;
            case "AQI":
                response.put("activePeril", "AQI");
                response.put("payoutStatus", "POLLUTION_LOCKDOWN_CREDIT");
                response.put("payoutAmount", 800.0);
                metrics.put("rain", 0.0); metrics.put("temp", 31.0); metrics.put("aqi", 450.0);
                break;
            default:
                response.put("activePeril", "NONE");
                response.put("payoutStatus", "MONITORING_SYSTEMS");
                response.put("payoutAmount", 0.0);
                metrics.put("rain", 0.5); metrics.put("temp", 32.0); metrics.put("aqi", 45.0);
        }

        response.put("metrics", metrics);
        return response;
    }
}