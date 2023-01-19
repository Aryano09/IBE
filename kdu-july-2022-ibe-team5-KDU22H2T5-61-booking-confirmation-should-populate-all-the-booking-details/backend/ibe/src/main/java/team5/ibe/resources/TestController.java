package team5.ibe.resources;

import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import javax.annotation.PostConstruct;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/api/test")
@CrossOrigin
public class TestController {
    @Autowired
    private Environment environment;
    @GetMapping({"", "/"})
    public String getEnv() {
        return environment.getProperty("app.name");
    }
    @GetMapping({"/appname", "/appname/"})
    public String getAppName(){
        return "This is " + environment.getProperty("spring.application.name");
    }

}
