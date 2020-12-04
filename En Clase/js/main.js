/* koders endpoint = https://ajaxclass-1ca34.firebaseio.com/koders/.json */
const printKoders = koders => {
  /*
      {
          koder1:{
              name:"",
              lastName:""
          }
      }
  */
  let dataTable = document.getElementById("koders-table")
  dataTable.innerHTML = ""
  for( koder in koders ){
      console.log("koder ", koder)
      let koderObject = koders[koder]
      let { name, lastName } = koderObject
      let dataTable = document.getElementById("koders-table")
      currentContent = dataTable.innerHTML
      let newContent = `
              <tr>
                  <td>${name}</td>
                  <td>${lastName}</td>
                  <td>
                      <div class="btn btn-danger btn-sm btn-delete">Eliminar</div>
                  </td>
              </tr>
          `
      dataTable.innerHTML = currentContent + newContent
  }
}

const getKoderData = () => {
  console.log("getKoderData")
  let name = document.getElementById("name").value
  let lastName = document.getElementById("last-name").value
  let koderObject = { name, lastName }
  saveKoder( koderObject )
}
document.getElementById("save-button").addEventListener("click", getKoderData )

/* GET */
const getKoders = () => {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         // Typical action to be performed when the document is ready:
         //xhttp.responseText;
         let response = JSON.parse(xhttp.response);
         console.log(response)
         printKoders( response )
      }
  };
  xhttp.open("GET", "https://ajaxclass-1ca34.firebaseio.com/koders/.json ",true);
  xhttp.send();
}
/*----*/
/* POST */
const saveKoder = koder => {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         // Typical action to be performed when the document is ready:
         //xhttp.responseText;
         let response = JSON.parse(xhttp.response);
         console.log(response)
         getKoders()
      }
  };
  xhttp.open("POST", "https://ajaxclass-1ca34.firebaseio.com/koders/.json ",true);
  xhttp.send( JSON.stringify( koder ) );
}
/*----*/
/* DELETE */
const deleteKoder = () => {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         // Typical action to be performed when the document is ready:
         //xhttp.responseText;
         let response = JSON.parse(xhttp.response);
         console.log(response)
         getKoders()
      }
  };
  xhttp.open("DELETE", "https://ajaxclass-1ca34.firebaseio.com/koders/-MNfnmMnyW9slpaphIx1/.json ",true);
  xhttp.send();
}
/*----*/
getKoders()