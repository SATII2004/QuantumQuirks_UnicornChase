package com.quantumquirks.engine.controller;

import com.quantumquirks.engine.model.PolicyStatus;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/insurance")
@CrossOrigin(origins = "http://localhost:5173")
public class TriggerController {

    @PostMapping("/evaluate")
    public PolicyStatus evaluateWeather(@RequestBody java.util.Map<String, Object> payload) {
        double rainfall = Double.parseDouble(payload.get("rainfall").toString());
        double threshold = 5.0;
        boolean isTriggered = rainfall >= threshold;
        
        return new PolicyStatus(
            "QQ-POL-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase(),
            isTriggered ? "DISRUPTION_DETECTED" : "ACTIVE_MONITORING",
            rainfall,
            threshold,
            isTriggered ? 1200.00 : 0.0,
            isTriggered
        );
    }
}