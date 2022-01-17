//NAV
const navCelulares = document.querySelector(".celulares");
const navVehiculos = document.querySelector(".vehiculos");
const navComputacion = document.querySelector(".computacion");
const navElectrodomesticos = document.querySelector(".electrodomesticos");
const navBelleza = document.querySelector(".belleza");
const navDeporte = document.querySelector(".deporte");
const navOtrasCategorias = document.querySelector(".otras-categorias");

//HEADER
const tituloPrincipal = document.querySelector(".titulo-principal")
const imagenDeInicio = document.querySelector(".img-principal")
const form = document.querySelector(".form")
const botonBuscar = document.querySelector("#buscador")



const tituloSeccionCategoria = document.querySelector(".titulo-seccion-categoria")
const tituloCategoriaVehiculos = document.querySelector(".titulo-categoria-vehiculos")

const seccionTodasLasCategorias = document.querySelectorAll(".categoria")


const seccionCelulares = document.querySelector(".seccion-categorias")
const tarjetasPorCategoria = document.querySelector(".tarjetas-por-categoria")





let ocultarSeccion = () => {
    
    for (let i = 0; i < seccionTodasLasCategorias.length; i++) {
        seccionTodasLasCategorias[i].style.display = "none";
    }
    
}
                                                                     




//-----------------Categorias de nav ---------------


let categoria = (cate) => {
    fetch(`https://api.mercadolibre.com/sites/MLA/search?category=${cate}`)
    .then(res => res.json())
    .then((data) => {
    crearTarjeta(data.results) 
    ocultarSeccion()
    seccionCelulares.style.display = "block"
    tarjetasPorCategoria.style.display = "block"  
    console.log(data.results); 
    
})    

}
const crearTitulo = (data) => {
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
    categoria("MLA1051")
    tituloCategoria("MLA1051")
    ordenarEnvioGratis("MLA1051")
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

navOtrasCategorias.onclick = () => {
    botonBuscar.focus()
}


//https://api.mercadolibre.com/sites/MLA/categories

//---------------VOLVER A PAGINA INICIAL-------


const volverAPaginaPrincipal = () => {
    ocultarSeccion()
    imagenDeInicio.style.display = "block"
}

tituloPrincipal.onclick = volverAPaginaPrincipal

// TARJETAS

const crearTarjeta = (data) => {
    const tarjetasCategorias = document.querySelector(".tarj-categorias");
    const html = data.reduce ((acc, curr) => {
        return acc + `
            <article class = "tarjetas-categoria" data-id="${curr.id}">
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
    clickEnTarjeta()
    
} 



//------------BUSCADOR-----------



const crearTituloProducto = (data) => {
    tituloSeccionCategoria.innerHTML = `<h2>${data}</h2>`
    
} 

const buscarProducto = (producto) => {
    fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${producto}`)
    .then(res => res.json())
    .then(data => {
        crearTarjeta(data.results)
        crearTituloProducto(producto)
    })
}

form.onsubmit = (e) => {
    e.preventDefault();
    buscarProducto(botonBuscar.value)     
}



//-----------------TARJETA PRODUCTO---------------
//https://api.mercadolibre.com/items/MLA1117381011

  
const buscarProducto11  = (id) => {
    fetch(`https://api.mercadolibre.com/items/${id}`)
    .then(res => res.json())
    .then((data) => {
    console.log(data);  
    crearTarjetaDetalleProducto(data)
    
    
    })
    
} 


//------------DESCRIPCION-----------


const todasLasFotos = (data) => {
    const galeriaFotos = document.querySelector(".galeria-fotos");
    const html = data.reduce((acc, curr) => {
        console.log(curr.url);
        return acc = acc + `
            <div class="galeria img-1">
            <img src="${curr.url}" class="img" data-id: "${curr.id}">
            </div>
            `
    }, "")
    
    galeriaFotos.innerHTML = html
    const fotosDeGaleria = document.querySelectorAll(".galeria")
    const imagenAgrandada = document.querySelector(".foto")
    for (let i = 0; i < fotosDeGaleria.length; i++) {
        fotosDeGaleria[i].onclick = () => {
            imagenAgrandada.innerHTML = `
            <img src="${data[i].url}" class="img">
            `
            console.log(data[i].url);
      }
    }
}


const crearTarjetaDetalleProducto = (data) => {
    const detalleProducto = document.querySelector(".detalle-producto");
    const html = `
        <div class="seccion-detalle-producto">
        
            <div class="galeria-fotos"></div>

            <div class="foto">
                
            </div>
            <div class="descripcion">
                <h3 class="descripcion22">${data.title}</h3>
                <h4 class="descripcion22">$ ${data.price}</h4>
                <p><i class="far fa-handshake"></i>  ${data.accepts_mercadopago === true ? "Acepta mercado pago" : "no acepta"} </p>
                <p><i class="fas fa-tag"></i>  ${data.condition === "new"    ? "Estado: Nuevo" : "Estado: Usado"}</p>
                <p><i class="fas fa-truck"></i>  ${data.shipping.free_shipping === true ? "envio gratis" : "consultar costo de envio"}</p>
                <p><i class="fas fa-tools"></i>  ${data.warranty}</p>
                
            </div>
        </div>
            
           
        `
    detalleProducto.style.display = "block"
    detalleProducto.innerHTML = html
    todasLasFotos(data.pictures)
    
}
    
    



 const clickEnTarjeta = () => {
    const tarjetasCategoria2 = document.querySelectorAll(".tarjetas-categoria")
    for (let i = 0; i < tarjetasCategoria2.length; i++) {
        tarjetasCategoria2[i].onclick = () => {
            const id = tarjetasCategoria2[i].dataset.id
            buscarProducto11(id)
            ocultarSeccion()
            
      }
    }
  }


//-------------FILTRAR POR ENVIO---------

const inputOrdenar = document.getElementById("envio")
const envioGratis = document.getElementById("envio-gratis")


const ordenarEnvioGratis = (cate) => {
    
    //envioGratis.onclick = () => {
        fetch(`https://api.mercadolibre.com/sites/MLA/search?category=${cate}&shipping_cost=free`)
            .then(res => res.json())
            .then((data) => { 
            console.log(data);  
            crearTarjeta(data.results)
        
        
        })  
    //}

    
} 



