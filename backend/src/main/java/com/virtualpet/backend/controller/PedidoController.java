package com.virtualpet.backend.controller;

import com.virtualpet.backend.dto.PedidoItemRequest;
import com.virtualpet.backend.dto.PedidoRequest;
import com.virtualpet.backend.entity.Cliente;
import com.virtualpet.backend.entity.Pedido;
import com.virtualpet.backend.entity.PedidoItem;
import com.virtualpet.backend.entity.Producto;
import com.virtualpet.backend.repository.ClienteRepository;
import com.virtualpet.backend.repository.PedidoRepository;
import com.virtualpet.backend.repository.ProductoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Endpoints públicos de pedidos:
 *   GET  /pedidos       → lista todos
 *   GET  /pedidos/{id}  → por ID
 *   POST /pedidos       → crear (también guarda el cliente si no existe)
 */
@RestController
@RequestMapping("/pedidos")
@RequiredArgsConstructor
public class PedidoController {

    private final PedidoRepository pedidoRepository;
    private final ProductoRepository productoRepository;
    private final ClienteRepository clienteRepository;

    @GetMapping
    public List<Pedido> getAll() {
        return pedidoRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pedido> getById(@PathVariable Long id) {
        return pedidoRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Pedido create(@RequestBody PedidoRequest req) {

        // ── Crear o encontrar el cliente por email ─────────────────
        if (req.getEmailCliente() != null && !req.getEmailCliente().isBlank()) {
            clienteRepository.findByEmail(req.getEmailCliente().trim().toLowerCase())
                    .orElseGet(() -> {
                        Cliente nuevo = new Cliente();
                        nuevo.setNombre(req.getNombreCliente() != null ? req.getNombreCliente() : "");
                        nuevo.setEmail(req.getEmailCliente().trim().toLowerCase());
                        nuevo.setPassword("");          // sin contraseña (pedido sin registro)
                        nuevo.setTelefono(req.getTelefonoCliente());
                        nuevo.setDireccion(req.getDireccionEntrega());
                        return clienteRepository.save(nuevo);
                    });
        }

        // ── Construir el pedido ────────────────────────────────────
        Pedido pedido = Pedido.builder()
                .nombreCliente(req.getNombreCliente())
                .emailCliente(req.getEmailCliente())
                .telefonoCliente(req.getTelefonoCliente())
                .direccionEntrega(req.getDireccionEntrega())
                .notas(req.getNotas())
                .estado("PENDIENTE")
                .items(new ArrayList<>())
                .build();

        double total = 0;
        if (req.getItems() != null) {
            for (PedidoItemRequest itemReq : req.getItems()) {
                Producto producto = itemReq.getProductoId() != null
                        ? productoRepository.findById(itemReq.getProductoId()).orElse(null)
                        : null;

                PedidoItem item = PedidoItem.builder()
                        .pedido(pedido)
                        .producto(producto)
                        .nombreProducto(itemReq.getNombreProducto())
                        .precioUnitario(itemReq.getPrecioUnitario())
                        .cantidad(itemReq.getCantidad())
                        .subtotal(itemReq.getPrecioUnitario() * itemReq.getCantidad())
                        .build();

                pedido.getItems().add(item);
                total += item.getSubtotal();
            }
        }
        pedido.setTotal(total);
        return pedidoRepository.save(pedido);
    }
}
