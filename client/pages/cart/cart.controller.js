document.addEventListener("DOMContentLoaded", async function () {
    const cartItemsContainer = document.getElementById('cartItems')
    const totalQuantityElem = document.getElementById('totalQuantity')
    const totalAmountElem = document.getElementById('totalAmount')
  
    try {
      const response = await fetch('http://localhost:8000/cart/all') // Cambia esta URL según tu configuración
      const cartData = await response.json()
  
      let totalQuantity = 0
      let totalAmount = 0
      let cartItemsHTML = ''
  
      cartData.forEach(item => {
        totalQuantity += item.cantidad
        totalAmount += item.precio * item.cantidad
  
        cartItemsHTML += `
          <div class="cart-item" data-nombre="${item.nombre}">
            <div class="flex items-center space-x-4">
              <img src="${item.imagen}" alt="${item.nombre}">
              <div>
                <h2 class="text-xl font-semibold">${item.nombre}</h2>
                <p class="text-gray-600">Precio: $${item.precio}</p>
                <p class="text-gray-600">Cantidad: 
                  <span class="cart-item-controls">
                    <button data-nombre="${item.nombre}" class="remove-item text-red-500 hover:text-red-700" title="Eliminar">
                      🗑️
                    </button>
                    <button data-nombre="${item.nombre}" class="decrement-quantity text-gray-600 hover:text-gray-800" title="Disminuir cantidad">-</button>
                    <span class="quantity">${item.cantidad}</span>
                    <button data-nombre="${item.nombre}" class="increment-quantity text-gray-600 hover:text-gray-800" title="Incrementar cantidad">+</button>
                  </span>
                </p>
              </div>
            </div>
            <div class="flex-shrink-0">
              <span class="text-2xl font-bold">$${item.precio * item.cantidad}</span>
            </div>
          </div>
        `
      })
  
      cartItemsContainer.innerHTML = cartItemsHTML
      totalQuantityElem.textContent = totalQuantity
      totalAmountElem.textContent = `$${totalAmount}`
  
      cartItemsContainer.addEventListener('click', async (event) => {
        const nombre = event.target.getAttribute('data-nombre')

        try {
            if (event.target.classList.contains('remove-item')) {
                await fetch(`http://localhost:8000/cart/eliminar/${encodeURIComponent(nombre)}`, { method: 'DELETE' })
                location.reload()
            } else if (event.target.classList.contains('increment-quantity')) {
                await fetch('http://localhost:8000/cart/agregar', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ nombre: nombre })
                })
                location.reload()
            } else if (event.target.classList.contains('decrement-quantity')) {
                await fetch(`http://localhost:8000/cart/eliminarProducto/${encodeURIComponent(nombre)}`, { method: 'POST' })
                location.reload()
                const result = await response.json()
                
                if (result.mensaje === 'Producto eliminado del carrito') {
                    location.reload()
                } else {
                    const quantityElem = event.target.nextElementSibling
                    quantityElem.textContent = result.carrito.cantidad
                }
            }
        } catch (error) {
            console.error('Error actualizando el carrito:', error)
        }
    })

} catch (error) {
    console.error('Error cargando el carrito:', error)
}
})