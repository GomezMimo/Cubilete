/**
 * Inicitialize Navigation functionality.
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
            12: 'AS',
            100: '-'
        };
        this.playersInformation = [];
        this.tableOfResultsContainer = document.querySelector('.table-of-results__container');
        this.gameContainer = document.querySelector('.play-game-content__container');
        this.playerPosition = 0;

        this.sendButton.addEventListener('click', () => {
            this.sendForm();
        });
    }

    sendForm() {
        const numberOfPlayersInput = document.querySelector('.number-of-players__input');
        const numberOfPlayers = numberOfPlayersInput.value;
        this.gameContainer = document.querySelector('.play-game-content__container');
        let players = '';

        if (numberOfPlayers > 1 && numberOfPlayers < 6) {
            for (let i = 0; i < numberOfPlayers; i++) {
                this.playersInformation.push({
                   name: `Jugador #${i + 1}`
                });

                players += `<div class='player-board player-board-grill-${numberOfPlayers}'>
                                <h2>${this.playersInformation[i].name}</h2>
                                <div class="dice__container"><span class="dice__value" id="dice_value${i}">${this.literalDiceValues[12]}</span></div>                             
                                <button class="player-play__button">Tirar</button>
                            </div>`;
            }

            if (players) {
                this.gameContainer.innerHTML = players;
                this.sendButton.classList.add('hide-element');
                numberOfPlayersInput.classList.add('hide-element');

                const throwDiceButtons = Array.from(document.querySelectorAll('.player-play__button'));

                throwDiceButtons.forEach((button, index) => {
                    const diceValue = document.getElementById(`dice_value${index}`);
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
        let playersInGame = 0;

        this.tableOfResultsContainer.innerHTML = this.paintTable(this.playersInformation, 'Turnos', 'Turno', 'Nombre', 'Carta');

        if (playersInGame === this.playersInformation.length) {
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
        playerInGame.firstValueDice = this.getRandomDiceValue();
        playerInGame.secondValueDice = this.getRandomDiceValue();
        playerInGame.thirdValueDice = this.getRandomDiceValue();
        playerInGame.fourthValueDice = this.getRandomDiceValue();
        playerInGame.fifthValueDice = this.getRandomDiceValue();

        if(!winner) {
            this.gameContainer.innerHTML = `<div class='player-in-game__board'>
                                <h2>${this.playersInformation[this.playerPosition].name}</h2>
                                <div>
                                    <div class="dice-in-game__container"><div class="dice__container"><span class="dice__value" id="dice_value${0}">${this.literalDiceValues[playerInGame.firstValueDice]}</span></div></div>
                                    <div class="dice-in-game__container"><div class="dice__container"><span class="dice__value" id="dice_value${0}">${this.literalDiceValues[playerInGame.secondValueDice]}</span></div></div>
                                    <div class="dice-in-game__container"><div class="dice__container"><span class="dice__value" id="dice_value${0}">${this.literalDiceValues[playerInGame.thirdValueDice]}</span></div></div>
                                    <div class="dice-in-game__container"><div class="dice__container"><span class="dice__value" id="dice_value${0}">${this.literalDiceValues[playerInGame.fourthValueDice]}</span></div></div>
                                    <div class="dice-in-game__container"><div class="dice__container"><span class="dice__value" id="dice_value${0}">${this.literalDiceValues[playerInGame.fifthValueDice]}</span></div></div>
                                </div>
                                <button class="next-player__button">Tirar</button>
                            </div>`;

            document.querySelector('.next-player__button').addEventListener('click', () => {
                if (this.playerPosition >= this.playersInformation.length - 1) {
                    this.playerPosition = 0;
                } else {
                    this.playerPosition++;
                }

                this.playByRoundsGame();
            })
        } else {
            alert('congratulations Mr Tanaka, you are an engineer');
        }

        this.tableOfResultsContainer.innerHTML = this.paintTable(this.playersInformation, 'Turnos', 'Turno', 'Nombre', 'Puntos');
    }

    paintTable(iterableElement, titulo, th1, th2, th3) {
        let tableResultsContent = `<table><tr><th colspan="3">${titulo}</th></tr><tr><th>${th1}</th><th>${th2}</th><th>${th3}</th></tr>`;
        let playersInGame = 0;

        iterableElement.forEach((result, index) => {
            if (this.literalDiceValues[result.diceValue] !== undefined) {
                playersInGame++;
            }

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