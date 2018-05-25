function showMainMenu() {
    return '1. 添加学生\n' +
        '2. 生成成绩单\n' +
        '3. 退出\n' +
        '请输入你的选择（1～3）：\n';
}

function showAddStudent() {
    return '请输入学生信息（格式：姓名, 学号, 民族, 班级, 学科: 成绩, ...），按回车提交：';
}

function showInputStuId() {
    return '请输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：';
}

function showTranscript(transcript) {
    console.log('成绩单');
    console.log('姓名|数学|语文|英语|编程|平均分|总分');
    console.log('========================');
    for (let eachStu of transcript.transcript) {
        console.log(eachStu.join('|'))
    }
    console.log('========================');
    console.log(`全班总分平均数:${transcript.averageOfSum}`);
    console.log(`全班总分中位数:${transcript.middleOfSum}`);
}

function showAddSuccessfully(name) {
    console.log(`学生${name}的成绩被添加`);
}

function showStuInfoInputAgain() {
    return '请按正确的格式输入（格式：姓名, 学号, 民族, 班级, 学科: 成绩, ...）：';
}

function showStuIdInputAgain() {
    console.log('请按正确的格式输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：');
}

function showNoSuchStudent() {
    console.log('成绩单目前为空，请先录入学生成绩');
}

function showCannotFindSuchStudent(students) {
    console.log(`找不到学号为${students.join('、')}的学生`);
}

module.exports = {
    showMainMenu, showAddStudent, showAddSuccessfully,
    showStuInfoInputAgain, showInputStuId, showStuIdInputAgain, showTranscript,
    showNoSuchStudent, showCannotFindSuchStudent
};