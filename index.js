


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



navCelulares.onclick = () => {
    console.log("celulares");
    fetch("https://api.mercadolibre.com/sites/MLA/search?q=celular")
    .then(res => res.json())
    .then((data) => {
    console.log(data);
    crearTarjeta(data.results)
})    
}

const crearTarjeta = (data) => {
    const tarjetasCelulares = document.querySelector(".tarjetas-celulares");
    const html = data.reduce ((acc, curr) => {
        return acc + `
            <article class = "tarjetas-categoria">
                <h2>${curr.title}</h2>
                <img src="${curr.thumbnail}">
                <p>$ ${curr.price}</p>
            </article> 
        `
    }, "")
    tarjetasCelulares.innerHTML = html
}
