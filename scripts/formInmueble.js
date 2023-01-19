import getDataFetch from "../helpers/getData.js";
import PostDataFetch from "../helpers/postData.js";
import putDataFech from "../helpers/putData.js";

const form = document.querySelector(".main__form")
let url;
let idEdit;
let inmueble = null;

document.addEventListener("DOMContentLoaded", async () => {
    url = "http://localhost:3000/inmuebles";
    idEdit = sessionStorage.getItem("idEditar");
    if(idEdit) {
        const title = document.querySelector(".header__title");
        title.innerHTML = "Edicion De Inmueble!";
        const newUrl = `${url}/${idEdit}`;
        inmueble = await getDataFetch(newUrl);

        const imgs = document.querySelector("#imgs"); 
        const city = document.querySelector("#city"); 
        const adress = document.querySelector("#adress"); 
        const owner = document.querySelector("#owner"); 
        const price = document.querySelector("#price"); 
        const area = document.querySelector("#area"); 
        const garages = document.querySelector("#garages"); 
        const bathrooms = document.querySelector("#bathrooms"); 
        const bedrooms = document.querySelector("#bedrooms"); 

        imgs.value = inmueble.imgs;
        city.value = inmueble.city;
        adress.value = inmueble.adress;
        owner.value = inmueble.owner;
        price.value = inmueble.price;
        area.value = inmueble.area;
        garages.value = inmueble.garages;
        bathrooms.value = inmueble.bathrooms;
        bedrooms.value = inmueble.bedrooms;

        const boton = document.querySelector(".main__form__button");
        boton.innerHTML = "Editar"
    }
});

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    let flag = true;
    const errores = [];
    const newInmueble = {}

    //Validaciones Javascript

    Object.keys(form).forEach((index) => {
        const item = form[index];
        if (item.id !== '') {
            if(item.value) {
                if(item.id == "imgs"){
                    newInmueble["imgs"] = item.value.replace(" ", "").split(",")
                } else newInmueble[item.id] = item.value
            }else {
                flag = false;
                errores.push(item.id);
            }
        }
    })
    console.log(newInmueble);
    
    if(flag) {
        if(inmueble){
            url += "/" + idEdit;
            await putDataFech(url, newInmueble);
            await Swal.fire("Editado!", "Tu inmueble ha sido Editado. con exito!", "success");
            return;
        } else {
            await Swal.fire("Agregado!", "Tu inmueble ha sido Agregado con exito!", "success");
            await PostDataFetch(url, newInmueble)
        }
    } else alert(`Falta ingresar los campos: ${errores.join(", ")}.`)
})