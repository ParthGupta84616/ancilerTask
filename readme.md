This is a Task App Of Aciler Techologies 

get started with by cloning the repo 

use 
npm install 

then fire the application 

npm run start


routes are 


POST /students: Create a new student.

http://localhost:3000/students
json --
{
    "name":"Parth Gupta",
    "email":"parthguptaji20@gmail.com"
}

response -- 
{
    "message": "User created",
    "student": {
        "id": "student-1",
        "name": "Parth Gupta",
        "email": "parthguptaji20@gmail.com",
        "courses": []
    }
}

POST /courses: Create a new course with a capacity limit.

http://localhost:3000/courses
request
{
    "title":"Parth Gupta",
    "capacity": 5
}
reponse
{
    "message": "Course created",
    "courses": {
        "id": "course-1",
        "title": "Parth Gupta",
        "capacity": 5,
        "enrolledCount": 0,
        "students": []
    }
}


POST /enroll: Enroll a student in a course.

URL -- http://localhost:3000/enroll
request -- 
{
    "studentId":"student-1",
    "courseId": "course-1"
}

response --
{
    "message": "Enrollment successful"
}

GET /courses/:id/students: List all students in a course.

URL -- http://localhost:3000/courses/course-1/students
response -- 
{
    "students": [
        {
            "id": "student-1",
            "name": "Parth Gupta",
            "email": "parthguptaji20@gmail.com",
            "courses": [
                "course-1"
            ]
        }
    ]
}

GET /students/:id/courses: List all courses a student is enrolled in.
http://localhost:3000/students/student-1/courses
request
{
    "studentId":"student-1",
    "courseId": "course-1"
}

response
{
    "courses": [
        {
            "id": "course-1",
            "title": "Parth Gupta",
            "capacity": 5,
            "enrolledCount": 1,
            "students": [
                "student-1"
            ]
        }
    ]
}


DELETE /unenroll: Remove a student from a course and decrement enrolledCount.

URL 
Request -- 
{
    "studentId": "student-1",
    "courseId": "course-1"
}

Response -- 
{
    "message": "Unenrollment successful"
}