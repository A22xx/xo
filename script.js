document.addEventListener('DOMContentLoaded', () => {
    let currentPlayer = 'X';
    let gameActive = false;
    const boxes = document.querySelectorAll('.box');
    const header = document.querySelector('h1');

    header.style.cursor = 'pointer';

    function startGame() {
      gameActive = true;
      currentPlayer = 'X'; // Reset to player X
      boxes.forEach(box => {
        box.textContent = '';
      });
      header.textContent = "WHO'S GONNA WIN?";
    }

    function handleBoxClick(event) {
      const box = event.target;
      if (!gameActive || box.textContent) return;
      
      box.textContent = currentPlayer;
      if (checkWin()) {
        header.textContent = `${currentPlayer} Wins!`;
        gameActive = false;
        setTimeout(() => {
          header.textContent = 'NEW GAME LOADING...';
          setTimeout(startGame, 2000); // Restart game after 2 seconds
        }, 2000); // Change message after 2 seconds
        return;
      }
      if (Array.from(boxes).every(box => box.textContent)) {
        header.textContent = 'IT\'S A TIE!';
        gameActive = false;
        setTimeout(() => {
          header.textContent = 'NEW GAME LOADING...';
          setTimeout(startGame, 2000); // Restart game after 2 seconds
        }, 2000); // Change message after 2 seconds
        return;
      }
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function checkWin() {
      const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
      ];
      
      return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return boxes[a].textContent &&
               boxes[a].textContent === boxes[b].textContent &&
               boxes[a].textContent === boxes[c].textContent;
      });
    }

    header.addEventListener('click', startGame);
    boxes.forEach(box => box.addEventListener('click', handleBoxClick));
  });

  