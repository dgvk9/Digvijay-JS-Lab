class Quiz {
    constructor(questions) {
        this.score = 0;
        this.questions = questions;
        this.questionIndex = 0;
    }

    isEnded(){
        return this.questionIndex === this.questions.length;
    }

    getQuestionByIndex(){
        return this.questions[this.questionIndex];
    }

    checkOptionWithAnswer(answer){
        /*
            var question1 = question.getQuestionByIndex().isCorrectAnswer(ans);
        */
        if(this.getQuestionByIndex().isCorrectAnswer(answer)){
            this.score++;
        }
        this.questionIndex++;
    }
}



class Question {
    constructor(text, choices, answer) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }

    isCorrectAnswer(ans){
        return this.answer === ans;
    }
};

var questions = [
    new Question("Which is India national Bird?",
    ["Parrot", "Peacock", "Bulbul", "Barbet"],
    "Peacock"),
    new Question("Which is India national Animal?",
    ["Tiger", "Lion", "Elephant", "Wolf"],
    "Tiger"),
    new Question("Who is India Prime Minister?",
    ["Narendra Modi", "Rahul Ghandi", "Manmohan Singh", "Lal Krishna"],
    "Narendra Modi"),
    new Question("What is capital of India?",
    ["Mumbai", "Kolkatta", "New Delhi", "Chennai"],
    "New Delhi"),
    new Question("What is southernmost point ?",
    ["Indira point", "Modi Point", "Goa", "Bangalore"],
    "Indira point")
];

var quiz = new Quiz(questions);

function loadQuestions(){
    if(quiz.isEnded()){
        showScores();
    } else{ //display question
        var element = document.getElementById('question');
        element.innerHTML=quiz.getQuestionByIndex().text;

        var choices = quiz.getQuestionByIndex().choices;
        for(var i=0;i<choices.length;i++){
            var element = document.getElementById("choice" + i );
            element.innerHTML = choices[i];

            handleOptionButton("btn"+i, choices[i]);
        }

        showProgress();
    }
}

function showProgress(){
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById('progress');
    element.innerHTML = "Question " + currentQuestionNumber + "of " + quiz.questions.length;
}

function showScores(){
    var quizOver = "<h1>Results</h1>";
    quizOver += "<h2 id='score'>Your score is: " + quiz.score + " and your % is " +((quiz.score / questions.length)* 100) + "% </h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = quizOver;
}


function handleOptionButton(id, choice){
    var button = document.getElementById(id);
    button.onclick = function(){
        quiz.checkOptionWithAnswer(choice);
        loadQuestions();
    }
}


loadQuestions();