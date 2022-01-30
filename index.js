//HEADER
const header = document.querySelector(".header")
const tituloPrincipal = document.querySelector(".titulo-principal")
const inicio = document.querySelector(".inicio")
const formEncabezado = document.querySelector(".form-encabezado")
const botonBuscar = document.querySelector("#buscador")

const loader = document.querySelector(".loader")


const tituloSeccionCategoria = document.querySelector(".titulo-seccion-categoria")

const seccionTodasLasCategorias = document.querySelectorAll(".ocultar")


const seccionCelulares = document.querySelector(".seccion-categorias")
const tarjetasPorCategoria = document.querySelector(".tarjetas-por-categoria")




// FA: Funciones Auxiliares


// FA ocultar seccion 

let ocultarSeccion = () => {
    for (let i = 0; i < seccionTodasLasCategorias.length; i++) {
        seccionTodasLasCategorias[i].style.display = "none";
    }
    header.style.height = "20%"
}
                                                                     


//https://api.mercadolibre.com/sites/MLA/categories

//Al cargar la pagina CATEGORIAS

const seccionTarjetasCategorias = document.querySelector(".seccion-tarjetas-categorias")
    fetch(`https://api.mercadolibre.com/sites/MLA/categories`)
    .then(res => res.json())
    .then((data) => {
    crearTarjetaBienvenida(data)
    //loader.style.display = "none";
    console.log(data); 
    //clickEnTarjetaCategoria()  
})  

//

const selectInicio = document.querySelector(".select-inicio")
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
const busquedaCategoria = document.querySelector(".busqueda-categoria")

const buscarCategoria = () => {
    busquedaCategoria.onclick = () => {
        const tarjetasCategoriaInicio = document.querySelectorAll(".tarjetas-iniciales")    
        let id = selectInicio.value
        categoria(id)
        tituloCategoria(id)
        ocultarSeccion()
    }
}


  

// FA crear tarjetas de categorias
const envioGratisCategoria = document.querySelector(".envio-gratis-categoria")
let categoria = (id, envioGratisCategoria) => {
    let url = `https://api.mercadolibre.com/sites/MLA/search?category=${id}&limit=20`

    if (envioGratisCategoria === true) {
        url = url + "&shipping_cost=free"
    }

    fetch(url)
    .then(res => res.json())
    .then((data) => {
    crearTarjeta(data.results)
    ocultarSeccion()
    seccionCelulares.style.display = "block"
    tarjetasPorCategoria.style.display = "block"  
    console.log(data.results);
    //loader.style.display = "none"; 

})    
}

// FA Crear titulo de categorias

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
    inicio.style.display = "flex"
    formEncabezado.style.display = "block"
}

tituloPrincipal.onclick = volverAPaginaPrincipal


// TARJETAS BUSQUEDA ok!

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



//------------BUSCADOR MAIN----------- ok!


// titulo busqueda

const crearTituloProducto = (data) => {
    const titulo = data.toUpperCase()
    tituloSeccionCategoria.innerHTML = `<h2 id="buscador-titulo">${titulo}</h2>` 
} 

//filtrar y ordenar busqueda
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

//BOTON BUSQUEDA

//POR ARTICULO

const simboloBusqueda = document.querySelector(".busqueda-inicio")

formEncabezado.onsubmit = (e) => {
    e.preventDefault();
    buscarProducto(botonBuscar.value, envioGratis.checked)      
}

simboloBusqueda.onclick = () => {
    buscarProducto(botonBuscar.value, envioGratis.checked)      
}


//POR CATEGORIA

//const busquedaCategoria = document.querySelector(".busqueda-categoria")


//-----------------TARJETA PRODUCTO---------------ok!
//https://api.mercadolibre.com/items/MLA1117381011
const clickEnTarjeta = () => {
    const tarjetasCategoria2 = document.querySelectorAll(".tarjetas-categoria")
    for (let i = 0; i < tarjetasCategoria2.length; i++) {
        tarjetasCategoria2[i].onclick = () => {
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



