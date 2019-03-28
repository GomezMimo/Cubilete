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

        this.sendButton.addEventListener('click', () => {
            this.sendForm();
        });
    }

    sendForm() {
        const numberOfPlayersInput = document.querySelector('.number-of-players__input');
        const numberOfPlayers = numberOfPlayersInput.value;
        const gameContainer = document.querySelector('.play-game-content__container');
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
                gameContainer.innerHTML = players;
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
            gameContainer.innerHTML = `<div>Ingrese un valor entre 2 y 5</div>`
        }
    }

    getRandomDiceValue() {
        const randomNumber = Math.floor(Math.random () * 6);
        return this.diceValues[randomNumber];
    }

    orderPlayerPositions() {
        const tableOfResultsContainer = document.querySelector('.table-of-results__container');
        const tableOfResults = this.playersInformation.sort((a, b) => b.diceValue - a.diceValue);
        let tableResultsContent = `<table><tr><th colspan="2">Turnos</th></tr><tr><th>Nombre</th><th>Carta</th></tr>`;

        tableOfResults.forEach(result => {
            tableResultsContent += `                                
                                <tr>
                                    <td>${result.name}</td>
                                    <td>${this.literalDiceValues[result.diceValue]}</td>
                                </tr>
                
            `;
        });
        tableResultsContent += `</table>`;

        tableOfResultsContainer.innerHTML = tableResultsContent;
    }
}

module.exports = Cubilete;