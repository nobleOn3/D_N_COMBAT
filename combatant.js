/******************************************************************
 * Combatant class
 *  This class holds a character's name, health, and initiative
 *  for combat.
 *****************************************************************/
export default class Combatant {
    constructor(n, i, h) {
        this.name = n;
        this.hp =  parseInt(h);
        this.temp_hp = 0;
        this.initiative = i;
        this.alive = true;
    }

    getHit(value) {
        if(this.temp_hp > 0){
            this.temp_hp -= parseInt(value);

            if (this.temp_hp < 0){
                value = -(this.temp_hp);
                this.temp_hp = 0;
                this.hp -= value;
            }
        }
        else
            this.hp -= parseInt(value);
    }

    getHealed(value) {
        this.hp += parseInt(value);
    }

    isAlive() {
        return this.alive;
    }

    kill() {
        this.alive = false;
    }

    gain_temp_hp(value){
        this.temp_hp += parseInt(value);
    }

}