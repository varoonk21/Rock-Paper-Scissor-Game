let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0,
};


updateScoreElement();

function pickCmove() {
  let  Cmove = '';
  let randomNo = Math.random();

  if (randomNo >=0 && randomNo <1/3 ) {
    Cmove = 'Rock';
  } else if(randomNo >1/3 && randomNo <2/3) {
    Cmove = 'Paper';
  } else if(randomNo >2/3 && randomNo <1)
  {
    Cmove = 'Scissors';
  }
  return Cmove;
}

AutoplayButton = document.querySelector('.js-autoplay-button');
AutoplayButton.addEventListener('click', () => {
  Autoplay();
})

ResetButton = document.querySelector('.js-reset-button');
ResetButton.addEventListener('click', ()=>{
  ResetScore();
})

confirmText = document.querySelector('.js-confirm-text')
function ResetScore() {
  if (localStorage.getItem('score') === null){
    return;
  }
  else{
  confirmText.innerHTML = `<p>Are you sure you wanna reset the score?</p>
  <button class="yes-button yes-css">Yes</button> <button class="no-button no-css">No</button>`;
  document.querySelector('.yes-button').addEventListener('click', () =>{
      score.wins = 0;
      score.losses = 0;
      score.ties = 0;
      localStorage.removeItem('score');
      updateScoreElement();
      document.querySelector('.js-moves').innerHTML = '';
      document.querySelector('.js-result').innerHTML = '';
      confirmText.innerHTML = '';
  })
document.querySelector('.no-button').addEventListener('click', () =>{
  confirmText.innerHTML = '';
})    
}}

let isAutoplaying = false;
let intervalID;
function Autoplay() {
  if(!isAutoplaying){
  intervalID = setInterval(function() {
    const Cmove2 = pickCmove();
    playgame(Cmove2)
  }, 1000);
  AutoplayButton.innerHTML = 'Stop Play';
  isAutoplaying = true;
} else{
  clearInterval(intervalID);
  AutoplayButton.innerHTML = 'Auto Play';
  isAutoplaying = false;
}
}

document.querySelector('.js-rock-button').addEventListener('click', () => {
  playgame('Rock');
})

document.querySelector('.js-paper-button').addEventListener('click', () => {
  playgame('Paper');
})

document.querySelector('.js-scissors-button').addEventListener('click', () => {
  playgame('Scissors');
})

document.body.addEventListener('keydown', (event) => {
if (event.key === 'r') {
  playgame('Rock');
} else if(event.key === 'p'){
  playgame('Paper');
} else if(event.key === 's'){
  playgame('Scissors');
} else if(event.key === 'a'){
  Autoplay();
} else if(event.key === 'Backspace'){
  ResetScore();
}
})

function playgame(playerMove){

  const Cmove = pickCmove();
  let result = '';              
  if (playerMove === 'Scissors') 
  {
    if (Cmove === 'Rock') {
      result = 'You Lose'; 
    } else if(Cmove === 'Paper') {
      result = 'You Win';
    } else if(Cmove === 'Scissors'){
      result = 'Tie';
    }
  } else if(playerMove === 'Paper'){
    if (Cmove === 'Rock') {
      result = 'You Win'
      
    } else if(Cmove === 'Paper') {
      result = 'Tie';
    } else if(Cmove === 'Scissors'){
      result = 'You Lose';
    }
  } else if(playerMove === 'Rock'){
    if (Cmove === 'Rock') {
      result = 'Tie'
      
    } else if(Cmove === 'Paper') {
      result = 'You Lose';
    } else if(Cmove === 'Scissors'){
      result = 'You Win';
    }

  }
  
  
    if (result === 'You Win') {
      score.wins += 1; 
    }
    else if (result === 'You Lose') {
      score.losses += 1;
    }
    else if (result === 'Tie') {
      score.ties += 1;
    }


    localStorage.setItem('score', JSON.stringify(score));

    updateScoreElement();

    document.querySelector('.js-result').innerHTML = `Result: ${result}`;

    document.querySelector('.js-moves').innerHTML = `You pick: <img src="images/${playerMove}-emoji.png" class="move-icon"> & computer pick: <img src="images/${Cmove}-emoji.png" class="move-icon">`;

}

function updateScoreElement() {
  document.querySelector('.js-score').innerHTML = ` Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties} `;
}