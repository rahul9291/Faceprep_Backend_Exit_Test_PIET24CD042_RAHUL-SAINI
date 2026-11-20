// Submission verification helper
// Run with: node A3.js
const fs = require('fs');
const required = [
  '../Task1_Library_API/server.js',
  '../Task1_Library_API/models/Book.js',
  '../Task1_Library_API/routes/bookRoutes.js',
  '../Task2_Student_Portal/server.js',
  '../Task2_Student_Portal/models/User.js',
  '../Task2_Student_Portal/routes/authRoutes.js',
  '../Task2_Student_Portal/routes/userRoutes.js'
];
let missing = [];
for (const item of required) {
  if (!fs.existsSync(require('path').join(__dirname, item))) missing.push(item);
}
if (missing.length) {
  console.log('Missing files:', missing);
  process.exitCode = 1;
} else {
  console.log('Project structure check passed. Both backend projects are present.');
}
