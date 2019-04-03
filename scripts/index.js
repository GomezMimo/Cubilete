/**
 * Inicitialize Cubilete functionality.
 * @class Cubilete
 */
class Cubilete {
    constructor(document) {
        this.sendButton = document.querySelector('#send-form__button');
        this.diceValues = [7, 8, 9, 10, 11, 12];
        this.literalDiceValues = {
            7: 7,
            8: 8,
            9: 'J',
            10: 'Q',
            11: 'K',
            12: 'AS'
        };
        this.gameMoves = [
            {
                name: 'carabina de Ases',
                move: [12, 12, 12, 12, 12]
            },
            {
                name: 'carabina de Reyes',
                move: [11, 11, 11, 11, 11]
            },
            {
                name: 'carabina de Reyes sucia',
                move: [12, 12, 11, 11, 11]
            }
        ];
        this.playersInformation = [];
        this.dicesToBeChanged = [];
        this.tableOfResultsContainer = document.querySelector('.table-of-results__container');
        this.gameContainer = document.querySelector('.play-game-content__container');
        this.playerPosition = 0;
        this.attempts = 0;
        this.sendButton.addEventListener('click', () => {
            this.sendForm();
        });
        this.round = 1;
    }

    sendForm() {
        const numberOfPlayersInput = document.querySelector('.number-of-players__input');
        const numberOfPlayers = numberOfPlayersInput.value;
        this.gameContainer = document.querySelector('.play-game-content__container');
        let players = '';
        this.gameContainer.innerHTML += `<div class="game-content__title-container">
                    <h1 class="game-content__title">Comienzo del juego</h1>
                        <ul>
                            <li>Comienza el juego el jugador con mayor puntaje en el dado</li>
                        </ul>
                </div>
        `;

        if (numberOfPlayers > 1 && numberOfPlayers < 6) {
            for (let i = 0; i < numberOfPlayers; i++) {
                this.playersInformation.push({
                   name: `Jugador #${i + 1}`,
                   diceSum: 0,
                   points: 0
                });

                players += `
                             <div class='player-board player-board-grill-${numberOfPlayers}'>
                                <h2>${this.playersInformation[i].name}</h2>
                                <div class="dice__container"><span class="dice__value" id="dice_value_${i}">${this.literalDiceValues[12]}</span></div>                             
                                <button class="player-play__button">Tirar</button>
                            </div>
                `;
            }

            if (players) {
                this.gameContainer.innerHTML += players;
                this.sendButton.classList.add('hide-element');
                numberOfPlayersInput.classList.add('hide-element');

                const throwDiceButtons = Array.from(document.querySelectorAll('.player-play__button'));

                throwDiceButtons.forEach((button, index) => {
                    const diceValue = document.getElementById(`dice_value_${index}`);
                    button.addEventListener('click', () => {
                        const newDiceValue = this.getRandomDiceValue();
                        diceValue.innerText = this.literalDiceValues[newDiceValue];
                        this.playersInformation[index].diceValue = newDiceValue;
                        button.disabled = true;

                        this.orderPlayerPositions();
                    })
                });

            }
        } else {
            this.gameContainer.innerHTML = `<div>Ingrese un valor entre 2 y 5</div>`
        }
    }

    getRandomDiceValue() {
        const randomNumber = Math.floor(Math.random () * 6);
        return this.diceValues[randomNumber];
    }

    orderPlayerPositions() {
        this.playersInformation = this.playersInformation.sort((a, b) => b.diceValue - a.diceValue);
        this.tableOfResultsContainer.innerHTML = this.paintTable(this.playersInformation, 'Turnos', 'Turno', 'Nombre', 'Carta');
        const playersInGame = this.playersInformation.filter(player => player.diceValue !== undefined);

        if (playersInGame.length === this.playersInformation.length) {
            this.tableOfResultsContainer.innerHTML += `<button class="continue-game__button">Continuar</button>`;

            const continueButton = document.querySelector('.continue-game__button');
            continueButton.addEventListener('click', () => {
               this.playByRoundsGame();
            });
        }
    }

    playByRoundsGame() {
        const winner = this.playersInformation.find(player => player.points >= 10);
        const playerInGame = this.playersInformation[this.playerPosition];
        const gameTitle = document.querySelector('.game-content__title-container');
        playerInGame.handGame = [];

        for(let i = 0; i < 5; i++) {
            playerInGame.handGame.push({
                id: i,
                value: this.getRandomDiceValue()
            });
        }

        if(!winner) {
            this.gameContainer.innerHTML = `<div class='player-in-game__board'>
                                <h2>${this.playersInformation[this.playerPosition].name}</h2>
                                <div>
                                    <div class="dice-in-game__container"><div class="dice__container"><span class="dice__value" id=0>${this.literalDiceValues[playerInGame.handGame[0].value]}</span></div></div>
                                    <div class="dice-in-game__container"><div class="dice__container"><span class="dice__value" id=1>${this.literalDiceValues[playerInGame.handGame[1].value]}</span></div></div>
                                    <div class="dice-in-game__container"><div class="dice__container"><span class="dice__value" id=2>${this.literalDiceValues[playerInGame.handGame[2].value]}</span></div></div>
                                    <div class="dice-in-game__container"><div class="dice__container"><span class="dice__value" id=3>${this.literalDiceValues[playerInGame.handGame[3].value]}</span></div></div>
                                    <div class="dice-in-game__container"><div class="dice__container"><span class="dice__value" id=4>${this.literalDiceValues[playerInGame.handGame[4].value]}</span></div></div>
                                </div>
                                <div class="game-buttons__container">
                                    <button class="repeat-move__button" disabled="true">Volver a tirar</button>
                                    <button class="complete__button" >Completar Juego</button>
                                    <button class="next-player__button">Siguiente jugador</button>  
                                </div>
                            </div>`;

            document.querySelector('.next-player__button').addEventListener('click', () => {
                if (this.playerPosition >= this.playersInformation.length - 1) {
                    this.updatePoints();
                    this.playerPosition = 0;
                    this.round++;
                } else {
                    this.playerPosition++;
                }

                this.attempts = 0;
                this.playByRoundsGame();
            });

            const diceContainers = Array.from(document.querySelectorAll('.dice__container'));
            const repeatMoveButton = document.querySelector('.repeat-move__button');

            document.querySelector('.complete__button').addEventListener('click', this.checkHandValues.bind(this));

            diceContainers.forEach(container => {
                container.addEventListener('click', () => this.diceClickedToggle(container));
            });

            repeatMoveButton.addEventListener('click', this.generateNewDiceValues.bind(this));
        } else {
            alert(`Felicidades, el ganador es el ${winner.name} con un total de ${winner.points}`);
        }

        let tableResultsContent = `<h3>Ronda ${this.round}</h3>`
        tableResultsContent += `<table><tr><th colspan="4">Puntajes</th></tr><tr><th>Turno</th><th>Nombre</th><th>Juego</th><th>Puntos</th></tr>`;

        this.playersInformation.forEach((result, index) => {
            let hand = '';

            if (result.handGame) {
                result.handGame.forEach(game => {
                    hand += ` ${this.literalDiceValues[game.value]}`
                });
            } else {
                hand = '-';
            }

            tableResultsContent += `                                
                                <tr>
                                    <td>${index + 1}</td>
                                    <td>${result.name}</td>
                                    <td class="hand-game__table-data">${hand}</td>
                                    <td class="points-cell-${index}">${result.points}</td>
                                </tr>
                
            `;
        });

        tableResultsContent += `</table>`;

        this.tableOfResultsContainer.innerHTML = tableResultsContent;
    }

    diceClickedToggle(container) {
        const repeatMoveButton = document.querySelector('.repeat-move__button');
        const cardId = container.childNodes[0].id;
        container.classList.toggle('dice__container-clicked');

        if (container.classList.contains('dice__container-clicked')) {
            this.dicesToBeChanged.push({
                cardId
            });
        } else {
            const diceClickedToBeRemoved = this.dicesToBeChanged.find(dice => dice.cardId === cardId);
            this.dicesToBeChanged.splice(this.dicesToBeChanged.indexOf(diceClickedToBeRemoved), 1);
        }

        repeatMoveButton.disabled = this.dicesToBeChanged.length <= 0;

        if (this.attempts >= 3) {
            const dices = Array.from(document.querySelectorAll('.dice__container'));
            dices.forEach(dice => dice.classList.add('avoid-click'));
        }
    }

    generateNewDiceValues() {
        const dicesTobeToggled = [];

        if (this.dicesToBeChanged) {
            const playerInformation = this.playersInformation[this.playerPosition];
            const tableDataGame = document.querySelector('.hand-game__table-data');

            this.dicesToBeChanged.forEach(dice => {
                const diceElementById = document.getElementById(`${dice.cardId}`);
                const diceObjectElementById = playerInformation.handGame.find(handDice => handDice.id === Number(dice.cardId));

                diceObjectElementById.value = this.getRandomDiceValue();
                diceElementById.innerHTML = this.literalDiceValues[diceObjectElementById.value];
                dicesTobeToggled.push(diceElementById.parentNode);
            });

            let hand = '';

            if (playerInformation.handGame) {
                playerInformation.handGame.forEach(game => {
                    hand += ` ${this.literalDiceValues[game.value]}`
                });
            } else {
                hand = '-';
            }

            tableDataGame.innerHTML = hand;

            this.attempts++;

            dicesTobeToggled.forEach(dice => this.diceClickedToggle(dice));
        }
    }

    checkHandValues() {
        const playerInGame = this.playersInformation[this.playerPosition];
        let points = 0;

        playerInGame.handGame.forEach(game => {
            points += game.value
        });

        if (points === 60) {
            playerInGame.points = 10;
        } else if (points === 55) {
            playerInGame.points = 5;
        } else {

        }
    }

    updatePoints() {
        this.playersInformation.forEach((player, index) => {
            player.diceSum = 0;
            player.handGame.forEach(game => {
                player.diceSum += game.value
            });
        });

        const playersInformation = this.playersInformation.slice();

        const roundWinner = playersInformation.sort((a, b) => {
            return b.diceSum - a.diceSum;
        });

        if (roundWinner[0].diceSum === 60) {
            roundWinner[0].points += 10;
        } else if (roundWinner[0].diceSum === 55) {
            roundWinner[0].points += 5;
        } else {
            roundWinner[0].points += 1;
        }
    }

    paintTable(iterableElement, titulo, th1, th2, th3) {
        let tableResultsContent = `<table><tr><th colspan="3">${titulo}</th></tr><tr><th>${th1}</th><th>${th2}</th><th>${th3}</th></tr>`;

        iterableElement.forEach((result, index) => {
            tableResultsContent += `                                
                                <tr>
                                    <td>${index + 1}</td>
                                    <td>${result.name}</td>
                                    <td>${this.literalDiceValues[result.diceValue]}</td>
                                </tr>
                
            `;
        });

        return tableResultsContent += `</table>`;
    }
}

module.exports = Cubilete;
