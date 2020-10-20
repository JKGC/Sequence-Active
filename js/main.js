const green = document.getElementById('green')
const blue = document.getElementById('blue')
const orange = document.getElementById('orange')
const magenta = document.getElementById('magenta')
const btnEmpezar = document.getElementById('btnEmpezar')
const topLevelSelect = document.querySelector("body > header > div.levelMax > h2:nth-child(2)")
const gamerName = document.querySelector("body > header > div.character > h2:nth-child(2)")
const levelCurrent = document.querySelector("body > header > div.levelUp > h2:nth-child(2)")
const levelActive = document.querySelector("body > header > div.levelUp > h2:nth-child(1)")
const levelContent = document.querySelector("body > header > div.levelUp")
const boxes = document.querySelector("body > main > section > section")

let difficultySelect
let characterName
let difficultyLevel = async () => {
    
    let inputOptions = new Promise((resolve) => {
        setTimeout(() => {
        resolve({
            1: 'Facil',
            10: 'Normal',
            20: 'Dificil'
        })
        }, 1000)
    })
    
    let { value: color } = await Swal.fire({
        title: 'Elige un nivel de dificultad',
        input: 'radio',
        inputOptions: inputOptions,
        inputValidator: (value) => {
        if (!value) {
            return 'Necesitas elegir un nivel!'
        }
        }
    })
    if (color) {
        difficultySelect = Number(color)
        if(difficultySelect > 1) {
            Swal.fire({ html: `Empezaras con:  ${color} Secuencias` })
        } else {
            Swal.fire({ html: `Empezaras con:  ${color} Secuencia` })
        }
        levelMax()
    }
}
difficultyLevel()
const character = swal('Cual es tu nickname?', {
                    content: "input",
})
                 .then((value) => {
                    characterName = value
                    gamerName.textContent = characterName
                    if(characterName === null) {
                        characterName = ''
                        gamerName.textContent = characterName
                    }
});
let TOTAL_LEVEL
function levelMax (){
    if( difficultySelect === 1 ) {
        topLevelSelect.textContent = 15
        return TOTAL_LEVEL = 15
    } else if( difficultySelect === 10 ) {
        topLevelSelect.textContent = 30
        return TOTAL_LEVEL = 30
    } else if( difficultySelect === 20 ) {
        topLevelSelect.textContent = 60
        return TOTAL_LEVEL = 60
    }
}



class Game {
    constructor(){
        swal('Informacion', "recuerda esperar la alerta ( ! ) antes de que empieces a seguir la secuencia", 'warning', {
            button: 'Entendido'
        })
         .then( () => {
            this.gameStart()
            this.startSequence()
            setTimeout(() => {
                this.nextLevel()
            }, 1000);
         })
    }

    gameStart() {
        this.chosenColor = this.chosenColor.bind(this)
        this.toggleGameStartClass()
        this.level = difficultySelect
        levelCurrent.textContent = this.level
        this.colors = {
            green,
            blue,
            orange,
            magenta
        }
    }
    toggleGameStartClass() {
        if(btnEmpezar.classList.contains('hide')) {
            btnEmpezar.classList.remove('hide')
        } else {
            btnEmpezar.classList.add('hide')
            this.addClassBoxs()
        }

    }
    addClassBoxs() {
        boxes.classList.add('ongame')
    }
    startSequence() {
        this.sequence = new Array(TOTAL_LEVEL).fill(0).map( n => Math.floor(Math.random() * 4)) 
    }
    nextLevel() {
        this.subLevel = 0
        this.illuminateSequence()
    }
    changeNumberToColor(number) {
        switch (number) {
            case 0:
                return 'green'
            case 1:
                return 'blue'
            case 2:
                return 'orange'    
            case 3:
                return 'magenta'
        }
    }
    changeColorToNumber(color) {
        switch (color) {
            case 'green':
                return 0
            case 'blue':
                return 1
            case 'orange':
                return 2    
            case 'magenta':
                return 3
        }
    }
    illuminateSequence() {
        for (let i = 0; i < this.level; i++) {
            const color = this.changeNumberToColor(this.sequence[i])
            setTimeout(() => this.illuminateColor(color) , 1000 * i);
        }
        let time = this.level * 1000
        setTimeout(() => {
            swal(`Estas Listo?, ${characterName.charAt(0).toUpperCase() + characterName.slice(1)}.`, 'Espero recuerdes la secuencia', 'warning', {
                button: 'Si, Estoy listo'
            })
            this.addEventClick()
        }, time);
    }
    illuminateColor (color) {
        this.colors[color].classList.add('light')
        setTimeout(() => this.offColor(color), 350);
    }
    offColor (color) {
        this.colors[color].classList.remove('light')
    }
    addEventClick() {
        this.colors.green.addEventListener('click', this.chosenColor)
        this.colors.blue.addEventListener('click', this.chosenColor)
        this.colors.orange.addEventListener('click', this.chosenColor)
        this.colors.magenta.addEventListener('click', this.chosenColor)

    }
    removeEventClick() {
        this.colors.green.removeEventListener('click', this.chosenColor)
        this.colors.blue.removeEventListener('click', this.chosenColor)
        this.colors.orange.removeEventListener('click', this.chosenColor)
        this.colors.magenta.removeEventListener('click', this.chosenColor)
    }
    chosenColor(event) {
        const colorName = event.target.dataset.color
        const colorNumber = this.changeColorToNumber(colorName)
        if( colorNumber === this.sequence[this.subLevel]) {
            this.subLevel++
            if( this.subLevel === this.level) {
                this.level++
                this.removeEventClick()
                if(this.level === (TOTAL_LEVEL + 1)){
                    this.gameSuccess()
                    levelActive.textContent = 'Tu Nivel Actual es: '
                } else {
                    swal(`Excelente, ${characterName.charAt(0).toUpperCase() + characterName.slice(1)}.`, 'Vamos al siguiente nivel :D', 'success', {
                        button: 'Si, Vamos!!'
                    })
                        .then( () => {
                            levelCurrent.textContent = this.level
                            if(this.level === TOTAL_LEVEL) {
                                this.lastLevel()
                            }
                            setTimeout(() => this.nextLevel(), 800);
                        })
                }
            }
        } else {
                this.gameOver()
                this.removeEventClick()
        }
    }
    lastLevel() {
        levelContent.classList.add('levelColumn')
        levelContent.classList.remove('levelColumn')
        levelActive.textContent = '🔥🔥 ULTIMO NIVEL 🔥🔥'
    }
    gameSuccess() {
        swal(`Eres un Ganador, ${characterName.charAt(0).toUpperCase() + characterName.slice(1)}`, 'Ganaste el juego, felicidades', 'success', {
            button: 'Soy un Ganador'
        })
            .then( () => {
                this.addClassLevelContent()
                this.gameStart()
                this.removeClassBoxs()
            })
    }
    gameOver() {
        swal(`El juego ah acabado, lo sentimos ${characterName.charAt(0).toUpperCase() + characterName.slice(1)}`, 'Perdiste, será para la próxima :(', 'error', {
            button: 'Volver a intentarlo'
        })
            .then( () => {
                this.addClassLevelContent()
                this.gameStart()
                this.removeClassBoxs()
            })
    }
    addClassLevelContent() {
        levelCurrent.textContent = 0
        levelContent.classList.add('levelColumn')
        levelContent.classList.remove('levelColumn')
        levelActive.textContent = 'Tu Nivel Actual es: '
    }
    removeClassBoxs() {
        boxes.classList.remove('ongame')
    }
}

function empezarJuego () {
    let game = new Game
}
