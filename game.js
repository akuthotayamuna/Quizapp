const question=document.getElementById("question");
const choices= Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById("progressBarFull");

let currentQuestion ={};
let acceptingAnswers =false;
let score =0;
let questionCounter =0;
let availableQuestions =[];

let questions =[
    {
    question: "Javascript ??",
    choice1: "<script>",
    choice2:"<javascript>",
    choice3:"<js>",
    choice4:"<scripting>",
    answer:1
    },
    {
    question: "xxx.js ??",
    choice1: "<script href='xxx.js'>",
    choice2:"<script name='xxx.js'>",
    choice3:"<script src='xxx.js'>",
    choice4:"<script file='xxx.js'>",
    answer:3
    },
    {
    question: "alert box ??",
    choice1: "msgBox('Hello world');",
    choice2:"alertBox('Hello world');",
    choice3:"msg('Hello world');",
    choice4:"alert('Hello world');",
    answer:3
    }
];

/*constants*/
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter=0;
    score=0;
    availableQuestions=[...questions];
    getNewQuestion();

};
getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
        //GO TO THE END PAGE//
        return window.location.assign("/end.html");
    }
    questionCounter++;
    progressText.innerText = "Question "+questionCounter +"/"+MAX_QUESTIONS; 
    
    //update the progress bar//

    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100} %` ;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText=currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e=> {
        if(!acceptingAnswers) return;

        acceptingAnswers =false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if(classToApply === "current"){
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);
       
        setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();
    }, 1000);
    });
});

incrementScore = num =>{
    score+=num;
    scoreText.innerText=score;
}
startGame();
