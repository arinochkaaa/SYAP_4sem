var array = [
    { id: 1, name: 'Vasya', group: 10 },
    { id: 2, name: 'Ivan', group: 11 },
    { id: 3, name: 'Masha', group: 12 },
    { id: 4, name: 'Petya', group: 10 },
    { id: 5, name: 'Kira', group: 11 },
];
// Выводим студентов в консоль
console.log("Студенты:");
array.forEach(function (student) {
    console.log("ID: ".concat(student.id, ", \u0418\u043C\u044F: ").concat(student.name, ", \u0413\u0440\u0443\u043F\u043F\u0430: ").concat(student.group));
});
var car = {};
car.manufacturer = "Toyota";
car.model = "Corolla";
// Выводим машину в консоль
console.log("\nМашина:");
console.log("\u041F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044C: ".concat(car.manufacturer, ", \u041C\u043E\u0434\u0435\u043B\u044C: ").concat(car.model));
var car1 = {};
car1.manufacturer = "Tesla";
car1.model = "Model S";
var car2 = {};
car2.manufacturer = "BMW";
car2.model = "X5";
var arrayCars = [{
        cars: [car1, car2]
    }];
// Выводим список машин в консоль
console.log("\nМашины:");
arrayCars[0].cars.forEach(function (car, index) {
    console.log("\u041C\u0430\u0448\u0438\u043D\u0430 ".concat(index + 1, ": \u041F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044C - ").concat(car.manufacturer, ", \u041C\u043E\u0434\u0435\u043B\u044C - ").concat(car.model));
});
var group = {
    students: [
        { id: 1, name: 'Vasya', group: 10, marks: [{ subject: 'Math', mark: 5, done: true }] },
        { id: 2, name: 'Ivan', group: 11, marks: [{ subject: 'History', mark: 4, done: true }] },
        { id: 3, name: 'Masha', group: 12, marks: [{ subject: 'Science', mark: 3, done: false }] },
    ],
    studentsFilter: function (group) {
        return this.students.filter(function (student) { return student.group === group; });
    },
    marksFilter: function (mark) {
        return this.students.filter(function (student) {
            return student.marks.some(function (m) { return m.mark === mark; });
        });
    },
    deleteStudent: function (id) {
        this.students = this.students.filter(function (student) { return student.id !== id; });
    },
    mark: 5,
    group: 1,
};
// Выводим студентов определенной группы в консоль
console.log("\nСтуденты в группе 10:");
group.studentsFilter(10).forEach(function (student) {
    console.log("ID: ".concat(student.id, ", \u0418\u043C\u044F: ").concat(student.name, ", \u041E\u0446\u0435\u043D\u043A\u0438: ").concat(student.marks.map(function (m) { return m.mark; }).join(", ")));
});
// Выводим студентов с определенной оценкой
console.log("\nСтуденты с оценкой 5:");
group.marksFilter(5).forEach(function (student) {
    console.log("ID: ".concat(student.id, ", \u0418\u043C\u044F: ").concat(student.name));
});
