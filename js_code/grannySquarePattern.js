import Stitch from "./stitchClass.js";

/** creates an array of stitches as used in a granny square pattern
 * takes the number of rounds desired
 * returns the array of stitch items
 * @param {Number} rounds 
 * @returns {Array}
 */
function grannySquare(rounds) {

    // compile stitches in order, including stitches they're connected to

    let pattern = [];
    let connectorChainCounter = 0; // how many connector stitches do we have for each side
    let stitchCounter = 0; // counts stitches as we add them

    // to keep track of which stitches other stitches connect to from prev round/etc
    let connectorCounter = 1; // counts connector stitches // TODO
    let prevConnectors = []; // prev round's connectors
    let connectors = []; // collect all connectors for current round

    for (let round=0; round<rounds; round++) {
        if (round == 0) { // first round is 4 chains
            for (let i=0; i<4; i++) { 
                // all first round stitches are connectors for later
                pattern.push(new Stitch("chain", stitchCounter, true));
                connectors.push(stitchCounter);
                stitchCounter++;
            }
        } else { // every subsequent round
            // connect/prep round
            pattern.push(new Stitch("slip stitch", stitchCounter));

            // we want to skip the first connector item and then we substract 1 -> start on 2
            if (round > 1) { 
                connectorCounter = 2;
            }

            pattern.at(-1).addConnectsTo(pattern[prevConnectors[connectorCounter-1]]);
            stitchCounter++;

            // 3 chains to replace the first double
            for (let i=0; i<3; i++) {
                if (i<2) {
                    pattern.push(new Stitch("chain", stitchCounter));
                } else { // the third chain is a connector for later
                    pattern.push(new Stitch("chain", stitchCounter, true));
                    connectors.push(stitchCounter);
                }
                stitchCounter++;
            }

            // for each side
            for (let side=0; side<4; side++) {
                // add corner chains
                for (let i=0; i<2; i++) {
                    // all corners are connectors for later
                    pattern.push(new Stitch("chain", stitchCounter, true));
                    connectors.push(stitchCounter);
                    stitchCounter++;
                }

                // add doubles

                // extras if any
                for (let i=0; i<connectorChainCounter; i++) {
                    for (let c=0; c<3; c++) {
                        pattern.push(new Stitch("double", stitchCounter));
                        pattern.at(-1).addConnectsTo(pattern[prevConnectors[connectorCounter-1]]);
                        stitchCounter++;
                        
                    }
                    connectorCounter++;
                    // add connector chain
                    pattern.push(new Stitch("chain", stitchCounter, true));
                    connectors.push(stitchCounter);
                    stitchCounter++;
                }

                // last one of side
                if (side == 3) { // last side only needs 2
                    for (let i=0; i<2; i++) {
                        pattern.push(new Stitch("double", stitchCounter));
                        pattern.at(-1).addConnectsTo(pattern[prevConnectors[connectorCounter-1]]);
                        stitchCounter++;
                    }
                } else { // any other side gets 3
                    for (let i=0; i<3; i++) {
                        pattern.push(new Stitch("double", stitchCounter));
                        pattern.at(-1).addConnectsTo(pattern[prevConnectors[connectorCounter-1]]);
                        stitchCounter++;
                    }
                }
                connectorCounter++;
            }

            // increment counter of how many connector chains we have for next round
            connectorChainCounter++;

            // connect
            pattern.push(new Stitch("slip stitch", stitchCounter));
            if (round == 1) {
                pattern.at(-1).addConnectsTo(pattern[connectors[0]]);
            } else {
                pattern.at(-1).addConnectsTo(pattern[connectors[0]]);
            }
            stitchCounter++;
        }
        // reset/swap for next round
        prevConnectors = connectors;
        connectors = [];
    }

    // assign previous & next stitches to make it into a linked list

    let prevItem = null;
    for (let i=0;i<pattern.length;i++) {
        let currItem = pattern[i]
        pattern.at(i).addPreviousStitch(prevItem);
        if (i>0) {
            pattern.at(i-1).addNextStitch(currItem);
        }
        prevItem = currItem;
    }

    // return finished pattern
    return pattern;
}

console.log(grannySquare(2))


// TODO: 
// - figure out how to write js tests to have a proper test suite for this
    // so far only tested for python version & checked js' output via console
// - add Stitch class items ✅
    // - add which stitches are connectors ✅
    // - add which stitches are connected to what ✅
    // - add prev & next stitches ✅