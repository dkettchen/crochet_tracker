import { FALL, OCEAN, RAINBOW } from "./colourPalettes.js";
import { transform } from "./vectorUtils.js";

/** generates an svg Granny Square crochet pattern of the given amount of rounds 
 * (minimum 2 incl. starting circle)
 * 
 * @param {int} rounds 
 * @returns string with svg formatted text (that could be inserted into HTML or saved as a .svg file)
 */
export function makeGrannySquareVector(rounds) {
    // TODO
    // - refactor to work based on stitches passed ? 
        //or refactor to unify with generation func itself??
    // -> how do we make it so we can animated through the stitches/ 
    // is that somethign we still want to do or are we just generating fun patterns x'D

    // TODO 
    // - add a legend of what the symbols mean & a title in text
        // - add to spacing accordingly
    // - refactor round 2 into the big loop as well somehow?

    // auto sizing based on how many rounds were requested
    let size = (rounds-1)*100;
    if (size < 320) { // minimum size
        size+=rounds*15; // make slightly bigger
    }
    const CENTERX = size;
    const CENTERY = CENTERX;

    // set stroke & colours for each round
    let strokeWidth = 3;
    let colours = RAINBOW;
    if (rounds > colours.length) { // repeat colours if more rounds were requested
        while (colours.length < rounds) {
            colours.push(...colours)
        }
    }

    let svg = ``;
    let closingTag = `</g>`

    // opening svg
    svg += `<svg width="auto" height="auto" `
    + `viewBox="0 0 ${CENTERX*2} ${CENTERY*2}" `
    + `preserveAspectRatio="xMidYMid meet" `
    + `xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">`
    ;
    // opening pattern
    svg += `<g id="granny_square_pattern" stroke-width="${strokeWidth}">`;

    // title for pattern
    svg += `<title>Basic Granny Square</title>`;


    // (round 1)
    svg += `<g id="round_1" stroke="${colours[0]}" fill="${colours[0]}">`;

    // 4 first stitches
    svg += `<ellipse id="chain" ry="5" rx="15" cx="${CENTERX}" cy="${CENTERY-28}" fill="none"/>`;
    svg += transform(`<use href="#chain"/>`, {"rotate":[30 + 80, CENTERX, CENTERY]})
    svg += transform(`<use href="#chain"/>`, {"rotate":[30 + 80 + 80, CENTERX, CENTERY]})
    svg += transform(`<use href="#chain"/>`, {"rotate":[-80, CENTERX, CENTERY]})

    svg += closingTag;
    // (round 1)


    // (round 2)
    svg +=  `<g id="round_2" stroke="${colours[1]}" fill="${colours[1]}">`;

    // open 3 doubles
    svg += `<g id="3_doubles">`; // <!-- 3 doubles arranged in \|/ orientation -->

    let directions = ["left", "middle", "right"];
    for (let i=0;i<3;i++){
        // open this double
        svg += `<g id="double_${directions[i]}">`;

        // main line
        svg += `<line id="double_long_${i+1}" x1="${CENTERX-15+15*i}" y1="${CENTERY-43}" x2="${CENTERX-45+45*i}" y2="${CENTERY-118}"/>`;
        
        // dashes
        svg += transform(`<line id="double_cross_line_${i+1}" x1="${CENTERX-60}" y1="${CENTERY-118}" x2="${CENTERX-30}" y2="${CENTERY-118}" />`,
            {"translate":[0+45*i, 0]}
        )
        svg += transform(`<use href="#double_cross_line_${i+1}" />`, 
            {
                "rotate": [10, CENTERX-88 -40+40*i, CENTERY-95 +35-35*i],
                "translate": [0, 10],
            }
        );

        // close this double
        svg += closingTag;
    }

    // close 3 doubles
    svg += closingTag;


    // open corner
    svg += transform(`<g id="2_chain_corner" >`,{"rotate": [45, CENTERX, CENTERY]});
    
    // 2 chains
    svg += transform(`<use href="#chain"/>`, 
        {
            "rotate": [-30, CENTERX, CENTERY],
            "translate": [55, -100]
        }
    );
    svg += transform(`<use href="#chain"/>`, 
        {
            "rotate": [30, CENTERX, CENTERY],
            "translate": [-55, -100],
        }
    );

    // close corner
    svg += closingTag;


    // open chain doubles // <!-- 3 doubles arranged in \|/ orientation -->
    svg += transform(`<g id="chain_doubles" >`,{"rotate": [90, CENTERX, CENTERY]});

    // make slip stitch dot
    svg += transform(`<ellipse id="slip_stitch" ry="3" rx="3" cx="${CENTERX + 75}" cy="${CENTERX + 15}" />`,
        {
            "rotate":[-90, CENTERX, CENTERY],
            "translate":[-50,-30],
        }
    );
    // open chain double left
    svg += transform(`<g id="chain_double_left">`,
        {
            "rotate":[65, CENTERX, CENTERY],
            "translate":[0, 25],
        }
    );
    // add 3 chains
    for (let i=0;i<3;i++){
        svg += transform(`<use href="#chain"/>`, {"translate":[-55-30*i, 10]});
    }
    // add slip stitch
    svg += transform(`<use href="#slip_stitch"/>`, {"translate":[-55-30*2, -5]});
    // close chain double left
    svg += closingTag;
    // add back in two other doubles
    svg += `<use href="#double_middle"/>`;
    svg += `<use href="#double_right"/>`;

    // close chain doubles
    svg += closingTag;

    // add corners & 3 doubles for each side
    svg += transform(`<use href="#2_chain_corner"/>`, {"rotate":[90, CENTERX, CENTERY]});
    svg += transform(`<use href="#3_doubles"/>`, {"rotate":[90*2, CENTERX, CENTERY]});
    svg += transform(`<use href="#2_chain_corner"/>`, {"rotate":[90*2, CENTERX, CENTERY]});
    svg += transform(`<use href="#3_doubles"/>`, {"rotate":[-90, CENTERX, CENTERY]});
    svg += transform(`<use href="#2_chain_corner"/>`, {"rotate":[-90, CENTERX, CENTERY]});

    svg += closingTag;
    // (round 2)

    // all other rounds
    let translate_count;
    for (let r=2;r<rounds;r++) {
        // (round 3 onwards)
        svg +=  `<g id="round_${r+1}" stroke="${colours[r]}" fill="${colours[r]}">`;

        if ((r-1)==1) {  // create the chain/3 doubles item the first time it appears
            // open 2 double sets
            svg += `<g id="2_double_sets">`;
            // use one 3 doubles
            svg += transform(`<use href="#3_doubles"/>`, {"translate":[-90*(r-1), -90*(r-1)]});
            // open chain item
            svg += `<g id="chain_3_doubles">`;
            // add chain & more doubles
            svg += transform(`<use href="#chain"/>`, {"translate":[0, -90*2]});
            svg += transform(`<use href="#3_doubles"/>`, {"translate":[90, -90]});
            // close chain item
            svg += closingTag;
            // close 2 double sets
            svg += closingTag;
        } else {
            // open 3 double sets
            svg +=  `<g id="${(r-1)+1}_double_sets">`;
            // add 3 doubles w chains in between
            svg += transform(`<use href="#3_doubles"/>`, {"translate":[-90*(r-1), -90*(r-1)]});
            translate_count = -90*((r-1)-1); // -90 and then -180
            for (let i=0;i<(r-1);i++) {
                svg += transform(`<use href="#chain_3_doubles"/>`, {
                    "translate":[translate_count + i*180, -90*((r-1)-1)]
                });
                // -90 to 90
                // -180 to 0 to 180
            }
        
            // close 3 double sets
            svg += closingTag;
        }

        // add corners & double sets for each side
        svg += transform(`<use href="#2_chain_corner"/>`,
            {
                "rotate":[0, CENTERX, CENTERY],
                "translate": [90*(r-1), -90*(r-1)]
            }
        );
    
        // chain replaced double
        svg += transform(`<use href="#chain_doubles"/>`, {"translate": [90*(r-1), -90*(r-1)]});
        translate_count = -90*((r-1)-1); // -90 and then -180
        for (let i=0;i<(r-1);i++) {
            svg += transform(`<use href="#chain_3_doubles"/>`, 
                {
                    "rotate": [90, CENTERX, CENTERY],
                    "translate": [translate_count + i*180, -90*((r-1)-1)]
                }
            );
            // -90,-90 to 90,-90
            // -180,-180 to 0,-180 to 180,-180
        }
    
        svg += transform(`<use href="#2_chain_corner"/>`,
            {
                "rotate":[90, CENTERX, CENTERY],
                "translate": [90*(r-1), -90*(r-1)]
            }
        );
        svg += transform(`<use href="#${(r-1)+1}_double_sets"/>`, {"rotate": [90*2, CENTERX, CENTERY]});
        svg += transform(`<use href="#2_chain_corner"/>`,
            {
                "rotate":[90*2, CENTERX, CENTERY],
                "translate": [90*(r-1), -90*(r-1)]
            }
        );
        svg += transform(`<use href="#${(r-1)+1}_double_sets"/>`, {"rotate": [-90, CENTERX, CENTERY]});
        svg += transform(`<use href="#2_chain_corner"/>`,
            {
                "rotate":[-90, CENTERX, CENTERY],
                "translate": [90*(r-1), -90*(r-1)]
            }
        );
    
        svg += closingTag;
        // (round 4 onwards)
    
    }

    // closing pattern
    svg += closingTag;
    // closing svg
    svg +=  `</svg>`

    return svg



}
