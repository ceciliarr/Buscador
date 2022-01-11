


/* fetch("https://api.mercadolibre.com/sites/MLA/categories")
.then(res => res.json())
.then((data) => {
    console.log(data);
    crearNav(data)
})
 */


const navCelulares = document.querySelector(".celulares");
const navVehiculos = document.querySelector(".vehiculos");
const navComputacion = document.querySelector(".computacion");
const navElectrodomesticos = document.querySelector(".electrodomesticos");
const navBelleza = document.querySelector(".belleza");
const navDeporte = document.querySelector(".deporte");

const tituloCategoriaCelulares = document.querySelector(".titulo-categoria-celular")
const tituloCategoriaVehiculos = document.querySelector(".titulo-categoria-vehiculos")

const seccionTodasLasCategorias = document.querySelectorAll(".categoria")

const seccionVehiculos = document.querySelector(".seccion-vehiculos")
const seccionCelulares = document.querySelector(".seccion-celulares")

console.log(seccionTodasLasCategorias);


let ocultarSeccion = () => {
    
    for (let i = 0; i < seccionTodasLasCategorias.length; i++) {
        seccionTodasLasCategorias[i].style.display = "none";
    }
    console.log("ocultar");
}
                                                                     




//-----------------Categoria CELULAR---------------

navCelulares.onclick = () => { 
    fetch("https://api.mercadolibre.com/sites/MLA/search?q=celular")
    .then(res => res.json())
    .then((data) => {
    crearTarjeta(data.results)
    tituloCategoriaCelulares.style.display = "block"
    ocultarSeccion()
    seccionCelulares.style.display = "block"

})    
}

const crearTarjeta = (data) => {
    const tarjetasCelulares = document.querySelector(".tarjetas-celulares");
    const html = data.reduce ((acc, curr) => {
        return acc + `
            <article class = "tarjetas-categoria">
                <div class="img-tarjetas">
                 <img src="${curr.thumbnail}">
                </div>
                <div class="info-tarjetas">
                <h3>${curr.title}</h3>
                <h4>$ ${curr.price}</h4>
                </div>
            </article> 
        `
    }, "")
    tarjetasCelulares.innerHTML = html
} 


//-----------------Categoria AUTO---------------

navVehiculos.onclick = () => { 
    fetch("https://api.mercadolibre.com/sites/MLA/search?q=vehiculo")
    .then(res => res.json())
    .then((data) => {
    crearTarjetaVehiculos(data.results)
    tituloCategoriaVehiculos.style.display = "block"
    ocultarSeccion()
    seccionVehiculos.style.display = "block"

})    
}

const crearTarjetaVehiculos = (data) => {
    const tarjetasVehiculos = document.querySelector(".tarjetas-vehiculos");
    const html = data.reduce ((acc, curr) => {
        return acc + `
            <article class = "tarjetas-categoria">
                <div class="img-tarjetas">
                 <img src="${curr.thumbnail}">
                </div>
                <div class="info-tarjetas">
                <h3>${curr.title}</h3>
                <h4>$ ${curr.price}</h4>
                </div>
            </article> 
        `
    }, "")
    tarjetasVehiculos.innerHTML = html
} 



