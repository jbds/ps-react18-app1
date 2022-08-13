'use strict'
const assets = require('./assets');
const transforms = require('./transforms');

// module constants
const isObverse = false;
const DrawType = transforms.DrawType;
const DummyPosition = {
  Top: 'top',
  Right: 'right',
  Bottom: 'bottom',
  Left: 'left',
  Hidden: 'hidden'
};
// % of viewport, allow for some discard  x offset too
const absoluteDiscardStartOffset = 750;
const animationDurationSec = 0.35;
const svgns = "http://www.w3.org/2000/svg";

const clearChildrenOfAppropriateElement = (drawType) => {
  let el = null;
  switch (drawType) {
    case DrawType.TopDummy:
    case DrawType.TopSimple:
      el = document.getElementById("drawTop");
      break;
    case DrawType.RightDummy:
    case DrawType.RightSimple:
      el = document.getElementById("drawRight");
      break;
    case DrawType.BottomFan:
    case DrawType.BottomDummy:
      el = document.getElementById("drawBottom");
      break;
    case DrawType.LeftDummy:
    case DrawType.LeftSimple:
      el = document.getElementById("drawLeft");
      break;
    case DrawType.DiscardStartTop:
    case DrawType.DiscardStartRight:
    case DrawType.DiscardStartBottom:
    case DrawType.DiscardStartLeft:
    case DrawType.TrickWonTop:
    case DrawType.TrickWonRight:
    case DrawType.TrickWonBottom:
    case DrawType.TrickWonLeft:
      el = document.getElementById("drawDiscard");
      break;
  }

  //console.log(el);
  // clear any items in group about to be appended to
  // will include all descendents
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
};

const createAppropriateTransformString = (drawType, i, cardId, dummyLayoutState, arrCardIds) => {
  let transformString = "";
  let dummyLayoutState2 = null;
  let myGroupRoot = null;
  switch (drawType) {
    case DrawType.TopDummy:
      myGroupRoot = document.getElementById("drawTop");
      [transformString, dummyLayoutState2] = transforms.topDummyTransform(i, cardId, dummyLayoutState, arrCardIds);
      break;
    case DrawType.TopSimple:
      myGroupRoot = document.getElementById("drawTop");
      [transformString, dummyLayoutState2] = transforms.topSimpleTransform(i, cardId, dummyLayoutState, arrCardIds);
      break;
    case DrawType.RightDummy:
      myGroupRoot = document.getElementById("drawRight");
      [transformString, dummyLayoutState2] = transforms.rightDummyTransform(i, cardId, dummyLayoutState, arrCardIds);
      break;
    case DrawType.RightSimple:
      myGroupRoot = document.getElementById("drawRight");
      [transformString, dummyLayoutState2] = transforms.rightSimpleTransform(i, cardId, dummyLayoutState, arrCardIds);
      break;
    case DrawType.LeftDummy:
      myGroupRoot = document.getElementById("drawLeft");
      [transformString, dummyLayoutState2] = transforms.leftDummyTransform(i, cardId, dummyLayoutState, arrCardIds);
      break;
    case DrawType.LeftSimple:
      myGroupRoot = document.getElementById("drawLeft");
      [transformString, dummyLayoutState2] = transforms.leftSimpleTransform(i, cardId, dummyLayoutState, arrCardIds);
      break;
    case DrawType.BottomFan:
      myGroupRoot = document.getElementById("drawBottom");
      [transformString, dummyLayoutState2] = transforms.bottomFanTransform(i, cardId, dummyLayoutState, arrCardIds);
      break;
    case DrawType.BottomDummy:
      myGroupRoot = document.getElementById("drawBottom");
      [transformString, dummyLayoutState2] = transforms.bottomDummyTransform(i, cardId, dummyLayoutState, arrCardIds);
      break;
    case DrawType.DiscardStartTop:
    case DrawType.TrickWonTop:
      myGroupRoot = document.getElementById("drawDiscard");
      [transformString, dummyLayoutState2] = transforms.discardStartTopTransform(i, cardId, dummyLayoutState, arrCardIds);
      break;
    case DrawType.DiscardStartRight:
    case DrawType.TrickWonRight:
      myGroupRoot = document.getElementById("drawDiscard");
      [transformString, dummyLayoutState2] = transforms.discardStartRightTransform(i, cardId, dummyLayoutState, arrCardIds);
      break;
    case DrawType.DiscardStartBottom:
    case DrawType.TrickWonBottom:
      myGroupRoot = document.getElementById("drawDiscard");
      [transformString, dummyLayoutState2] = transforms.discardStartBottomTransform(i, cardId, dummyLayoutState, arrCardIds);
      break;
    case DrawType.DiscardStartLeft:
    case DrawType.TrickWonLeft:
      myGroupRoot = document.getElementById("drawDiscard");
      [transformString, dummyLayoutState2] = transforms.discardStartLeftTransform(i, cardId, dummyLayoutState, arrCardIds);
      break;
  }
  return [transformString, dummyLayoutState2, myGroupRoot];
};

const createDiscardAnimation = (pointAsString) => {
  // backstory https://bugs.chromium.org/p/chromium/issues/detail?id=13585
  // MUST use NS variant here so that camel case name is honoured
  const myAnimation = document.createElementNS(svgns, "animateTransform");
  myAnimation.setAttribute("id", "animateDiscard");
  myAnimation.setAttribute("attributeName", "transform");
  myAnimation.setAttribute("type", "translate");
  myAnimation.setAttribute("from", pointAsString);
  myAnimation.setAttribute("to", "0, 0");
  myAnimation.setAttribute("dur", `${animationDurationSec}s`);
  myAnimation.setAttribute("fill", "freeze");
  return myAnimation;
};

const configureDiscardAnimation = (lastDiscardPosition) => {
  let myAnimation = null;
  switch (lastDiscardPosition) {
    // top
    case 0:
      myAnimation = createDiscardAnimation(`0, ${-absoluteDiscardStartOffset}`);
      break;
    // right
    case 1:
      myAnimation = createDiscardAnimation(`${absoluteDiscardStartOffset}, 0`);
      break;
    // bottom
    case 2:
      myAnimation = createDiscardAnimation(`0, ${absoluteDiscardStartOffset}`);
      break;
    // left
    case 3:
      myAnimation = createDiscardAnimation(`${-absoluteDiscardStartOffset}, 0`);
      break;
  }
  return myAnimation;
};

const createTrickWonAnimation = (pointAsString) => {
  // backstory https://bugs.chromium.org/p/chromium/issues/detail?id=13585
  // MUST use NS variant here so that camel case name is honoured
  const myAnimation = document.createElementNS(svgns, "animateTransform");
  myAnimation.setAttribute("id", "animateTrickWon");
  myAnimation.setAttribute("attributeName", "transform");
  myAnimation.setAttribute("type", "translate");
  myAnimation.setAttribute("from", "0, 0");
  myAnimation.setAttribute("to", pointAsString);
  myAnimation.setAttribute("dur", `${animationDurationSec}s`);
  myAnimation.setAttribute("fill", "freeze");
  return myAnimation;
};


const configureTrickWonAnimation = (drawType) => {
  let myAnimation = null;
  switch (drawType) {
    case DrawType.TrickWonTop:
      myAnimation = createTrickWonAnimation(`0, ${-absoluteDiscardStartOffset}`);
      break;
    case DrawType.TrickWonRight:
      myAnimation = createTrickWonAnimation(`${absoluteDiscardStartOffset}, 0`);
      break;
    case DrawType.TrickWonBottom:
      myAnimation = createTrickWonAnimation(`0, ${absoluteDiscardStartOffset}`);
      break;
    case DrawType.TrickWonLeft:
      myAnimation = createTrickWonAnimation(`${-absoluteDiscardStartOffset}, 0`);
      break;
  }
  return myAnimation;
};

const drawArrayOfCards = (arrCardIds, drawType, isReverseSide) => {
  // validate input params

  // for dummy hands, keep track of card layout x and y
  let dummyLayoutState = {
    countOfTranslateY: 0,
    countOfTranslateX: 0
  }

  clearChildrenOfAppropriateElement(drawType);

  for (let i = 0; i < arrCardIds.length; i++) {
    const cardId = arrCardIds[i];
    const cardAsSvgString = isReverseSide ? assets.svgReverse[1] : assets.svgPack[cardId];
    // SO 24107288 create a DOM node from text
    let parser = new DOMParser();
    let doc = parser.parseFromString(cardAsSvgString, "image/svg+xml");
    let el = doc.documentElement;
    // identify the card using its position in the array
    el.setAttribute("id", "card" + cardId);
    // attach listener to root element of svg image only if needed
    if (drawType != DrawType.TopSimple &&
      drawType != DrawType.RightSimple &&
      drawType != DrawType.LeftSimple) {
      el.setAttribute("onclick", "cardClick(evt)");
    }
    // create the appropriate transform string and update dummyLayoutState
    let transformString = "";
    let myGroupRoot = null;
    [transformString, dummyLayoutState, myGroupRoot] =
      createAppropriateTransformString(drawType, i, cardId, dummyLayoutState, arrCardIds);
    // create a group parent gP to allow transforms of the entire svg 
    const gP = document.createElementNS(svgns, "g");
    gP.setAttribute("id", "gP" + cardId);
    // create a group grandparent to allow for animateTransform 
    const gGP = document.createElementNS(svgns, "g");
    gGP.setAttribute("id", "gGP" + cardId);
    // add the grandparent group to the location group
    myGroupRoot.appendChild(gGP);
    // add the parent group to the grandparent group
    gGP.appendChild(gP);
    // add the svg tag to its parent group
    gP.appendChild(el);
    // finally apply the transform on the parent group
    gP.setAttribute("transform", transformString);
    // animate last discard only
    if (i == arrCardIds.length - 1 && drawType < 4) {
      const gGP = document.getElementById("gGP" + cardId);
      const lastDiscardPosition = (drawType + i) % 4;
      const myAnimation = configureDiscardAnimation(lastDiscardPosition);
      gGP.appendChild(myAnimation);
    }
    // animate discard of trick won
    if (i == arrCardIds.length - 1 && drawType >= 4 && drawType < 8) {
      //const gGP = document.getElementById("gGP" + cardId);
      const gGP = document.getElementById("drawDiscard");
      const myAnimation = configureTrickWonAnimation(drawType);
      gGP.appendChild(myAnimation);
    }
  }
};

//create some higher level abstractions
const drawTable = (arrarrCardIdsByPosition, drawtype, dummyposition) => {
  dummyposition === DummyPosition.Top ?
    drawArrayOfCards(arrarrCardIdsByPosition[0], DrawType.TopDummy, isObverse) :
    drawArrayOfCards(arrarrCardIdsByPosition[0], DrawType.TopSimple, !isObverse);
  dummyposition === DummyPosition.Right ?
    drawArrayOfCards(arrarrCardIdsByPosition[1], DrawType.RightDummy, isObverse) :
    drawArrayOfCards(arrarrCardIdsByPosition[1], DrawType.RightSimple, !isObverse);
  dummyposition === DummyPosition.Bottom ?
    drawArrayOfCards(arrarrCardIdsByPosition[2], DrawType.BottomDummy, isObverse) :
    drawArrayOfCards(arrarrCardIdsByPosition[2], DrawType.BottomFan, isObverse);
  dummyposition === DummyPosition.Left ?
    drawArrayOfCards(arrarrCardIdsByPosition[3], DrawType.LeftDummy, isObverse) :
    drawArrayOfCards(arrarrCardIdsByPosition[3], DrawType.LeftSimple, !isObverse);
  drawArrayOfCards(arrarrCardIdsByPosition[4], drawtype, isObverse);
};

const drawTableEmpty = () => {
  drawTable([[], [], [], [], []], DrawType.DiscardStartBottom, DummyPosition.Hidden)
};

// CommonJS - nodejs only
//exports.svgAsString = svgAsString;
// ES6 - browser and nodejs
export {
  drawArrayOfCards,
  isObverse,
  drawTable,
  drawTableEmpty,
  DummyPosition
};