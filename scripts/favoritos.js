import getDataFetch from "../helpers/getData.js";

document.addEventListener("DOMContentLoaded", async () => {
    const urlCards = "http://localhost:3000/favoritos"
    const cards = await getDataFetch(urlCards);
    const contenedor = document.querySelector(".cards__container")
    cards.forEach((card) => {
        const article = document.createElement("article");
        article.classList.add("figure__card");
        article.id = card.id;
        article.innerHTML = `
            <img id="${card.id}"class="img__article" src="${card.imgs[0]}"> <br> <br>
            <p class="p__city">${card.city}</p>
            <label class="label__status">${card.status}</label>
            <label class="label__type">${card.type}</label>
            <label class="label__price">$${card.price}</label>
            <h3 class="p__adress">${card.adress}</p> <br> 
            <p class="p__owner">${card.owner}</p> <br>
            <section class="section__specifications">
                <figure class="figure__section">
                    <img src="../img/Area.png" width="14" height="14">
                    <p>${card.area} M²</p>
                </figure>
                <figure class="figure__section">
                    <img src="../img/Garage.png">
                    <p>${card.garages}</p>
                </figure>
                <figure class="figure__section">
                    <img src="../img/Bathroom.png">
                    <p>${card.bathrooms}</p>
                </figure>
                <figure class="figure__section">
                    <img src="../img/Bedroom.png">
                    <p>${card.bedrooms}</p>
                </figure>
            </section>`;
        contenedor.append(article);
    });
})