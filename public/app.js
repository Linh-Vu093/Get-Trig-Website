// const SURVEY_ID = 1;
import * as CryptoJS from 'crypto-js';

const survey = new Survey.Model(surveyJson);
survey.onComplete.add((sender) => {
    console.log(JSON.stringify(sender.data, null, 3));
});
survey.data = {
    MCQ1: "-1",
    MCQ2: "45°",
    MCQ3: "3π/2"
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

import * as CryptoJS from 'crypto-js';

function storageEncryption() {
    /**
  * secret key should be stored in a safe place. This is only for a demo purpose.
  */
    let _key = "secret_key"

    function encrypt(data) {
        return CryptoJS.AES.encrypt(data, _key).toString();
    }

    function decrypt(txtToDecrypt) {
        return CryptoJS.AES.decrypt(dataToDecrypt, _key).toString(CryptoJS.enc.Utf8);
    }

    function manipulateLocalStorage() {
        Storage.prototype.setEncryptedItem = (key, value) => {
            localStorage.setItem(key, encrypt(value));
        };

        Storage.prototype.getDecryptedItem = (key) => {
            let data = localStorage.getItem(key) || "";
            return decrypt(data) || null;
        }
    }
 /**
  * First call this function to add our custom functions to the Storage interface
  * 
  */
    manipulateLocalStorage();
    /**
     * you can use the setEncryptedItem and getDecryptedItem functions
     * to encrypt and decrypt the data
     * */ 

    localStorage.setEncryptedItem("token", "12345");
    const token = localStorage.getDecryptedItem("token");
    console.log(token);
}
storageEncryption();



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

