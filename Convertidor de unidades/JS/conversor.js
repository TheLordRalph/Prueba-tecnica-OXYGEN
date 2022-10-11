var saveds = 0;


window.onload = function () {

    let saved = document.getElementById("saved");
    if (localStorage.length >= 1) {
        let i = 0;
        while (i <= localStorage.length) {
            if (localStorage.getItem(i) != null) {
                saved.innerHTML += localStorage.getItem(i);
            }
            i++;
        } 
    }


}

const Valores = {
    miles: 0.6213712,
    feet: 3.28084,
    inch: 0.3937008
}

function changeUnit() {
    let selectUnidad = document.getElementById("selectUnidad");
    
    let tipoUnidad = document.getElementById("tipoUnidad");
    let tipoUnidadResultado = document.getElementById("tipoUnidadResultado");

    tipoUnidad.innerHTML = selectUnidad.selectedOptions[0].title
    tipoUnidadResultado.innerHTML = selectUnidad.value

    conversion();
}

function invertUnit() {

    let selectUnidad = document.getElementById("selectUnidad");
    let tipoUnidad = document.getElementById("tipoUnidad");
    let numeroIntroducido = document.getElementById("numeroIntroducido");

    selectUnidad.value = tipoUnidad.innerText
    numeroIntroducido.value = document.getElementById("resultado").innerText;

    changeUnit()
}

function conversion() {
    let selectUnidad = document.getElementById("selectUnidad");
    let numeroIntroducido = parseFloat(document.getElementById("numeroIntroducido").value);
    let resultado = document.getElementById("resultado");

    if (!isNaN(numeroIntroducido)) {
        
        switch (selectUnidad.value) {
            case "miles":
                resultado.innerHTML = (numeroIntroducido * Valores.miles).toFixed(2)
                break;

            case "km":
                resultado.innerHTML = (numeroIntroducido / Valores.miles).toFixed(2)
                break;

            case "m":
                resultado.innerHTML = (numeroIntroducido / Valores.feet).toFixed(2)
                break;

            case "pie":
                resultado.innerHTML = (numeroIntroducido * Valores.feet).toFixed(2)
                break;

            case "inch":
                resultado.innerHTML = (numeroIntroducido * Valores.inch).toFixed(2)
                break;

            case "cm":
                resultado.innerHTML = (numeroIntroducido / Valores.inch).toFixed(2)
                break;
        }
    } else {
        resultado.innerHTML = "0.00";
    }
}

function saved() {
    const div = document.createElement("div");
    div.setAttribute("class", "favorite");

    while (true) {
        if (localStorage.getItem(saveds) == null) {
            div.setAttribute("id", saveds);
            break;
        } else {
            saveds++;
        }
    }
    
    
    div.innerHTML = "<h1></h1><svg onclick=\"deleteSaved(this)\" xmlns=\"http://www.w3.org/2000/svg\" width=\"100%\" height=\"100%\" fill=\"currentColor\" class=\"bi bi-x-lg\" viewBox=\"0 0 16 16\"><path d=\"M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z\"/></svg>";
    
    let numeroIntroducido = document.getElementById("numeroIntroducido");
    let tipoUnidad = document.getElementById("tipoUnidad").innerText;

    if (numeroIntroducido.value == "") {
        numeroIntroducido.value = "0";
    }

    let resultado = document.getElementById("resultado").innerText;
    let tipoUnidadResultado = document.getElementById("tipoUnidadResultado").innerText;

    let saved = document.getElementById("saved");
    
    div.childNodes[0].innerHTML = numeroIntroducido.value + " " + tipoUnidad + " -> " + resultado + " " + tipoUnidadResultado;

    saved.appendChild(div);
    
    numeroIntroducido.value = "";
    conversion();

    localStorage.setItem(saveds, div.outerHTML);
    saveds += 1;
}

function deleteSaved(element) {
    document.getElementById("saved").removeChild(element.parentNode);

    localStorage.removeItem(element.parentNode.id);
}