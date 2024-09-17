const { Course, Module, Lesson } = require("../models/models"); // Импорт моделей

exports.createCourse = async (req, res) => {
  const { title, description } = req.body;
  try {
    const img = req.file ? req.file.path : null;
    const newCourse = await Course.create({ title, description, img: img });
    return res.status(201).json(newCourse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при создании курса" });
  }
};

exports.createModule = async (req, res) => {
  const { courseId } = req.params;
  const { name } = req.body;
  try {
    const course = await Course.findByPk(courseId);
    if (!course) {
      return res.status(404).json({ message: "Курс не найден" });
    }

    const newModule = await Module.create({ name, courseId });
    res.status(201).json(newModule);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при создании модуля" });
  }
};

exports.createLesson = async (req, res) => {
  const { moduleId } = req.params;
  const { name, content } = req.body;
  try {
    const module = await Module.findByPk(moduleId);
    if (!module) {
      return res.status(404).json({ message: "Модуль не найден" });
    }

    const newLesson = await Lesson.create({ name, content, moduleId });
    res.status(201).json(newLesson);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при создании урока" });
  }
};

// Получение всех курсов
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при получении курсов" });
  }
};

// Получение курса по ID
exports.getCourseById = async (req, res) => {
  const { courseId } = req.params;
  try {
    const course = await Course.findByPk(courseId, {
      include: [
        {
          model: Module,
          as: "modules", // Если вы используете алиас для связи
          include: [
            {
              model: Lesson,
              as: "lessons", // Если вы используете алиас для связи
            },
            {
              model: TestCourse,
              as: "tests", // Предполагается, что связь между модулем и тестами установлена
            },
          ],
        },
      ],
    });
    if (!course) {
      return res.status(404).json({ message: "Курс не найден" });
    }
    res.status(200).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при получении курса" });
  }
};

// Получение модуля по ID
exports.getModuleById = async (req, res) => {
  const { moduleId } = req.params;
  try {
    const module = await Module.findOne(
      { where: { id: moduleId } },
      {
        include: [
          {
            model: Lesson,
            as: "lessons",
          },
          {
            model: TestCourse,
            as: "tests", // Предполагается, что связь между модулем и тестами установлена
          },
        ],
      }
    );
    if (!module) {
      return res.status(404).json({ message: "Модуль не найден" });
    }
    res.status(200).json(module);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при получении модуля" });
  }
};

// Получение урока по ID
exports.getLessonById = async (req, res) => {
  const { lessonId } = req.params;
  try {
    const lesson = await Lesson.findByPk(lessonId);
    if (!lesson) {
      return res.status(404).json({ message: "Урок не найден" });
    }
    res.status(200).json(lesson);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при получении урока" });
  }
};

const { TestCourse } = require("../models/models");

// Создание теста для модуля
exports.createTest = async (req, res) => {
  const { moduleId } = req.params;
  const { name, description, answers } = req.body;
  try {
    const newTest = await TestCourse.create({
      name,
      description,
      answers,
      moduleId,
    });
    res.status(201).json(newTest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при создании теста" });
  }
};

// Функция для получения теста
exports.getTestById = async (req, res) => {
  try {
    const { testId } = req.params;
    const test = await TestCourse.findOne({ where: { id: testId } }); // Замените на ваш метод получения теста
    if (!test) {
      return res.status(404).json({ message: "Тест не найден" });
    }
    res.json(test);
  } catch (error) {
    console.error("Error fetching test:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
