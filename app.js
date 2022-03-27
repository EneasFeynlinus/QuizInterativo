const form = document.querySelector('.quiz-form')
const finalScoreContainer = document.querySelector('.final-score-container')
const answer = document.querySelectorAll('input')
const correctAnswers = ['D', 'C', 'C', 'B']

let score = 0

const getUserAnswers = () => {
    let userAnswers = []

    correctAnswers.forEach((_, index) => {
        const userAnswer = form[`inputQuestion${index + 1}`].value
        userAnswers.push(userAnswer)
    })

    return userAnswers

}

const calculateUserScore = userAnswers => {
    userAnswers.forEach((userAnswer, index) => {
        const isUserAnswerCorrect = userAnswer === correctAnswers[index]
        if (isUserAnswerCorrect) {
            score += 25
        }
    })
}

const showFinalScore = () => {

    scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'

    })
    finalScoreContainer.classList.remove('d-none')
}

const animateFinalScore = () => {
    let counter = 0

    const timer = setInterval(() => {

        if (score === counter) {
            clearInterval(timer)
        }

        if (score >= 50) {

            changefinalScoreContainerColor('text-success', counter++)

        } else if (score < 50) {

            changefinalScoreContainerColor('text-danger', counter++)
        }



    }, 20)
}

const changefinalScoreContainerColor = (className, counter) => {
    finalScoreContainer.querySelector('span').setAttribute('class', className)
    finalScoreContainer.querySelector('span').textContent = `${counter}`
}


form.addEventListener('submit', event => {
    event.preventDefault()

    const userAnswers = getUserAnswers()

    calculateUserScore(userAnswers)
    showFinalScore()
    animateFinalScore()

})

Array.from(answer).forEach(radio => {
    radio.addEventListener('click', event => {

        event.target.parentElement.classList.add('clicked-change')
    
    })
})

