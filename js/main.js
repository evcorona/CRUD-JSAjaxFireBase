var idObject  //El objeto a borrar
var action    //La accion a realizar de CRUD en JSON: get, post, delete, 

//--------------------------------------------------------------------------------------------------
//Ejecuta acciones de CRUD
const crudTheJson = (theEntry, action) => {
  let endpoint = "https://ajaxclass-1ca34.firebaseio.com/verox/koders/.json";
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let response = JSON.parse(xhttp.response);
      console.log("json", response)
      fillDataToTable(response)
    }
  };

  switch (action) {
    case "GET":
      xhttp.open(action, endpoint, true);
      xhttp.send();
      console.log(action)
      break
    case "POST":
      xhttp.open(action, endpoint, true);
      xhttp.send(JSON.stringify(theEntry));
      console.log(action)
      break
    case "DELETE":
      xhttp.open(action, endpoint.replace(".json", theEntry + "/.json"), true);
      xhttp.send();
      console.log(action)
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
                  <td>${isActive}</td>
                  <td> <button type="button" class="btn btn-danger btn-sm btn-remove" data-entry-id=${key}>Eliminar</button>
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
  let isActive = document.getElementById("is-Active").value
  isActive == "true" ? isActive = true : isActive = false
  let newObject = { name, lastName, bornDate, type, isActive }
  console.log(newObject)
  crudTheJson(newObject, "POST")  //Funcion CRUD
  crudTheJson("", "GET")  //Funcion CRUD
}
//--------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------
//Listener del Boton de Guardar
document.getElementById("save-button").addEventListener("click", getFormData)
//--------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------
//Listener del Boton de Eliminar
const addBtnDeleteListener = () => {
  let btnDelete = document.querySelectorAll(".btn-delete")
  btnDelete.forEach(button => {
    button.addEventListener("click", event => {
      let entryID = event.target.dataset.entryId
      console.log("listener")
      crudTheJson(entryID, "DELETE")
      crudTheJson("", "GET")  //Funcion CRUD
    })
  })
}
//--------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------
//Ejecucion de Funciones
crudTheJson("", "GET")  //Funcion CRUD