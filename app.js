'use strict'

//-------------Global Variables---------//
let allUnicorns = [];
const tableParent = document.getElementById('unicorn-table');
const totalParent = document.getElementById('uni-total');
const barnATotalParent = document.getElementById('barn-a');
let grandTotalUnicorns = 0;
let totalBarnA = 0;
let barnA = [];
let totalBarnB = 0;
let barnB = [];
let totalBarnC = 0;
let barnC = [];
let totalBarnD = 0;
let barnD = [];
let formElement = document.getElementById('form');

//---------------Constructor-----------//

function Unicorn(name, color, favoriteFood, barn) {
  this.Name = name;
  this.Color = color;
  this.FavoriteFood = favoriteFood;
  this.Barn = barn;
}

//---------------Prototypes-----------//

/// This prototype function will generate content and append it to our unicorn table ///
Unicorn.prototype.renderContentRow = function () {
  //Create a table row element
  const trElement = document.createElement('tr');
  //append it to the table element
  tableParent.appendChild(trElement);
  //Create a table header with the unicorn's name
  let uniName = document.createElement('th');
  uniName.textContent = this.Name;
  //Append it to the table row elementu
  trElement.appendChild(uniName);
  //Do the same with the rest of the unicorn's properies
  let uniColor = document.createElement('td');
  uniColor.textContent = this.Color;

  trElement.appendChild(uniColor);

  let uniFav = document.createElement('td');
  uniFav.textContent = this.FavoriteFood;

  trElement.appendChild(uniFav)

  let uniBarn = document.createElement('td');
  uniBarn.textContent = this.Barn;

  trElement.appendChild(uniBarn);
}

//-----------Helper Functions-----------//

//will generate the header of the table
function renderTableHeader() {
  let headerArray = [];

  let headerRow = document.createElement("tr");
  let nameCell = document.createElement('td');
  headerArray.push(nameCell);
  let colorCell = document.createElement('td');
  headerArray.push(colorCell);
  let foodCell = document.createElement('td');
  headerArray.push(foodCell);
  let barnCell = document.createElement('td');
  headerArray.push(barnCell);

  nameCell.textContent = "Name";
  colorCell.textContent = "Color";
  foodCell.textContent = "Favorite Food";
  barnCell.textContent = "Barn Location";

  headerArray.forEach(cell => headerRow.appendChild(cell));
  tableParent.appendChild(headerRow);
}

function renderAllContentRows() {
  allUnicorns.forEach(unicorn => unicorn.renderContentRow());

}

function displayTotalUnicorns() {
  console.log(grandTotalUnicorns);
  totalParent.textContent = grandTotalUnicorns.toString();
}

function sortUnicornsByBarn() {
  for (var i = 0; i < grandTotalUnicorns; i++) {
    if (allUnicorns[i].Barn === "A" && !barnA.includes(allUnicorns[i])) {
      barnA.push(allUnicorns[i]);
      totalBarnA++;
    }
    else if (allUnicorns[i].Barn === "B" && !barnB.includes(allUnicorns[i])) {
      barnB.push(allUnicorns[i]);
      totalBarnB++;
    }
    else if (allUnicorns[i].Barn === "C" && !barnC.includes(allUnicorns[i])) {
      barnC.push(allUnicorns[i]);
      totalBarnC++;
    }
    else if (allUnicorns[i].Barn === "D" && !barnD.includes(allUnicorns[i])) {
      barnD.push(allUnicorns[i]);
      totalBarnD++;
    }
  }
}

function displayBarnATotal() {
  barnATotalParent.textContent = totalBarnA.toString();
}

//-------Event Handler Function------//

function handleSubmit(event) {
  event.preventDefault();
  tableParent.innerHTML = "";
  //Store the inputs from the form into variables
  let name = event.target.name.value;
  let color = event.target.color.value;
  let favFood = event.target.food.value;
  let barn = event.target.barnLocation.value;
  //create a new Unicorn instance and put it into a storage array
  let newUni = new Unicorn(name, color, favFood, barn);
  allUnicorns.push(newUni);
  grandTotalUnicorns++;
  sortUnicornsByBarn();
  displayBarnATotal();
  renderTableHeader();
  renderAllContentRows();
  displayTotalUnicorns();
}

//------Executable Code--------//

formElement.addEventListener("submit", handleSubmit);
