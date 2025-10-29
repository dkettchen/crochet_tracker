/** inserts passed transform info (if any) into the given tag
 * 
 * ex "<some_tag>", {"rotate": [90, 400, 400], "translate": [10, -10]}
 * -> <some_tag transform="rotate(90, 400, 400) translate(10 -10)">
 * 
 * if neither rotational nor translational info is contained in the passed object, 
 * it just returns the tag as is
 * 
 * @param {string} tag an opening (<tag>) or self-closing (<tag/>) svg tag
 * @param {object} transformObj an object with "rotate" and/or "translate" key(s) 
 * holding array values of [angle, x, y] for rotate and [x, y] for translate
 * @returns new tag
 */
export function transform(tag, transformObj) {
    
    let rotate=false;
    let translate=false;

    // check for contents
    if (Object.keys(transformObj).includes("rotate")) {
        rotate=true;
    }
    if (Object.keys(transformObj).includes("translate")) {
        translate=true;
    }

    // if neither was included, we don't need to add a transform bit at all
    if (rotate == false && translate == false) {
        return tag;
    }

    // compile transform item
    let transform = `transform="`; // start
    if (rotate) { // add rotation parameters if any
        transform += `rotate(${transformObj.rotate[0]}, ${transformObj.rotate[1]}, ${transformObj.rotate[2]})`
    }
    if (rotate && translate) { // add space if both
        transform += " ";
    }
    if (translate) { // add translation parameters if any
        transform += `translate(${transformObj.translate[0]} ${transformObj.translate[1]})`
    }
    transform += `"`; // close quotes

    // check if self-closing (<tag/>) or opening tag (<tag>)
    let selfClosing=false;
    if (tag.at(-2) == "/") {
        selfClosing=true;
    }

    // separate tag where we want to insert transform
    let newTag;
    let ending;
    if (selfClosing) {
        newTag = tag.slice(0,-2);
        ending = tag.slice(-2);
    } else {
        newTag = tag.slice(0,-1);
        ending = tag.at(-1);
    }

    // insert transform item
    newTag += " " + transform + ending

    return newTag

}
