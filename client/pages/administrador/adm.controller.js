import { allProduct } from "../../api/product.api.js"
import { productCard } from "../../components/product.components.js"
window.addEventListener('load', async () => {
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
  const btnLogout = document.getElementById('btnLogout')
  const btnLogoutMobile = document.getElementById('btnLogoutMobile')
  
  const handleLogout = async () => {
      const result = await Swal.fire({
          title: '¿Estás seguro?',
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