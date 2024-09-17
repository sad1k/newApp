const Router = require('express');
const router = new Router();
const courseController = require('../controllers/createCourseController'); // Импортируем контроллер
const multer = require('multer');

// Мидлвэр для обработки файлов
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'courses/'); // Папка для изображений курсов
  },
  filename(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Неверный формат файла'), false);
  }
};

const fileMiddleware = multer({ storage, fileFilter });

// Роуты для создания
router.post('/courses', fileMiddleware.single('img'), courseController.createCourse);
router.post('/courses/:courseId/modules', courseController.createModule);
router.post('/modules/:moduleId/lessons', courseController.createLesson);

// Роуты для получения
router.get('/courses', courseController.getCourses);
router.get('/courses/:courseId', courseController.getCourseById);
router.get('/modules/:moduleId', courseController.getModuleById);
router.get('/lessons/:lessonId', courseController.getLessonById);

router.post('/modules/:moduleId/tests', courseController.createTest);
router.get('/tests/:testId', courseController.getTestById);

module.exports = router;
