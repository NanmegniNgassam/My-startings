// J'etablis un lien avec les éléments du html que je veux manipuler en Javascript


var start = document.getElementById('Start');

var chosenLetter = document.getElementById('chosenLetter');

var Validation= document.getElementById('Validate');

var counter = document.getElementById('score');

var welcome= document.getElementById('Welcome');

var guessing= document.getElementById('guessing');

var giveup = document.getElementById('GiveUp');

var one= document.getElementById('first');
var two= document.getElementById('second');
var three= document.getElementById('third');
var four= document.getElementById('four');
var five= document.getElementById('five');
var six= document.getElementById('six');
var seven= document.getElementById('seven');
var eight= document.getElementById('eight');
var nine= document.getElementById('nine');
var ten= document.getElementById('ten');
var eleven= document.getElementById('eleven');
var twelve= document.getElementById('twelve');

var remain= document.getElementById('remain');

var result= document.getElementById('Result');

// Fin des éléments purement HTML

//************************************************************************************************** */


//Variables JavaScript

var a;

var user= prompt('Entrez votre nom', 'Joueur  ');

var tip= document.getElementById('Tip');

var foundLetter = 0;

var trouve = false;

var score =0;

//Fin des éléments purs Javascript



//*******************************************************************************************



// Je crée des des tableaux de valeurs utiles
/*
choice: Reperer tous les inputs où seront placés les lettres du mot

wordDataBase: Tableau contenant les différents mots qui seront choisis aléatoirement

find: tableau indicatif( pour savoir si une valeur a été trouvé)
*/ 

var choice= [one , two , three, four, five, six, seven, eight, nine, ten, eleven, twelve];

var wordsDataBase=[ "programming", "vampire", "ghost" , "wolf" ,"gunshoot", "computer", "holidays", "victory", "university" , "family"];

var find=[false, false, false, false, false,false, false, false,false, false,false, false,];


//Fin des tableaux



//**************************************************************************** */



//functions
function disabler(a){
    for(a=0; a<12; a++){
        choice[a].disabled= true;
    }
}

function init() {
    for(i=0; i<12; i++){
        choice[i].value= null;
    }
}
//

welcome.innerHTML = "Bienvenu "+ user+ ", Nous vous souhaitons une excellente partie"; // Je recupère le nom du joueur pour lui souhaiter une bonne partie.


// Je crée une fonction qui demarre la partie (Initialise des variables, choisit un mot aléatoire et qui s'occupe de l'affichage du score)
start.addEventListener('click', function(){
    number = Math.random()*10;
    
    number = Math.floor(number);
    
    word = wordsDataBase[number];
    
    wordNumber = word.length;
    
    tryNumber = Math.ceil(wordNumber*1.4);

    result.innerHTML= "Le jeu est lancé";

    foundLetter = 0;

    trouve = false;

    find=[false, false, false, false, false,false, false, false,false, false,false, false,]

    disabler(a);

    init();

    tip.innerHTML = "Le mot que vous cherchez a " + wordNumber +" Lettres";

    remain.innerHTML = "Il vous reste " + tryNumber + " essais";

    for(i=0; i< wordNumber; i++){
        
        choice[i].disabled= false;
    
    }

    counter.innerHTML = user + ' a ' +score+ ' Points';

    chosenLetter.disabled = false;
    
    chosenLetter.value= null;

    guessing.disabled=false;

    guessing.value= null;

    giveup.disabled= false;

    start.disabled=true;

    Validation.disabled = false;

    });

//Je crée une fonction abandonner( Pour que l'utilisateur puisse quitter une partie en cours)

giveup.addEventListener('click', function(){
    start.disabled=false;

    giveup.disabled=true;

    result.innerHTML= "Vous avez perdu mais vous aviez déja "+ score + " Points";
    score = 0;

    tip.innerHTML= "";

    remain.innerHTML= "";

    chosenLetter.disabled=true;

    guessing.disabled= true;

    Validation.disabled=true;

    counter.innerHTML = " Fin";
});

// Evenement- utilisateur essaie de deviner le mot, il n'a droit qu'à un essai par tour 

Validation.addEventListener('click', function(){
    if(guessing.value.toLowerCase() == word){
        result.innerHTML= "Bravo vous avez gagné, pour continuer votre partie actuelle cliquez sur * Commencer une nouvelle partie";
    
        score++;

        counter.innerHTML = user +' a ' + score + ' Points'; 

        start.disabled= false;

        chosenLetter.disabled=true;

        tip.innerHTML= "";

        remain.innerHTML= "";

        for(i=0; i< wordNumber; i++){
            choice[i].value = word[i];
            }
         
        giveup.disabled= true; 
        
        Validation.disabled = true;

        guessing.disabled= true;
        
        
    }

    else{
        guessing.value = "Essais manqué";
        Validation.disabled = true;

        
    }
});

// Evenement repétitif, utilisateur qui essaie de deviner le mot lettre par lettre.

chosenLetter.addEventListener('keyup', function(){

    

    tryNumber = tryNumber -1;

    remain.innerHTML = `Il vous reste ${tryNumber} essais`;

    letter= chosenLetter.value.toLowerCase();

    
    
    for(i=0; i< wordNumber; i++){
        if(letter===word[i]){
           if(find[i] != true){
               find[i]= true;
               foundLetter++;
           }
        }
        if(find[i]){
            choice[i].value = word[i];
            

        }


    }

    if(foundLetter == wordNumber){
        trouve = true;
    }
        
  

    if(tryNumber ==0 || trouve == true){
        chosenLetter.disabled= true;

        giveup.disabled = true;

        if(!trouve){
            result.innerHTML= "Vous avez perdu mais vous aviez déja "+ score + " Points";
            score = 0;

            for(i=0; i< wordNumber; i++){
                choice[i].value = word[i];
                }

            tip.innerHTML= "";

            remain.innerHTML= "";
            start.disabled=false;

            counter.innerHTML = " Fin";
            guessing.disabled= true;
            Validation.disabled = true;
        }


        if(trouve){
        result.innerHTML= "Bravo vous avez gagné, pour continuer votre partie actuelle cliquez sur * Commencer une nouvelle partie";
         score++;
        counter.innerHTML = user +' a ' + score + ' Points';
        start.disabled=false;
        guessing.disabled= true;
        Validation.disabled = true;
        tip.innerHTML= "";

        remain.innerHTML= "";

        for(i=0; i< wordNumber; i++){
                choice[i].style.backgroundColor = "green";
                }
        }    
       

    }
    

    chosenLetter.value = null;
});