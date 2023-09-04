let keys = document.getElementById("keys");
let worddisplay = document.querySelector("#worddisplay");
let guesses = document.querySelector("#guesses b");
let hangmanimg = document.querySelector("#hangman-box img");
let gamemodel= document.querySelector("#gamemodel");
let again= document.querySelector("#again");

let currentWord,correctLetters= [],WrongGuessCount = 0; 
let Maxguess =6;



let ResetGame=()=>{
    correctLetters = [];
    WrongGuessCount =0;
    hangmanimg.src = `./hangman-${WrongGuessCount}.svg`;
    guesses.innerText = `${WrongGuessCount} / ${Maxguess}`;
    keys.querySelectorAll("button").forEach((btn)=>{btn.disabled = false})
    worddisplay.innerHTML = currentWord.split("").map(()=>`<li id="letter" class="uppercase text-2xl font-bold "></li>`).join("");
    gamemodel.classList.remove("show")
}



function Generate(){
    let {word, hint} = list[Math.floor(Math.random() * list.length)];
    console.log(word);
    currentWord = word;
    document.querySelector("#hint b").innerHTML = hint;
    ResetGame()
}


let gameOver=(isVictory)=>{
    setTimeout(() => {
        let modelText = isVictory? `Word Was:`:`Correct Word:`;
        gamemodel.querySelector('img').src = `./${isVictory? "victory":"lost"}.gif`;
        gamemodel.querySelector('h1').innerText = `${isVictory? "Congrates!":"Game Over!"}`;
        gamemodel.querySelector('h2').innerHTML = `${modelText} <b>${currentWord}</b>`;
        gamemodel.classList.add("show")
    }, 300);
}



function inGame(button,clickedLetter){
    //check if clickedLetter is exist in currentWord
    if(currentWord.includes(clickedLetter)){
        //show letters in worddisplay
        [...currentWord].forEach((letter,index)=>{
            if(letter === clickedLetter){
                correctLetters.push(letter)
                worddisplay.querySelectorAll("li")[index].innerText = letter;
                worddisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        })
    }else{
        WrongGuessCount++;
        hangmanimg.src = `./hangman-${WrongGuessCount}.svg`;
    }
    button.disabled = true;
    guesses.innerText = `${WrongGuessCount} / ${Maxguess}`

    if(WrongGuessCount === Maxguess){
        return gameOver(false)
    }
    if(correctLetters.length === currentWord.length){
        return gameOver(true)
    }
}


//create buttons
for (let i = 97 ; i<=122; i++){
    let button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keys.appendChild(button);
    button.addEventListener("click",g=>inGame(g.target, String.fromCharCode(i)))
}
Generate()

again.addEventListener("click",Generate);


