import { grannySquare } from "./grannySquarePattern.js";
import { makeGrannySquareVector } from "./makeVectorGraphics.js";

let pattern = grannySquare(3);
let svg = makeGrannySquareVector(7);

let item = document.getElementById("svg_placeholder");

item.innerHTML = svg;