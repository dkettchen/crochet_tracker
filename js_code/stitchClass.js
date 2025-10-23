class Stitch {
    /** initialise a Stitch item
     * 
     * attributes:
     * - .type : chain | double | slip stitch
     * - .id : a unique identifier
     * - .connector : whether or not other stitches will connect to this one (default: false)
     * - .connectsTo : the (connector) stitch this stitch connects to if any (default: null)
     * - .prevStitch : the stitch that precedes this stitch in the pattern (default: null)
     * - .nextStitch : the stitch that succeeds this stitch in the pattern (default: null)
     * 
     * methods:
     * - .addPrevStitch : set the previous stitch (.prevStitch)
     * - .addNextStitch : set the next stitch (.nextStitch)
     * - .addConnectsTo : set the stitch this one connects to (.connectsTo)
     * 
     * @param {String} stitch 
     * @param {Number | String} id 
     * @param {Boolean} connector 
     * @param {String | Null} connectsTo 
     */
    constructor(stitch, id, connector=false, connectsTo=null) {
        if (["chain", "double", "slip stitch"].includes(stitch.toLowerCase())) {
            // must be one of the stitches we know
            this.type = stitch.toLowerCase();

            // a unique identifier
            this.id = id;

            // will other things be connected to this stitch? default: false
            this.connector = connector; 

            // does it connect to another stitch? if so, which one? default: null
            if (stitch == "chain") { // chains don't connect to another stitch
                this.connectsTo = null;
            } else { // defaults to null, otherwise refer to another stitch
                this.connectsTo = connectsTo;
            }

            this.prevStitch = null;
            this.nextStitch = null;
        } else { // flag if it's a stitch that has not been accounted for yet
            throw stitch.toLowerCase() + " is not a known stitch.";
        }
    }

    // we want each pattern to become a linked list of stitches

    /** add the previous Stitch item
     * @param {Stitch} prevStitch 
     */
    addPreviousStitch(prevStitch) {
        this.prevStitch = prevStitch;
    }
    /** add the next Stitch item
     * @param {Stitch} nextStitch 
     */
    addNextStitch(nextStitch) {
        this.nextStitch = nextStitch;
    }
    /** add a Stitch this one connects to
     * @param {Stitch} connectsTo 
     */
    addConnectsTo(connectsTo) {
        this.connectsTo = connectsTo;
    }
}
export default Stitch;