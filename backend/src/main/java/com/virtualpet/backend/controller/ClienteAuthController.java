package com.virtualpet.backend.controller;

import com.virtualpet.backend.dto.ClienteRequest;
import com.virtualpet.backend.entity.Cliente;
import com.virtualpet.backend.repository.ClienteRepository;
import com.virtualpet.backend.security.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Endpoints públicos para clientes (tienda):
 *   POST /clientes/registro  — crear cuenta
 *   POST /clientes/login     — iniciar sesión
 */
@RestController
@RequestMapping("/clientes")
@RequiredArgsConstructor
public class ClienteAuthController {

    private final ClienteRepository clienteRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    // POST /clientes/registro
    @PostMapping("/registro")
    public ResponseEntity<?> registro(@RequestBody ClienteRequest req) {
        if (clienteRepository.findByEmail(req.getEmail()).isPresent()) {
            return ResponseEntity.status(409)
                    .body(Map.of("message", "Ya existe una cuenta con ese email."));
        }

        Cliente cliente = new Cliente();
        cliente.setNombre(req.getNombre());
        cliente.setEmail(req.getEmail().trim().toLowerCase());
        cliente.setPassword(passwordEncoder.encode(req.getPassword()));
        cliente.setTelefono(req.getTelefono());
        cliente.setDireccion(req.getDireccion());

        Cliente saved = clienteRepository.save(cliente);

        String token = jwtUtils.generateToken(saved.getEmail(), "ROLE_CLIENTE");

        return ResponseEntity.ok(Map.of(
                "token", token,
                "user", Map.of(
                        "id",     saved.getId(),
                        "name",   saved.getNombre(),
                        "email",  saved.getEmail(),
                        "role",   "cliente"
                )
        ));
    }

    // POST /clientes/login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody ClienteRequest req) {
        return clienteRepository.findByEmail(req.getEmail().trim().toLowerCase())
                .filter(c -> passwordEncoder.matches(req.getPassword(), c.getPassword()))
                .filter(Cliente::getActivo)
                .map(c -> {
                    String token = jwtUtils.generateToken(c.getEmail(), "ROLE_CLIENTE");
                    return ResponseEntity.ok(Map.of(
                            "token", token,
                            "user", Map.of(
                                    "id",    c.getId(),
                                    "name",  c.getNombre(),
                                    "email", c.getEmail(),
                                    "role",  "cliente"
                            )
                    ));
                })
                .orElseGet(() -> ResponseEntity.status(401)
                        .body(Map.of("message", "Credenciales inválidas o cuenta inactiva.")));
    }
}
