document.addEventListener('DOMContentLoaded', function() {
    // Modal functionality
    const modals = document.querySelectorAll('.modal');
    const modalLinks = document.querySelectorAll('.game-card a');
    const closeButtons = document.querySelectorAll('.close');
    
    modalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            document.querySelector(target).style.display = 'block';
        });
    });
    
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });
    
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
    
    // Initialize all games when their modals are opened
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
            }
        });
        
        // Initialize game when modal opens
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.attributeName === 'style') {
                    const displayStyle = window.getComputedStyle(modal).getPropertyValue('display');
                    if (displayStyle === 'block') {
                        switch(modal.id) {
                            case 'memory-match':
                                initMemoryGame();
                                break;
                            case '2048-puzzle':
                                init2048Game();
                                break;
                            case 'snake-game':
                                initSnakeGame();
                                break;
                            case 'basketball':
                                initBasketballGame();
                                break;
                            case 'space-invaders':
                                initSpaceInvaders();
                                break;
                        }
                    }
                }
            });
        });
        
        observer.observe(modal, { attributes: true });
    });
    
    // 1. Memory Match Game
    function initMemoryGame() {
        const memoryGame = document.querySelector('.memory-game');
        const movesDisplay = document.getElementById('moves');
        const pairsFoundDisplay = document.getElementById('pairs-found');
        const restartButton = document.getElementById('restart-memory');
        
        let cards = ['🍎', '🍌', '🍒', '🍓', '🍊', '🍋', '🍐', '🍉'];
        cards = [...cards, ...cards]; // Duplicate for pairs
        let flippedCards = [];
        let matchedPairs = 0;
        let moves = 0;
        let canFlip = true;
        
        // Shuffle cards
        cards = shuffleArray(cards);
        
        // Create game board
        memoryGame.innerHTML = '';
        cards.forEach((card, index) => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('memory-card');
            cardElement.dataset.index = index;
            cardElement.dataset.value = card;
            cardElement.textContent = '?';
            cardElement.addEventListener('click', flipCard);
            memoryGame.appendChild(cardElement);
        });
        
        function flipCard() {
            if (!canFlip || this.classList.contains('flipped') || this.classList.contains('matched')) return;
            
            this.classList.add('flipped');
            this.textContent = this.dataset.value;
            flippedCards.push(this);
            
            if (flippedCards.length === 2) {
                canFlip = false;
                moves++;
                movesDisplay.textContent = moves;
                
                if (flippedCards[0].dataset.value === flippedCards[1].dataset.value) {
                    // Match found
                    flippedCards.forEach(card => {
                        card.classList.add('matched');
                    });
                    matchedPairs++;
                    pairsFoundDisplay.textContent = matchedPairs;
                    flippedCards = [];
                    canFlip = true;
                    
                    if (matchedPairs === 8) {
                        setTimeout(() => {
                            alert(`Congratulations! You won in ${moves} moves!`);
                        }, 500);
                    }
                } else {
                    // No match
                    setTimeout(() => {
                        flippedCards.forEach(card => {
                            card.classList.remove('flipped');
                            card.textContent = '?';
                        });
                        flippedCards = [];
                        canFlip = true;
                    }, 1000);
                }
            }
        }
        
        restartButton.addEventListener('click', initMemoryGame);
        
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }
    }
    
   // 2048 Game Logic
   class Game2048 {
       constructor() {
           this.grid = Array(4).fill().map(() => Array(4).fill(0));
           this.score = 0;
           this.setupEventListeners();
           this.initGame();
       }

       initGame() {
           this.grid = Array(4).fill().map(() => Array(4).fill(0));
           this.score = 0;
           this.addRandomTile();
           this.addRandomTile();
           this.updateDisplay();
       }

       addRandomTile() {
           const emptyCells = [];
           for (let i = 0; i < 4; i++) {
               for (let j = 0; j < 4; j++) {
                   if (this.grid[i][j] === 0) emptyCells.push({ i, j });
               }
           }
           if (emptyCells.length > 0) {
               const { i, j } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
               this.grid[i][j] = Math.random() < 0.9 ? 2 : 4;
           }
       }

       move(direction) {
           let moved = false;
           const oldGrid = JSON.stringify(this.grid);

           // Transpose grid if moving vertically
           if (direction === 'up' || direction === 'down') {
               this.grid = this.transpose(this.grid);
           }

           // Reverse rows if moving right or down
           if (direction === 'right' || direction === 'down') {
               this.grid = this.grid.map(row => row.reverse());
           }

           // Process each row
           for (let i = 0; i < 4; i++) {
               let row = this.grid[i].filter(cell => cell !== 0);

               // Merge cells
               for (let j = 0; j < row.length - 1; j++) {
                   if (row[j] === row[j + 1]) {
                       row[j] *= 2;
                       this.score += row[j];
                       row.splice(j + 1, 1);
                       row.push(0);
                   }
               }

               // Fill with zeros
               while (row.length < 4) row.push(0);
               this.grid[i] = row;
           }

           // Reverse transformations
           if (direction === 'right' || direction === 'down') {
               this.grid = this.grid.map(row => row.reverse());
           }
           if (direction === 'up' || direction === 'down') {
               this.grid = this.transpose(this.grid);
           }

           if (JSON.stringify(this.grid) !== oldGrid) {
               this.addRandomTile();
               moved = true;
           }

           this.updateDisplay();
           return moved;
       }

       transpose(matrix) {
           return matrix[0].map((_, i) => matrix.map(row => row[i]));
       }

       updateDisplay() {
           const gridContainer = document.getElementById('grid');
           gridContainer.innerHTML = '';

           this.grid.forEach(row => {
               const rowDiv = document.createElement('div');
               rowDiv.className = 'grid-row';
               row.forEach(cell => {
                   const cellDiv = document.createElement('div');
                   cellDiv.className = `grid-cell ${cell ? 'tile-' + cell : ''}`;
                   cellDiv.textContent = cell || '';
                   rowDiv.appendChild(cellDiv);
               });
               gridContainer.appendChild(rowDiv);
           });

           document.getElementById('score').textContent = this.score;
       }

       setupEventListeners() {
           document.addEventListener('keydown', (e) => {
               if (document.getElementById('2048-puzzle').style.display !== 'block') return;

               switch (e.key) {
                   case 'ArrowUp': this.move('up'); break;
                   case 'ArrowDown': this.move('down'); break;
                   case 'ArrowLeft': this.move('left'); break;
                   case 'ArrowRight': this.move('right'); break;
               }
           });

           document.getElementById('restart-btn').addEventListener('click', () => this.initGame());
       }
   }

   // Initialize 2048 game when modal opens
   const modal2048 = document.getElementById('2048-puzzle');
   let game2048 = null;

   modal2048.addEventListener('click', (e) => {
       if (e.target === modal2048 || e.target.classList.contains('close')) {
           modal2048.style.display = 'none';
       }
   });

   document.querySelectorAll('[href="#2048-puzzle"]').forEach(link => {
       link.addEventListener('click', () => {
           modal2048.style.display = 'block';
           if (!game2048) game2048 = new Game2048();
           else game2048.initGame();
       });
   });

   // Other game initializations remain the same


    // 3. Snake Game
    function initSnakeGame() {
        const canvas = document.getElementById('snake-canvas');
        const ctx = canvas.getContext('2d');
        const scoreDisplay = document.getElementById('snake-score');
        const highScoreDisplay = document.getElementById('snake-high-score');
        const restartButton = document.getElementById('restart-snake');
        
        const box = 20;
        let snake = [];
        let direction = null;
        let food = {};
        let score = 0;
        let highScore = localStorage.getItem('snakeHighScore') || 0;
        let game;
        
        highScoreDisplay.textContent = highScore;
        
        function initGame() {
            snake = [
                {x: 9 * box, y: 10 * box}
            ];
            direction = null;
            score = 0;
            scoreDisplay.textContent = score;
            createFood();
            
            if (game) clearInterval(game);
            game = setInterval(draw, 100);
        }
        
        function createFood() {
            food = {
                x: Math.floor(Math.random() * (canvas.width / box)) * box,
                y: Math.floor(Math.random() * (canvas.height / box)) * box
            };
            
            // Make sure food doesn't appear on snake
            for (let i = 0; i < snake.length; i++) {
                if (food.x === snake[i].x && food.y === snake[i].y) {
                    createFood();
                    return;
                }
            }
        }
        
        function draw() {
            // Clear canvas
            ctx.fillStyle = '#f0f0f0';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Draw snake
            for (let i = 0; i < snake.length; i++) {
                ctx.fillStyle = i === 0 ? 'green' : 'lightgreen';
                ctx.fillRect(snake[i].x, snake[i].y, box, box);
                
                ctx.strokeStyle = 'white';
                ctx.strokeRect(snake[i].x, snake[i].y, box, box);
            }
            
            // Draw food
            ctx.fillStyle = 'red';
            ctx.fillRect(food.x, food.y, box, box);
            
            // Move snake
            let snakeX = snake[0].x;
            let snakeY = snake[0].y;
            
            if (direction === 'LEFT') snakeX -= box;
            if (direction === 'UP') snakeY -= box;
            if (direction === 'RIGHT') snakeX += box;
            if (direction === 'DOWN') snakeY += box;
            
            // Check collision with food
            if (snakeX === food.x && snakeY === food.y) {
                score++;
                scoreDisplay.textContent = score;
                createFood();
            } else {
                snake.pop();
            }
            
            // Add new head
            const newHead = {x: snakeX, y: snakeY};
            snake.unshift(newHead);
            
            // Check collision with walls or self
            if (
                snakeX < 0 || snakeY < 0 || 
                snakeX >= canvas.width || snakeY >= canvas.height ||
                collision(newHead, snake)
            ) {
                clearInterval(game);
                
                if (score > highScore) {
                    highScore = score;
                    localStorage.setItem('snakeHighScore', highScore);
                    highScoreDisplay.textContent = highScore;
                }
                
                setTimeout(() => {
                    alert(`Game Over! Score: ${score}`);
                }, 100);
            }
        }
        
        function collision(head, array) {
            for (let i = 1; i < array.length; i++) {
                if (head.x === array[i].x && head.y === array[i].y) {
                    return true;
                }
            }
            return false;
        }
        
        // Controls
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft' && direction !== 'RIGHT') {
                direction = 'LEFT';
            } else if (e.key === 'ArrowUp' && direction !== 'DOWN') {
                direction = 'UP';
            } else if (e.key === 'ArrowRight' && direction !== 'LEFT') {
                direction = 'RIGHT';
            } else if (e.key === 'ArrowDown' && direction !== 'UP') {
                direction = 'DOWN';
            }
        });
        
        // Touch controls for mobile
        let touchStartX = 0;
        let touchStartY = 0;
        
        document.addEventListener('touchstart', function(e) {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        });
        
        document.addEventListener('touchend', function(e) {
            if (!touchStartX || !touchStartY) return;
            
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            
            const diffX = touchStartX - touchEndX;
            const diffY = touchStartY - touchEndY;
            
            if (Math.abs(diffX) > Math.abs(diffY)) {
                // Horizontal swipe
                if (diffX > 0 && direction !== 'RIGHT') {
                    direction = 'LEFT';
                } else if (diffX < 0 && direction !== 'LEFT') {
                    direction = 'RIGHT';
                }
            } else {
                // Vertical swipe
                if (diffY > 0 && direction !== 'DOWN') {
                    direction = 'UP';
                } else if (diffY < 0 && direction !== 'UP') {
                    direction = 'DOWN';
                }
            }
        });
        
        restartButton.addEventListener('click', initGame);
        initGame();
    }
    
    // 4. Basketball Game
    function initBasketballGame() {
        const canvas = document.getElementById('basketball-canvas');
        const ctx = canvas.getContext('2d');
        const scoreDisplay = document.getElementById('basketball-score');
        const shotsDisplay = document.getElementById('basketball-shots');
        const accuracyDisplay = document.getElementById('basketball-accuracy');
        const restartButton = document.getElementById('restart-basketball');
        
        // Game variables
        let score = 0;
        let shots = 0;
        let ball = {
            x: canvas.width / 2,
            y: canvas.height - 30,
            radius: 15,
            dx: 0,
            dy: 0,
            gravity: 0.2,
            friction: 0.99,
            isThrown: false
        };
        
        // Hoop variables
        const hoop = {
            x: canvas.width / 2,
            y: 100,
            width: 80,
            height: 10,
            backboardWidth: 10,
            backboardHeight: 60
        };
        
        // Draw functions
        function drawBall() {
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'orange';
            ctx.fill();
            ctx.closePath();
        }
        
        function drawHoop() {
            // Backboard
            ctx.fillStyle = 'red';
            ctx.fillRect(
                hoop.x - hoop.backboardWidth / 2,
                hoop.y,
                hoop.backboardWidth,
                hoop.backboardHeight
            );
            
            // Rim
            ctx.fillStyle = 'black';
            ctx.fillRect(
                hoop.x - hoop.width / 2,
                hoop.y + hoop.backboardHeight,
                hoop.width,
                hoop.height
            );
            
            // Net (simplified)
            ctx.strokeStyle = 'white';
            ctx.beginPath();
            ctx.moveTo(hoop.x - hoop.width / 2, hoop.y + hoop.backboardHeight + hoop.height);
            ctx.lineTo(hoop.x, hoop.y + hoop.backboardHeight + hoop.height + 30);
            ctx.lineTo(hoop.x + hoop.width / 2, hoop.y + hoop.backboardHeight + hoop.height);
            ctx.stroke();
        }
        
        // Game logic
        function update() {
            if (!ball.isThrown) return;
            
            // Apply gravity
            ball.dy += ball.gravity;
            
            // Apply friction
            ball.dx *= ball.friction;
            
            // Update position
            ball.x += ball.dx;
            ball.y += ball.dy;
            
            // Wall collision
            if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
                ball.dx = -ball.dx * 0.8;
            }
            
            // Floor collision
            if (ball.y + ball.radius > canvas.height) {
                ball.y = canvas.height - ball.radius;
                ball.dy = -ball.dy * 0.6;
                ball.dx *= 0.8;
                
                // Stop ball if it's barely moving
                if (Math.abs(ball.dy) < 1) {
                    ball.isThrown = false;
                    ball.y = canvas.height - ball.radius;
                    ball.dy = 0;
                }
            }
            
            // Hoop collision (scoring)
            if (
                ball.y - ball.radius < hoop.y + hoop.backboardHeight + hoop.height &&
                ball.y + ball.radius > hoop.y + hoop.backboardHeight &&
                ball.x + ball.radius > hoop.x - hoop.width / 2 &&
                ball.x - ball.radius < hoop.x + hoop.width / 2
            ) {
                // Check if ball is going down through the hoop
                if (ball.dy > 0 && 
                    ball.y - ball.radius < hoop.y + hoop.backboardHeight + hoop.height / 2) {
                    score++;
                    scoreDisplay.textContent = score;
                    resetBall();
                }
            }
        }
        
        function resetBall() {
            ball.isThrown = false;
            ball.x = canvas.width / 2;
            ball.y = canvas.height - ball.radius;
            ball.dx = 0;
            ball.dy = 0;
        }
        
        function draw() {
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw elements
            drawHoop();
            drawBall();
            
            // Update game state
            update();
            
            // Continue animation
            requestAnimationFrame(draw);
        }
        
        // Controls
        let dragStart = null;
        
        canvas.addEventListener('mousedown', function(e) {
            if (ball.isThrown) return;
            
            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            // Check if mouse is on ball
            const dist = Math.sqrt(
                Math.pow(mouseX - ball.x, 2) + 
                Math.pow(mouseY - ball.y, 2)
            );
            
            if (dist <= ball.radius) {
                dragStart = {x: mouseX, y: mouseY};
            }
        });
        
        canvas.addEventListener('mousemove', function(e) {
            if (!dragStart || ball.isThrown) return;
            
            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            // Move ball with mouse
            ball.x = mouseX;
            ball.y = mouseY;
        });
        
        canvas.addEventListener('mouseup', function(e) {
            if (!dragStart || ball.isThrown) return;
            
            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            // Calculate throw velocity
            ball.dx = (dragStart.x - mouseX) * 0.2;
            ball.dy = (dragStart.y - mouseY) * 0.2;
            ball.isThrown = true;
            dragStart = null;
            
            // Update shots and accuracy
            shots++;
            shotsDisplay.textContent = shots;
            const accuracy = Math.round((score / shots) * 100) || 0;
            accuracyDisplay.textContent = `${accuracy}%`;
        });
        
        // Touch controls for mobile
        canvas.addEventListener('touchstart', function(e) {
            e.preventDefault();
            if (ball.isThrown) return;
            
            const rect = canvas.getBoundingClientRect();
            const touchX = e.touches[0].clientX - rect.left;
            const touchY = e.touches[0].clientY - rect.top;
            
            const dist = Math.sqrt(
                Math.pow(touchX - ball.x, 2) + 
                Math.pow(touchY - ball.y, 2)
            );
            
            if (dist <= ball.radius) {
                dragStart = {x: touchX, y: touchY};
            }
        });
        
        canvas.addEventListener('touchmove', function(e) {
            e.preventDefault();
            if (!dragStart || ball.isThrown) return;
            
            const rect = canvas.getBoundingClientRect();
            const touchX = e.touches[0].clientX - rect.left;
            const touchY = e.touches[0].clientY - rect.top;
            
            ball.x = touchX;
            ball.y = touchY;
        });
        
        canvas.addEventListener('touchend', function(e) {
            e.preventDefault();
            if (!dragStart || ball.isThrown) return;
            
            const rect = canvas.getBoundingClientRect();
            const touchX = e.changedTouches[0].clientX - rect.left;
            const touchY = e.changedTouches[0].clientY - rect.top;
            
            ball.dx = (dragStart.x - touchX) * 0.2;
            ball.dy = (dragStart.y - touchY) * 0.2;
            ball.isThrown = true;
            dragStart = null;
            
            shots++;
            shotsDisplay.textContent = shots;
            const accuracy = Math.round((score / shots) * 100) || 0;
            accuracyDisplay.textContent = `${accuracy}%`;
        });
        
        // Restart game
        function restartGame() {
            score = 0;
            shots = 0;
            scoreDisplay.textContent = score;
            shotsDisplay.textContent = shots;
            accuracyDisplay.textContent = '0%';
            resetBall();
        }
        
        restartButton.addEventListener('click', restartGame);
        
        // Start game
        draw();
    }
    
    // 5. Space Invaders Game
    function initSpaceInvaders() {
        const canvas = document.getElementById('space-invaders-canvas');
        const ctx = canvas.getContext('2d');
        const scoreDisplay = document.getElementById('space-score');
        const levelDisplay = document.getElementById('space-level');
        const livesDisplay = document.getElementById('space-lives');
        const restartButton = document.getElementById('restart-space');
        
        // Game variables
        let score = 0;
        let level = 1;
        let lives = 3;
        let gameOver = false;
        let gameLoop;
        
        // Player
        const player = {
            x: canvas.width / 2,
            y: canvas.height - 60,
            width: 50,
            height: 20,
            speed: 8,
            color: '#00FF00'
        };
        
        // Bullets
        let bullets = [];
        const bulletSpeed = 7;
        const bulletWidth = 4;
        const bulletHeight = 10;
        
        // Enemies
        let enemies = [];
        const enemyRows = 4;
        const enemyCols = 8;
        const enemyWidth = 40;
        const enemyHeight = 30;
        let enemySpeed = 1;
        let enemyDirection = 1; // 1 for right, -1 for left
        let enemyDropDistance = 20;
        
        // Initialize game
        function initGame() {
            score = 0;
            level = 1;
            lives = 3;
            gameOver = false;
            
            scoreDisplay.textContent = score;
            levelDisplay.textContent = level;
            livesDisplay.textContent = lives;
            
            player.x = canvas.width / 2;
            bullets = [];
            createEnemies();
            
            if (gameLoop) clearInterval(gameLoop);
            gameLoop = setInterval(update, 1000 / 60);
        }
        
        // Create enemies
        function createEnemies() {
            enemies = [];
            const padding = 20;
            const offsetTop = 60;
            const offsetLeft = 60;
            
            for (let r = 0; r < enemyRows; r++) {
                for (let c = 0; c < enemyCols; c++) {
                    enemies.push({
                        x: offsetLeft + c * (enemyWidth + padding),
                        y: offsetTop + r * (enemyHeight + padding),
                        width: enemyWidth,
                        height: enemyHeight,
                        color: r === 0 ? '#FF0000' : r === 1 ? '#FF7F00' : r === 2 ? '#FFFF00' : '#00FF00'
                    });
                }
            }
            
            enemySpeed = 1 + level * 0.2;
        }
        
        // Draw player
        function drawPlayer() {
            ctx.fillStyle = player.color;
            ctx.fillRect(
                player.x - player.width / 2,
                player.y - player.height / 2,
                player.width,
                player.height
            );
            
            // Draw player's ship details
            ctx.beginPath();
            ctx.moveTo(player.x, player.y - player.height / 2);
            ctx.lineTo(player.x + player.width / 2, player.y + player.height / 2);
            ctx.lineTo(player.x - player.width / 2, player.y + player.height / 2);
            ctx.closePath();
            ctx.fillStyle = '#006600';
            ctx.fill();
        }
        
        // Draw bullets
        function drawBullets() {
            ctx.fillStyle = '#FFFFFF';
            bullets.forEach(bullet => {
                ctx.fillRect(
                    bullet.x - bulletWidth / 2,
                    bullet.y - bulletHeight / 2,
                    bulletWidth,
                    bulletHeight
                );
            });
        }
        
        // Draw enemies
        function drawEnemies() {
            enemies.forEach(enemy => {
                ctx.fillStyle = enemy.color;
                ctx.fillRect(
                    enemy.x - enemy.width / 2,
                    enemy.y - enemy.height / 2,
                    enemy.width,
                    enemy.height
                );
                
                // Draw enemy details
                ctx.fillStyle = '#000000';
                ctx.fillRect(
                    enemy.x - enemy.width / 4,
                    enemy.y - enemy.height / 4,
                    enemy.width / 8,
                    enemy.height / 8
                );
                ctx.fillRect(
                    enemy.x + enemy.width / 8,
                    enemy.y - enemy.height / 4,
                    enemy.width / 8,
                    enemy.height / 8
                );
                ctx.fillRect(
                    enemy.x - enemy.width / 8,
                    enemy.y,
                    enemy.width / 4,
                    enemy.height / 8
                );
            });
        }
        
        // Update game state
        function update() {
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Move player
            if (keys.ArrowLeft && player.x > player.width / 2) {
                player.x -= player.speed;
            }
            if (keys.ArrowRight && player.x < canvas.width - player.width / 2) {
                player.x += player.speed;
            }
            
            // Move bullets
            bullets.forEach((bullet, index) => {
                bullet.y -= bulletSpeed;
                
                // Remove bullets that go off screen
                if (bullet.y < 0) {
                    bullets.splice(index, 1);
                }
            });
            
            // Move enemies
            let edgeReached = false;
            enemies.forEach(enemy => {
                enemy.x += enemySpeed * enemyDirection;
                
                // Check if any enemy reached the edge
                if (
                    enemy.x + enemy.width / 2 > canvas.width || 
                    enemy.x - enemy.width / 2 < 0
                ) {
                    edgeReached = true;
                }
                
                // Check if enemy reached bottom
                if (enemy.y + enemy.height / 2 > player.y - player.height / 2) {
                    gameOver = true;
                }
            });
            
            // Change direction if edge reached
            if (edgeReached) {
                enemyDirection *= -1;
                enemies.forEach(enemy => {
                    enemy.y += enemyDropDistance;
                });
            }
            
            // Check bullet-enemy collisions
            bullets.forEach((bullet, bulletIndex) => {
                enemies.forEach((enemy, enemyIndex) => {
                    if (
                        bullet.x + bulletWidth / 2 > enemy.x - enemy.width / 2 &&
                        bullet.x - bulletWidth / 2 < enemy.x + enemy.width / 2 &&
                        bullet.y + bulletHeight / 2 > enemy.y - enemy.height / 2 &&
                        bullet.y - bulletHeight / 2 < enemy.y + enemy.height / 2
                    ) {
                        // Remove bullet and enemy
                        bullets.splice(bulletIndex, 1);
                        enemies.splice(enemyIndex, 1);
                        
                        // Increase score
                        score += 10 * level;
                        scoreDisplay.textContent = score;
                        
                        // Check if all enemies are defeated
                        if (enemies.length === 0) {
                            level++;
                            levelDisplay.textContent = level;
                            createEnemies();
                        }
                    }
                });
            });
            
            // Draw everything
            drawPlayer();
            drawBullets();
            drawEnemies();
            
            // Check game over
            if (gameOver || lives <= 0) {
                clearInterval(gameLoop);
                setTimeout(() => {
                    alert(`Game Over! Final Score: ${score}`);
                }, 100);
            }
        }
        
        // Keyboard controls
        const keys = {
            ArrowLeft: false,
            ArrowRight: false,
            Space: false
        };
        
        document.addEventListener('keydown', function(e) {
            if (e.key in keys) {
                keys[e.key] = true;
                
                if (e.key === ' ' && !e.repeat) {
                    // Fire bullet
                    bullets.push({
                        x: player.x,
                        y: player.y - player.height / 2
                    });
                }
            }
        });
        
        document.addEventListener('keyup', function(e) {
            if (e.key in keys) {
                keys[e.key] = false;
            }
        });
        
        // Touch controls for mobile
        let touchX = 0;
        
        canvas.addEventListener('touchstart', function(e) {
            e.preventDefault();
            const rect = canvas.getBoundingClientRect();
            touchX = e.touches[0].clientX - rect.left;
        });
        
        canvas.addEventListener('touchmove', function(e) {
            e.preventDefault();
            const rect = canvas.getBoundingClientRect();
            const newTouchX = e.touches[0].clientX - rect.left;
            
            if (newTouchX < touchX - 10) {
                keys.ArrowLeft = true;
                keys.ArrowRight = false;
            } else if (newTouchX > touchX + 10) {
                keys.ArrowRight = true;
                keys.ArrowLeft = false;
            }
            
            touchX = newTouchX;
        });
        
        canvas.addEventListener('touchend', function(e) {
            e.preventDefault();
            keys.ArrowLeft = false;
            keys.ArrowRight = false;
            
            // Fire bullet on tap
            bullets.push({
                x: player.x,
                y: player.y - player.height / 2
            });
        });
        
        // Restart game
        restartButton.addEventListener('click', initGame);
        
        // Start game
        initGame();
    }
});