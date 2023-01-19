package team5.ibe.constants;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@Getter
public class EnvironmentVariables {
    @Value("${cloud.aws.appsync.base-url}")
    String baseUrl;
    @Value("${cloud.aws.appsync.api-key}")
    String apiKey;
    @Value("${cloud.aws.appsync.emailjs-lib_version}")
    String libVersionEmailJs;
    @Value("${cloud.aws.appsync.emailjs-user_id}")
    String userIdEmailJs;
    @Value("${cloud.aws.appsync.emailjs-service_id}")
    String serviceIdEmailJs;
    @Value("${cloud.aws.appsync.emailjs-template_id}")
    String templateIdEmailJs;
    @Value("${cloud.aws.appsync.emailjs-template_id_otp}")
    String templateIdOtpEmailJs;
    @Value("${cloud.aws.appsync.emailjs-accessToken}")
    String accessTokenEmailJs;
    @Value("${cloud.aws.appsync.emailjs-url}")
    String urlEmailJs;

    @Override
    public String toString() {
        return "EnvironmentVariables{" +
                "baseUrl='" + baseUrl + '\'' +
                ", apiKey='" + apiKey + '\'' +
                ", libVersionEmailJs='" + libVersionEmailJs + '\'' +
                ", userIdEmailJs='" + userIdEmailJs + '\'' +
                ", serviceIdEmailJs='" + serviceIdEmailJs + '\'' +
                ", templateIdEmailJs='" + templateIdEmailJs + '\'' +
                ", templateIdOtpEmailJs='" + templateIdOtpEmailJs + '\'' +
                ", accessTokenEmailJs='" + accessTokenEmailJs + '\'' +
                ", urlEmailJs='" + urlEmailJs + '\'' +
                '}';
    }
}
