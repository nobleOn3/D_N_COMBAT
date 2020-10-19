/******************************************************************
 * Spell class
 *  This class holds a spell's name, and duration for combat.
 *****************************************************************/
export default class Spell {
    constructor(n, d) {
        this.name = n;
        this.duration = d;
        this.active = true;
    }

    reduce_duration(value) {
        this.duration -= value;
    }

    isActive() {
        return active;
    }

    expire() {
        this.active = false;
    }

}