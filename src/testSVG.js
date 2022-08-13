'use strict';
// CommonJS - nodejs only!
const eventHandler = require('./SideEffectsJs/eventhandler');
const { drawTable, drawTableEmpty, DummyPosition } = require('./SideEffectsJS/svgdraw');
const { DrawType } = require('./SideEffectsJs/transforms');

// module constants
const startTime = Date.now();
// to test the drawArrayOfCards function, we need 4 hands of 12 and 1 discard of 4
const arrCardIdsTop = [39, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const arrCardIdsRight = [0, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
const arrCardIdsBottom = [13, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37];
const arrCardIdsLeft = [26, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50];
const arrCardIdsDiscard = [12, 25, 38, 51];
// we can abstract to an array of arrays
const arrarrCardIdsByPosition =
  [
    arrCardIdsTop,
    arrCardIdsRight,
    arrCardIdsBottom,
    arrCardIdsLeft,
    arrCardIdsDiscard
  ];

//console.log(Date.now() - startTime);
//console.time("drawing");
//drawArrayOfCards(arrarrCardIdsByPosition[0], DrawType.TopDummy, isObverse);
//drawArrayOfCards(arrarrCardIdsByPosition[0], DrawType.TopSimple, !isObverse);
//drawArrayOfCards(arrarrCardIdsByPosition[1], DrawType.RightDummy, isObverse);
//drawArrayOfCards(arrarrCardIdsByPosition[1], DrawType.RightSimple, !isObverse);
//drawArrayOfCards(arrarrCardIdsByPosition[2], DrawType.BottomFan, isObverse);
//drawArrayOfCards(arrarrCardIdsByPosition[2], DrawType.BottomDummy, isObverse);
//drawArrayOfCards(arrarrCardIdsByPosition[3], DrawType.LeftDummy, isObverse);
//drawArrayOfCards(arrarrCardIdsByPosition[3], DrawType.LeftSimple, !isObverse);
//drawArrayOfCards(arrarrCardIdsByPosition[4], DrawType.TrickWonTop, isObverse);
//drawArrayOfCards(arrarrCardIdsByPosition[4], DrawType.TrickWonRight, isObverse);
//drawArrayOfCards(arrarrCardIdsByPosition[4], DrawType.TrickWonBottom, isObverse);
//drawArrayOfCards(arrarrCardIdsByPosition[4], DrawType.TrickWonLeft, isObverse);
//drawArrayOfCards(arrarrCardIdsByPosition[4], DrawType.DiscardStartTop, isObverse);
//drawArrayOfCards(arrarrCardIdsByPosition[4], DrawType.DiscardStartRight, isObverse);
//drawArrayOfCards(arrarrCardIdsByPosition[4], DrawType.DiscardStartBottom, isObverse);
//drawArrayOfCards(arrarrCardIdsByPosition[4], DrawType.DiscardStartRight, isObverse);
//console.log(Date.now() - startTime);
//drawTable(arrarrCardIdsByPosition, DrawType.DiscardStartBottom, DummyPosition.Hidden);
//setTimeout(drawTableEmpty, 2000);
//drawTable(arrarrCardIdsByPosition, DrawType.DiscardStartBottom, DummyPosition.Top);
//setTimeout(drawTableEmpty, 2000);
//console.timeEnd("drawing")

// TEST ME
const checkSvgDraw = () => {
  drawTable(arrarrCardIdsByPosition, DrawType.DiscardStartBottom, DummyPosition.Hidden);
}

export {
  checkSvgDraw
};

