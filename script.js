const Game = (()=>{
  let gamewon = false;
  // ------------ARRAY OF GAME BOARD && Accessing some other DOM elements----------------
  let board = ["", "", "", "", "", "", "", "", ""];
  const boxesEl = document.querySelectorAll(".boxes");
  const containerEl = document.querySelector('.container');
  const startEl = document.querySelector('#start');
  const turnEl = document.querySelector('.turn');
  var x = document.getElementById("myAudio"); 
  const playerselectionEl = document.querySelector(".players");
  const playEl = document.querySelector('#play');
  // -----------POSSIBLE CASES OF WINNING--------------
  const wins = [
    [1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7]
  ]

  // -------------PLAYER FACTORY FUNCTIONS-------------------
 const player = (name, mark, turn)=>{
  return{
    name, mark, turn 
  }
 }

   // ------------------Play functionality && Player creation----------------------
   const p1 = player('player1', "X", true);
   const p2 = player('player2', "O", false);
   const aicheck = document.getElementById('AI');
const play = () =>{
  containerEl.style.display = "flex";
  playerselectionEl.style.display = "none";
  const player1 = document.querySelector('#player1').value;
  const player2 = document.querySelector('#player2').value;

  p1.name = player1;
  p2.name = player2;
  turnEl.textContent = `${p1.name} TURN (X)`;
}

 
  
playEl.addEventListener('click', play);

  // ---------------RENDER FUNCTION FOR START AND RESET FUNCTIONALITY--------------
  const render = () =>{
    if(containerEl.style.display === "flex"){
      boxesEl.forEach((btn)=>{
        btn.textContent = "";
       
      })
      const revertboxes = document.querySelectorAll('.result-box');
      revertboxes.forEach((winbox)=>{
        winbox.classList.toggle('result-box');
      })
      gamewon = false;
      p1.turn = true;
      p2.turn = false;
      turnEl.textContent = `${p1.name} TURN (X)`;
      turn = 0;
     for(i in board){
        board[i] = "";
      }
    }
    else {
      playerselectionEl.style.display = "flex";   
      startEl.textContent = "Reset";
    }
  }
  startEl.addEventListener('click', render);


//  -------MARKER ADDING IN BOXES----------
 boxesEl.forEach((box)=>{
  box.addEventListener('click', (e)=>{
    if(p1.turn === true && box.textContent === "" && gamewon === false){
      box.textContent = p1.mark;
      x.play();
      p1.turn = false;
      p2.turn = true;
      turnEl.textContent = `${p2.name} TURN (O)`;
      let index = e.target.getAttribute("id") - 1;
      board[index] = p1.mark;
      checkwin();
      // if(aicheck.checked){
      //   aihandle();
      // }
    }
    else if(p2.turn === true && box.textContent === "" && gamewon === false && !aicheck.checked){
      box.textContent = p2.mark;
      x.play();
      p2.turn = false;
      p1.turn = true;
      turnEl.textContent = `${p1.name} TURN (X)`;
      let index = e.target.getAttribute("id") - 1;
      board[index] = p2.mark; 
      checkwin();
    }
  })
 })

//  ----------------AI Handle--------------

const aihandle = () =>{
  let randombox = Math.floor(Math.random() * 9) + 1;
  var aibox = document.getElementById(`${randombox}`)
    
  if(p2.turn === true && aibox.textContent === "" && gamewon === false) {
    aibox.textContent = p2.mark;
    x.play();
    p2.turn = false;
    p1.turn = true;
    turnEl.textContent = `${p1.name} TURN (X)`;
    let index = randombox - 1;
    board[index] = p2.mark;
    checkwin();
    console.log(board);
  }
  
}
//  --------------CHECK WIN-----------------------
var turn = 0;
const checkwin = ()=>{
  turn++;
  wins.forEach((win)=>{
    if(board[win[0]-1] === board[win[1]-1] && board[win[1]-1] === board[win[2] -1]  && board[win[0]-1] !== ""){
      if(board[win[0]-1] === "X"){
      turnEl.textContent = `${p1.name} (X): Wins!`;
      turnEl.style.background = `url("https://cliply.co/wp-content/uploads/2019/08/371908020_CONFETTI_400px.gif")`;
      gamewon = true;
      win.forEach((id)=>{
      let resultbox = document.getElementById(`${id}`);
      resultbox.classList.toggle("result-box");
      })
      }
      else if(board[win[0]-1] === "O"){
        turnEl.textContent = `${p2.name} (O): Wins!`;
        turnEl.style.background = `url("https://cliply.co/wp-content/uploads/2019/08/371908020_CONFETTI_400px.gif")`;
        gamewon = true;
      win.forEach((id)=>{
      let resultbox = document.getElementById(`${id}`);
      resultbox.classList.toggle('result-box');
      })
      }
    }
   else if(turn >= 9){
    turnEl.textContent = "DRAW";
   }
  })
}
})();