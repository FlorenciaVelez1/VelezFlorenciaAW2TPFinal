document.getElementById('productForm').addEventListener('submit', async (event) => {
    event.preventDefault()

    const nombre = document.getElementById('productName').value
    const desc = document.getElementById('productDesc').value
    const precio = document.getElementById('productPrice').value
    const imagen = document.getElementById('productImage').value
    const categoria = document.getElementById('productCategory').value

    try {
      const response = await fetch('http://localhost:8000/product/nuevoProducto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, desc, precio, imagen, categoria })
      })

      if (!response.ok) {
        throw new Error('Error en la solicitud: ' + response.statusText)
      }

      const result = await response.json()
      Swal.fire({
        title: '¡Producto agregado exitosamente!',
        text: `Nombre: ${nombre}\nDescripción: ${desc}\nPrecio: ${precio}\nCategoría: ${categoria}`,
        icon: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#4caf50'
    })
    document.getElementById('productForm').reset()

      document.getElementById('productForm').reset()

    } catch (error) {
      console.error('Error agregando producto:', error)
      Toastify({
        text: `Error: ${error.message}`,
        duration: 3000,
        gravity: "top",
        position: "center",
        backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
      }).showToast()
    }
})