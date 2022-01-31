//HEADER
const header = document.querySelector(".header")
const tituloPrincipal = document.querySelector(".titulo-principal")

//MAIN
//inicio
const inicio = document.querySelector(".inicio")
const formEncabezado = document.querySelector(".form-encabezado")
const botonBuscar = document.querySelector("#buscador")
const selectInicio = document.querySelector(".select-inicio")
const busquedaCategoria = document.querySelector(".busqueda-categoria")
const envioGratisCategoria = document.querySelector("#envio-gratis-categoria")
const imagenInicio = document.querySelector(".img-inicio")
const loader = document.querySelector(".loader")

//tarjetas
const tituloSeccionCategoria = document.querySelector(".titulo-seccion-categoria")
const ordenar = document.querySelector("#ordenar")
const botonBuscarConFiltros = document.querySelector(".buscar-filtros")
const seccionTodasLasCategorias = document.querySelectorAll(".ocultar")
const envioGratis = document.querySelector("#envio-gratis")
const simboloBusqueda = document.querySelector(".busqueda-inicio")
const seccionCelulares = document.querySelector(".seccion-categorias")
const tarjetasPorCategoria = document.querySelector(".tarjetas-por-categoria")



// Ocultar secciones

let ocultarSeccion = () => {
    for (let i = 0; i < seccionTodasLasCategorias.length; i++) {
        seccionTodasLasCategorias[i].style.display = "none";
    }
}
                                                                     

//Al cargar la pagina CATEGORIAS

const seccionTarjetasCategorias = document.querySelector(".seccion-tarjetas-categorias")
    fetch(`https://api.mercadolibre.com/sites/MLA/categories`)
    .then(res => res.json())
    .then((data) => {
    crearTarjetaBienvenida(data)
    loader.style.display = "none";
})  


const crearTarjetaBienvenida = (data) => {
    let acc = "<option> Busqueda por Categoria </option>"
    for (let i = 0; i < data.length; i++) {
        acc = acc + `
            <option value="${data[i].id}" data-id="${data[i].id}" class = "tarjetas-iniciales"> ${data[i].name} </option>
        `
    }
    selectInicio.innerHTML = acc
    buscarCategoria()
} 

const buscarCategoria = () => {
    busquedaCategoria.onclick = () => {
        loader.style.display= "block";
        const tarjetasCategoriaInicio = document.querySelectorAll(".tarjetas-iniciales")    
        let id = selectInicio.value
        categoria(id,envioGratisCategoria.checked)
        tituloCategoria(id)
        ocultarSeccion()
    }
}


  

// Crear tarjetas de categorias

let categoria = (id, envioGratisCategoria) => {
    let url = `https://api.mercadolibre.com/sites/MLA/search?category=${id}&limit=20`

    if (envioGratisCategoria === true) {
        url = url + "&shipping_cost=free"
    }
    fetch(url)
    .then(res => res.json())
    .then((data) => {
    crearTarjeta(data.results)
    loader.style.display= "none"; 
    ocultarSeccion()
    seccionCelulares.style.display = "block"
    tarjetasPorCategoria.style.display = "block"
})    
}

// Crear titulo de categorias

let tituloCategoria = (id) => {
    fetch(`https://api.mercadolibre.com/categories/${id}`)
    .then(res => res.json())
    .then((data) => {
    crearTitulo(data)  
})
}

const crearTitulo = (data) => {
    const titulo = data.name.toUpperCase()
    tituloSeccionCategoria.innerHTML = `<h2 id="buscador-titulo">${titulo}</h2>`
} 



//-----------filtrar busqueda-----


botonBuscarConFiltros.onclick = (e) => {
    loader.style.display= "block";
    const buscadorTitulo = document.querySelector("#buscador-titulo")
    const envioGratis2 = document.querySelector("#envio-gratis2")
    tituloABuscar = buscadorTitulo.innerHTML;
    e.preventDefault()
    buscarProducto(tituloABuscar, envioGratis2.checked)   
}


//---------------VOLVER A PAGINA INICIAL------- 


const volverAPaginaPrincipal = () => {
    ocultarSeccion()
    inicio.style.display = "flex"
    imagenInicio.style.display = "block"
    formEncabezado.style.display = "block"
}

tituloPrincipal.onclick = volverAPaginaPrincipal


// TARJETAS BUSQUEDA

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



//------------BUSCADOR MAIN----------- 


// titulo busqueda

const crearTituloProducto = (data) => {
    const titulo = data.toUpperCase()
    tituloSeccionCategoria.innerHTML = `<h2 id="buscador-titulo">${titulo}</h2>` 
} 

//filtrar y ordenar busqueda


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
        crearTarjeta(data.results)
        crearTituloProducto(producto)
        loader.style.display= "none"; 
        ocultarSeccion()
        tarjetasPorCategoria.style.display = "block"
        seccionCelulares.style.display = "block"
    })  
}


//BOTON BUSQUEDA



formEncabezado.onsubmit = (e) => {
    e.preventDefault();
    buscarProducto(botonBuscar.value, envioGratis.checked)      
}

simboloBusqueda.onclick = () => {
    buscarProducto(botonBuscar.value, envioGratis.checked)      
}



//-----------------TARJETA PRODUCTO---------------

const clickEnTarjeta = () => {
    
    const tarjetasCategoria2 = document.querySelectorAll(".tarjetas-categoria")
    for (let i = 0; i < tarjetasCategoria2.length; i++) {
        tarjetasCategoria2[i].onclick = () => {
            loader.style.display= "block";
            const id = tarjetasCategoria2[i].dataset.id
            buscarProductoX(id)
            ocultarSeccion()
      }
    }
}

  
const buscarProductoX  = (id) => {
    fetch(`https://api.mercadolibre.com/items/${id}`)
    .then(res => res.json())
    .then((data) => { 
    crearTarjetaDetalleProducto(data)

    })
} 


//------------DESCRIPCION-----------


const todasLasFotos = (data) => {
    const galeriaFotos = document.querySelector(".galeria-fotos");
    const html = data.reduce((acc, curr) => {
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
    loader.style.display= "none";
    detalleProducto.innerHTML = html
    todasLasFotos(data.pictures)
}



