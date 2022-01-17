import { Nanny,html } from 'https://cdn.skypack.dev/nanny-state';
import { questions } from './questions.js'

function shuffle(array){
    const a = [...array]
    for(let i = a.length-1,r;i;i--){
      r = ~~(Math.random()*(i+1));
      [a[i],a[r]] = [a[r],a[i]]
    }
    return a
  }
  
  function questionsShuffle(array){
    const shuffledQuestions = shuffle(array)
    const question = shuffledQuestions[0]
    const options = shuffle(shuffledQuestions.slice(0,4))
    return {question, options}
  }
  
  const View = state => html`
  <h1>Multiple Choice Quiz</h1>
  <h2> Capital Cities </h2>
  ${state.started ? html`<h2 class="questionSection">What is the Capital of ${state.question.country}?</h2>
  <div class="answer-section">
    ${state.options.map((option) => html`<button onclick=${answer(option.capital)}>${option.capital}</button>`)}
    ${state.result}
  </div>
  <div class ="buttons">
    <button onclick=${e => Update({started: false})}><span>END</span></button>
  </div>
  `:
  html`
  <div class="buttons"><button onclick=${e => Update(startQuestions)}><span>START</span></button></div>`}`
  
  const State = {
    started: false,
    questions,
    View
  }
  
  const startQuestions = state => ({
    started: true,
    ...questionsShuffle(state.questions),
  })
  
  const answer = answer => event => {
    Update(checkAnswer(answer))
    setTimeout(()=>Update(nextQuestion), 700)
  }
  
  const checkAnswer = answer => state => ({
    result: answer === state.question.capital ? '✅': '❌'
  })
  
  const nextQuestion = state => ({
    ...questionsShuffle(state.questions),
    result: '',
  })
  
  const Update = Nanny(State)