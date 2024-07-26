import { allProduct } from "../../api/product.api.js"
import { productCard } from "../../components/product.components.js"
import { navbarComponent } from "../../components/navbar.js"
window.addEventListener('load', async () => {
  // Añadir el navbarComponent al DOM
  document.querySelector('header').innerHTML = navbarComponent

  // Código existente para cargar productos
  const productGrid = document.getElementById('productGrid')
  const productData = await allProduct()
  let acuProductCards = ''
  
  productData.forEach(e => {
    acuProductCards += productCard(e.nombre, e.desc, e.precio, e.imagen)
  })
  productGrid.innerHTML = acuProductCards
  
  const categoriaCmd = document.getElementById('categoriaCmd')
  
  if (categoriaCmd) {
    categoriaCmd.addEventListener('click', () => {
      const inputSearch = document.getElementById('productSearch').value.trim().toLowerCase()
      let auxCardsConFiltro = ''

      // Filtrar productos por categoría
      productData.forEach(e => {
        if (e.categoria.toLowerCase() === inputSearch) {
          auxCardsConFiltro += productCard(e.nombre, e.desc, e.precio, e.imagen)
        }
      })

      if (auxCardsConFiltro !== '') {
        productGrid.innerHTML = auxCardsConFiltro
      } else {
        Toastify({
          text: "¡No se encontraron productos en esta categoría!",
          duration: 3000,
          destination: "",
          newWindow: false,
          close: true,
          gravity: "top",
          position: "left",
          stopOnFocus: true,
          style: {
            background: "linear-gradient(to right, #A24FFF, #7E4DB4)",
          },
          onClick: function () {}
        }).showToast()
        renderProducts(productData)
      }
    })
  }

  productGrid.addEventListener('click', async (event) => {
    if (event.target.classList.contains('addToCartButton') || event.target.id === 'cardBtn') {
      event.preventDefault()
      event.stopPropagation()

      const productName = event.target.getAttribute('data-nombre') || 'Probando card'
      console.log('Product Name:', productName)

      try {
        const response = await fetch('http://localhost:8000/cart/agregar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ nombre: productName })
        })

        const result = await response.json()
        console.log('Result:', result)

        if (response.ok) {
          Toastify({
            text: "¡Tu producto se cargó exitosamente!",
            duration: 3000,
            destination: "",
            newWindow: false,
            close: true,
            gravity: "top", 
            position: "center", 
            stopOnFocus: true,
            style: {
              background: "linear-gradient(to right, #A24FFF, #7E4DB4)",
              zIndex: 9999, 
              position: "fixed",
              top: "20px", 
              left: "50%", 
              transform: "translateX(-50%)" 
            },
            onClick: function () {}
          }).showToast()
        } else {
          throw new Error(result.mensaje || 'Error desconocido')
        }
      } catch (error) {
        console.error('Error agregando producto al carrito:', error.message)
        Toastify({
          text: `Error: ${error.message}`,
          duration: 3000,
          gravity: "top", 
          position: "center",
          backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
          style: {
            zIndex: 9999, 
            position: "fixed", 
            top: "20px",
            left: "50%", 
            transform: "translateX(-50%)" 
          },
        }).showToast()
      }
    }
  })

  const btnLogout = document.getElementById('btnLogout')
  const btnLogoutMobile = document.getElementById('btnLogoutMobile')
  
  const handleLogout = async () => {
      const result = await Swal.fire({
          title: '¿Estás seguro?',
          text: "Esto vaciará el carrito y cerrarás sesión.",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, cerrar sesión',
          cancelButtonText: 'No'
      })
  
      if (result.isConfirmed) {
          try {
                window.location.replace('http://127.0.0.1:5500/client/index.html')
                const response = await fetch('http://localhost:8000/cart/vaciar', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  }
                })
            } catch (error) {
                Toastify({
                  text: `Error: ${error.message}`,
                  duration: 3000,
                  backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
                }).showToast()
          }
      }
  }
  if (btnLogout) {
      btnLogout.addEventListener('click', handleLogout)
    }
  
  if (btnLogoutMobile) {
      btnLogoutMobile.addEventListener('click', handleLogout)
    }
})