import getDataFetch from "../helpers/getData.js";

const main__image = document.querySelector(".main__img");
const others__img = document.querySelector(".others__img");

document.addEventListener("DOMContentLoaded", async () => {
    const idDetails = sessionStorage.getItem("idDetails");
    if(idDetails){
        const url = `https://mini-back-casaroyale-production.up.railway.app/inmuebles/${idDetails}`
        const inmueble = await getDataFetch(url)
        console.log(inmueble);
        let img = document.createElement("img");
        img.src = inmueble.imgs[0];
        img.classList = "img";
        main__image.append(img)

        let otherImgs = inmueble.imgs.slice(1);
        otherImgs.forEach(image => {
            img = document.createElement("img");
            img.src = image;
            img.classList = "other__img"
            others__img.append(img);
        });

        const article = document.createElement("article");
        article.innerHTML = `
        <section class="desc__sec">
            <h1 class="h1__type">${inmueble.type}</h1>
            <h1 class="h1__status">${inmueble.status}</h1>
            <p class="p__city">${inmueble.city}</p>
        </section> 
        <h3 class="p__adress">${inmueble.adress}</p> <br> 
        <p class="p__owner">${inmueble.owner}</p> <br>
        <section class="section__specifications">
        <figure class="figure__section">
            <img src="../img/Area.png" width="14" height="14">
            <p>${inmueble.area} M²</p>
        </figure>
        <figure class="figure__section">
            <img src="../img/Garage.png">
            <p>${inmueble.garages}</p>
        </figure>
        <figure class="figure__section">
            <img src="../img/Bathroom.png">
            <p>${inmueble.bathrooms}</p>
        </figure>
        <figure class="figure__section">
            <img src="../img/Bedroom.png">
            <p>${inmueble.bedrooms}</p>
        </figure>
        </section>
        <p class="p__price">Value: $${inmueble.price}</label>
        `;
        main__image.append(article)
    }
})