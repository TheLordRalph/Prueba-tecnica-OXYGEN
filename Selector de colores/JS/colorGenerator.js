var colorPorDefecto;
var colorPalette = "color1";
var saveds = 0;

window.onload = function() {
    colorPorDefecto = document.getElementById("colorActive");
    selectColor();

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

function createSaved() {
    let inputName = document.getElementById("inputName");
    let color1 = document.getElementById("color1");
    let color2 = document.getElementById("color2");
    let color3 = document.getElementById("color3");
    let color4 = document.getElementById("color4");
    let color5 = document.getElementById("color5");


    if (inputName.value != "" && color1.title != "" && color2.title != "" && color3.title != "" && color4.title != "" && color5.title != "") {
        let saved = document.getElementById("saved");
        const div = document.createElement("div");

        while (true) {
            if (localStorage.getItem(saveds) == null) {
                div.setAttribute("id", saveds);
                div.setAttribute("class", "favorite");
                break;
            } else {
                saveds++;
            }
        }

        div.innerHTML = "<h5\>" + inputName.value +"</h5><svg onclick=\"deleteSaved(this)\" xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-trash\" viewBox=\"0 0 16 16\"><path d=\"M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z\"/><path fill-rule=\"evenodd\" d=\"M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z\"/></svg><div onclick=\"selectSavedColors(this)\" class=\"colorsSaved\"><div id=\"saved" + saveds + "-1\" style=\"background-color: " + color1.title +"\"></div><div id=\"saved" + saveds + "-2\" style=\"background-color: " + color2.title +"\"></div><div id=\"saved" + saveds + "-3\" style=\"background-color: " + color3.title +"\"></div><div id=\"saved" + saveds + "-4\" style=\"background-color: " + color4.title +"\"></div><div id=\"saved" + saveds + "-5\" style=\"background-color: " + color5.title +"\"></div></div>";
    
        saved.appendChild(div);

        localStorage.setItem(saveds, div.outerHTML);

        inputName.value = "";

        color1.title = "";
        color1.children[0].setAttribute("style", "display: block");
        color1.setAttribute("style", "background-image: background-image: url(\"Images/FondoCircle.png\"); border: none; background-color: none");
        
        color2.title = "";
        color2.children[0].setAttribute("style", "display: block");
        color2.setAttribute("style", "background-image: background-image: url(\"Images/FondoCircle.png\"); border: none; background-color: none");

        color3.title = "";
        color3.children[0].setAttribute("style", "display: block");
        color3.setAttribute("style", "background-image: background-image: url(\"Images/FondoCircle.png\"); border: none; background-color: none");

        color4.title = "";
        color4.children[0].setAttribute("style", "display: block");
        color4.setAttribute("style", "background-image: background-image: url(\"Images/FondoCircle.png\"); border: none; background-color: none");

        color5.title = "";
        color5.children[0].setAttribute("style", "display: block");
        color5.setAttribute("style", "background-image: background-image: url(\"Images/FondoCircle.png\"); border: none; background-color: none");
    }
}

function deleteSaved(element) {
    document.getElementById("saved").removeChild(element.parentNode);
    localStorage.removeItem(element.parentNode.id);
}

function selectSavedColors(element) {
    let savedColor1 = element.children[0].attributes[1].nodeValue;
    let savedColor2 = element.children[1].attributes[1].nodeValue;
    let savedColor3 = element.children[2].attributes[1].nodeValue;
    let savedColor4 = element.children[3].attributes[1].nodeValue;
    let savedColor5 = element.children[4].attributes[1].nodeValue;

    document.getElementById("color1").title = savedColor1.substring(savedColor1.search("#"));
    document.getElementById("color1").setAttribute("style", "background-image: none; border: 3px solid white; background-color: " + savedColor1.substring(savedColor1.search("#")));
    document.getElementById("color1").children[0].setAttribute("style", "display: none");

    document.getElementById("color2").title = savedColor2.substring(savedColor2.search("#"));
    document.getElementById("color2").setAttribute("style", "background-image: none; border: 3px solid white; background-color: " + savedColor2.substring(savedColor2.search("#")));
    document.getElementById("color2").children[0].setAttribute("style", "display: none");

    document.getElementById("color3").title = savedColor3.substring(savedColor3.search("#"));
    document.getElementById("color3").setAttribute("style", "background-image: none; border: 3px solid white; background-color: " + savedColor3.substring(savedColor3.search("#")));
    document.getElementById("color3").children[0].setAttribute("style", "display: none");

    document.getElementById("color4").title = savedColor4.substring(savedColor4.search("#"));
    document.getElementById("color4").setAttribute("style", "background-image: none; border: 3px solid white; background-color: " + savedColor4.substring(savedColor4.search("#")));
    document.getElementById("color4").children[0].setAttribute("style", "display: none");

    document.getElementById("color5").title = savedColor5.substring(savedColor5.search("#"));
    document.getElementById("color5").setAttribute("style", "background-image: none; border: 3px solid white; background-color: " + savedColor5.substring(savedColor5.search("#")));
    document.getElementById("color5").children[0].setAttribute("style", "display: none");
}