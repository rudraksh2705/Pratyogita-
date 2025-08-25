// Dummy data for contests
export const contests = [
  {
    id: 1,
    title: "JavaScript Fundamentals",
    description: "Test your knowledge of JavaScript basics including variables, functions, and DOM manipulation.",
    duration: 30, // minutes
    totalQuestions: 20,
    isActive: true,
    startDate: "2024-01-15",
    endDate: "2024-12-31",
    category: "Programming"
  },
  {
    id: 2,
    title: "React Basics",
    description: "Assess your understanding of React components, state, and props.",
    duration: 45,
    totalQuestions: 25,
    isActive: true,
    startDate: "2024-01-20",
    endDate: "2024-12-31",
    category: "Frontend"
  },
  {
    id: 3,
    title: "Data Structures",
    description: "Test your knowledge of arrays, linked lists, stacks, and queues.",
    duration: 60,
    totalQuestions: 30,
    isActive: false,
    startDate: "2024-01-10",
    endDate: "2024-01-25",
    category: "Computer Science"
  }
];

// Dummy questions for contests
export const questions = {
  1: [ // JavaScript Fundamentals
    {
      id: 1,
      question: "What is the correct way to declare a variable in JavaScript?",
      options: [
        "var myVariable = 5;",
        "variable myVariable = 5;",
        "v myVariable = 5;",
        "let myVariable = 5;"
      ],
      correctAnswer: 0,
      explanation: "var is the traditional way to declare variables in JavaScript."
    },
    {
      id: 2,
      question: "Which method is used to add an element to the end of an array?",
      options: [
        "push()",
        "pop()",
        "shift()",
        "unshift()"
      ],
      correctAnswer: 0,
      explanation: "push() adds one or more elements to the end of an array."
    },
    {
      id: 3,
      question: "What does the 'typeof' operator return for an array?",
      options: [
        "array",
        "object",
        "Array",
        "undefined"
      ],
      correctAnswer: 1,
      explanation: "typeof returns 'object' for arrays because arrays are objects in JavaScript."
    },
    {
      id: 4,
      question: "How do you create a function in JavaScript?",
      options: [
        "function myFunction()",
        "function = myFunction()",
        "function: myFunction()",
        "function -> myFunction()"
      ],
      correctAnswer: 0,
      explanation: "function keyword followed by function name and parentheses."
    },
    {
      id: 5,
      question: "What is the purpose of the 'return' statement?",
      options: [
        "To stop the function execution",
        "To return a value from a function",
        "To print something to console",
        "To declare a variable"
      ],
      correctAnswer: 1,
      explanation: "return statement exits a function and returns a value to the caller."
    }
  ],
  2: [ // React Basics
    {
      id: 1,
      question: "What is a React component?",
      options: [
        "A JavaScript function that returns HTML",
        "A CSS class",
        "A database table",
        "A server-side script"
      ],
      correctAnswer: 0,
      explanation: "React components are JavaScript functions that return JSX (HTML-like syntax)."
    },
    {
      id: 2,
      question: "What is the purpose of props in React?",
      options: [
        "To store component state",
        "To pass data from parent to child components",
        "To handle events",
        "To style components"
      ],
      correctAnswer: 1,
      explanation: "Props (properties) are used to pass data from parent to child components."
    },
    {
      id: 3,
      question: "What hook is used to manage state in functional components?",
      options: [
        "useEffect",
        "useState",
        "useContext",
        "useReducer"
      ],
      correctAnswer: 1,
      explanation: "useState is the hook used to add state to functional components."
    },
    {
      id: 4,
      question: "What does JSX stand for?",
      options: [
        "JavaScript XML",
        "JavaScript Extension",
        "JavaScript Syntax",
        "JavaScript Expression"
      ],
      correctAnswer: 0,
      explanation: "JSX stands for JavaScript XML and allows you to write HTML-like code in JavaScript."
    },
    {
      id: 5,
      question: "How do you render a list in React?",
      options: [
        "Using for loops",
        "Using map() method",
        "Using while loops",
        "Using if statements"
      ],
      correctAnswer: 1,
      explanation: "The map() method is commonly used to render lists of elements in React."
    }
  ],
  3: [ // Data Structures
    {
      id: 1,
      question: "What is the time complexity of accessing an element in an array by index?",
      options: [
        "O(1)",
        "O(n)",
        "O(log n)",
        "O(n²)"
      ],
      correctAnswer: 0,
      explanation: "Array access by index is O(1) - constant time."
    },
    {
      id: 2,
      question: "Which data structure follows LIFO principle?",
      options: [
        "Queue",
        "Stack",
        "Linked List",
        "Tree"
      ],
      correctAnswer: 1,
      explanation: "Stack follows Last In First Out (LIFO) principle."
    },
    {
      id: 3,
      question: "What is the main advantage of a linked list over an array?",
      options: [
        "Faster access to elements",
        "Dynamic size",
        "Better memory usage",
        "Easier to implement"
      ],
      correctAnswer: 1,
      explanation: "Linked lists can grow and shrink dynamically without pre-allocating memory."
    },
    {
      id: 4,
      question: "Which operation has O(1) time complexity in a queue?",
      options: [
        "Search",
        "Enqueue",
        "Dequeue",
        "Both B and C"
      ],
      correctAnswer: 3,
      explanation: "Both enqueue and dequeue operations are O(1) in a properly implemented queue."
    },
    {
      id: 5,
      question: "What is a binary tree?",
      options: [
        "A tree with exactly two nodes",
        "A tree where each node has at most two children",
        "A tree with two levels",
        "A tree with even number of nodes"
      ],
      correctAnswer: 1,
      explanation: "A binary tree is a tree data structure where each node has at most two children."
    }
  ]
};

// Dummy users
export const users = [
  {
    id: 1,
    username: "john_doe",
    email: "john@example.com",
    password: "password123",
    name: "John Doe",
    role: "student"
  },
  {
    id: 2,
    username: "jane_smith",
    email: "jane@example.com",
    password: "password123",
    name: "Jane Smith",
    role: "student"
  },
  {
    id: 3,
    username: "admin",
    email: "admin@pratyogita.com",
    password: "admin123",
    name: "Administrator",
    role: "admin"
  }
];

// Initialize localStorage with dummy data if not exists
export const initializeData = () => {
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(users));
  }
  if (!localStorage.getItem('contests')) {
    localStorage.setItem('contests', JSON.stringify(contests));
  }
  if (!localStorage.getItem('questions')) {
    localStorage.setItem('questions', JSON.stringify(questions));
  }
  if (!localStorage.getItem('enrollments')) {
    localStorage.setItem('enrollments', JSON.stringify([]));
  }
  if (!localStorage.getItem('results')) {
    localStorage.setItem('results', JSON.stringify([]));
  }
};
