class Student {
    constructor(name, id, ethnic, klass, subjects) {
        this.name = name;
        this.id = id;
        this.ethnic = ethnic;
        this.klass = klass;
        this.subjects = subjects;
    }

    getAverage() {
        return this.getSum() / this.subjects.length;
    }

    getSum() {
        let scores = this.subjects.map(elem => parseInt(elem.score));
        return scores.reduce((total, current) => total + current);
    }
}

module.exports = Student;