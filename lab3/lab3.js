"use strict";
// Лабораторная работа №3. TypeScript
// 1. Классы и ООП
// Задача 1: Система управления пользователями
class BaseUser {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}
class Guest extends BaseUser {
    getRole() {
        return "Guest";
    }
    getPermissions() {
        return ["view content"];
    }
}
class User extends BaseUser {
    getRole() {
        return "User";
    }
    getPermissions() {
        return ["view content", "comment"];
    }
}
class Admin extends BaseUser {
    getRole() {
        return "Admin";
    }
    getPermissions() {
        return ["view content", "comment", "delete comments", "manage users"];
    }
}
// Пример использования
const guest = new Guest(1, "Аноним");
console.log(guest.getRole(), guest.getPermissions());
const user = new User(2, "Иван");
console.log(user.getRole(), user.getPermissions());
const admin = new Admin(3, "Мария");
console.log(admin.getRole(), admin.getPermissions());
class HTMLReport {
    constructor(title, content) {
        this.title = title;
        this.content = content;
    }
    generate() {
        return `<h1>${this.title}</h1><p>${this.content}</p>`;
    }
}
class JSONReport {
    constructor(title, content) {
        this.title = title;
        this.content = content;
    }
    generate() {
        return JSON.stringify({ title: this.title, content: this.content });
    }
}
// Пример использования
const htmlReport = new HTMLReport("Отчёт", "Данные отчёта в HTML");
console.log(htmlReport.generate());
const jsonReport = new JSONReport("Отчёт", "Данные отчёта в JSON");
console.log(jsonReport.generate());
// 2. Дженерики (Generics)
// Задача 3: Обобщенный кеш данных
class DataCache {
    constructor() {
        this.storage = new Map();
    }
    add(key, value, ttl) {
        const expiry = Date.now() + ttl;
        this.storage.set(key, { value, expiry });
    }
    get(key) {
        const item = this.storage.get(key);
        if (!item || Date.now() > item.expiry) {
            this.storage.delete(key);
            return null;
        }
        return item.value;
    }
    clearExpired() {
        const now = Date.now();
        for (const [key, item] of this.storage) {
            if (item.expiry < now) {
                this.storage.delete(key);
            }
        }
    }
}
// Пример использования
const cache = new DataCache();
cache.add("key1", 42, 5000);
console.log(cache.get("key1"));
setTimeout(() => {
    console.log(cache.get("key1")); // null, если прошло 6 секунд
}, 6000);
// Задача 4: Дженерик-фабрика объектов
function createInstance(cls, ...args) {
    return new cls(...args);
}
// Пример класса
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
// Создаём экземпляр
const person = createInstance(Person, "Андрей", 25);
console.log(person);
// 3. Кортежи и Enum
// Задача 5: Логирование событий с кортежами
var LogLevel;
(function (LogLevel) {
    LogLevel["INFO"] = "INFO";
    LogLevel["WARNING"] = "WARNING";
    LogLevel["ERROR"] = "ERROR";
})(LogLevel || (LogLevel = {}));
function logEvent(event) {
    console.log(`[${event[0].toISOString()}] [${event[1]}]: ${event[2]}`);
}
// Примеры использования
logEvent([new Date(), LogLevel.INFO, "Система запущена"]);
logEvent([new Date(), LogLevel.ERROR, "Ошибка подключения"]);
// Задача 6: Тип безопасных API-ответов
var HttpStatus;
(function (HttpStatus) {
    HttpStatus[HttpStatus["OK"] = 200] = "OK";
    HttpStatus[HttpStatus["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttpStatus[HttpStatus["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HttpStatus[HttpStatus["NOT_FOUND"] = 404] = "NOT_FOUND";
    HttpStatus[HttpStatus["INTERNAL_ERROR"] = 500] = "INTERNAL_ERROR";
})(HttpStatus || (HttpStatus = {}));
function success(data) {
    return [HttpStatus.OK, data];
}
function error(message, status) {
    return [status, null, message];
}
// Примеры использования
const res1 = success({ user: "Андрей" });
console.log(res1);
const res2 = error("Не найдено", HttpStatus.NOT_FOUND);
console.log(res2);
