package com.animaxx.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {

        @Autowired
        private JwtFilter jwtFilter;

        @Bean
        public SecurityFilterChain securityFilterChain(
                        HttpSecurity http) throws Exception {

                http
                                .cors(Customizer.withDefaults())
                                .csrf(csrf -> csrf.disable())

                                .authorizeHttpRequests(auth -> auth

                                                .requestMatchers(
                                                                "/",
                                                                "/api/users/login",
                                                                "/api/users/register",
                                                                "/api/users/email/**",

                                                                "/api/anime/**",

                                                                "/api/watchlist/**",

                                                                "/trailers/**")
                                                .permitAll()

                                                .anyRequest().authenticated())

                                .addFilterBefore(
                                                jwtFilter,
                                                UsernamePasswordAuthenticationFilter.class)

                                .formLogin(form -> form.disable());

                return http.build();
        }

        @Bean
        public CorsConfigurationSource corsConfigurationSource() {

                CorsConfiguration configuration = new CorsConfiguration();

                configuration.setAllowedOrigins(
                                List.of("http://localhost:5173",
                                                "https://YOUR-VERCEL-URL.vercel.app"));

                configuration.setAllowedMethods(
                                List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));

                configuration.setAllowedHeaders(
                                List.of("*"));

                configuration.setAllowCredentials(true);

                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

                source.registerCorsConfiguration(
                                "/**",
                                configuration);

                return source;
        }
}