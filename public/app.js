// const SURVEY_ID = 1;

const survey = new Survey.Model(surveyJson);
survey.onComplete.add((sender) => {
    console.log(JSON.stringify(sender.data, null, 3));
});
survey.data = {
    MCQ1: "-1",
    MCQ2: "108",
    MCQ3: "The foundation of the British parliamentary system"
};
survey.readOnly = true;
survey.questionsOnPageMode = "singlePage";
survey.showProgressBar = false;

const correctStr = "Correct";
const incorrectStr = "Incorrect";
// Builds an HTML string to display in a question title
function getTextHtml (text, str, isCorrect) {
    if (text.indexOf(str) < 0)
        return undefined;
    return text.substring(0, text.indexOf(str)) +
        "<span class='" +  (isCorrect ? "correctAnswer" : "incorrectAnswer" ) + "'>" +
            str +
        "</span>";
}
// Adds "Correct" or "Incorrect" to a question title
function changeTitle (q) {
    if (!q) return;
    const isCorrect = q.isAnswerCorrect();
    if (!q.prevTitle) {
        q.prevTitle = q.title;
    }
    if (isCorrect === undefined) {
        q.title = q.prevTitle;
    }
    q.title =  q.prevTitle + ' ' + (isCorrect ? correctStr : incorrectStr);
}

survey.onTextMarkdown.add((_, options) => {
    const text = options.text;
    let html = getTextHtml(text, correctStr, true);
    if (!html) {
        html = getTextHtml(text, incorrectStr, false);
    }
    if (!!html) {
        // Set an HTML string with the "Correct" or "Incorrect" suffix for display
        options.html = html;
    }
});
// Indicate correct and incorrect answers at startup
survey.getAllQuestions().forEach(question => changeTitle(question));
survey.render(document.getElementById("surveyContainer"));

// function saveSurveyResults(url, json) {
//     fetch(url, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json;charset=UTF-8'
//         },
//         body: JSON.stringify(json)
//     })
//     .then(response => {
//         if (response.ok) {
//             // Handle success
//         } else {
//             // Handle error
//         }
//     })
//     .catch(error => {
//         // Handle error
//     });
// }

