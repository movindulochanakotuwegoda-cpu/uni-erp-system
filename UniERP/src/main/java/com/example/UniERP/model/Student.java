package com.example.UniERP.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "students")
@Data
public class Student {
    @Id
    private String studentId;
    private String name;
    private String email;
    private String faculty;
}