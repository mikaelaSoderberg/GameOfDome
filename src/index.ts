import _ from 'lodash';
import './style.css';;

window.onload = function() {

    /**Deklarerar variablar */
    var monsterName: string;
    var monsterStrength: number;
    var monsterHealth: number;
    var inputMonster: HTMLInputElement;
    var monsterCount: number;
    monsterCount = 0;

    /**Funktion som laddar monster från arraylist, tar hjälp av
     * variabel monsterCount för att ha koll på vilket monster
     * som står på tur.
     */
    function loadMonster(monsterCount: number, monster: any) {

        monsterName = monster[monsterCount].dataset.name;
        monsterStrength = monster[monsterCount].dataset.strength;
        monsterHealth = monster[monsterCount].dataset.health;

        inputMonster = document.querySelector('#monsterName');
        inputMonster.value = monsterName;

        inputMonster = document.querySelector('#monsterStrength');
        inputMonster.valueAsNumber = monsterStrength;

        inputMonster = document.querySelector('#monsterHealth');
        inputMonster.valueAsNumber = monsterHealth;
    }

    /**Hämtar spelaren med hjälp av  querySelector.*/
    var player: HTMLInputElement; 
    player = document.querySelector('#playerData');

    /**Använder spelarens dataset för att hämta in värdet till variablarna.*/
    var name: string;
    name = player.dataset.name;
    var strength: number;
    strength: player.dataset.strength;
    var health: number;
    health: player.dataset.health;


    /**Printar variablarna för att säkerställa datan.*/
    console.log(player);
    console.log(name);
    console.log(strength);
    console.log(health);

    /**Hämtar in input-fälten med hjälp av querySelector, och skickar sedan in
     * variabelvärdena till fälten så att de printas på skärmen.
     */
    let inputPlayer: HTMLInputElement;
    inputPlayer = document.querySelector('#playerName');
    inputPlayer.value = name;

    inputPlayer = document.querySelector('#playerStrength');
    inputPlayer.valueAsNumber = strength;

    inputPlayer = document.querySelector('#playerHealth');
    inputPlayer.valueAsNumber = health;

    /**Hämtar in monsterna till en arraylist med querySelector.*/
    var monster: NodeListOf<Element>;
    monster = document.querySelectorAll('#monsters input');

    /**Laddar första monstret, skickar med monsterCount, för att ha koll på
     * vilket monster vi ska ha, och själva listan med monstrena.
     */
    loadMonster(monsterCount, monster);

    /**Hämtar in fight-knappen med querySelector.*/
    var button: Element;
    button = document.querySelector("#fight");

    /**Funktion som ser till att varje gång som spelaren klickar på knappen
     * så drars hälsa från både monstret och spelaren.
     */
    button.onclick = function() {
        monsterHealth = monsterHealth - strength;
        inputMonster.valueAsNumber = monsterHealth;

        health = health - monsterStrength;
        inputPlayer.valueAsNumber = health;

        /**Om monstrets hälsa blir 0 eller mindre så laddas ett nytt monster, så
         * länge som monsterCount är mindre än 2 eftersom det är så många monster
         * som vi har... :)))))))) 
         */
        if (monsterHealth <= 0 && monsterCount < 2) {
            monsterCount++;
            loadMonster(monsterCount, monster);
        }
        /**Om monstrets hälsa är under 0 (dvs dött) och listan av monster är slut
         * så printas WINNER ut på skärmen. 
         */
        else if (monsterHealth <= 0) {
            console.log("HEJ")

            /**Skapar en ny paragraf och en ny textNode som vi sedan sätter ihop. */
            var newPara: HTMLParagraphElement;
            newPara = document.createElement("p");

            var winnerText: Text; 
            winnerText= document.createTextNode("WINNER");
            newPara.appendChild(winnerText);

            /**Stylar texten. */
            newPara.style.color = 'red';
            newPara.style.fontSize = '1000%';
            newPara.style.position = 'absolute';
            newPara.style.top = '37%';
            newPara.style.left = '25%';
            newPara.style.fontFamily = 'verdana';

            /**Lägger in den nya paragrafen i dokumentet under diven combatArea.*/
            var element: HTMLElement;
            element = document.getElementById("combatArea");
            element.appendChild(newPara);

        }
    }
};