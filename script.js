// Load saved students from localStorage
// If nothing is saved, start with an empty array
let students = JSON.parse(localStorage.getItem("students")) || [];

// Select HTML elements
const form = document.getElementById("student-form");
const nameInput = document.getElementById("student-name");
const gradeInput = document.getElementById("student-grade");
const studentsContainer = document.getElementById("students-container");
const averageGrade = document.getElementById("average-grade");

// Listen for form submission
form.addEventListener("submit", function (event) {
  // Prevent page refresh
  event.preventDefault();

  // Add a new student
  addStudent();
});

// Function to save students to localStorage
function saveStudents() {
  localStorage.setItem("students", JSON.stringify(students));
}

// Function to add a student
function addStudent() {
  // Get input values
  const name = nameInput.value.trim();
  const grade = Number(gradeInput.value);

  // Validate name
  if (name === "") {
    alert("Please enter a student name.");
    return;
  }

  // Validate grade
  if (isNaN(grade) || grade < 0 || grade > 100) {
    alert("Please enter a grade between 0 and 100.");
    return;
  }

  // Create a student object
  const student = {
    id: Date.now(),
    name: name,
    grade: grade
  };

  // Add student to the array
  students.push(student);

  // Save to localStorage
  saveStudents();

  // Clear inputs
  nameInput.value = "";
  gradeInput.value = "";

  // Update the page
  displayStudents();
  calculateAverage();
}

// Function to calculate and return the average grade
function getAverage() {
  // If there are no students
  if (students.length === 0) {
    return 0;
  }

  // Add all grades together
  let total = 0;

  for (let i = 0; i < students.length; i++) {
    total = total + students[i].grade;
  }

  // Return the average
  return total / students.length;
}

// Function to display all students
function displayStudents() {
  // Clear previous content
  studentsContainer.innerHTML = "";

  // If there are no students
  if (students.length === 0) {
    studentsContainer.innerHTML = "<p>No students added yet.</p>";
    return;
  }

  // Get current average
  const average = getAverage();

  // Loop through all students
  for (let i = 0; i < students.length; i++) {
    // Create a card
    const studentDiv = document.createElement("div");

    // Add base card class
    studentDiv.classList.add("student-card");

    // Highlight students above average
    if (students[i].grade > average) {
      studentDiv.classList.add("above-average");
    }

    // Add student content
    studentDiv.innerHTML =
      "<h3>" + students[i].name + "</h3>" +
      "<p>Grade: " + students[i].grade + "</p>" +
      '<button class="delete-btn" onclick="deleteStudent(' +
      students[i].id +
      ')">Delete</button>';

    // Add card to the page
    studentsContainer.appendChild(studentDiv);
  }
}

// Function to display average grade
function calculateAverage() {
  // Get average
  const average = getAverage();

  // Update text
  averageGrade.textContent =
    "Average Grade: " + average.toFixed(2);
}

// Function to delete a student
function deleteStudent(id) {
  // Create a new array without the selected student
  let newStudents = [];

  for (let i = 0; i < students.length; i++) {
    if (students[i].id !== id) {
      newStudents.push(students[i]);
    }
  }

  // Replace old array
  students = newStudents;

  // Save updated array
  saveStudents();

  // Update the page
  displayStudents();
  calculateAverage();
}

// Display saved students when the page loads
displayStudents();
calculateAverage();