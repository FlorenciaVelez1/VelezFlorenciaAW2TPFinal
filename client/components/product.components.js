export const productCard = (nombre,desc,precio,imagen)=>{
    return `
    <div class="bg-gray-700 max-w-sm rounded overflow-hidden shadow-xl shadow-slate-950 my-3 mx-2">
        <div class="p-5 flex flex-col h-full">
            <div class="rounded-xl overflow-hidden">
                <img src="${imagen}" alt="">
            </div>
            <h5 class="text-2xl md:text-3xl font-medium mt-3">${nombre}</h5>
            <p class="text-slate-200 text-lg mt-3">${desc}</p>
            <div class="flex-grow"></div>
            <span class="text-3xl text-right font-bold text-gray-950 dark:text-white">$${precio}</span>            
            <button data-nombre="${nombre}" class="addToCartButton text-center bg-blue-400 text-blue-900 py-2 rounded-lg font-semibold mt-4 hover:bg-blue-300 active:scale-95 transition-all duration-200 ease-out">Agregar a Carrito</button>
        </div>
    </div>
    `
}