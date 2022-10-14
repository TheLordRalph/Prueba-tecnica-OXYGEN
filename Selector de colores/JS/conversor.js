var colorPorDefecto;
var colorPalette = "color1";

window.onload = function() {
    colorPorDefecto = document.getElementById("colorActive");
    selectColor();
}

function changPallete(element) {
    document.getElementById(colorPalette).setAttribute("class", "");
    element.setAttribute("class", "color-pick-active");
    colorPalette = element.id;

    if (element.title != "") {
        document.getElementById("hex").value = element.title;
        document.getElementById("r").value = hexToRGB("r");
        document.getElementById("g").value = hexToRGB("g");
        document.getElementById("b").value = hexToRGB("b");
        hexChange();
    }
}


function selectColor() {
    let colorPickActive = document.getElementsByClassName("color-pick-active");
    colorPickActive[0].children[0].setAttribute("style", "display: none");
    colorPickActive[0].setAttribute("style", "background-image: none; border: 3px solid white; background-color: " + document.getElementById("hex").value);
    colorPickActive[0].setAttribute("title", document.getElementById("hex").value);
}

window.oninput = function(element) {
    if (element.target.id == "r" || element.target.id == "g" || element.target.id == "b") {
        document.getElementById("hex").value = "#" + rgbToHex("r") + rgbToHex("g") + rgbToHex("b");
        hexChange();
    }
    if (element.target.id == "hex") {
        if (element.target.value.length == 7) {
            document.getElementById("r").value = hexToRGB("r");
            document.getElementById("g").value = hexToRGB("g");
            document.getElementById("b").value = hexToRGB("b");
            hexChange();
        }
    }
}

function hexChange() {
    selectColor();
    let colors = document.getElementById("colors");

    colorPorDefecto.children[0].setAttribute("style", "position: absolute; inset: 5px; background: rgb(255, 255, 255); border-radius: 50%; opacity: 0;");
    colors.childNodes.forEach(e => {
        if (e.nodeName == "SPAN" && e.children[0].title == document.getElementById("hex").value) {
            e.children[0].children[0].setAttribute("style", "position: absolute; inset: 5px; background: rgb(255, 255, 255); border-radius: 50%; opacity: 1;");
            colorPorDefecto = e.children[0];
        }
    });
}

function rgbToHex(rgb) {
    let hex = ["0", "1", "2", "3", "4" ,"5" ,"6" ,"7" ,"8", "9", "A", "B", "C", "D", "E", "F"];
    let result;

    for (let i = 0; i < 6; i++) {
        let numero = parseInt(document.getElementById(rgb).value / 16);
        if (numero >= 10 && numero <=15) {
            numero = hex[numero];
        }
        result = "" + numero;

        numero = parseInt(document.getElementById(rgb).value % 16);
        if (numero >= 10 && numero <=15) {
            numero = hex[numero];
        }
        result += numero;
        return result;
    }

}

function hexToRGB(rgb) {
    let hex = {"A": 10, "B": 11, "C": 12, "D": 13, "E": 14, "F": 15};

    let numeroHex = document.getElementById("hex");
    let numero1;
    let numero2;
    var result;

    switch (rgb) {
        case "r":
            numero1 = numeroHex.value.substring(1, 2);
            numero2 = numeroHex.value.substring(2, 3);
            break;

        case "g":
            numero1 = numeroHex.value.substring(3, 4);
            numero2 = numeroHex.value.substring(4, 5);
            break;

        case "b":
            numero1 = numeroHex.value.substring(5, 6);
            numero2 = numeroHex.value.substring(6, 7);
            break;
    }

    switch (numero1) {
        case "A":
            result = 16 * hex.A;
            break;
        case "B":
            result = 16 * hex.B;
            break;
        case "C":
            result = 16 * hex.C;
            break;
        case "D":
            result = 16 * hex.D;
            break;
        case "E":
            result = 16 * hex.E;
            break;
        case "F":
            result = 16 * hex.F;
            break;

        default:
            result = 16 * numero1;
    }

    switch (numero2) {
        case "A":
            result = parseInt(result + hex.A);
            break;
        case "B":
            result = parseInt(result + hex.B);
            break;
        case "C":
            result = parseInt(result + hex.C);
            break;
        case "D":
            result = parseInt(result + hex.D);
            break;
        case "E":
            result = parseInt(result + hex.E);
            break;
        case "F":
            result = parseInt(result + hex.F);
            break;

        default:
            result = result + parseInt(numero2);
    }

    return result;

}

function selectColorDefault(element) {
    let hex = document.getElementById("hex");
    hex.value = element.title;
    hexChange();

    document.getElementById("r").value = hexToRGB("r");
    document.getElementById("g").value = hexToRGB("g");
    document.getElementById("b").value = hexToRGB("b");

    colorPorDefecto.children[0].setAttribute("style", "position: absolute; inset: 5px; background: rgb(255, 255, 255); border-radius: 50%; opacity: 0;");
    element.children[0].setAttribute("style", "position: absolute; inset: 5px; background: rgb(255, 255, 255); border-radius: 50%; opacity: 1;");
    
    colorPorDefecto.id = "";
    element.id = "colorActive";
    colorPorDefecto = element;
}