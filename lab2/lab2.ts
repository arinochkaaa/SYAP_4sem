// 1. Определение типа для массива студентов
interface Student {
    id: number;
    name: string;
    group: GroupFilterType; // от 1 до 12
}

type StudentsArray = Student[];

const studentsArray: StudentsArray = [
    { id: 1, name: 'Vasya', group: 10 },
    { id: 2, name: 'Ivan', group: 11 },
    { id: 3, name: 'Masha', group: 12 },
    { id: 4, name: 'Petya', group: 10 },
    { id: 5, name: 'Kira', group: 11 },
];

console.log("Студенты:");
studentsArray.forEach(student => {
    console.log(`ID: ${student.id}, Имя: ${student.name}, Группа: ${student.group}`);
});

// 2. Определение типа для машины
interface Car {
    manufacturer: string;
    model: string;
}

type CarsType = Partial<Car>; // Объект может быть пустым при инициализации

let car: CarsType = {
    manufacturer: "Toyota",
    model: "Corolla"
};

console.log("\nМашина:");
console.log(`Производитель: ${car.manufacturer}, Модель: ${car.model}`);

// 3. Определение типа для массива машин
interface ArrayCarsType {
    cars: Car[];
}

const car1: Car = { manufacturer: "Tesla", model: "Model S" };
const car2: Car = { manufacturer: "BMW", model: "X5" };

const arrayCars: ArrayCarsType = { cars: [car1, car2] };

console.log("\nМашины:");
arrayCars.cars.forEach((car, index) => {
    console.log(`Машина ${index + 1}: Производитель - ${car.manufacturer}, Модель - ${car.model}`);
});

// 4. Определение недостающих типов и структур данных
type MarkFilterType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
type GroupFilterType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type DoneType = boolean;

interface MarkType {
    subject: string;
    mark: MarkFilterType;
    done: DoneType;
}

interface StudentType {
    id: number;
    name: string;
    group: GroupFilterType;
    marks: MarkType[];
}

interface GroupType {
    students: StudentType[];
    studentsFilter: (group: GroupFilterType) => StudentType[];
    marksFilter: (mark: MarkFilterType) => StudentType[];
    deleteStudent: (id: number) => void;
    mark: MarkFilterType;
    group: GroupFilterType;
}

const group: GroupType = {
    students: [
        { id: 1, name: 'Vasya', group: 10, marks: [{ subject: 'Math', mark: 5, done: true }] },
        { id: 2, name: 'Ivan', group: 11, marks: [{ subject: 'History', mark: 4, done: true }] },
        { id: 3, name: 'Masha', group: 12, marks: [{ subject: 'Science', mark: 3, done: false }] },
    ],
    studentsFilter(group: GroupFilterType) {
        return this.students.filter(student => student.group === group);
    },
    marksFilter(mark: MarkFilterType) {
        return this.students.filter(student =>
            student.marks.some(m => m.mark === mark)
        );
    },
    deleteStudent(id: number) {
        this.students = this.students.filter(student => student.id !== id);
    },
    mark: 5,
    group: 1,
};

console.log("\nСтуденты в группе 10:");
group.studentsFilter(10).forEach(student => {
    console.log(`ID: ${student.id}, Имя: ${student.name}, Оценки: ${student.marks.map(m => m.mark).join(", ")}`);
});

console.log("\nСтуденты с оценкой 5:");
group.marksFilter(5).forEach(student => {
    console.log(`ID: ${student.id}, Имя: ${student.name}`);
});
..., аншифт сплайс необ.св-ва сам