# Pratyogita - MCQ Test Platform

A desktop-first online MCQ test platform built with React, Material UI, and local storage for data persistence.

## Features

### Authentication
- User registration and login
- Role-based access (Student/Admin)
- Session persistence with localStorage

### Student Features
- Browse available contests
- Register for contests
- Take timed MCQ tests with:
  - Question navigation
  - Timer with countdown
  - Save & Next functionality
  - Review Later marking
  - Clear Answer option
- View detailed results with explanations
- Track contest history

### Admin Features
- Dashboard with statistics
- Create and manage contests
- Upload questions via CSV (using PapaParse)
- View participants and results
- Toggle contest status (active/inactive)

## Tech Stack

- **Frontend**: React 18 with Vite
- **UI Framework**: Material UI v5
- **Routing**: React Router DOM
- **State Management**: Context API
- **Data Persistence**: localStorage
- **CSV Parsing**: PapaParse
- **Icons**: Material Icons

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── AdminRoute.js   # Admin route protection
│   ├── Navbar.js       # Navigation bar
│   ├── ProtectedRoute.js # Route protection
│   ├── QuestionCard.js # MCQ question component
│   ├── Sidebar.js      # Admin sidebar
│   └── Timer.js        # Countdown timer
├── context/            # React Context providers
│   ├── AuthContext.js  # Authentication state
│   └── ContestContext.js # Contest management
├── data/               # Dummy data and initialization
│   └── contests.js     # Sample contests, questions, users
├── pages/              # Page components
│   ├── admin/          # Admin pages
│   │   ├── CreateContest.js
│   │   ├── ContestList.js
│   │   └── Dashboard.js
│   ├── Contests.js     # Contest listing
│   ├── Exam.js         # Test taking interface
│   ├── Login.js        # Authentication
│   ├── Results.js      # Result display
│   ├── Signup.js       # User registration
│   └── ThankYou.js     # Post-test completion
├── App.js              # Main app component
└── main.jsx           # Entry point
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pratyogita
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Default Users

The application comes with pre-configured users:

**Student Accounts:**
- Email: `john@example.com` | Password: `password123`
- Email: `jane@example.com` | Password: `password123`

**Admin Account:**
- Email: `admin@pratyogita.com` | Password: `admin123`

## Usage

### For Students

1. **Register/Login**: Create an account or use existing credentials
2. **Browse Contests**: View available contests on the main page
3. **Register**: Click "Register" on contests you want to take
4. **Take Test**: Click "Start" to begin the exam
5. **Submit**: Complete the test and view results

### For Admins

1. **Login**: Use admin credentials
2. **Dashboard**: View platform statistics
3. **Create Contest**: Use the form to create new contests
4. **Upload Questions**: Use CSV format for bulk question upload
5. **Manage**: Toggle contest status and view participants

### CSV Format for Questions

When uploading questions via CSV, use the following format:

```csv
question,option1,option2,option3,option4,correctAnswer,explanation
"What is React?",A JavaScript library,A CSS framework,A database,A server,0,"React is a JavaScript library for building user interfaces"
```

- `question`: The question text
- `option1-4`: Multiple choice options
- `correctAnswer`: Index of correct answer (0-3)
- `explanation`: Optional explanation for the answer

## Features in Detail

### Exam Interface
- **Timer**: Visual countdown with color-coded progress
- **Navigation**: Sidebar with question numbers and status indicators
- **Question Types**: Multiple choice with radio buttons
- **Actions**: Save & Next, Review Later, Clear Answer
- **Auto-submit**: Automatic submission when time expires

### Results Analysis
- **Score Display**: Percentage and grade classification
- **Detailed Review**: Question-by-question breakdown
- **Answer Comparison**: Your answer vs correct answer
- **Explanations**: Educational feedback for each question

### Admin Panel
- **Statistics**: Overview of platform usage
- **Contest Management**: Create, edit, and toggle contests
- **Participant Tracking**: View enrollment and completion data
- **Result Analytics**: Performance metrics and trends

## Data Persistence

All data is stored in browser localStorage:
- User accounts and sessions
- Contest information and questions
- Enrollment records
- Test results and answers

## Customization

### Adding New Categories
Edit the `categories` array in `CreateContest.js`:
```javascript
const categories = [
  'Programming',
  'Frontend',
  'Backend',
  'Database',
  'Computer Science',
  'Mathematics',
  'General Knowledge',
  'Your New Category'
];
```

### Modifying Timer Behavior
Adjust timer settings in `Timer.js`:
```javascript
const getColor = () => {
  if (progress > 50) return 'primary';
  if (progress > 25) return 'warning';
  return 'error';
};
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or issues, please open an issue in the repository.
