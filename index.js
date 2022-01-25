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
const formEncabezado = document.querySelector(".form-encabezado")
const botonBuscar = document.querySelector("#buscador")



const tituloSeccionCategoria = document.querySelector(".titulo-seccion-categoria")

const seccionTodasLasCategorias = document.querySelectorAll(".ocultar")


const seccionCelulares = document.querySelector(".seccion-categorias")
const tarjetasPorCategoria = document.querySelector(".tarjetas-por-categoria")


const header = document.querySelector(".header")
const nav = document.querySelector(".nav")



let ocultarSeccion = () => {
    
    for (let i = 0; i < seccionTodasLasCategorias.length; i++) {
        seccionTodasLasCategorias[i].style.display = "none";
    }
    header.style.height = "20%"
}
                                                                     




//-----------------Categorias de nav ---------------


let categoria = (cate) => {
    fetch(`https://api.mercadolibre.com/sites/MLA/search?category=${cate}&limit=20`)
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
    const titulo = data.name.toUpperCase()
    tituloSeccionCategoria.innerHTML = `<h2 id="buscador-titulo">${titulo}</h2>`
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



//-----------filtrar busqueda----- ok! 

const ordenar = document.querySelector("#ordenar")
const botonBuscarConFiltros = document.querySelector(".buscar-filtros")


botonBuscarConFiltros.onclick = (e) => {
    const buscadorTitulo = document.querySelector("#buscador-titulo")
    const envioGratis2 = document.querySelector("#envio-gratis2")
    tituloABuscar = buscadorTitulo.innerHTML;
    e.preventDefault()
    buscarProducto(tituloABuscar, envioGratis2.checked)   
         

}



//---------------VOLVER A PAGINA INICIAL------- ok!


const volverAPaginaPrincipal = () => {
    ocultarSeccion()
    imagenDeInicio.style.display = "block"
    formEncabezado.style.display = "block"
    header.style.height = "25%"
    nav.style.display = "block"
}

tituloPrincipal.onclick = volverAPaginaPrincipal



// TARJETAS ok!

const crearTarjeta = (data) => {
    const tarjetasCategorias = document.querySelector(".seccion-tarjetas");
    
    const html = data.reduce ((acc, curr) => {
        const titulo = curr.title.slice(0,40)
        return acc + `
            <article class = "tarjetas-categoria" data-id="${curr.id}">
                <div class="img-tarjetas">
                 <img src="${curr.thumbnail}">
                </div>
                <div class="info-tarjetas">
                <h3>${titulo}</h3>
                <h4>$ ${curr.price}</h4>
                </div>
            </article> 
        `
    }, "")
    tarjetasCategorias.innerHTML = html
    clickEnTarjeta()
    
} 



//------------BUSCADOR----------- ok!



const crearTituloProducto = (data) => {
    const titulo = data.toUpperCase()
    tituloSeccionCategoria.innerHTML = `<h2 id="buscador-titulo">${titulo}</h2>` 
} 

const envioGratis = document.querySelector("#envio-gratis")

const buscarProducto = (producto, envioGratis) => {
    
    let url = `https://api.mercadolibre.com/sites/MLA/search?q=${producto}&limit=20`
    
    if (envioGratis === true) {
    url = url + "&shipping_cost=free"
    }
    if (ordenar.value === "relevant") {
        url = url + "&sort=relevance";
    }
    if (ordenar.value === "price_asc") {
        url = url + "&sort=price_asc";
    }
    if (ordenar.value === "price_desc") {
        url = url + "&sort=price_desc";
    }

    fetch(url)
        .then(res => res.json())
        .then((data) => { 
        console.log(data);  
        crearTarjeta(data.results)
        crearTituloProducto(producto)
        ocultarSeccion()
        tarjetasPorCategoria.style.display = "block"
        seccionCelulares.style.display = "block"
        
    })  
          
}





formEncabezado.onsubmit = (e) => {
    e.preventDefault();
    buscarProducto(botonBuscar.value, envioGratis.checked)   
       
}



//-----------------TARJETA PRODUCTO---------------ok!
//https://api.mercadolibre.com/items/MLA1117381011

  
const buscarProducto11  = (id) => {
    fetch(`https://api.mercadolibre.com/items/${id}`)
    .then(res => res.json())
    .then((data) => {
    console.log(data);  
    crearTarjetaDetalleProducto(data)
    
    
    })
    
} 


//------------DESCRIPCION-----------ok!


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
            
      }
    }
}


const crearTarjetaDetalleProducto = (data) => {
    const detalleProducto = document.querySelector(".detalle-producto");
    const titulo = data.title.toUpperCase()
    const html = `
        <div class="seccion-detalle-producto">
        
            <div class="galeria-fotos"></div>

            <div class="foto">
            <img src="${data.pictures[0].url}" class="img">
            </div>
            <div class="seccion-descripcion">
                <h3 class="titulo-descripcion">${titulo}</h3>
                <h4 class="descripcion-precio">$ ${data.price}</h4>
                <p><i class="far fa-handshake"></i>  ${data.accepts_mercadopago === true ? "Acepta Mercado Pago" : "Consultar formas de pago"} </p>
                <p><i class="fas fa-tag"></i>  ${data.condition === "new" ? "Estado: Nuevo" : "Estado: Usado"}</p>
                <p><i class="fas fa-truck"></i>  ${data.shipping.free_shipping === true ? "Envio Gratis" : "Consultar costo de envio"}</p>
                <p><i class="fas fa-tools"></i>  ${data.warranty  != null ? data.warranty : "Sin Garantia"} </p>
                
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


