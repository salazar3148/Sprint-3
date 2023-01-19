import deleteDataFetch from "../helpers/deleteData.js";
import getDataFetch from "../helpers/getData.js";
import PostDataFetch from "../helpers/postData.js";

let articles = []

const urlCards = "https://mini-back-casaroyale-production.up.railway.app/inmuebles"
let cards;

const contenedor = document.querySelector(".cards__container")
const searchButton = document.querySelector("#buscar")

const imprimirCards = (cards, contenedor, type, status, keyword) => {
    contenedor.innerHTML = "";

    cards.forEach((card) => {
        const article = document.createElement("article");
        article.classList.add("figure__card");
        article.id = card.id;
        article.innerHTML = `
            <img id="img"class="img__article" src="${card.imgs[0]}"> <br>
            <img id="favorito" class="fav__article" src="img/fav.png" width="18" height="18"">
            <img id="eliminar" class="delete__article" src="img/delete.png" width="18" height="18">
            <img id="editar" class="editar__article" src="img/editar.png" width="18" height="18">
            <p class="p__city">${card.city}</p>
            <label class="label__status">${card.status}</label>
            <label class="label__type">${card.type}</label>
            <label class="label__price">$${card.price}</label>
            <h3 class="p__adress">${card.adress}</p> <br>
            <p class="p__owner">${card.owner}</p> <br>
            <section class="section__specifications">
                <figure class="figure__section">
                    <img src="img/Area.png" width="14" height="14">
                    <p>${card.area} M²</p>
                </figure>
                <figure class="figure__section">
                    <img src="img/Garage.png">
                    <p>${card.garages}</p>
                </figure>
                <figure class="figure__section">
                    <img src="img/Bathroom.png">
                    <p>${card.bathrooms}</p>
                </figure>
                <figure class="figure__section">
                    <img src="img/Bedroom.png">
                    <p>${card.bedrooms}</p>
                </figure>
            </section>`;
        agregarAlContenedor(contenedor, article, card, type, status, keyword)
    });
    articles = document.querySelectorAll(".figure__card");
    generarEventos();
};

const agregarAlContenedor = (contenedor, article, card, type, status, keyword) => {

    if(!type && !status && !keyword){
        contenedor.append(article)
        return;
    }

    if (type && (card.type == type)) {
        if(status && (card.status == status)){
            if(keyword){
                if(card.adress.toLowerCase().includes(keyword)){
                    contenedor.append(article)
                    return;
                } else if(keyword && !card.adress.toLowerCase().includes(keyword)) return;
            }
            contenedor.append(article)
            return;
        } else if(status && card.status != status) return;
        contenedor.append(article);
    }
}

//Eventos

document.addEventListener("DOMContentLoaded", async () => {
    sessionStorage.removeItem("idEditar");
    sessionStorage.removeItem("idDetails");
    try {
        cards = await getDataFetch(urlCards);
        imprimirCards(cards, contenedor);
    } catch(err) {
        console.log(err);
        alert(err)
    }
})

searchButton.addEventListener("click", () => {
    const type = document.querySelector("#type").value
    const status = document.querySelector("#status").value
    const keyword = document.querySelector("#busqueda").value

    type ? imprimirCards(cards, contenedor, type, status, keyword): alert("Debe ingresar al menos un tipo de inmueble")
})

const generarEventos = () => {
    articles.forEach((article) => {
        article.addEventListener("click", (event) => {
            if(event.target.id == "eliminar"){
                Swal.fire({
                    title: "¿Está usted seguro de eliminar?",
                    text: "No se puede revertir este proceso!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Si, Borralo!",
                  }).then(async (result) => {
                    if (result.isConfirmed) {
                        await Swal.fire("Eliminado!", "Tu inmueble ha sido eliminado. con exito!", "success");
                        const id = event.target.parentNode.id;
                        const url = `${urlCards}/${id}`;
                        try {
                            await deleteDataFetch(url);
                            imprimirCards(cards, contenedor);
                        } catch(err){
                            console.log("Error: " + err)
                        }
                    }
                  });
            }

            if(event.target.id == "editar") {
                sessionStorage.setItem("idEditar", event.target.parentNode.id)
                location.href = "pages/formInmueble.html";
            }

            if(event.target.id == "favorito"){
                const id = event.target.parentNode.id;
                const inmUrl = `${urlCards}/${id}`
                const favUrl = "https://mini-back-casaroyale-production.up.railway.app/favoritos"
                agregarAFav(inmUrl, favUrl);
            }

            if(event.target.id == "img"){
                sessionStorage.setItem("idDetails", event.target.parentNode.id)
                window.location.href = "pages/seeDetails.html";
            }
        })
    })
}

const agregarAFav = async (inmUrl, favUrl) => {
    const inmueble = await getDataFetch(inmUrl);
    await PostDataFetch(favUrl, inmueble)
}