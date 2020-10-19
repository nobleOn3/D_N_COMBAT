import Combatant from './combatant.js';
import Spell from './spell.js';

//window.onload = function () {
console.log("Loaded main.js");
console.log(document.getElementById('add_combatant'));

//Add event listeners for function controls
document.getElementById('add_combatant').addEventListener('click', () => {
    console.log("Add combatant was touched!");
    add_combatant(); 
    display_combatants();
}, false); 

document.getElementById('add_spell').addEventListener('click', () => {
    add_spell(); 
    display_spells();
});

document.getElementById('next_round').addEventListener('click', () =>{
    console.log("Next Round was touched!");
    next_round();
    display_spells();
})

document.addEventListener("keypress", (e) => {
    console.log("Got into the check for keypress");
    if(e.key == '`')
    {
        next_round();
        display_spells();
    }
}, false)

document.getElementById('attack').addEventListener('click', () =>{
    attack(document.getElementById('value').value);
    display_combatants();
    document.getElementById('victim').value = "";
    document.getElementById('value').value = "";
})

document.getElementById('heal').addEventListener('click', () =>{
    heal(document.getElementById('value').value);
    display_combatants();
    document.getElementById('victim').value = "";
    document.getElementById('value').value = "";
})

document.getElementById('add_t_hp').addEventListener('click', () =>{
    gain_t_hp(document.getElementById('t_hp').value);
    display_combatants();
    document.getElementById('t_hp_target').value = "";
    document.getElementById('t_hp').value = "";
})

document.getElementById('reset').addEventListener('click', () =>{
    reset_all();
    display_combatants();
    display_spells();
})


//add event listeners for menus
document.getElementById('add_C_menu').addEventListener('click', () => {
    //document.getElementById('combatant_menu').classList.add('sub_menu_found');
    document.getElementById('combatant_menu').hidden = !(document.getElementById('combatant_menu').hidden);
    document.getElementById('spell_menu').hidden = true;
    document.getElementById('att/heal_menu').hidden = true;
    document.getElementById('t_hp_menu').hidden = true;
    document.getElementById('misc_menu').hidden = true;
})

document.getElementById('add_S_menu').addEventListener('click', () => {
    document.getElementById('spell_menu').hidden = !(document.getElementById('spell_menu').hidden);
    document.getElementById('att/heal_menu').hidden = true;
    document.getElementById('combatant_menu').hidden = true;
    document.getElementById('t_hp_menu').hidden = true;
    document.getElementById('misc_menu').hidden = true;
})

document.getElementById('att_heal_menu').addEventListener('click', () => {
    document.getElementById('att/heal_menu').hidden = !(document.getElementById('att/heal_menu').hidden);
    document.getElementById('combatant_menu').hidden = true;
    document.getElementById('spell_menu').hidden = true;
    document.getElementById('t_hp_menu').hidden = true;
    document.getElementById('misc_menu').hidden = true;
})

document.getElementById('add_t_hp_menu').addEventListener('click', () => {
    document.getElementById('t_hp_menu').hidden = !(document.getElementById('t_hp_menu').hidden);
    document.getElementById('combatant_menu').hidden = true;
    document.getElementById('att/heal_menu').hidden = true;
    document.getElementById('spell_menu').hidden = true;
    document.getElementById('misc_menu').hidden = true;
})

document.getElementById('add_misc').addEventListener('click', () => {
    document.getElementById('misc_menu').hidden = !(document.getElementById('misc_menu').hidden);
    document.getElementById('combatant_menu').hidden = true;
    document.getElementById('att/heal_menu').hidden = true;
    document.getElementById('spell_menu').hidden = true;
    document.getElementById('t_hp_menu').hidden = true;
})

//Lists of objects
let c_list = []; //list of combatants
let s_list = []; // list of spells

//console.log("Got to this point!");

//Display functions
function display_combatants(){

    let c_display = document.getElementById("c_table");

    c_display.innerHTML = "";

    let newRow = document.createElement('tr');

    let newCell = document.createElement('td');
    newCell.innerHTML = "Name";
    newRow.appendChild(newCell);

    newCell = document.createElement('td');
    newCell.innerHTML = "Initiative";
    newRow.appendChild(newCell);

    newCell = document.createElement('td');
    newCell.innerHTML = "HP";
    newRow.appendChild(newCell);

    newCell = document.createElement('td');
    newCell.innerHTML = "Temp. HP";
    newRow.appendChild(newCell);


    c_display.appendChild(newRow); 

    for(const element of c_list) {
        console.log(element.name, element.hp, element.initiative);

        newRow = document.createElement('tr');
        newCell = document.createElement('td');
        newCell.innerHTML = element.name;
        newRow.appendChild(newCell);

        newCell = document.createElement('td');
        newCell.innerHTML = element.initiative;
        newRow.appendChild(newCell);

        newCell = document.createElement('td');
        newCell.innerHTML = element.hp;
        newRow.appendChild(newCell);

        newCell = document.createElement('td');
        newCell.innerHTML = element.temp_hp;
        newRow.appendChild(newCell);


        c_display.appendChild(newRow);       
    }
}

function display_spells(){
    let s_display = document.getElementById("s_table");

    s_display.innerHTML = "";

    let newRow = document.createElement('tr');

    let newCell = document.createElement('td');
    newCell.innerHTML = "Name";
    newRow.appendChild(newCell);

    newCell = document.createElement('td');
    newCell.innerHTML = "Duration";
    newRow.appendChild(newCell);


    s_display.appendChild(newRow); 

    for(const element of s_list) {
        console.log(element.name, element.duration);

        newRow = document.createElement('tr');
        newCell = document.createElement('td');
        newCell.innerHTML = element.name;
        newRow.appendChild(newCell);

        newCell = document.createElement('td');
        newCell.innerHTML = element.duration;
        newRow.appendChild(newCell);

        s_display.appendChild(newRow);       
    }
}

// Functions to add objects to the lists
function add_spell(){
    let name = document.getElementById('spell_name').value;
    let dura = document.getElementById('duration').value;

    let s = new Spell(name, dura);
    s_list.push(s);

    document.getElementById('spell_name').value = "";
    document.getElementById('duration').value = "";
}

function add_combatant(){
    let name = document.getElementById('name').value;
    let init = document.getElementById('initiative').value;
    let hp = document.getElementById('health_pool').value;

    let c = new Combatant(name, init, hp);
    c_list.push(c);
    c_list.sort(compare_cmbt);

    document.getElementById('name').value = "";
    document.getElementById('initiative').value = "";
    document.getElementById('health_pool').value = "";
}

function compare_cmbt(a,b){
    if(parseInt(b.initiative) < parseInt(a.initiative))
        return -1;
    else if(parseInt(b.initiative) > parseInt(a.initiative))
        return 1;
    else
        return 0;
}

function next_round() {
    console.log("Next Round was touched!");
    for(const element of s_list){
        console.log(element);
        element.reduce_duration(1);
        if(element.duration <= 0){
            let removeIndex = s_list.findIndex(x => x.name === element.name);
            s_list.splice(removeIndex, 1);
        }
    }
}

function checkSpell(spell, element){
    return  spell.name == element.name;
}

function attack(damage){
    let combatant = c_list.find(checkCombatant_a_h);

    combatant.getHit(damage);

    if(combatant.hp <= 0){
        let removeIndex = c_list.findIndex(x => x.name === combatant.name);
        console.log(removeIndex);
        c_list.splice(removeIndex, 1);
    }
}

function checkCombatant_a_h(combatant){
    return combatant.name == document.getElementById('victim').value;
}

function checkCombatant_thp(combatant){
    return combatant.name == document.getElementById('t_hp_target').value;
}

function findCombatant(tmpCom, combatant)
{
    return combatant.name == tmpCom.name;
}

function heal(healing){
    let combatant = c_list.find(checkCombatant_a_h);

    combatant.getHealed(healing);
}

function gain_t_hp(t_hp){
    let combatant = c_list.find(checkCombatant_thp);

    combatant.gain_temp_hp(t_hp);
}

function reset_all(){
    c_list = [];
    s_list = [];
}















//import{qs, qsa} from './utl.js'; //Non-default import, remember that this is dumb, cant find with simple reference to filename.
//import Todo from './toDo.js';

//const myTodo = new Todo();
//document.addEventListener('load', myTodo.listToDos);