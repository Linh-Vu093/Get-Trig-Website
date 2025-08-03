const surveyJson = {
    title: "Trigonometry Quiz",
    showProgressBar: true,
    progressBarLocation: "bottom",
    ShowTimer: true,
    timeLimitPerPage: 10,
    timeLimit: 25,
    firstPageIsStartPage: true,
    startSurveyText: "Start Quiz",
    pages: [{
        elements: [{
            type: "html",
            html: "It's good practice to read and work out solutions to answer multiple choice questions.<br>Enter your name below and click <b>Start Quiz</b> to begin."
        }, {
            type: "text",
            name: "username",
            titleLocation: "hidden",
            isRequired: true
        }]
    }, {
        elements: [{
            type: "radiogroup",
            name: "MCQ1",
            title: "What is the exact value of tan(-45°)?",
            choices: [
                "1", "-1", "π/4", "1/√2"
            ],
            correctAnswer: "-1"
        }]
    }, {
        elements: [{
            type: "radiogroup",
            name: "MCQ2",
            title: "Convert π/4 radians to degrees.",
            choicesOrder: "random",
            choices: [
                "270°", "90°", "45°", "180°"
            ],
            correctAnswer: "45°"
        }]
    }, {
        elements: [{
            type: "radiogroup",
            name: "MCQ3",
            title: "What is 270° in radians?",
            title: "",
            choicesOrder: "random",
            choices: [
                "3π/2",
                "π",
                "π/2",
                "2π"
            ],
            correctAnswer: "3π/2"
        }]
    }],
    completedHtml: "<h4>You got <b>{correctAnswers}</b> out of <b>{questionCount}</b> correct answers.</h4>",
    completedHtmlOnCondition: [{
        expression: "{correctAnswers} == 0",
        html: "<h4>Unfortunately, none of your answers are correct. Please try again.</h4>"
    }, {
        expression: "{correctAnswers} == {questionCount}",
        html: "<h4>Congratulations! You answered all the questions correctly!</h4>"
    }]
};

const survey = new Survey.Model(surveyJson);

document.addEventListener("DOMContentLoaded", function() {
    survey.render(document.getElementById("surveyContainer"));
});
