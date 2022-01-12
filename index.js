




const navCelulares = document.querySelector(".celulares");
const navVehiculos = document.querySelector(".vehiculos");
const navComputacion = document.querySelector(".computacion");
const navElectrodomesticos = document.querySelector(".electrodomesticos");
const navBelleza = document.querySelector(".belleza");
const navDeporte = document.querySelector(".deporte");

const tituloSeccionCategoria = document.querySelector(".titulo-seccion-categoria")
const tituloCategoriaVehiculos = document.querySelector(".titulo-categoria-vehiculos")

const seccionTodasLasCategorias = document.querySelectorAll(".categoria")


const seccionCelulares = document.querySelector(".seccion-categorias")
const tarjetasPorCategoria = document.querySelector(".tarjetas-por-categoria")



console.log(seccionTodasLasCategorias);


let ocultarSeccion = () => {
    
    for (let i = 0; i < seccionTodasLasCategorias.length; i++) {
        seccionTodasLasCategorias[i].style.display = "none";
    }
    
}
                                                                     




//-----------------Categorias de nav ---------------


let categoria = (cate) => {
    console.log(cate);
    fetch(`https://api.mercadolibre.com/sites/MLA/search?category=${cate}`)
    .then(res => res.json())
    .then((data) => {
    crearTarjeta(data.results) 
    ocultarSeccion()
    seccionCelulares.style.display = "block"
    tarjetasPorCategoria.style.display = "block"   
    
})    

}
const crearTitulo = (data) => {
    console.log(data.name);
    tituloSeccionCategoria.innerHTML = `<h2>${data.name}</h2>`
    
} 

let tituloCategoria = (cate) => {
    fetch(`https://api.mercadolibre.com/categories/${cate}`)
    .then(res => res.json())
    .then((data) => {
    crearTitulo(data)  
})
}


navCelulares.onclick = () => { 
    categoria("MLA1459")
    tituloCategoria("MLA1459")
}

navVehiculos.onclick = () => { 
    categoria("MLA1743")
    tituloCategoria("MLA1743")
}
navComputacion.onclick = () => { 
    categoria("MLA1648")
    tituloCategoria("MLA1648")
}
navElectrodomesticos.onclick = () => { 
    categoria("MLA5726")
    tituloCategoria("MLA5726")
}
navBelleza.onclick = () => { 
    categoria("MLA1246")
    tituloCategoria("MLA1246")
}
navDeporte.onclick = () => { 
    categoria("MLA1276")
    tituloCategoria("MLA1276")
}


//https://api.mercadolibre.com/sites/MLA/categories



// TARJETAS

const crearTarjeta = (data) => {
    const tarjetasCategorias = document.querySelector(".tarj-categorias");
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
    tarjetasCategorias.innerHTML = html
    
} 











//------------BUSCADOR-----------

const form = document.querySelector(".form")
const botonBuscar = document.querySelector("#buscador")




const buscarProducto = (producto) => {
    fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${producto}`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
    })
}

form.onsubmit = (e) => {
    e.preventDefault();
    buscarProducto(botonBuscar.value)     
}