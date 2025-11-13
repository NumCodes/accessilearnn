# AccessiLearn - Inclusive and Accessible Learning Platform

*An education platform designed for everyone, with built-in accessibility features for users with visual, auditory, and motor disabilities.*


## 🎯 Mission

**Education Without Barriers**

AccessiLearn is committed to making quality education accessible to everyone, regardless of their abilities. Our platform implements comprehensive accessibility standards to ensure that learning is inclusive, intuitive, and empowering for all users.

## ✨ Key Features

### 🎨 Accessibility Controls
- **Theme Modes**: Light, Dark, and High-Contrast modes for visual clarity
- **Text Sizing**: Adjustable font sizes (Small, Normal, Large, Extra-Large)
- **Floating Toolbar**: Quick access to accessibility settings
- **Persistent Settings**: User preferences saved with localStorage
- **Keyboard Navigation**: Full keyboard support throughout the platform
- **ARIA Labels**: Semantic HTML with proper accessibility attributes

### 📚 Learning Dashboard
- Browse lessons across multiple subjects (Math, Science, English, History)
- Filter lessons by difficulty level (Beginner, Intermediate, Advanced)
- Track progress with visual indicators
- Quick access to lessons and quizzes
- Responsive design for mobile, tablet, and desktop

### 📖 Lesson Page with Accessibility Tools

#### Text-to-Speech (TTS)
- Convert lesson content to audio using Web Speech API
- Play/pause controls with real-time status
- Accessible audio playback for visually impaired users

#### Speech-to-Text (STT)
- Voice input using Web Speech Recognition API
- Voice commands support (try "next" or "prev" to navigate)
- Visual transcription feedback
- Error handling and retry options

#### Translation
- Translate lesson content to 100+ languages
- Uses MyMemory API for reliable translations
- Language selection dropdown
- Instant translation with visual feedback

#### Navigation
- Previous/Next buttons to navigate between lessons
- Voice command support for "next" and "prev" to move between lessons
- Direct access to quiz button

### 🧪 Quiz Section
- Multiple-choice questions with immediate feedback
- Audio playback of questions for accessibility
- Visual indicators for correct/incorrect answers
- Detailed results with score breakdown
- Explanation for each answer
- Retake quiz option for better learning

### 📊 Progress Tracker
- Visual dashboard with interactive charts
- Bar chart showing performance across lessons
- Line chart tracking progress over time
- Statistics dashboard (Completed Lessons, Average Score, Completion Rate)
- Detailed lesson-by-lesson progress view
- Export progress as JSON or copy report to clipboard

### 🎯 Additional Features
- Glass morphism UI with smooth animations
- Responsive design that works on all devices
- LocalStorage for data persistence (no backend required)
- Error handling and user feedback
- Smooth transitions and micro-interactions

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or modern browser with Web Speech API support
- npm or yarn package manager

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/numcodes/accessilearn.git
cd accessilearn
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/accessilearn)

Or deploy manually:
\`\`\`bash
npm run build
npm start
\`\`\`

## 📁 Project Structure

\`\`\`
accessilearn/
├── app/
│   ├── page.tsx                 # Home page
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles & accessibility themes
│   ├── dashboard/
│   │   └── page.tsx             # Learning dashboard
│   ├── lesson/
│   │   └── [id]/
│   │       └── page.tsx         # Lesson page with TTS, STT, translation
│   ├── quiz/
│   │   └── [id]/
│   │       └── page.tsx         # Quiz page with audio support
│   ├── progress/
│   │   └── page.tsx             # Progress tracker
│   └── api/
│       └── translate/
│           └── route.ts         # Translation API
├── components/
│   └── accessibility-toolbar.tsx # Main accessibility toolbar
├── public/                      # Static assets
└── README.md                    # This file
\`\`\`

## 🛠 Technologies Used

- **Frontend Framework**: Next.js 16
- **Styling**: Tailwind CSS 4 with glass morphism effects
- **Speech APIs**: Web Speech API (TTS & STT)
- **Translation**: MyMemory API
- **Storage**: Browser localStorage
- **Accessibility**: WCAG 2.1 AA standards
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React

## 🎤 Voice Commands

The platform supports voice input with these commands:

### On Lesson Page
- **"next"** - Navigate to the next lesson
- **"prev"** or **"previous"** - Navigate to the previous lesson
- Say any text to see it converted to speech-to-text

### General Voice Features
- Read lesson content aloud with Text-to-Speech
- Answer quiz questions with voice input
- Full voice input support in text areas

## ♿ Accessibility Features

### Visual Accessibility
- High-contrast mode for users with low vision
- Adjustable text sizes up to Extra-Large
- Clear color contrast ratios (WCAG AA compliant)
- Glass morphism with readable backgrounds

### Auditory Accessibility
- Text-to-Speech for all lesson content
- Audio playback of quiz questions
- Visual transcription of voice input

### Motor Accessibility
- Full keyboard navigation support
- Voice input as alternative to mouse/touch
- Large click targets for buttons
- Semantic HTML for screen reader support

### Cognitive Accessibility
- Clear, simple language
- Organized content structure
- Visual progress indicators
- Immediate feedback on interactions

## 📱 Browser Support

AccessiLearn works best on:
- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Note**: Speech Recognition API requires a modern browser. Check [caniuse.com](https://caniuse.com/speech-recognition) for detailed support.

## 📝 Usage Examples

### Accessing a Lesson
1. Go to Dashboard
2. Click "Learn" on any lesson card
3. Use the toolbar to adjust font size or theme
4. Click "Play Audio Lesson" to hear content
5. Use "Translate Lesson" to switch languages
6. Navigate with "Next/Prev" buttons or voice commands

### Taking a Quiz
1. From the lesson page, click "Go to Quiz"
2. Read the question or click the speaker icon for audio
3. Select your answer or use voice input
4. See immediate feedback
5. Review results with explanations

### Tracking Progress
1. Navigate to "Progress" from the dashboard
2. View charts and statistics
3. See detailed lesson-by-lesson progress
4. Export your progress as needed

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Built with Love by [Num Codes](https://github.com/numcodes)
- Accessibility standards from [W3C WCAG](https://www.w3.org/WAI/WCAG21/quickref/)
- Icons from [Lucide React](https://lucide.dev)
- Charts from [Recharts](https://recharts.org)

## 📞 Support

For issues, questions, or accessibility feedback, please:
- Open an issue on GitHub
- Contact us at ugochukwunweze899@gmail.com
- Check our [Accessibility Statement](./ACCESSIBILITY.md)

---

**Built for Everyone By [Num Codes](https://github.com/numcodes)** 🌍

AccessiLearn believes education should be accessible to all. If you encounter any accessibility barriers, please let us know!
