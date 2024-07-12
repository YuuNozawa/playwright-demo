function toggleEducationFields() {
    const select = document.querySelector('#countryDropdown');
    const val = select.options[select.selectedIndex].value;
    if(val === "us") {
        document.querySelector('#usFields').style.display = "block";
        document.querySelector('#japanFields').style.display = "none";
        document.querySelector('#germanyFields').style.display = "none";
    } else if(val === "japan") {
        document.querySelector('#usFields').style.display = "none";
        document.querySelector('#japanFields').style.display = "block";
        document.querySelector('#germanyFields').style.display = "none";
    } else if(val === "germany") { 
        document.querySelector('#usFields').style.display = "none";
        document.querySelector('#japanFields').style.display = "none";
        document.querySelector('#germanyFields').style.display = "block";
    }
}

function textOnChangeHandler() {
    alert("変更されました");
}