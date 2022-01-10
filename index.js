


fetch("https://api.mercadolibre.com/sites/MLA/categories")
.then(res => res.json())
.then((data) => {
    console.log(data);
    crearNav(data)
})

