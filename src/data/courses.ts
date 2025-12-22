export interface Course {
  code: string;
  name: string;
  department: string;
}

export const courses: Course[] = [
  // 15xxx courses (Computer Science) - highest to lowest
  { code: '15-251', name: 'Great Theoretical Ideas in Computer Science', department: 'Computer Science' },
  { code: '15-365', name: 'Computational Biology', department: 'Computer Science' },
  { code: '15-312', name: 'Foundations of Programming Languages', department: 'Computer Science' },
  { code: '15-210', name: 'Parallel and Sequential Data Structures and Algorithms', department: 'Computer Science' },
  { code: '15-151', name: 'Mathematical Foundations for Computer Science', department: 'Computer Science' },
  { code: '15-150', name: 'Principles of Functional Programming', department: 'Computer Science' },
  { code: '15-122', name: 'Principles of Imperative Computation', department: 'Computer Science' },
  { code: '15-112', name: 'Fundamentals of Programming and Computer Science', department: 'Computer Science' },
  
  // 16xxx courses (Robotics) - highest to lowest
  { code: '16-865', name: 'Robot Autonomy', department: 'Robotics' },
  { code: '16-161', name: 'Introduction to Robotics', department: 'Robotics' },
  
  // 33xxx courses (Physics) - highest to lowest
  { code: '33-114', name: 'Physics I for Engineering Students', department: 'Physics' },
  { code: '33-104', name: 'Experimental Physics', department: 'Physics' },
  
  // 21xxx courses (Mathematics) - highest to lowest
  { code: '21-259', name: 'Calculus in Three Dimensions', department: 'Mathematics' },
  { code: '21-122', name: 'Integration and Approximation', department: 'Mathematics' },
  
  // 18xxx courses
  { code: '18-312', name: 'Fundamentals of Signal Processing', department: 'Electrical and Computer Engineering' },
];
