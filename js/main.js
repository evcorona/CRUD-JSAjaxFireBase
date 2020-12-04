//--------------------------------------------------------------------------------------------------
//Ejecuta solo GET R de un request
const getTheJson = () => {
  let endpoint = "https://ajaxclass-1ca34.firebaseio.com/verox/koders/.json";
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let response = JSON.parse(xhttp.response);
      fillDataToTable(response)
    }
  };
  xhttp.open("GET", endpoint, true);
  xhttp.send();
}
//--------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------
//Ejecuta acciones de CUD
const crudTheJson = (theEntry, action) => {
  let endpoint = "https://ajaxclass-1ca34.firebaseio.com/verox/koders/.json";
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let response = JSON.parse(xhttp.response);
      fillDataToTable(response)
      getTheJson()
    }
  };

  switch (action) {
    case "POST":
      xhttp.open(action, endpoint, true);
      xhttp.send(JSON.stringify(theEntry));
      break
    case "DELETE":
      xhttp.open(action, endpoint.replace(".json", theEntry + "/.json"), true);
      xhttp.send();
      break
  }
}
//--------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------
//Funcion que llena la tabla en HTML
const fillDataToTable = theJson => {
  let dataTable = document.getElementById("json-table")
  dataTable.innerHTML = ""
  for (key in theJson) {
    let object = theJson[key]
    let { name, lastName, bornDate, type, isActive } = object
    let dataTable = document.getElementById("json-table")
    currentContent = dataTable.innerHTML
    let newRow = `
              <tr>
                  <td>${name}</td>
                  <td>${lastName}</td>
                  <td>${bornDate}</td>
                  <td>${type}</td>
                  <td>${isActive === true ? "Activo" : "Inactivo"}</td>
                  <td> <button type="button" class="btn btn-danger btn-sm btn-delete" data-entry-id=${key}>Eliminar</button>
              </tr>`
    document.getElementById("json-table").innerHTML = currentContent + newRow
  }
  addBtnDeleteListener()
}
//--------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------
//Obtiene los datos del formulario
const getFormData = () => {
  let name = document.getElementById("name").value
  let lastName = document.getElementById("last-name").value
  let bornDate = document.getElementById("born-date").value
  let type = document.getElementById("type-selector").value

  if (name != "" && lastName != "" && bornDate != "" && type != "") {
    let isActive = document.getElementById("is-Active").value.checked
    isActive == "true" ? isActive = true : isActive = false
    let newObject = { name, lastName, bornDate, type, isActive }
    crudTheJson(newObject, "POST")  //Funcion CRUD}
  }
  else { alert("Es necesario completar todos los datos para guardar")}

}
//--------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------
//Listener del Boton de Guardar
document.getElementById("save-button").addEventListener("click", getFormData)
//--------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------
//Listener de los botones delete
const addBtnDeleteListener = () => {
  let btnDelete = document.querySelectorAll(".btn-delete")
  btnDelete.forEach(button => {
    button.addEventListener("click", event => {
      let entryID = event.target.dataset.entryId
      crudTheJson(entryID, "DELETE")
    })
  })
}
//--------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------
//Ejecucion de Funciones
getTheJson()  //Funcion solo GET