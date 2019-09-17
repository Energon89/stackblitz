const htmlElements = {
  newGame: document.querySelector(".generateField"),
  inputSize: document.querySelector(".fieldSize")
};
const canvas = document.querySelector(".myCanvas");
const context = canvas.getContext("2d");
let fieldSize, cellSize;

htmlElements.newGame.addEventListener("click", init);

function Game() {
  let arr = [];
  let initArr = [];
  for (let i = 1; i < fieldSize * fieldSize; i++) {
    arr.push(i);
    initArr.push(i);
  }
  arr.push(0);
  initArr.push(0);

  this.move = function(x, y) {
    const pos = y * fieldSize + x;
    if (x > 0) {
      const posLeft = y * fieldSize + x - 1;
      if (arr[posLeft] === 0) {
        arr[posLeft] = arr[pos];
        arr[pos] = 0;
      }
    }
    if (x < fieldSize - 1) {
      const posRight = y * fieldSize + x + 1;
      if (arr[posRight] == 0) {
        arr[posRight] = arr[pos];
        arr[pos] = 0;
      }
    }
    if (y > 0) {
      const posTop = (y - 1) * fieldSize + x;
      if (arr[posTop] == 0) {
        arr[posTop] = arr[pos];
        arr[pos] = 0;
      }
    }
    if (y < fieldSize - 1) {
      const posBottom = (y + 1) * fieldSize + x;
      if (arr[posBottom] == 0) {
        arr[posBottom] = arr[pos];
        arr[pos] = 0;
      }
    }
  };

  this.draw = function() {
    for (let fy = 0; fy < fieldSize; fy++) {
      for (let fx = 0; fx < fieldSize; fx++) {
        const pos = fy * fieldSize + fx;
        const num = arr[pos];
        const absX = fx * cellSize + fx + 2;
        const absY = fy * cellSize + fy + 2;
        if (num != 0) {
          context.fillStyle = "#000";
          context.fillRect(absX, absY, cellSize - 2, cellSize - 2);
          context.font = "bold " + cellSize / 2 + "px Sans";
          context.textAlign = "center";
          context.textBaseline = "middle";
          context.fillStyle = "#fff";
          context.fillText(
            num,
            absX + (cellSize - 2) / 2,
            absY + (cellSize - 2) / 2
          );
        } else {
          context.clearRect(absX, absY, cellSize - 2, cellSize - 2);
        }
      }
    }
  };

  this.mix = function() {
    // randomly mixes the initial array arr
    let randIndex;
    for (let i in arr) {
      const x = arr[i];
      randIndex = Math.floor(Math.random() * arr.length);
      arr[i] = arr[randIndex];
      arr[randIndex] = x;
      //[arr[i], arr[randIndex]] = [arr[randIndex], arr[i]];
    }
  };

  this.victory = function() {
    if (arr.toString() === initArr.toString()) {
      return true;
    } else {
      return false;
    }
  };
}

function init() {
  const canvas = document.querySelector(".myCanvas");
  fieldSize = parseInt(htmlElements.inputSize.value);
  cellSize = 100;
  const countLines = fieldSize + 1;
  const gameSize = fieldSize * cellSize + countLines;
  canvas.height = gameSize;
  canvas.width = gameSize;
  const context = canvas.getContext("2d");
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#000000";
  for (let i = 0; i < countLines; i++) {
    context.fillRect(i * cellSize + i, 0, 1, canvas.height);
    context.fillRect(0, i * cellSize + i, canvas.width, 1);
  }

  const game = new Game();
  game.mix();
  game.draw();
  canvas.onclick = function(e) {
    const x = e.pageX - canvas.offsetLeft;
    const y = e.pageY - canvas.offsetTop;
    const posX = Math.floor(x / (cellSize + 1));
    const posY = Math.floor(y / (cellSize + 1));
    game.move(posX, posY);
    game.draw();
    if (game.victory()) {
      context.font = "40px courier";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillStyle = "#0f0";
      context.fillText(
        "Ура! Вы решили головоломку за #:##",
        gameSize / 2,
        gameSize / 2
      );
    }
  };
}
