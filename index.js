


/* fetch("https://api.mercadolibre.com/sites/MLA/categories")
.then(res => res.json())
.then((data) => {
    console.log(data);
    crearNav(data)
})
 */

console.log("hola");
const navCelulares = document.querySelector(".celulares");
const navAutos = document.querySelector(".autos");
const navComputacion = document.querySelector(".computacion");
const navElectrodomesticos = document.querySelector(".electrodomesticos");
const navBelleza = document.querySelector(".belleza");
const navDeporte = document.querySelector(".deporte");

const tituloCategoriaCelulares = document.querySelector(".titulo-categoria-celular")


navCelulares.onclick = () => {
    console.log("celulares");   
    fetch("https://api.mercadolibre.com/sites/MLA/search?q=celular")
    .then(res => res.json())
    .then((data) => {
    console.log(data);
    crearTarjeta(data.results)
    tituloCategoriaCelulares.style.display = "block"
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




/* const crearTarjeta = (data) => {
    const tarjetasCelulares = document.querySelector(".tarjetas-celulares");
    html = ""
    for (let index = 0; index < 4; index++) {
    return html + `
    <article class = "tarjetas-categoria">
        <h2>${data.title}</h2>
        <div class="img-tarjetas">
         <img src="${data.thumbnail}">
        </div>
        <p>$ ${data.price}</p>
    </article> 
        `
    
    }
    tarjetasCelulares.innerHTML = html
} */

