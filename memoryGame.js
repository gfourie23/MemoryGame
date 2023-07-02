const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let cardsFlipped = 0;
let notClicked = false;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "pink",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "pink",
];

function shuffle(array) {
  let counter = array.length;

 
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

  
    counter--;

  
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);


function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    
    newDiv.classList.add(color);


    newDiv.addEventListener("click", handleCardClick);

   
    gameContainer.append(newDiv);
  }
}


function handleCardClick(event) {
 
  if(notClicked) return;
  if(event.target.classList.contains('flipped')) 
  return;

  let currentCard = event.target;
  currentCard.style.backgroundColor = currentCard.classList[0];

  if(!card1 || !card2) {
    currentCard.classList.add('flipped');
    card1 = card1 || currentCard;
    card2 = currentCard === card1 ? null : currentCard;
  }
  
  if(card1 && card2) {
    notClicked = true;

    let color1 = card1.className;
    let color2 = card2.className;

    if (color1 === color2) {
      cardsFlipped += 2;
      card1.removeEventListener("click", handleCardClick); 
      card2.removeEventListener("click", handleCardClick); 
      card1 = null;
      card2 = null;
      notClicked = false;
    } else {
      setTimeout(function() {
        card1.style.backgroundColor = "";
        card2.style.backgroundColor= "";
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1 = null;
        card2 = null;
        notClicked = false;
      }, 1000)
    }
  }

  if(cardsFlipped === COLORS.length) alert ("You won! Refresh the page to play again!");

  console.log("you just clicked", event.target);
}



createDivsForColors(shuffledColors);


