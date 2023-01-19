package team5.ibe.utility;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import team5.ibe.constants.EnvironmentVariables;

import java.nio.charset.StandardCharsets;
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@Component
public class GraphQLUtility {
    @Autowired
    private EnvironmentVariables environmentVariables;

    private WebClient.RequestBodySpec requestBodySpec;

    public GraphQLUtility() {
        this.requestBodySpec = null;
    }

    void setRequestBodySpec(){
        if(this.requestBodySpec == null) {
            String baseUrl = environmentVariables.getBaseUrl();
            String apiKey = environmentVariables.getApiKey();
            this.requestBodySpec = WebClient
                    .builder()
                    .baseUrl(baseUrl)
                    .defaultHeader("x-api-key", apiKey)
                    .build()
                    .method(HttpMethod.POST)
                    .uri("/graphql");
        }
    }
    private final Logger logger = LoggerFactory.getLogger(GraphQLUtility.class);
    public String graphQLQueryExecutor(String query){
        setRequestBodySpec();
        logger.debug("Executing query \n{}", query);
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("query", query);
        WebClient.ResponseSpec response = this.requestBodySpec
                .body(BodyInserters.fromValue(requestBody))
                .accept(MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML)
                .acceptCharset(StandardCharsets.UTF_8)
                .retrieve();
        String bodyString = response.bodyToMono(String.class).block();
        return bodyString;
    }

    public boolean isWeekendSpanning(Integer checkInDayOfWeek, Long duration){
        return (checkInDayOfWeek==1 && duration>=7) ||
                (checkInDayOfWeek==2 && duration>=6) ||
                (checkInDayOfWeek==3 && duration>=5) ||
                (checkInDayOfWeek==4 && duration>=4) ||
                (checkInDayOfWeek==5 && duration>=3) ||
                (checkInDayOfWeek==6 && duration>=2) ||
                (checkInDayOfWeek==7 && duration>=8);
    }

    public LocalDate getLocalDateFromString(String date){
        Instant dateInstant = Instant.parse(date);
        LocalDateTime localDateTime = LocalDateTime.ofInstant(dateInstant, ZoneId.of(ZoneOffset.UTC.getId()));
        return localDateTime.toLocalDate();
    }

    public String getStringFromLocalDate(LocalDate localDate){
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("uuuu-MM-dd'T'HH:mm:ssX");
        return localDate.atStartOfDay().atOffset(ZoneOffset.UTC).format(dateTimeFormatter);
    }
}
