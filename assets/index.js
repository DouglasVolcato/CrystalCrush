const arrCrystals = [];
const arrImages = ["d-azul", "d-cinza", "d-dourado", "d-roxo", "d-verde"];

const selectedCrystal = { x: 0, y: 0 };
let score = 0;

//preenche array com imagens aleatórias e coordenadas
function fullfillArr() {
  let count = 0;
  while (true) {
    if (arrCrystals.length === 56) {
      break;
    }
    const aleatoryNumber = Math.floor(Math.random() * 5);
    arrCrystals.push({
      img: arrImages[aleatoryNumber],
      column: setColumnClass(count),
      row: setRowClass(count),
    });
    count++;
  }
}

//gera o "tabuleiro"
function generateBoard() {
  removeElements();
  for (let i = 0; i < arrCrystals.length; i++) {
    document.getElementById("gameBoard").insertAdjacentHTML(
      "beforeend",
      `
            <img class="crystalElements column${arrCrystals[i].column} row${arrCrystals[i].row}" draggable="true" src="./assets//images/${arrCrystals[i].img}.png" alt="" />
        `
    );
  }
}

//guarda as coordenadas iniciais da imagem
document.addEventListener("dragstart", (e) => {
  selectedCrystal.x = e.clientX;
  selectedCrystal.y = e.clientY;
});

//coordenadas finais da imagem
document.addEventListener("dragend", (e) => {
  const startX = selectedCrystal.x;
  const startY = selectedCrystal.y;
  const currentX = e.clientX;
  const currentY = e.clientY;

  const differenceX = currentX > startX ? currentX - startX : startX - currentX;
  const differenceY = currentY > startY ? currentY - startY : startY - currentY;

  const column = e.target.classList[1][6];
  const row = e.target.classList[2][3];
  const elementPositionInArr = findElementByPosition(
    Number(column),
    Number(row)
  );

  if (differenceX >= 7 * differenceY) {
    if (currentX > startX) {
      const element1 = arrCrystals[elementPositionInArr];
      const element2 = arrCrystals[elementPositionInArr + 1];

      arrCrystals.splice(elementPositionInArr, 1, element2);
      arrCrystals.splice(elementPositionInArr + 1, 1, element1);

      generateBoard();
    } else {
      const element1 = arrCrystals[elementPositionInArr];
      const element2 = arrCrystals[elementPositionInArr - 1];

      arrCrystals.splice(elementPositionInArr, 1, element2);
      arrCrystals.splice(elementPositionInArr - 1, 1, element1);

      generateBoard();
    }
  } else if (differenceY >= 7 * differenceX) {
    if (currentY < startY) {
      const element1 = arrCrystals[elementPositionInArr];
      const element2 = arrCrystals[elementPositionInArr - 8];

      arrCrystals.splice(elementPositionInArr, 1, element2);
      arrCrystals.splice(elementPositionInArr - 8, 1, element1);

      generateBoard();
    } else {
      const element1 = arrCrystals[elementPositionInArr];
      const element2 = arrCrystals[elementPositionInArr + 8];

      arrCrystals.splice(elementPositionInArr, 1, element2);
      arrCrystals.splice(elementPositionInArr + 8, 1, element1);

      generateBoard();
    }
  }
});

function findElementByPosition(column, row) {
  for (let n = 0; n < arrCrystals.length; n++) {
    const item = arrCrystals[n];
    if (item.column === column && item.row === row) {
      return n;
    }
  }
}

function removeElements() {
  const elements = document.querySelectorAll(".crystalElements");
  for (let n of elements) {
    n.remove();
  }
}

//set row position for a div number
function setRowClass(i) {
  let rowClass = 0;
  if (i >= 0 && i <= 7) {
    rowClass = 1;
  } else if (i >= 8 && i <= 15) {
    rowClass = 2;
  } else if (i >= 16 && i <= 23) {
    rowClass = 3;
  } else if (i >= 24 && i <= 31) {
    rowClass = 4;
  } else if (i >= 32 && i <= 39) {
    rowClass = 5;
  } else if (i >= 40 && i <= 47) {
    rowClass = 6;
  } else if (i >= 48 && i <= 55) {
    rowClass = 7;
  }
  return rowClass;
}

//set column position for a number
function setColumnClass(i) {
  let columnClass = 0;
  if (
    i === 0 ||
    i === 8 ||
    i === 16 ||
    i === 24 ||
    i === 32 ||
    i === 40 ||
    i === 48
  ) {
    columnClass = 1;
  } else if (
    i === 1 ||
    i === 9 ||
    i === 17 ||
    i === 25 ||
    i === 33 ||
    i === 41 ||
    i === 49
  ) {
    columnClass = 2;
  } else if (
    i === 2 ||
    i === 10 ||
    i === 18 ||
    i === 26 ||
    i === 34 ||
    i === 42 ||
    i === 50
  ) {
    columnClass = 3;
  } else if (
    i === 3 ||
    i === 11 ||
    i === 19 ||
    i === 27 ||
    i === 35 ||
    i === 43 ||
    i === 51
  ) {
    columnClass = 4;
  } else if (
    i === 4 ||
    i === 12 ||
    i === 20 ||
    i === 28 ||
    i === 36 ||
    i === 44 ||
    i === 52
  ) {
    columnClass = 5;
  } else if (
    i === 5 ||
    i === 13 ||
    i === 21 ||
    i === 29 ||
    i === 37 ||
    i === 45 ||
    i === 53
  ) {
    columnClass = 6;
  } else if (
    i === 6 ||
    i === 14 ||
    i === 22 ||
    i === 30 ||
    i === 38 ||
    i === 46 ||
    i === 54
  ) {
    columnClass = 7;
  } else if (
    i === 7 ||
    i === 15 ||
    i === 23 ||
    i === 31 ||
    i === 39 ||
    i === 47 ||
    i === 55
  ) {
    columnClass = 8;
  }
  return columnClass;
}

fullfillArr();
generateBoard();
