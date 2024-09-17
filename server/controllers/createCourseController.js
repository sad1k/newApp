const { Course, Module, Lesson } = require('../models/models'); // Импорт моделей

// Создание курса
exports.createCourse = async (req, res) => {
    const { title, description, img } = req.body;
    console.log(req.body)
    try {
        const newCourse = await Course.create({ title, description, img });
        res.status(201).json(newCourse);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка при создании курса' });
    }
};

// Создание модуля для курса
exports.createModule = async (req, res) => {
    const { courseId } = req.params;
    const { name } = req.body;
    try {
        const course = await Course.findByPk(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Курс не найден' });
        }

        const newModule = await Module.create({ name, courseId });
        res.status(201).json(newModule);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка при создании модуля' });
    }
};

// Создание урока для модуля
exports.createLesson = async (req, res) => {
    const { moduleId } = req.params;
    const { name, content } = req.body;
    try {
        const module = await Module.findByPk(moduleId);
        if (!module) {
            return res.status(404).json({ message: 'Модуль не найден' });
        }

        const newLesson = await Lesson.create({ name, content, moduleId });
        res.status(201).json(newLesson);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка при создании урока' });
    }
};
