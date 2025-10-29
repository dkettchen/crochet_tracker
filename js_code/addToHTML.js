import { makeGrannySquareVector } from "./grannySquare.js";

let svg = makeGrannySquareVector(7);

let item = document.getElementById("svg_placeholder");

item.innerHTML = svg;