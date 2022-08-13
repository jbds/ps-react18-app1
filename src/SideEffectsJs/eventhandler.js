'use strict';

const cardShortNameLookup = new Map();
const l = cardShortNameLookup;
l.set("card0", "2C");
l.set("card1", "3C");
l.set("card2", "4C");
l.set("card3", "5C");
l.set("card4", "6C");
l.set("card5", "7C");
l.set("card6", "8C");
l.set("card7", "9C");
l.set("card8", "TC");
l.set("card9", "JC");
l.set("card10", "QC");
l.set("card11", "KC");
l.set("card12", "AC");
l.set("card13", "2D");
l.set("card14", "3D");
l.set("card15", "4D");
l.set("card16", "5D");
l.set("card17", "6D");
l.set("card18", "7D");
l.set("card19", "8D");
l.set("card20", "9D");
l.set("card21", "TD");
l.set("card22", "JD");
l.set("card23", "QD");
l.set("card24", "KD");
l.set("card25", "AD");
l.set("card26", "2H");
l.set("card27", "3H");
l.set("card28", "4H");
l.set("card29", "5H");
l.set("card30", "6H");
l.set("card31", "7H");
l.set("card32", "8H");
l.set("card33", "9H");
l.set("card34", "TH");
l.set("card35", "JH");
l.set("card36", "QH");
l.set("card37", "KH");
l.set("card38", "AH");
l.set("card39", "2S");
l.set("card40", "3S");
l.set("card41", "4S");
l.set("card42", "5S");
l.set("card43", "6S");
l.set("card44", "7S");
l.set("card45", "8S");
l.set("card46", "9S");
l.set("card47", "TS");
l.set("card48", "JS");
l.set("card49", "QS");
l.set("card50", "KS");
l.set("card51", "AS");

window.cardClick = function cardClick(evt) {
  // alert('event.target.id: ' + evt.target.id + "\n"
  //   + 'event.currentTarget.id: ' + evt.currentTarget.id);
  console.log(cardShortNameLookup.get(evt.currentTarget.id));
  const el = document.getElementById("gT0");
  // this works!
  // const currentTransform = el.getAttribute("transform");
  // const deltaTransform = "translate(50, 50)";
  // const transform = `${deltaTransform},${currentTransform}`;
  // el.setAttribute("transform", transform);
  // but this does not
  // el.setAttribute("transition", "background 5s");
  // el.setAttribute("background", "blue");

};