package com.ecommerce.sportscenter.controller;

import com.ecommerce.sportscenter.model.JwtRequest;
import com.ecommerce.sportscenter.model.JwtResponse;
import com.ecommerce.sportscenter.security.JwtHelper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserDetailsService userDetailsService;
    private final AuthenticationManager manager;
    private final JwtHelper jwtHelper;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserDetailsService userDetailsService, AuthenticationManager manager,
                          JwtHelper jwtHelper, PasswordEncoder passwordEncoder) {
        this.userDetailsService = userDetailsService;
        this.manager = manager;
        this.jwtHelper = jwtHelper;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody JwtRequest request){
        this.authenticate(request.getUsername(), request.getPassword());
        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());
        String token = this.jwtHelper.generateToken(userDetails);
        JwtResponse response = JwtResponse.builder()
                .username(userDetails.getUsername())
                .token(token)
                .build();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Fix #5: register endpoint so the Register page is functional
    @PostMapping("/register")
    public ResponseEntity<JwtResponse> register(@RequestBody JwtRequest request){
        if (userDetailsService instanceof InMemoryUserDetailsManager manager) {
            try {
                // Check if user already exists
                userDetailsService.loadUserByUsername(request.getUsername());
                return ResponseEntity.status(HttpStatus.CONFLICT).build();
            } catch (Exception ignored) {
                // User does not exist — safe to create
            }
            UserDetails newUser = User.builder()
                    .username(request.getUsername())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .roles("user")
                    .build();
            manager.createUser(newUser);
            String token = jwtHelper.generateToken(newUser);
            JwtResponse response = JwtResponse.builder()
                    .username(newUser.getUsername())
                    .token(token)
                    .build();
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        }
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
    }

    @GetMapping("/user")
    public ResponseEntity<UserDetails> getUserDetails(@RequestHeader("Authorization") String tokenHeader){
        String token = extractTokenFromHeader(tokenHeader);
        if(token!=null){
            String username = jwtHelper.getUserNameFromToken(token);
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            return new ResponseEntity<>(userDetails, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    private String extractTokenFromHeader(String tokenHeader) {
        if(tokenHeader!=null && tokenHeader.startsWith("Bearer ")){
            return tokenHeader.substring(7); // Removing Bearer
        }
        return null;
    }

    private void authenticate(String username, String password) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username, password);
        try{
            manager.authenticate(authenticationToken);
        }
        catch(BadCredentialsException ex){
            throw new BadCredentialsException("Invalid UserName or Password");
        }
    }
}
