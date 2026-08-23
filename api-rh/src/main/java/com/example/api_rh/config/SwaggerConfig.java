package com.example.api_rh.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI apiOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("API RH")
                        .description("API para gerenciamento de recursos humanos")
                        .version("v1"));
    }
}
