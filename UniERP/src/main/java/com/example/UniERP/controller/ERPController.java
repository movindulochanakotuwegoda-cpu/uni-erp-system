package com.example.UniERP.controller;

import com.example.UniERP.model.Student;
import com.example.UniERP.model.Grade;
import com.example.UniERP.repository.StudentRepository;
import com.example.UniERP.repository.GradeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/erp")
@CrossOrigin(origins = "*")
public class ERPController {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private GradeRepository gradeRepository;

    // Student CRUD
    @PostMapping("/students")
    public Student addStudent(@RequestBody Student student) {
        return studentRepository.save(student);
    }

    @GetMapping("/students")
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // Grading Integration
    @PostMapping("/grades")
    public Grade assignGrade(@RequestBody Grade grade) {
        grade.calculateGradeLetter();
        return gradeRepository.save(grade);
    }

    @GetMapping("/grades/{studentId}")
    public List<Grade> getStudentGrades(@PathVariable String studentId) {
        return gradeRepository.findByStudentId(studentId);
    }
}