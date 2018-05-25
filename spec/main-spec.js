let sinon = require("sinon");
let main = require("../lib/main");
let rlSync = require('readline-sync');
let display = require('../lib/display');
let FormatError = require('../lib/FormatError');

const studentDao = require("../lib/student_manager");
describe('main()', () => {

    beforeEach(function () {
        studentDao.clearStudents();
    });

    it('should return true if stu info format is right', function () {

        let studentInfo = 'Tom, 1, 汉, 1, 数学:12, 语文:12, 英语:11, 编程:100';
        expect(studentDao.isRightFormatForStuInfo(studentInfo.split(','))).toBeTruthy();
    });

    it('should return false if stu info format is wrong', function () {
        // 输入缺少必填项
        let lossProgramScore = 'Tom, 1, 汉, 1, 数学:12, 语文:12, 英语:11';

        expect(studentDao.isRightFormatForStuInfo(lossProgramScore.split(','))).toBeFalsy();
        // 班级非数字
        let wrongClass = 'Tom, 1, 汉, 一班, 数学:12, 语文:12, 英语:11, 编程:100';

        expect(studentDao.isRightFormatForStuInfo(wrongClass.split(','))).toBeFalsy();
        // 输入成绩格式错误
        let wrongScore = 'Tom, 1, 汉, 1, 数学:12, 语文 12, 英语 11, 编程 100';

        expect(studentDao.isRightFormatForStuInfo(wrongScore.split(','))).toBeFalsy();
    });

    it('should add student if input format is right', () => {
        let studentInfo = 'Tom, 1, 汉, 1, 数学:12, 语文:12, 英语:11, 编程:100';
        let result = studentDao.addStudent(studentInfo.split(','));
        expect(result).toEqual(studentDao.ADD_OK);
        expect(studentDao.getStudents().length).toEqual(1);
    });

    it('should return false if student id format is wrong', function () {
        expect(studentDao.isRightFormatForStuId([''])).toBeFalsy();
    });

    it('should return true if student id format is right', function () {
        expect(studentDao.isRightFormatForStuId(['32', '32', '32', '32'])).toBeTruthy();
    });

    it('should show Tom transcript if id is right', function () {
        let studentInfo = 'Tom, 1, 汉, 1, 数学:12, 语文:12, 英语:11, 编程:100';
        studentDao.addStudent(studentInfo.split(','));
        let stuId = '1';
        let transcript = studentDao.getTranscript(stuId.split(','));
        console.log(transcript);
        expect(transcript).toEqual({
            'transcript': [['Tom', '12', '12', '11', '100', 135 / 4, 135]],
            'averageOfSum': 135, 'middleOfSum': 135,
            'cannotFind': []
        });
    });

    it('should show 2 student transcript if id is all right', function () {
        let studentInfo1 = 'Tom, 1, 汉, 1, 数学:12, 语文:12, 英语:11, 编程:100';
        studentDao.addStudent(studentInfo1.split(','));

        let studentInfo2 = 'Lucy, 2, 汉, 2, 数学:12, 语文:12, 英语:11, 编程:100';
        studentDao.addStudent(studentInfo2.split(','));
        expect(studentDao.getStudents().length).toEqual(2);
        let stuId = '1, 2';
        let transcript = studentDao.getTranscript(stuId.split(','));
        console.log(transcript);
        expect(transcript).toEqual({
            'transcript': [['Tom', '12', '12', '11', '100', 135 / 4, 135],
                ['Lucy', '12', '12', '11', '100', 135 / 4, 135]],
            'averageOfSum': 135, 'middleOfSum': (135 + 135)/2,
            'cannotFind': []
        });
    });

    it('should show Tom transcript if id is right and show cannot find 2 if do not have 2 id student', function () {
        let studentInfo1 = 'Tom, 1, 汉, 1, 数学:12, 语文:12, 英语:11, 编程:100';
        studentDao.addStudent(studentInfo1.split(','));

        let stuId = '1, 2';
        let transcript = studentDao.getTranscript(stuId.split(','));
        console.log(transcript);
        expect(transcript).toEqual({
            'transcript': [['Tom', '12', '12', '11', '100', 135 / 4, 135]],
            'averageOfSum': 135, 'middleOfSum': 135,
            'cannotFind': ['2']
        });
    });

    it('should show empty transcript if no student is added', function () {
        let stuId = '1, 2';
        let transcript = studentDao.getTranscript(stuId.split(','));
        console.log(transcript);
        expect(transcript).toEqual({
            'transcript': [],
            'averageOfSum': 0, 'middleOfSum': 0,
            'cannotFind': []
        });
    });
});
