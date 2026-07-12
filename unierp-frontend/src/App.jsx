import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_BASE_URL = "http://localhost:8080/api/erp"; 

function App() {
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [faculty, setFaculty] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/students`);
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    const newStudent = { studentId, name, email, faculty };
    try {
      await axios.post(`${API_BASE_URL}/students`, newStudent);
      alert("Student Registered Successfully!");
      fetchStudents();
      setStudentId(''); setName(''); setEmail(''); setFaculty('');
    } catch (error) {
      alert("Registration failed!");
    }
  };

  // Course Enrollment States
  const [selectedStudent, setSelectedStudent] = useState('');
  const [enrollmentFaculty, setEnrollmentFaculty] = useState('');
  const [courseName, setCourseName] = useState('');
  const [enrollments, setEnrollments] = useState([]);

  const handleEnrollCourse = (e) => {
    e.preventDefault();
    if (!selectedStudent || !courseName || !enrollmentFaculty) return;
    
    const newEnrollment = {
      id: Date.now(),
      studentName: selectedStudent,
      faculty: enrollmentFaculty,
      course: courseName,
      date: new Date().toLocaleDateString()
    };
    
    setEnrollments([...enrollments, newEnrollment]);
    alert("Course Enrolled Successfully!");
    setCourseName('');
    setEnrollmentFaculty('');
  };

  // Exams & Grading States
  const [gradeStudent, setGradeStudent] = useState('');
  const [gradeCourse, setGradeCourse] = useState('');
  const [marks, setMarks] = useState('');
  const [grade, setGrade] = useState('');
  const [gradesList, setGradesList] = useState([]);

  const handleAddGrade = (e) => {
    e.preventDefault();
    if (!gradeStudent || !marks || !grade || !gradeCourse) return;

    const newGradeEntry = {
      id: Date.now(),
      studentName: gradeStudent,
      course: gradeCourse,
      marks: marks,
      grade: grade.toUpperCase()
    };

    setGradesList([...gradesList, newGradeEntry]);
    alert("Grade Logged Successfully!");
    setMarks('');
    setGrade('');
    setGradeCourse('');
  };

  // Attendance State & Handler
  const [attendanceStudent, setAttendanceStudent] = useState('');
  const [status, setStatus] = useState('Present');
  const [attendanceList, setAttendanceList] = useState([]);

  const handleLogAttendance = (e) => {
    e.preventDefault();
    if (!attendanceStudent || !status) return;

    const newAttendanceEntry = {
      id: Date.now(),
      studentName: attendanceStudent,
      status: status,
      date: new Date().toLocaleDateString()
    };

    setAttendanceList([...attendanceList, newAttendanceEntry]);
    alert("Attendance Logged Successfully!");
    setAttendanceStudent('');
  };

  return (
    <div className="erp-container">
      <nav className="sidebar">
        {/* මෙතනින් University ERP Dashboard ලෙස වෙනස් කර ඇත */}
        <h2>University ERP Dashboard</h2>
        <ul>
          <li onClick={() => setActiveTab('dashboard')} className={activeTab === 'dashboard' ? 'active' : ''}>Overview</li>
          <li onClick={() => setActiveTab('students')} className={activeTab === 'students' ? 'active' : ''}>Student Management</li>
          <li onClick={() => setActiveTab('courses')} className={activeTab === 'courses' ? 'active' : ''}>Course Enrollment</li>
          <li onClick={() => setActiveTab('grades')} className={activeTab === 'grades' ? 'active' : ''}>Exams & Grading</li>
          <li onClick={() => setActiveTab('attendance')} className={activeTab === 'attendance' ? 'active' : ''}>Attendance Tracking</li>
        </ul>
      </nav>

      <main className="content">
        {activeTab === 'dashboard' && (
          <div className="dashboard-grid">
            <div className="card metric-card blue-card">
              <div className="metric-icon">👥</div>
              <div className="metric-info">
                <h3>Total Registered Students</h3>
                <p className="metric-number">{students.length}</p>
              </div>
            </div>

            <div className="card metric-card green-card">
              <div className="metric-icon">📚</div>
              <div className="metric-info">
                <h3>Active System Modules</h3>
                <p className="metric-number">4</p>
                <span className="card-subtitle">SIMS, Enrollment, Attendance, Grading</span>
              </div>
            </div>

            <div className="card metric-card purple-card">
              <div className="metric-icon">⚡</div>
              <div className="metric-info">
                <h3>System Status</h3>
                <p className="metric-status">ONLINE</p>
                <span className="card-subtitle">Connected to Port: 8080 (MySQL Tier Verified)</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'students' && (
          <div>
            <h3>Add New Student</h3>
            <form onSubmit={handleAddStudent} className="erp-form">
              <input type="text" placeholder="Student ID (e.g., SE-102)" value={studentId} onChange={(e) => setStudentId(e.target.value)} required />
              <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              
              <select 
                value={faculty} 
                onChange={(e) => setFaculty(e.target.value)} 
                required 
                className="erp-select"
              >
                <option value="">-- Select Faculty --</option>
                <option value="Faculty of Computing">Faculty of Computing</option>
                <option value="Faculty of Engineering">Faculty of Engineering</option>
                <option value="Faculty of Business Management">Faculty of Business Management</option>
              </select>

              <button type="submit">Register Student</button>
            </form>

            <h3>Registered Students List</h3>
            <table className="erp-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Faculty</th>
                </tr>
              </thead>
              <tbody>
                {students.length === 0 ? (
                  <tr><td colSpan="4" style={{textAlign: 'center'}}>No registered students found.</td></tr>
                ) : (
                  students.map(s => (
                    <tr key={s.studentId}>
                      <td>{s.studentId}</td>
                      <td>{s.name}</td>
                      <td>{s.email}</td>
                      <td>{s.faculty}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'courses' && (
          <div>
            <h3>New Course Enrollment</h3>
            <form onSubmit={handleEnrollCourse} className="erp-form">
              <select 
                value={selectedStudent} 
                onChange={(e) => setSelectedStudent(e.target.value)} 
                required 
                className="erp-select"
              >
                <option value="">-- Select Registered Student --</option>
                {students.map(s => (
                  <option key={s.studentId} value={s.name}>{s.name} ({s.studentId})</option>
                ))}
              </select>

              <select 
                value={enrollmentFaculty} 
                onChange={(e) => setEnrollmentFaculty(e.target.value)} 
                required 
                className="erp-select"
              >
                <option value="">-- Select Faculty --</option>
                <option value="Faculty of Computing">Faculty of Computing</option>
                <option value="Faculty of Engineering">Faculty of Engineering</option>
                <option value="Faculty of Business Management">Faculty of Business Management</option>
              </select>

              <input 
                type="text" 
                placeholder="Course Name (e.g., Distributed Systems)" 
                value={courseName} 
                onChange={(e) => setCourseName(e.target.value)} 
                required 
              />
              <button type="submit">Enroll Student</button>
            </form>

            <h3>Active Course Enrollments</h3>
            <table className="erp-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Faculty</th>
                  <th>Enrolled Course</th>
                  <th>Enrollment Date</th>
                </tr>
              </thead>
              <tbody>
                {enrollments.length === 0 ? (
                  <tr><td colSpan="4" style={{textAlign: 'center'}}>No active enrollments found.</td></tr>
                ) : (
                  enrollments.map(e => (
                    <tr key={e.id}>
                      <td>{e.studentName}</td>
                      <td>{e.faculty}</td>
                      <td>{e.course}</td>
                      <td>{e.date}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'grades' && (
          <div>
            <h3>Enter Student Marks & Grades</h3>
            <form onSubmit={handleAddGrade} className="erp-form">
              <select 
                value={gradeStudent} 
                onChange={(e) => setGradeStudent(e.target.value)} 
                required 
                className="erp-select"
              >
                <option value="">-- Select Student --</option>
                {students.map(s => (
                  <option key={s.studentId} value={s.name}>{s.name} ({s.studentId})</option>
                ))}
              </select>

              <input 
                type="text" 
                placeholder="Module / Course Name (e.g., Spring Boot, UI/UX)" 
                value={gradeCourse} 
                onChange={(e) => setGradeCourse(e.target.value)} 
                required 
              />

              <input 
                type="number" 
                placeholder="Enter Marks (0-100)" 
                min="0" 
                max="100"
                value={marks} 
                onChange={(e) => setMarks(e.target.value)} 
                required 
              />
              
              <input 
                type="text" 
                placeholder="Grade (e.g., A+, B, C)" 
                maxLength="2"
                value={grade} 
                onChange={(e) => setGrade(e.target.value)} 
                required 
              />
              <button type="submit" style={{backgroundColor: '#8b5cf6'}}>Log Grade</button>
            </form>

            <h3>Final Exam Results</h3>
            <table className="erp-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Module Name</th>
                  <th>Marks</th>
                  <th>Final Grade</th>
                </tr>
              </thead>
              <tbody>
                {gradesList.length === 0 ? (
                  <tr><td colSpan="4" style={{textAlign: 'center'}}>No grades logged yet.</td></tr>
                ) : (
                  gradesList.map(g => (
                    <tr key={g.id}>
                      <td>{g.studentName}</td>
                      <td>{g.course}</td>
                      <td>{g.marks}%</td>
                      <td>
                        <strong style={{
                          color: g.grade.toUpperCase().startsWith('A') ? '#10b981' : 
                                 (g.grade.toUpperCase().includes('D') || g.grade === 'C-') ? '#ef4444' : '#1e293b'
                        }}>
                          {g.grade}
                        </strong>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'attendance' && (
          <div>
            <h3>Log Student Attendance</h3>
            <form onSubmit={handleLogAttendance} className="erp-form">
              <select 
                value={attendanceStudent} 
                onChange={(e) => setAttendanceStudent(e.target.value)} 
                required 
                className="erp-select"
              >
                <option value="">-- Select Student --</option>
                {students.map(s => (
                  <option key={s.studentId} value={s.name}>{s.name} ({s.studentId})</option>
                ))}
              </select>

              <select 
                value={status} 
                onChange={(e) => setStatus(e.target.value)} 
                required 
                className="erp-select"
              >
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
              </select>
              
              <button type="submit" style={{backgroundColor: '#eab308', color: '#1e293b', fontWeight: 'bold'}}>Log Attendance</button>
            </form>

            <h3>Daily Attendance Log</h3>
            <table className="erp-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {attendanceList.length === 0 ? (
                  <tr><td colSpan="3" style={{textAlign: 'center'}}>No attendance records logged for today.</td></tr>
                ) : (
                  attendanceList.map(a => (
                    <tr key={a.id}>
                      <td>{a.studentName}</td>
                      <td>{a.date}</td>
                      <td>
                        <span style={{
                          padding: '4px 8px', 
                          borderRadius: '4px', 
                          fontWeight: 'bold',
                          backgroundColor: a.status === 'Present' ? '#dcfce7' : '#fee2e2',
                          color: a.status === 'Present' ? '#15803d' : '#991b1b'
                        }}>
                          {a.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
        
      </main>
    </div>
  );
}

export default App;