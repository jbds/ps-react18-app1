'use strict';

// module constants
const cardScaleFan = 1.85;
const cardWidthUnscaledVpx = 216;
const cardHeightUnscaledVpx = 336;
const cardScaleSimple = 0.19;
const cardScaleDummy = 0.58;
const cardHeightOverlapFraction = 0.82;
const xTranslateScaleFactor = 1.1;

// these two keep track of Dummy layout
// Y is no of cards in a lane
// X is lane no
let maxCountOfTranslateYDummy = 0;
let matchingCountOfTranslateXDummy = 0;

// enumerate discard start first as value is later used in modulo logic
// other values are irrelevant as long as unique
const DrawType = {
  DiscardStartTop: 0,
  DiscardStartRight: 1,
  DiscardStartBottom: 2,
  DiscardStartLeft: 3,
  TrickWonTop: 4,
  TrickWonRight: 5,
  TrickWonBottom: 6,
  TrickWonLeft: 7,
  TopSimple: 8,
  TopDummy: 9,
  RightSimple: 10,
  RightDummy: 11,
  BottomFan: 12,
  LeftSimple: 13,
  LeftDummy: 14,
  BottomDummy: 15
};


const topSimpleTransform = (index, cardId, dummyLayoutState, arrCardIds) => {
  const cardWidthVpx = cardScaleSimple * cardWidthUnscaledVpx;
  const transformString = `
    translate(500, 0),
    translate(${cardWidthVpx * (index - (arrCardIds.length / 2.0))}, ${0}), scale(${cardScaleSimple})`;
  return [transformString, dummyLayoutState];
}

const topDummyTransform = (index, cardId, dummyLayoutState, arrCardIds) => {
  const cardWidthVpx = cardScaleDummy * cardWidthUnscaledVpx;
  const cardHeightVpx = cardScaleDummy * cardHeightUnscaledVpx
  // dummy layout behaviour depends on previous states too
  const previousCardId = index > 0 ? arrCardIds[index - 1] : null;
  if (index > 0) {
    // check if suit has changed. (Assumes array of cards is grouped in suits)
    const cardFloorValue = Math.floor(cardId / 13);
    const previousCardFloorValue = Math.floor(previousCardId / 13);
    if (cardFloorValue != previousCardFloorValue) {
      // increment X
      dummyLayoutState.countOfTranslateX += 1;
      // reset Y
      dummyLayoutState.countOfTranslateY = 0;
    }
  }
  const transformString = `
    translate(${(1000 - ((4 * cardWidthVpx) + (3 * cardWidthVpx * (xTranslateScaleFactor - 1)))) / 2}, 0),
    translate(${cardWidthVpx * dummyLayoutState.countOfTranslateX * xTranslateScaleFactor}, ${cardHeightVpx * (1 - cardHeightOverlapFraction) * dummyLayoutState.countOfTranslateY}),
    scale(${cardScaleDummy})`;
  // increment Y and keep track of max
  dummyLayoutState.countOfTranslateY += 1
  if (dummyLayoutState.countOfTranslateY > maxCountOfTranslateYDummy) {
    maxCountOfTranslateYDummy = dummyLayoutState.countOfTranslateY;
    matchingCountOfTranslateXDummy = dummyLayoutState.countOfTranslateX;
  }
  return [transformString, dummyLayoutState];
}

const rightSimpleTransform = (index, cardId, dummyLayoutState, arrCardIds) => {
  const cardWidthVpx = cardScaleSimple * cardWidthUnscaledVpx;
  const transformString = `
    translate(1000, 500),
    rotate(90),
    translate(${cardWidthVpx * (index - (arrCardIds.length / 2.0))}, ${0}), scale(${cardScaleSimple})`;
  return [transformString, dummyLayoutState];
}

const rightDummyTransform = (index, cardId, dummyLayoutState, arrCardIds) => {
  const cardWidthVpx = cardScaleDummy * cardWidthUnscaledVpx;
  const cardHeightVpx = cardScaleDummy * cardHeightUnscaledVpx
  // dummy layout behaviour depends on previous states too
  const previousCardId = index > 0 ? arrCardIds[index - 1] : null;
  if (index > 0) {
    // check if suit has changed. (Assumes array of cards is grouped in suits)
    const cardFloorValue = Math.floor(cardId / 13);
    const previousCardFloorValue = Math.floor(previousCardId / 13);
    if (cardFloorValue != previousCardFloorValue) {
      // increment X
      dummyLayoutState.countOfTranslateX += 1;
      // reset Y
      dummyLayoutState.countOfTranslateY = 0;
    }
  }
  const transformString = `
    rotate(90, 0, 0),
    translate(0,-1000),
    translate(${(1000 - ((4 * cardWidthVpx) + (3 * cardWidthVpx * (xTranslateScaleFactor - 1)))) / 2}, 0),
    translate(${cardWidthVpx * dummyLayoutState.countOfTranslateX * xTranslateScaleFactor}, ${cardHeightVpx * (1 - cardHeightOverlapFraction) * dummyLayoutState.countOfTranslateY}),
    scale(${cardScaleDummy})`;
  // increment Y and keep track of max
  dummyLayoutState.countOfTranslateY += 1
  if (dummyLayoutState.countOfTranslateY > maxCountOfTranslateYDummy) {
    maxCountOfTranslateYDummy = dummyLayoutState.countOfTranslateY;
    matchingCountOfTranslateXDummy = dummyLayoutState.countOfTranslateX;
  }
  return [transformString, dummyLayoutState];
}

const bottomFanTransform = (index, cardId, dummyLayoutState, arrCardIds) => {
  const cardWidthVpx = cardScaleFan * cardWidthUnscaledVpx;
  const cardHeightVpx = cardScaleFan * cardHeightUnscaledVpx;
  const rotationOrigin = 4 * cardHeightVpx
  const cardRotationDegrees = 1.8;
  const cardRotationOffsetAdj = -1;
  const cardTranslationXAdj = -77;
  const transformString = `
    translate(${500 + cardTranslationXAdj}, ${1000 - (115 * cardScaleFan)}), 
    translate(${cardWidthVpx / 4.0}, ${rotationOrigin}), 
    rotate(${cardRotationDegrees * (index - ((arrCardIds.length / 2.0) + cardRotationOffsetAdj))}), 
    translate(${-cardWidthVpx / 4.0}, ${-rotationOrigin}), scale(${cardScaleFan})`;
  return [transformString, dummyLayoutState];
}

const bottomDummyTransform = (index, cardId, dummyLayoutState, arrCardIds) => {
  const cardWidthVpx = cardScaleDummy * cardWidthUnscaledVpx;
  const cardHeightVpx = cardScaleDummy * cardHeightUnscaledVpx
  // dummy layout behaviour depends on previous states too
  const previousCardId = index > 0 ? arrCardIds[index - 1] : null;
  if (index > 0) {
    // check if suit has changed. (Assumes array of cards is grouped in suits)
    const cardFloorValue = Math.floor(cardId / 13);
    const previousCardFloorValue = Math.floor(previousCardId / 13);
    if (cardFloorValue != previousCardFloorValue) {
      // increment X
      dummyLayoutState.countOfTranslateX += 1;
      // reset Y
      dummyLayoutState.countOfTranslateY = 0;
    }
  }
  const transformString = `
    rotate(180,0,0),
    translate(-1000, -1000),
    translate(${(1000 - ((4 * cardWidthVpx) + (3 * cardWidthVpx * (xTranslateScaleFactor - 1)))) / 2}, 0),
    translate(${cardWidthVpx * dummyLayoutState.countOfTranslateX * xTranslateScaleFactor}, ${cardHeightVpx * (1 - cardHeightOverlapFraction) * dummyLayoutState.countOfTranslateY}),
    scale(${cardScaleDummy})`;
  // increment Y and keep track of max
  dummyLayoutState.countOfTranslateY += 1
  if (dummyLayoutState.countOfTranslateY > maxCountOfTranslateYDummy) {
    maxCountOfTranslateYDummy = dummyLayoutState.countOfTranslateY;
    matchingCountOfTranslateXDummy = dummyLayoutState.countOfTranslateX;
  }
  return [transformString, dummyLayoutState];
}



const leftSimpleTransform = (index, cardId, dummyLayoutState, arrCardIds) => {
  const cardWidthVpx = cardScaleSimple * cardWidthUnscaledVpx;
  const transformString = `
    translate(0, 500),
    rotate(-90),
    translate(${cardWidthVpx * (index - (arrCardIds.length / 2.0))}, ${0}), scale(${cardScaleSimple})`;
  return [transformString, dummyLayoutState];
}

const leftDummyTransform = (index, cardId, dummyLayoutState, arrCardIds) => {
  const cardWidthVpx = cardScaleDummy * cardWidthUnscaledVpx;
  const cardHeightVpx = cardScaleDummy * cardHeightUnscaledVpx
  // dummy layout behaviour depends on previous states too
  const previousCardId = index > 0 ? arrCardIds[index - 1] : null;
  if (index > 0) {
    // check if suit has changed. (Assumes array of cards is grouped in suits)
    const cardFloorValue = Math.floor(cardId / 13);
    const previousCardFloorValue = Math.floor(previousCardId / 13);
    if (cardFloorValue != previousCardFloorValue) {
      // increment X
      dummyLayoutState.countOfTranslateX += 1;
      // reset Y
      dummyLayoutState.countOfTranslateY = 0;
    }
  }
  const transformString = `
    rotate(-90, 0, 0),
    translate(-500,0),
    translate(${-(1000 - ((4 * cardWidthVpx) + (3 * cardWidthVpx * (xTranslateScaleFactor - 1)))) / 2}, 0),
    translate(${cardWidthVpx * dummyLayoutState.countOfTranslateX * xTranslateScaleFactor}, ${cardHeightVpx * (1 - cardHeightOverlapFraction) * dummyLayoutState.countOfTranslateY}),
    scale(${cardScaleDummy})`;
  // increment Y and keep track of max
  dummyLayoutState.countOfTranslateY += 1
  if (dummyLayoutState.countOfTranslateY > maxCountOfTranslateYDummy) {
    maxCountOfTranslateYDummy = dummyLayoutState.countOfTranslateY;
    matchingCountOfTranslateXDummy = dummyLayoutState.countOfTranslateX;
  }
  return [transformString, dummyLayoutState];
}

const discardTransform = (index, drawType) => {
  let adjustedIndex = 0;
  switch (drawType) {
    case DrawType.DiscardStartTop:
      adjustedIndex = index;
      break;
    case DrawType.DiscardStartRight:
      adjustedIndex = (index + 1) % 4;
      break;
    case DrawType.DiscardStartBottom:
      adjustedIndex = (index + 2) % 4;
      break;
    case DrawType.DiscardStartLeft:
      adjustedIndex = (index + 3) % 4;
      break;
  }
  // use same size as topDummy
  const cardWidthVpx = cardScaleDummy * cardWidthUnscaledVpx;
  const cardHeightVpx = cardScaleDummy * cardHeightUnscaledVpx;
  // check if discard pile needs to avoid dummy cards
  let transformDelta = "translate(0, 0)";
  if (maxCountOfTranslateYDummy > 5 && matchingCountOfTranslateXDummy == 1) {
    transformDelta = `translate(${cardWidthVpx}, 0)`;
  }
  if (maxCountOfTranslateYDummy > 5 && matchingCountOfTranslateXDummy == 2) {
    transformDelta = `translate(${-cardWidthVpx}, 0)`;
  }
  let transformIndex = "";
  switch (adjustedIndex) {
    case 0:
      // top
      transformIndex = `translate(0, ${-cardHeightVpx / 3.5})`;
      break;
    case 1:
      // right
      transformIndex = `translate(${cardWidthVpx / 2.5}, 0)`;
      break;
    case 2:
      // bottom
      transformIndex = `translate(0, ${cardHeightVpx / 3.5})`;
      break;
    case 3:
      // left
      transformIndex = `translate(${-cardWidthVpx / 2.5}, 0)`;
      break;
  }
  const transformString = `
      ${transformDelta},
      ${transformIndex},
      translate(${500 - (cardWidthVpx / 2)}, ${2.35 * cardHeightVpx}),
      scale(${cardScaleDummy})
    `;
  return transformString;
};

const discardStartTopTransform = (index, cardId, dummyLayoutState, arrCardIds) => {
  const transformString = discardTransform(index, DrawType.DiscardStartTop)
  return [transformString, dummyLayoutState];
}

const discardStartRightTransform = (index, cardId, dummyLayoutState, arrCardIds) => {
  const transformString = discardTransform(index, DrawType.DiscardStartRight)
  return [transformString, dummyLayoutState];
}

const discardStartBottomTransform = (index, cardId, dummyLayoutState, arrCardIds) => {
  const transformString = discardTransform(index, DrawType.DiscardStartBottom)
  return [transformString, dummyLayoutState];
}

const discardStartLeftTransform = (index, cardId, dummyLayoutState, arrCardIds) => {
  const transformString = discardTransform(index, DrawType.DiscardStartLeft)
  return [transformString, dummyLayoutState];
}




// CommonJS - nodejs only
//exports.bottomFanTransform = bottomFanTransform;
// ES6 - browser and nodejs
export {
  DrawType,
  topSimpleTransform,
  topDummyTransform,
  rightSimpleTransform,
  rightDummyTransform,
  bottomFanTransform,
  bottomDummyTransform,
  leftSimpleTransform,
  leftDummyTransform,
  //discardTransform,
  discardStartTopTransform,
  discardStartRightTransform,
  discardStartBottomTransform,
  discardStartLeftTransform
};