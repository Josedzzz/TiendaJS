
//Manejo de los links de la app para el cambio de contenido

/**
 * Muestra el formulario al que se le da click desde el header
 * @param {*} formId 
 */
const mostrarFormulario = (formId) => {
    //Muestra el formulario
    const form = document.getElementById(formId);
    form.style.display = "block";

    //Oculta el resto de formularios
    const otherForms = document.querySelectorAll(".form-container:not(#" + formId + ")");
    for (const otherForm of otherForms) {
        otherForm.style.display = "none";
    }
};

/**
 * 
 * @param {*} event 
 */
const handleLinkClick = (event) => {
    const link = event.target;
    const formId = link.getAttribute("data-form-id");
    mostrarFormulario(formId);
}


const links = document.querySelectorAll(".links a");
for (const link of links) {
  link.addEventListener("click", handleLinkClick);
}

/*const links = document.querySelectorAll(".links a");
for (const link of links) {
  link.addEventListener("click", () => {
    const formId = link.getAttribute("data-form-id");
    mostrarFormulario(formId);
  });
}*/
