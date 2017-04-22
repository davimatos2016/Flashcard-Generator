var fs = require('fs');
//use inquirer npm package to prompt the user and have him/her input a choice
var inquire = require('inquirer');
//js files with constructors.
var BasicCard = require('./basicConstructor');
var ClozeCard = require('./clozeConstructor');

//Function to Start application prompts
var start = function() {
    inquire.prompt([{
        name: "start",
        message: "Select one option",
        type: "list",
        choices: ["Take a Basic Quiz", "Take a Cloze Quiz"]
    }]).then(function(answer) {
        var command = answer.start;
        switch (command) {
            case "Take a Basic Quiz":
                basicQuiz(0);
                break;
            case "Take a Cloze Quiz":
                clozeQuiz(0);
                break;
            default:
                console.log('This does not work!');
        }
    })
}

//Callback to start application.
start();

//Function to launch Basic quiz.
var basicQuiz = function(count) {
    fs.readFile('basic.json', 'utf8', function(err, data) {

        var questionData = JSON.parse(data);

        if (count < questionData.length) {
            inquire.prompt([{
                name: "question",
                message: questionData[count].front,
                type: "input"
            }]).then(function(answer) {
                if (answer.question.toLowerCase() === questionData[count].back.toLowerCase()) {
                    console.log('Correct');
                    count++;
                    basicQuiz(count);
                } else {
                    console.log('Incorrect');
                    console.log("The correct answer is: " + questionData[count].back);
                    count++;
                    basicQuiz(count);
                }
            })
        } else {
            start();
        }

    })
}

//Function to launch Cloze quiz.
var clozeQuiz = function(count) {
    fs.readFile('cloze.json', 'utf8', function(err, data) {

        var questionData = JSON.parse(data);

        if (count < questionData.length) {

            var newClozeCard = new ClozeCard(questionData[count].text, questionData[count].cloze);

            inquire.prompt([{
                name: "question",
                message: newClozeCard.partialText(),
                type: "input"
            }]).then(function(answer) {
                if (answer.question.toLowerCase() === newClozeCard.cloze.toLowerCase()) {
                    console.log('Correct');
                    count++;
                    clozeQuiz(count);
                } else {
                    console.log('Incorrect');
                    console.log("The correct answer is: " + newClozeCard.text);
                    count++;
                    clozeQuiz(count);
                }
            })
        } else {
            start();
        }

    })
}