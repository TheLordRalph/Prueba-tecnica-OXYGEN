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