const display = require("./display");
const FormatError = require("./FormatError");
let studentDao = require("./student_manager");
let rlSync = require('readline-sync');

module.exports = () => {
    let choice = rlSync.question(display.showMainMenu());
    while (choice !== '3') {
        switch (choice) {
            case '1':
                console.log(display.showAddStudent());
                let addSuccessfully = false;
                while (!addSuccessfully) {
                    try {
                        let studentInfo = rlSync.question().split(',');
                        studentDao.addStudent(studentInfo);
                        addSuccessfully = true;
                        display.showAddSuccessfully(studentInfo[0]);
                        display.showMainMenu();
                    } catch (error) {
                        if (error instanceof FormatError) {
                            console.log(error.message);
                        }
                    }
                }
                break;
            case '2':
                console.log(display.showInputStuId());
                let getSuccessfully = false;
                while (!getSuccessfully) {
                    let stuIds = rlSync.question();
                    try {
                        let transcript = studentDao.getTranscript(stuIds.split(','));
                        if (transcript.transcript.length === 0) {
                            display.showNoSuchStudent();
                            break;
                        } else if (transcript.cannotFind.length !== 0) {
                            display.showCannotFindSuchStudent(transcript.cannotFind);
                            break;
                        } else {
                            getSuccessfully = true;
                            display.showTranscript(transcript);
                            display.showMainMenu();
                        }
                    } catch (error) {
                        if (error instanceof FormatError) {
                            console.log(error.message);
                        }
                    }
                }
                break;
            default:
                console.log('没有找到命令！');
        }
        choice = rlSync.question(display.showMainMenu());
    }
};