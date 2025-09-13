const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());


const students = {};
const courses = {};

app.get('/', (req, res) => {
    res.json({
        message: 'Me Working',
        "time": new Date().toISOString()
    });
});

var studentIdCounter = 1;

var courseIdCounter = 1;
function idStudentGenerator() {
    return 'student-' + studentIdCounter++;
}
function idCourseGenerator() {
    return 'course-' + courseIdCounter++;
}


app.post('/students', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        if (email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) === null) {
            return res.status(400).json({ error: 'Invalid email format' });
        }
        return res.status(400).json({ error: 'Invalid email format' });
    }

    if (email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) === null) {
        return res.status(400).json({ error: 'Invalid email format' });
    }
    if (Object.values(students).some(s => s.email === email)) {
        return res.status(400).json({ error: 'Email already exists' });
    }

    const id = idStudentGenerator();

    students[id] = { id, name, email, courses: [] };
    res.status(201).json({ message: 'User created', student: students[id] });

});

app.post('/courses', (req, res) => {
    const { title, capacity } = req.body;

    if (!title || !capacity) {
        return res.status(400).json({ error: 'Missing fields' });
    }
    if (typeof capacity !== 'number' || capacity <= 0) {
        return res.status(400).json({ error: 'Invalid capacity' });
    }
    const id = idCourseGenerator();
    if (courses[id]) {
        return res.status(400).json({ error: 'Course ID already exists' });
    }
    courses[id] = { id, title, capacity, enrolledCount: 0, students: [] };
    res.status(201).json({ message: 'Course created', courses: courses[id] });

});
app.post('/enroll', (req, res) => {
    const { studentId, courseId } = req.body;
    if (!studentId || !courseId) {
        return res.status(400).json({ error: 'Missing Fields' });
    }
    const student = students[studentId];
    const course = courses[courseId];
    if (!student || !course) {
        return res.status(404).json({ error: 'Student or Course not found' });
    }
    if (course.enrolledCount >= course.capacity) {
        return res.status(400).json({ error: 'Course is full' });
    }
    student.courses.push(courseId);
    course.students.push(studentId);
    course.enrolledCount++;
    res.status(200).json({ message: 'Enrollment successful' });
});
app.get('/students/:id/courses', (req, res) => {
    const studentId = req.params.id;
    const student = students[studentId];
    if (!student) {
        return res.status(404).json({ error: 'Student not found' });
    }
    const enrolledCourses = student.courses.map(courseId => courses[courseId]);
    res.json({ courses: enrolledCourses });
});

app.get('/courses/:id/students', (req, res) => {
    const courseId = req.params.id;
    const course = courses[courseId];
    if (!course) {
        return res.status(404).json({ error: 'Course not found' });
    }
    const enrolledStudents = course.students.map(studentId => students[studentId]);
    res.json({ students: enrolledStudents });
});



app.delete('/unenroll', (req, res) => {
    const { studentId, courseId } = req.body;
    if (!studentId || !courseId) {
        return res.status(400).json({ error: 'Missing fields' });
    }
    const student = students[studentId];
    const course = courses[courseId];
    if (!student || !course) {
        return res.status(404).json({ error: 'Student or Course not found' });
    }
    student.courses = student.courses.filter(id => id !== courseId);
    course.students = course.students.filter(id => id !== studentId);
    course.enrolledCount--;
    res.json({ message: 'Unenrollment successful' });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});