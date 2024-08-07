
export const navbarComponent = `
<nav class="bg-gray-800 bg-opacity-80 shadow shadow-slate-950 fixed top-0 left-0 w-full z-50" style="background-color: #8d6c9f;">
  <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
    <div class="relative flex h-16 items-center justify-end" style="background-color: #8d6c9f;">
      <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
        <!-- Mobile menu button-->
        <button id="btnNavbar" type="button" class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
          <span class="absolute -inset-0.5"></span>
          <span class="sr-only">Open main menu</span>
          <svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <svg class="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="flex flex-1 items-center justify-end sm:items-stretch sm:justify-end">
        <div class="hidden sm:ml-6 sm:block">
          <div class="flex space-x-4">
            <a href="http://127.0.0.1:5500/client/pages/home/home.html" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Lista de Productos</a>
            <a href="http://127.0.0.1:5500/client/pages/cart/cart.html" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Carrito de compras</a>
            <!-- Logout Button -->
            <button id="btnLogout" type="button" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Mobile menu, show/hide based on menu state. -->
  <div class="sm:hidden" id="mobile-menu">
    <div id="menuNavbar" class="space-y-1 px-2 pb-3 pt-2 hidden">
      <a href="http://127.0.0.1:5500/client/pages/home/home.html" class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Lista de Productos</a>
      <a href="http://127.0.0.1:5500/client/pages/cart/cart.html" class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Carrito de compras</a>
      <!-- Logout Button -->
      <button id="btnLogoutMobile" type="button" class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">
        Cerrar Sesión
      </button>
    </div>
  </div>
</nav>
 `