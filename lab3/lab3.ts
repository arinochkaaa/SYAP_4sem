// Лабораторная работа №3. TypeScript

// 1. Классы и ООП
// Задача 1: Система управления пользователями

abstract class BaseUser {
    constructor(public id: number, public name: string) {}

    abstract getRole(): string;
    abstract getPermissions(): string[];
}

class Guest extends BaseUser {
    getRole(): string {
        return "Guest";
    }
    getPermissions(): string[] {
        return ["view content"];
    }
}

class User extends BaseUser {
    getRole(): string {
        return "User";
    }
    getPermissions(): string[] {
        return ["view content", "comment"];
    }
}

class Admin extends BaseUser {
    getRole(): string {
        return "Admin";
    }
    getPermissions(): string[] {
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


// Задача 2: Полиморфизм и интерфейсы

interface IReport {
    title: string;
    content: string;
    generate(): string;
}

class HTMLReport implements IReport {
    constructor(public title: string, public content: string) {}

    generate(): string {
        return `<h1>${this.title}</h1><p>${this.content}</p>`;
    }
}

class JSONReport implements IReport {
    constructor(public title: string, public content: string) {}

    generate(): string {
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

class DataCache<T> {
    private storage: Map<string, { value: T; expiry: number }> = new Map();

    add(key: string, value: T, ttl: number): void {
        const expiry = Date.now() + ttl;
        this.storage.set(key, { value, expiry });
    }

    get(key: string): T | null {
        const item = this.storage.get(key);
        if (!item || Date.now() > item.expiry) {
            this.storage.delete(key);
            return null;
        }
        return item.value;
    }

    clearExpired(): void {
        const now = Date.now();
        for (const [key, item] of this.storage) {
            if (item.expiry < now) {
                this.storage.delete(key);
            }
        }
    }
}

// Пример использования
const cache = new DataCache<number>();
cache.add("key1", 42, 5000);
console.log(cache.get("key1"));

setTimeout(() => {
    console.log(cache.get("key1")); // null, если прошло 6 секунд
}, 6000);

// Задача 4: Дженерик-фабрика объектов

function createInstance<T>(cls: new (...args: any[]) => T, ...args: any[]): T {
    return new cls(...args);
}

// Пример класса
class Person {
    constructor(public name: string, public age: number) {}
}

// Создаём экземпляр
const person = createInstance(Person, "Андрей", 25);
console.log(person);


// 3. Кортежи и Enum
// Задача 5: Логирование событий с кортежами

enum LogLevel {
    INFO = "INFO",
    WARNING = "WARNING",
    ERROR = "ERROR"
}

type LogEntry = [Date, LogLevel, string];

function logEvent(event: LogEntry): void {
    console.log(`[${event[0].toISOString()}] [${event[1]}]: ${event[2]}`);
}

// Примеры использования
logEvent([new Date(), LogLevel.INFO, "Система запущена"]);
logEvent([new Date(), LogLevel.ERROR, "Ошибка подключения"]);


// Задача 6: Тип безопасных API-ответов

enum HttpStatus {
    OK = 200,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
    INTERNAL_ERROR = 500
}

type ApiResponse<T> = [status: HttpStatus, data: T | null, error?: string];

function success<T>(data: T): ApiResponse<T> {
    return [HttpStatus.OK, data];
}

function error(message: string, status: HttpStatus): ApiResponse<null> {
    return [status, null, message];
}

// Примеры использования
const res1 = success({ user: "Андрей" });
console.log(res1);

const res2 = error("Не найдено", HttpStatus.NOT_FOUND);
console.log(res2);
