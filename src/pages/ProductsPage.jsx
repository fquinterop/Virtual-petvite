// pages/ProductsPage.jsx
import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { productService } from '../api/productService'
import { useCart } from '../context/CartContext'
import Swal from 'sweetalert2'

// Placeholders por categoría
const CAT_PLACEHOLDER = {
  snacks:     { emoji: '🦴', bg: 'linear-gradient(135deg, #FFF3E0, #FFE0B2)' },
  juguetes:   { emoji: '🧸', bg: 'linear-gradient(135deg, #E8F5E9, #C8E6C9)' },
  aseo:       { emoji: '🛁', bg: 'linear-gradient(135deg, #E3F2FD, #BBDEFB)' },
  collares:   { emoji: '🐕', bg: 'linear-gradient(135deg, #F3E5F5, #E1BEE7)' },
  comederos:  { emoji: '🥣', bg: 'linear-gradient(135deg, #E0F7FA, #B2EBF2)' },
  transporte: { emoji: '🧳', bg: 'linear-gradient(135deg, #FBE9E7, #FFCCBC)' },
  default:    { emoji: '🐾', bg: 'linear-gradient(135deg, #F0F4F0, #E0E8E0)' },
}

function ProductImage({ product }) {
  const ph = CAT_PLACEHOLDER[product.categoryId] || CAT_PLACEHOLDER.default
  if (product.image) {
    return (
      <div style={{ height: 160, overflow: 'hidden', position: 'relative' }}>
        <img
          src={product.image}
          alt={product.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          onError={(e) => {
            e.currentTarget.style.display = 'none'
            e.currentTarget.nextSibling.style.display = 'flex'
          }}
        />
        <div style={{
          display: 'none', background: ph.bg,
          height: '100%', position: 'absolute', top: 0, left: 0, right: 0,
          alignItems: 'center', justifyContent: 'center', fontSize: '3.5rem',
        }}>
          {ph.emoji}
        </div>
      </div>
    )
  }
  return (
    <div style={{
      background: ph.bg, height: 160,
      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3.5rem',
    }}>
      {ph.emoji}
    </div>
  )
}

export default function ProductsPage() {
  const [products, setProducts]       = useState([])
  const [categories, setCategories]   = useState([])
  const [loading, setLoading]         = useState(true)
  const [search, setSearch]           = useState('')
  const [selectedCat, setSelectedCat] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()
  const { addItem } = useCart()

  // Leer ?cat= de la URL al cargar
  useEffect(() => {
    const catFromUrl = searchParams.get('cat')
    if (catFromUrl) setSelectedCat(catFromUrl)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prods, cats] = await Promise.all([
          productService.getAll(),
          productService.getCategories(),
        ])
        setProducts(prods)
        setCategories(cats.filter((c) => c.id !== 'food'))
      } catch {
        Swal.fire({ title: 'Error', text: 'No se pudieron cargar los productos.', icon: 'error' })
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleCatChange = (value) => {
    setSelectedCat(value)
    if (value) setSearchParams({ cat: value })
    else setSearchParams({})
  }

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
    const matchCat    = selectedCat ? p.categoryId === selectedCat : true
    return matchSearch && matchCat
  })

  const handleAddToCart = (product) => {
    addItem(product)
    Swal.fire({
      toast: true, position: 'top-end', icon: 'success',
      title: `${product.name} agregado al carrito`,
      showConfirmButton: false, timer: 1500,
    })
  }

  if (loading) return <div style={{ padding: '4rem', textAlign: 'center' }}>Cargando productos…</div>

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.25rem' }}>🛍️ Productos</h1>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
        Encuentra todo lo que tu mascota necesita
      </p>

      {/* Filtros */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        <input
          type="text" className="form-control"
          placeholder="🔍 Buscar productos…"
          value={search} onChange={(e) => setSearch(e.target.value)}
          style={{ maxWidth: '300px' }}
        />
        <select
          className="form-control" value={selectedCat}
          onChange={(e) => handleCatChange(e.target.value)}
          style={{ maxWidth: '220px' }}
        >
          <option value="">Todas las categorías</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* Contador */}
      <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
        {filtered.length} producto{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
      </p>

      {filtered.length === 0 ? (
        <p style={{ color: 'var(--color-text-muted)', textAlign: 'center', marginTop: '3rem' }}>
          No se encontraron productos.
        </p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '1.5rem',
        }}>
          {filtered.map((product) => (
            <div key={product.id} style={{
              background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-sm)', overflow: 'hidden',
              display: 'flex', flexDirection: 'column',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)' }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)' }}
            >
              <ProductImage product={product} />

              <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <span style={{
                  fontSize: '0.72rem', color: 'var(--color-primary)',
                  fontWeight: 700, textTransform: 'uppercase',
                }}>
                  {product.category || 'General'}
                </span>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, lineHeight: 1.3, margin: 0 }}>
                  {product.name}
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', flex: 1, margin: 0 }}>
                  {product.description?.slice(0, 65)}…
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-primary-dark)' }}>
                    ${product.price?.toLocaleString()}
                  </span>
                  <Link to={`/products/${product.id}`} style={{ fontSize: '0.8rem' }}>Ver detalle →</Link>
                </div>
                <button
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center', marginTop: '0.25rem' }}
                  onClick={() => handleAddToCart(product)}
                >
                  🛒 Agregar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
