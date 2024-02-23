
//Manejo de los links de la app para el cambio de contenido

/**
 * Controla el click que hace el usuario
 * @param {*} event representa el evento click cuando el usuario hace click en el enlace 
 */
const handleLinkClick = (event) => {
  const link = event.target;
  //Id del formulario que se va a mostrar
  const formId = link.getAttribute("data-form-id"); 
  mostrarFormulario(formId);
}

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

//Asociar la funcion handleLinkClick al evento click de todos los elementos de la clase "links"
const links = document.querySelectorAll(".links a");
for (const link of links) {
  link.addEventListener("click", handleLinkClick);
}

