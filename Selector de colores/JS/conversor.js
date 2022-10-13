var colorPorDefecto;

window.onload = function() {
    colorPorDefecto = document.getElementById("colorActive");
    selectColor();
}

function selectColor() {
    let colorPickActive = document.getElementsByClassName("color-pick-active");
    colorPickActive[0].children[0].setAttribute("style", "display: none");
    colorPickActive[0].setAttribute("style", "background-image: none; border: 3px solid white; background-color: " + document.getElementById("hex").value);
}

window.oninput = function(element) {
    if (element.id = "hex") {
        selectColor();
    }
}

function selectColorDefault(element) {
    let hex = document.getElementById("hex");
    hex.value = element.title;
    selectColor();

    colorPorDefecto.children[0].setAttribute("style", "position: absolute; inset: 5px; background: rgb(255, 255, 255); border-radius: 50%; opacity: 0;");
    element.children[0].setAttribute("style", "position: absolute; inset: 5px; background: rgb(255, 255, 255); border-radius: 50%; opacity: 1;");
    
    colorPorDefecto.id = "";
    element.id = "colorActive";
    colorPorDefecto = element;
}