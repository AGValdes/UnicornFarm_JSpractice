'use strict'

//-------------Global Variables---------//

const tableParent = document.getElementById('unicorn-table');
const totalParent = document.getElementById('uni-total');
const barnTableParent = document.getElementById('barn-table');

const formElement = document.getElementById('form');

let allUnicorns = [];
let grandTotalUnicorns = 0;

let allBarns = [];



//---------------Constructor-----------//

function Unicorn(name, color, favoriteFood, barn) {
  this.Name = name;
  this.Color = color;
  this.FavoriteFood = favoriteFood;
  this.Barn = barn;
}

function Barn(name, unicorns) {
  this.Name = name;
  this.Unicorns = unicorns;

}
//------------Objects--------------//

let barnA = new Barn("A", [])
let barnB = new Barn("B", []);
let barnC = new Barn("C", []);
let barnD = new Barn("D", []);

allBarns.push(barnA, barnB, barnC, barnD);

//---------------Prototypes-----------//

/// This prototype function will generate content and append it to our unicorn table //
Unicorn.prototype.renderContentRow = function () {
  //Create a table row element
  let trElement = document.createElement('tr');
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

Barn.prototype.renderContentRow = function () {
  let trElement = document.createElement('tr');

  barnTableParent.appendChild(trElement);
  let barnName = document.createElement('th');
  barnName.textContent = this.Name;

  trElement.appendChild(barnName);

  for (var i = 0; i < this.Unicorns.length; i++) {
    let tdElement1 = document.createElement('td');
    tdElement1.textContent = this.Unicorns[i].Name;

    trElement.appendChild(tdElement1);
  }
  let tdElement2 = document.createElement('td');
  tdElement2.textContent = this.Unicorns.length.toString();
  if (tdElement2.textContent != 0) {
    trElement.appendChild(tdElement2);
  }
}

//-----------Helper Functions-----------//

//will generate the header of the table
function renderTableHeader() {
  let headerArray = [];

  let headerRow = document.createElement("tr");
  //create td elements for each property
  let nameCell = document.createElement('td');
  let colorCell = document.createElement('td');
  let foodCell = document.createElement('td');
  let barnCell = document.createElement('td');
  //push them into an Array
  headerArray.push(nameCell);
  headerArray.push(colorCell);
  headerArray.push(foodCell);
  headerArray.push(barnCell);
  //Change their text content
  nameCell.textContent = "Name";
  colorCell.textContent = "Color";
  foodCell.textContent = "Favorite Food";
  barnCell.textContent = "Barn Location";
  //itterate over each element in the array and append them to the row.
  headerArray.forEach(cell => headerRow.appendChild(cell));
  tableParent.appendChild(headerRow);
}

function renderBarnTableHeader() {
  let headerArray = [];
  let headerRow = document.createElement('tr');
  let barnCell = document.createElement('td');
  let nameCell = document.createElement('td');
  let totalCell = document.createElement('td');

  headerArray.push(barnCell);
  headerArray.push(nameCell);
  headerArray.push(totalCell);

  barnCell.textContent = "Barn";
  nameCell.textContent = "Unicorn";
  totalCell.textContent = "Total Unicorns";

  headerArray.forEach(cell => headerRow.appendChild(cell));
  barnTableParent.appendChild(headerRow);
}

function renderAllContentRows() {
  allUnicorns.forEach(unicorn => unicorn.renderContentRow());
}

function renderAllBarnContentRows() {
  allBarns.forEach(barn => barn.renderContentRow());
}

function displayTotalUnicorns() {
  totalParent.textContent = grandTotalUnicorns.toString();
}

//itterates over the allUnicorns array and sorts them into different arrays based on Barn property
function sortUnicornsByBarn() {
  for (var i = 0; i < grandTotalUnicorns; i++) {
    if (allUnicorns[i].Barn === "A" && !barnA.Unicorns.includes(allUnicorns[i])) {
      barnA.Unicorns.push(allUnicorns[i]);
    }
    else if (allUnicorns[i].Barn === "B" && !barnB.Unicorns.includes(allUnicorns[i])) {
      barnB.Unicorns.push(allUnicorns[i]);
    }
    else if (allUnicorns[i].Barn === "C" && !barnC.Unicorns.includes(allUnicorns[i])) {
      barnC.Unicorns.push(allUnicorns[i]);
    }
    else if (allUnicorns[i].Barn === "D" && !barnD.Unicorns.includes(allUnicorns[i])) {
      barnD.Unicorns.push(allUnicorns[i]);
    }
  }
}

function displayBarnATotal() {
  barnATotalParent.textContent = barnA.Unicorns.length.toString();;
  console.log("heelooo", barnA.Unicorns.length.toString());
  console.log(barnATotalParent.textContent);
}

function displayBarnBTotal() {
  barnATotalParent.textContent = barnB.ResidentTotal.toString();
}

function displayBarnCTotal() {
  barnATotalParent.textContent = barnC.ResidentTotal.toString();
}

function displayBarnDTotal() {
  barnATotalParent.textContent = barnD.ResidentTotal.toString();
}

function showListOfFavFoods() {

}

//-------Event Handler Function------//

function handleSubmit(event) {
  event.preventDefault();
  tableParent.innerHTML = "";
  barnTableParent.innerHTML = "";
  //Store the inputs from the form into variables
  let name = event.target.name.value;
  let color = event.target.color.value;
  let favFood = event.target.food.value;
  let barn = event.target.barnLocation.value;

  //create a new Unicorn instance and put it into a storage array
  let newUni = new Unicorn(name, color, favFood, barn);
  allUnicorns.push(newUni);
  //increment total unicorns
  grandTotalUnicorns++;
  //sort them by barn property
  sortUnicornsByBarn();
  //render the header of the table so it appears on top
  renderTableHeader();
  //render all other content
  renderAllContentRows();
  //display total unicorns on page
  displayTotalUnicorns();
  //display tables containing unicorns by barn
  renderBarnTableHeader();
  renderAllBarnContentRows();
}

//------Executable Code--------//

//calls the handleSubmit function when the submit input is triggered.
formElement.addEventListener("submit", handleSubmit);
