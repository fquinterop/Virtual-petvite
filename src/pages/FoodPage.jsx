// pages/FoodPage.jsx
import { useState, useEffect } from 'react'
import { productService } from '../api/productService'
import { useCart } from '../context/CartContext'
import Swal from 'sweetalert2'

// Mapa de presentaciones a etiqueta de peso
const PET_TYPE_COLOR = {
  Perros: { bg: '#DBEAFE', color: '#1E40AF' },
  Gatos:  { bg: '#FCE7F3', color: '#9D174D' },
}

export default function FoodPage() {
  const [foods, setFoods]         = useState([])
  const [loading, setLoading]     = useState(true)
  const [search, setSearch]       = useState('')
  const [petFilter, setPetFilter] = useState('')
  const { addItem } = useCart()

  useEffect(() => {
    productService.getAllFood()
      .then(setFoods)
      .catch(() => Swal.fire({ title: 'Error', text: 'No se pudieron cargar los alimentos.', icon: 'error' }))
      .finally(() => setLoading(false))
  }, [])

  const petTypes = [...new Set(foods.map((f) => f.petType).filter(Boolean))]

  const filtered = foods.filter((f) => {
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase())
    const matchPet    = petFilter ? f.petType === petFilter : true
    return matchSearch && matchPet
  })

  const handleAdd = (food) => {
    addItem(food)
    Swal.fire({
      toast: true, position: 'top-end', icon: 'success',
      title: `${food.name} agregado al carrito`,
      showConfirmButton: false, timer: 1500,
    })
  }

  if (loading) return <div style={{ padding: '4rem', textAlign: 'center' }}>Cargando alimentos…</div>

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.25rem' }}>🐶 Alimentos</h1>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
        Comida premium y balanceada para tus mascotas
      </p>

      {/* Filtros */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        <input
          type="text" className="form-control"
          placeholder="🔍 Buscar alimentos…"
          value={search} onChange={(e) => setSearch(e.target.value)}
          style={{ maxWidth: 280 }}
        />
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            onClick={() => setPetFilter('')}
            style={{
              padding: '0.4rem 1rem', borderRadius: 999, border: '2px solid',
              borderColor: petFilter === '' ? 'var(--color-primary)' : 'var(--color-border)',
              background: petFilter === '' ? 'var(--color-primary)' : 'transparent',
              color: petFilter === '' ? '#fff' : 'var(--color-text)',
              cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem',
            }}
          >
            Todos
          </button>
          {petTypes.map((pt) => (
            <button
              key={pt}
              onClick={() => setPetFilter(pt)}
              style={{
                padding: '0.4rem 1rem', borderRadius: 999, border: '2px solid',
                borderColor: petFilter === pt ? 'var(--color-primary)' : 'var(--color-border)',
                background: petFilter === pt ? 'var(--color-primary)' : 'transparent',
                color: petFilter === pt ? '#fff' : 'var(--color-text)',
                cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem',
              }}
            >
              {pt === 'Perros' ? '🐶' : '🐱'} {pt}
            </button>
          ))}
        </div>
      </div>

      {/* Contador */}
      <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
        {filtered.length} producto{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
      </p>

      {filtered.length === 0 ? (
        <p style={{ color: 'var(--color-text-muted)', textAlign: 'center', marginTop: '3rem' }}>
          No se encontraron alimentos.
        </p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '1.5rem',
        }}>
          {filtered.map((food) => {
            const ptStyle = PET_TYPE_COLOR[food.petType] || { bg: '#F3F4F6', color: '#374151' }
            return (
              <div key={food.id} style={{
                background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-sm)', overflow: 'hidden',
                display: 'flex', flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)' }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)' }}
              >
                {/* Imagen */}
                <div style={{ height: 170, overflow: 'hidden', position: 'relative' }}>
                  {food.image ? (
                    <img
                      src={food.image}
                      alt={food.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.nextSibling.style.display = 'flex'
                      }}
                    />
                  ) : null}
                  {/* Fallback visible si no hay imagen o falla */}
                  <div style={{
                    display: food.image ? 'none' : 'flex',
                    background: 'linear-gradient(135deg, #FFF3E0, #FFE0B2)',
                    height: '100%', alignItems: 'center', justifyContent: 'center', fontSize: '3.5rem',
                  }}>
                    🍖
                  </div>
                </div>

                <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1 }}>
                  {/* Badge tipo mascota */}
                  {food.petType && (
                    <span style={{
                      display: 'inline-block', padding: '0.15rem 0.6rem',
                      background: ptStyle.bg, color: ptStyle.color,
                      borderRadius: 999, fontSize: '0.72rem', fontWeight: 700,
                      alignSelf: 'flex-start',
                    }}>
                      {food.petType === 'Perros' ? '🐶' : '🐱'} {food.petType}
                    </span>
                  )}

                  {/* Nombre */}
                  <h3 style={{ fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.3, margin: 0 }}>
                    {food.name}
                  </h3>

                  {/* Peso */}
                  {food.weight && (
                    <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', margin: 0 }}>
                      ⚖️ {food.weight}
                    </p>
                  )}

                  {/* Descripción corta */}
                  <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', flex: 1, margin: 0 }}>
                    {food.description?.slice(0, 60)}…
                  </p>

                  {/* Precio + botón */}
                  <div style={{ marginTop: '0.5rem' }}>
                    <p style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--color-primary-dark)', margin: '0 0 0.5rem' }}>
                      ${food.price?.toLocaleString()}
                    </p>
                    <button
                      className="btn btn-accent"
                      style={{ width: '100%', justifyContent: 'center' }}
                      onClick={() => handleAdd(food)}
                    >
                      🛒 Agregar
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
