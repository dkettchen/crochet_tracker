/**
 * creates a list of stitches as used in a granny square pattern
 * takes the number of rounds desired
 * returns the list of stitch names
 * @param {Number} rounds 
 * @returns {Array}
 */
function grannySquare(rounds) {

    let pattern = [];
    let connectorCounter = 0;

    for (let round=0; round<rounds; round++) {
        if (round == 0) { // first round is 4 chains
            for (let i=0; i<4; i++) {
                pattern.push("chain");
            }
        } else { // every subsequent round
            // connect/prep round
            pattern.push("slip stitch");

            // 3 chains to replace the first double
            for (let i=0; i<3; i++) {
                pattern.push("chain");
            }

            // for each side
            for (let side=0; side<4; side++) {
                // add corner chains
                for (let i=0; i<2; i++) {
                    pattern.push("chain");
                }

                // add doubles

                // extras if any
                for (let i=0; i<connectorCounter; i++) {
                    for (let c=0; c<3; c++) {
                        pattern.push("double");
                    }
                    pattern.push("chain");
                }

                // last one of side
                if (side == 3) { // last side only needs 2
                    for (let i=0; i<2; i++) {
                        pattern.push("double");
                    }
                } else { // any other side gets 3
                    for (let i=0; i<3; i++) {
                        pattern.push("double");
                    }
                }

            }

            // increment counter of how many connector chains we have for next round
            connectorCounter++;

            // connect
            pattern.push("slip stitch");
        }
    }

    // return finished pattern
    return pattern;
}

// console.log(grannySquare(2))


// TODO: 
// - figure out how to write js tests to have a proper test suite for this
    // so far only tested for python version & checked js' output via console