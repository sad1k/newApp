const Router = require('express');
const router = new Router()
const courseController = require('../controllers/createCourseController'); // Импортируем контроллер

// Роут для создания курса
router.post('/courses', courseController.createCourse);

// Роут для создания модуля в рамках конкретного курса
router.post('/courses/:courseId/modules', courseController.createModule);

// Роут для создания урока в рамках конкретного модуля
router.post('/modules/:moduleId/lessons', courseController.createLesson);

module.exports = router;
