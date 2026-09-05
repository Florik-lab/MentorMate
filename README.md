# AnonyQ - Anonymous Questions to Professionals

A cozy web application where users can ask anonymous questions to professionals or post them on a community forum. Built with HTML, CSS, and JavaScript.

## Features

### 🎯 Dashboard
- View all your questions at a glance
- Track question status (pending, answered)
- See statistics including total questions, answered questions, and pending questions
- View recent answers from professionals
- Monitor new notifications

### ❓ Ask a Question
- Submit anonymous questions to professionals
- Choose a category for your question
- Option to send directly to a specific professional
- Option to post on the community forum for crowd-sourced answers
- Questions can be anonymous or identified based on your settings

### 👨‍💼 Find Professionals
- Search for professionals by name, expertise, or specialty
- Filter professionals by category (Technology, Business, Career, Health, Education, Finance, Legal)
- View professional profiles with detailed information
- See professional ratings, answer counts, and response times
- Send questions directly to professionals you trust

### 💬 Community Forum
- Browse community questions posted by users
- Search forum posts by keywords
- Filter by category
- See reply counts and view statistics
- Participate in crowd-sourced question answering
- All forum questions have moderator-only ID codes for tracking

### 🔔 Notifications
- Receive notifications when professionals answer your questions
- Get notified of replies to forum posts
- Mark notifications as read
- Stay updated on all interactions

### 🏷️ Professional Tags & Expertise
- Professionals are tagged with their areas of expertise
- Tags include: Allgemeinwissen, Q&A Expert, Technology, Business, Healthcare, Finance, and more
- Filter professionals by tags to find specialists
- View professional specialties and expertise areas

## Color Scheme

The application features a cozy atmosphere with:
- **Primary Purple**: #7c3aed (main brand color)
- **Accent Orange**: #f97316 (highlights and CTAs)
- **Light backgrounds** with purple and orange accents
- **Smooth gradients** for modern look

## How to Use

### For Regular Users

1. **Asking a Question:**
   - Navigate to "Ask Question"
   - Enter your question title, select a category, and provide details
   - Choose whether to send to a specific professional or post on the forum
   - Submit your question anonymously

2. **Finding Professionals:**
   - Go to "Find Professionals"
   - Search by name, expertise, or specialty
   - Filter by category
   - Click on a professional to view their full profile
   - Send them a question directly

3. **Using the Forum:**
   - Navigate to "Community Forum"
   - Browse questions posted by other users
   - Search for specific topics
   - Reply to forum posts

4. **Managing Notifications:**
   - Click the bell icon or go to "Notifications"
   - View all notifications about answers and replies
   - Mark notifications as read

### For Professionals

- Receive questions from anonymous users
- Provide detailed answers
- Build your profile and ratings
- Help the community through forum participation

## File Structure

```
anonymous-questions-website/
│
├── index.html          # Main HTML structure with all pages and components
├── styles.css          # Complete styling with purple and orange theme
├── data.js             # Sample data, professionals, and storage management
├── script.js           # Main application logic and interactivity
└── README.md           # This file
```

## Technical Details

### Data Storage
- Data is stored in browser's localStorage
- All information persists between sessions
- Sample data is pre-loaded on first visit

### Anonymous Questions
- Questions sent to professionals are saved **without** a user ID
- Questions posted on forum include a **moderator ID code** (visible only to moderators)
- This ensures anonymity for direct professional inquiries

### Question Submission Process
1. **Anonymous to Professional Only**: No ID saved, maximum anonymity
2. **Forum Only**: Moderator ID generated for tracking purposes
3. **Both**: Posted on forum with moderator ID

## Browser Compatibility

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Responsive design

## Key Professionals in Demo

### Dieter
- **Title**: Knowledge Expert
- **Tags**: Allgemeinwissen
- **Specialty**: General Knowledge, Learning Support, Topic Research
- **Rating**: 4.8/5

### German
- **Title**: Q&A Specialist
- **Tags**: Q&A Expert
- **Specialty**: Complex Questions, Problem Solving, Expert Advice
- **Rating**: 4.9/5

## Getting Started

1. Clone or download the repository
2. Open `index.html` in your web browser
3. Start exploring and asking questions!

## Features Overview

| Feature | Status |
|---------|--------|
| Dashboard | ✅ Implemented |
| Ask Questions | ✅ Implemented |
| Professional Search | ✅ Implemented |
| Professional Filtering | ✅ Implemented |
| Community Forum | ✅ Implemented |
| Notifications | ✅ Implemented |
| Professional Tags | ✅ Implemented |
| Anonymous Questions | ✅ Implemented |
| Moderator ID Codes | ✅ Implemented |
| Responsive Design | ✅ Implemented |

## Notifications System

The notification system includes:
- Answer notifications when professionals respond
- Forum reply notifications
- Professional profile updates
- Unread notification counter
- Mark as read functionality

## Search Functionality

- **Global Search**: Search across all questions and professionals
- **Professional Search**: Find professionals by name, expertise, or tags
- **Forum Search**: Search forum posts by title or content
- **Filtering**: Filter by category across all search types

## Responsive Design

The application is fully responsive and works great on:
- Desktop computers
- Tablets
- Mobile phones

All features are accessible on all device sizes.

## Tips for Best Experience

1. **For Professionals**: Keep your profile complete with accurate expertise tags
2. **For Users**: Be specific in your questions for better answers
3. **For Community**: Engage in forum discussions to help others
4. **Search Smart**: Use specific keywords to find relevant professionals

---

**AnonyQ** - Ask Anonymously, Get Expert Answers! 🚀
