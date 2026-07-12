package com.example.UniERP.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "grades")
@Data
public class Grade {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long gradeId;

    private String studentId;
    private String courseCode;
    private int marks;
    private String gradeLetter;

    // Marks අනුව Grade එක auto-calculate වන business logic එක
    public void calculateGradeLetter() {
        if (this.marks >= 75) this.gradeLetter = "A";
        else if (this.marks >= 65) this.gradeLetter = "B";
        else if (this.marks >= 50) this.gradeLetter = "C";
        else this.gradeLetter = "F";
    }
}
