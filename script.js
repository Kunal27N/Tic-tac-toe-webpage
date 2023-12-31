let boxes=document.querySelectorAll(".box");
let reset=document.getElementById("reset-btn");
let newGame=document.getElementById("new-btn");
let msgContainer=document.querySelector(".msg-container");
let msgText=document.querySelector("#msg");

let turnO=true;
let count=0;


const winPatterns=[[0,1,2],[0,3,6],[0,4,8],[1,4,7],[2,5,8],[2,4,6],[3,4,5],[6,7,8]];

const resetGame=()=>{
    turnO=true;
    count=0;
    enabledBoxes();
    msgContainer.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click",()=>{
        if(turnO){
            box.textContent="O"
            box.classList.add("zero");
            box.classList.remove("cross");
            turnO=false;
        }
        else{
            box.textContent="X";
            box.classList.add("cross");
            box.classList.remove("zero");
            turnO=true;
        }
        box.disabled=true;
        
        count++;
        let isWinner=checkWinner();
        if (!isWinner && count==9){
            checkDraw();
        }

    })
});

const showWinner=(winner)=>{
    msgText.innerText=`Congratulations the winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disabledBoxes();
}

const checkDraw=()=>{
    if(count===9){
        msgText.innerText=`The game has been drawn`;
    msgContainer.classList.remove("hide");
    }
}

const disabledBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}

const enabledBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}

const checkWinner = () => {
    for (let pattern of winPatterns) {
      let pos1Val = boxes[pattern[0]].innerText;
      let pos2Val = boxes[pattern[1]].innerText;
      let pos3Val = boxes[pattern[2]].innerText;
  
      if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
        if (pos1Val === pos2Val && pos2Val === pos3Val) {
          showWinner(pos1Val);
          return true;
        }
      }
    }
  };

  newGame.addEventListener("click",resetGame);
  reset.addEventListener("click",resetGame);
