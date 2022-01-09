


fetch("https://api.mercadolibre.com/sites/MLA/search?q=iphone#json")
.then(res => res.json())
.then((data) => {
    console.log(data);
})