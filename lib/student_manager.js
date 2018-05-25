let Student = require("./student");
let Subject = require("./subject");
let display = require("./display");
let FormatError = require("./FormatError");
const ADD_OK = 1;
const NO_STUDENT_FOUND = 2;

let students = [];

function isRightFormatForStuInfo(infos) {
    return !(infos.length !== 8 || isNaN(parseInt(infos[3])) ||
        !infos[4].includes('数学:') || !infos[5].includes('语文:') ||
        !infos[6].includes('英语:') || !infos[7].includes('编程:'));
}

function decodeSubjectsFromStrInfos(infos) {
    let subjects = [];
    for (let i = 4; i <= 7; i++) {
        let tmp = infos[i].split(':');
        subjects.push(new Subject(tmp[0], tmp[1]));
    }
    return subjects;
}

function addStudent(infos) {
    if (isRightFormatForStuInfo(infos)) {
        let subjects = decodeSubjectsFromStrInfos(infos);
        students.push(new Student(infos[0].trim(), infos[1].trim(),
            infos[2].trim(), infos[3].trim(), subjects));
        return ADD_OK;
    } else {
        throw new FormatError(display.showStuInfoInputAgain());
    }
}

function isRightFormatForStuId(stuIds) {
    return stuIds.filter(elem => elem.length === 0 || isNaN(parseInt(elem))).length === 0;
}

function getTranscript(stuIds) {
    if (isRightFormatForStuId(stuIds)) {
        stuIds = stuIds.map(elem => elem.trim());
        let transcripts = [];
        let stus = students.filter(elem => stuIds.includes(elem.id));
        if (stus.length === 0) {
            return {'transcript': [], 'averageOfSum': 0, 'middleOfSum': 0, 'cannotFind': []};
        }
        let sums = [];
        for (let stu of stus) {
            transcripts.push([stu.name, stu.subjects[0].score, stu.subjects[1].score,
                stu.subjects[2].score, stu.subjects[3].score, stu.getAverage(), stu.getSum()]);
            sums.push(stu.getSum());
        }
        sums = sums.sort();
        let sumLen = sums.length;
        let averageOfSum = sums.reduce((total, current) => total + current) / sumLen;
        let middleOfSum = sumLen % 2 === 0 ?
            (sums[Math.floor(sumLen / 2) - 1] + sums[Math.floor(sumLen / 2)]) / 2 :
            sums[Math.floor(sumLen / 2)];
        return {
            'transcript': transcripts, 'averageOfSum': averageOfSum, 'middleOfSum': middleOfSum,
            'cannotFind': stuIds.filter(elem => notInStudents(elem))
        };
    } else {
        throw new FormatError(display.showStuIdInputAgain());
    }
}

function notInStudents(elem) {
    return students.filter(e => e.id === elem).length === 0;
}

function getStudents() {
    return students;
}

function clearStudents() {
    students = [];
}
module.exports = {
    addStudent, getTranscript, getStudents, clearStudents,
    isRightFormatForStuId, isRightFormatForStuInfo, ADD_OK, NO_STUDENT_FOUND
};

