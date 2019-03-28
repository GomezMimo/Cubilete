/**
 * Inicitialize Navigation functionality.
 * @class Cubilete
 */
class Cubilete {
    constructor(document) {
        this.sendButton = document.querySelector('#send-form__button');
        this.diceValues = [7, 8, 'J', 'Q', 'K', 'AS'];

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
                players += `<div class='player-board player-board-grill-${numberOfPlayers}'>
                                <h2>Jugador #${i + 1}</h2>
                                <div class="dice__container"><span class="dice__value" id="dice_value${i}">${this.diceValues[5]}</span></div>                             
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
                        diceValue.innerText = this.getRandomDiceValue();;

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
}

module.exports = Cubilete;