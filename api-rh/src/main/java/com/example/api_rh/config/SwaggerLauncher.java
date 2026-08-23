package com.example.api_rh.config;

import java.awt.Desktop;
import java.io.IOException;
import java.net.URI;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;
import org.springframework.context.annotation.Import;

@Configuration
@Import(SwaggerConfig.class)
public class SwaggerLauncher {

    private static final Logger LOGGER = LoggerFactory.getLogger(SwaggerLauncher.class);

    @Value("${server.port:8080}")
    private int serverPort;

    @EventListener(ApplicationReadyEvent.class)
    public void launchSwagger() {
        String swaggerUrl = "http://localhost:" + serverPort + "/swagger-ui/index.html";
        LOGGER.info("Swagger UI disponível em {}", swaggerUrl);

        try {
            if (!Desktop.isDesktopSupported()) {
                LOGGER.warn("Não foi possível abrir a Swagger UI automaticamente: Desktop não é suportado neste ambiente.");
                return;
            }

            Desktop.getDesktop().browse(URI.create(swaggerUrl));
        } catch (IOException | SecurityException | UnsupportedOperationException exception) {
            LOGGER.warn("Não foi possível abrir a Swagger UI automaticamente. Acesse manualmente: {}", swaggerUrl,
                    exception);
        }
    }
}
