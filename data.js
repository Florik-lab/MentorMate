// Sample Data for MentorMate
const SAMPLE_DATA = {
    currentUser: {
        id: 'user_florik',
        username: 'Florik',
        email: 'florik@mentormate.local',
        role: 'master', // Master role can manage mentors
        avatar: '👤',
        joinedDate: '2024-01-15'
    },

    professionals: [
        {
            id: 'prof_dieter',
            name: 'Dieter',
            title: 'General Knowledge Expert',
            bio: 'Passionate about helping students learn and grow. Always happy to share knowledge and support your journey.',
            avatar: '👨‍🏫',
            category: 'Personal Growth',
            expertise: ['Allgemeinwissen'],
            tags: ['Allgemeinwissen'],
            specialties: ['General Knowledge', 'Study Support', 'Personal Development'],
            rating: 4.8,
            answers: 245,
            responseTime: '2 hours',
            isVerified: true,
            joinedDate: '2023-06-20'
        },
        {
            id: 'prof_german',
            name: 'German',
            title: 'Career Mentor & Problem Solver',
            bio: 'Experienced in guiding students through career decisions and complex challenges. Expert at breaking down problems.',
            avatar: '🧠',
            category: 'Career & Jobs',
            expertise: ['Q&A Expert'],
            tags: ['Q&A Expert'],
            specialties: ['Career Advice', 'Problem Solving', 'Job Search'],
            rating: 4.9,
            answers: 512,
            responseTime: '1 hour',
            isVerified: true,
            joinedDate: '2023-03-10'
        },
        {
            id: 'prof_tech',
            name: 'Tech Sarah',
            title: 'Technical Skills Trainer',
            bio: 'Full-stack developer passionate about teaching tech skills to the next generation.',
            avatar: '💻',
            category: 'Technical Skills',
            expertise: ['Programming', 'Web Development', 'Tech Support'],
            tags: [],
            specialties: ['Web Development', 'Programming', 'Tech Troubleshooting'],
            rating: 4.7,
            answers: 189,
            responseTime: '3 hours',
            isVerified: true,
            joinedDate: '2023-08-05'
        },
        {
            id: 'prof_business',
            name: 'Business Bob',
            title: 'Business Mentor & Entrepreneur',
            bio: 'Experienced business owner helping students understand the business world and entrepreneurship.',
            avatar: '💼',
            category: 'Business Basics',
            expertise: ['Business Strategy', 'Startups', 'Management'],
            tags: [],
            specialties: ['Business Basics', 'Entrepreneurship', 'Leadership'],
            rating: 4.6,
            answers: 234,
            responseTime: '4 hours',
            isVerified: true,
            joinedDate: '2023-05-12'
        },
        {
            id: 'prof_health',
            name: 'Dr. Emily',
            title: 'Health & Wellness Coach',
            bio: 'Healthcare professional supporting student wellbeing and healthy lifestyle choices.',
            avatar: '👨‍⚕️',
            category: 'Health & Wellness',
            expertise: ['Health & Wellness', 'Fitness', 'Mental Health'],
            tags: [],
            specialties: ['Health Advice', 'Fitness', 'Wellness & Stress Management'],
            rating: 4.9,
            answers: 378,
            responseTime: '2 hours',
            isVerified: true,
            joinedDate: '2023-02-28'
        }
    ],

    questions: [
        {
            id: 'q_001',
            title: 'How can I improve my productivity while studying?',
            category: 'personal',
            description: 'I struggle with staying focused on my studies. What are some proven techniques to improve concentration?',
            sendToProf: {
                active: true,
                professionalId: 'prof_german'
            },
            postOnForum: true,
            status: 'answered',
            userId: 'user_florik',
            createdDate: '2024-08-20',
            answer: 'Here are some proven techniques: 1. Pomodoro Technique (25 min focus + 5 min break), 2. Time blocking your day, 3. Removing distractions, 4. Setting clear goals...',
            answeredBy: 'prof_german',
            answeredDate: '2024-08-21'
        },
        {
            id: 'q_002',
            title: 'What programming languages should I learn for my career?',
            category: 'technical',
            description: 'I want to learn programming but don\'t know which language to start with. What would you recommend?',
            sendToProf: {
                active: true,
                professionalId: 'prof_tech'
            },
            postOnForum: true,
            status: 'pending',
            userId: 'user_florik',
            createdDate: '2024-08-19'
        },
        {
            id: 'q_003',
            title: 'How to start my own business after vocational school?',
            category: 'business',
            description: 'I have a business idea but don\'t know where to start. What are the first steps I should take?',
            sendToProf: {
                active: true,
                professionalId: 'prof_business'
            },
            postOnForum: true,
            status: 'answered',
            userId: 'user_florik',
            createdDate: '2024-08-15',
            answer: 'Starting a business requires: 1. Market research, 2. Business plan, 3. Funding strategy, 4. Legal setup...',
            answeredBy: 'prof_business',
            answeredDate: '2024-08-16'
        }
    ],

    forumPosts: [
        {
            id: 'forum_001',
            title: 'Best ways to balance work and studies',
            category: 'personal',
            description: 'How do you manage to keep up with both work and vocational training? Any tips?',
            author: 'Anonymous Student',
            createdDate: '2024-08-22',
            replies: 12,
            views: 156
        },
        {
            id: 'forum_002',
            title: 'Tips for job interviews after graduation',
            category: 'career',
            description: 'I\'m almost done with my vocational training. Any advice on acing job interviews?',
            author: 'Anonymous Student',
            createdDate: '2024-08-21',
            replies: 8,
            views: 98
        },
        {
            id: 'forum_003',
            title: 'Dealing with stress and anxiety during training',
            category: 'health',
            description: 'Does anyone else feel overwhelmed during their training? How do you cope with stress?',
            author: 'Anonymous Student',
            createdDate: '2024-08-20',
            replies: 15,
            views: 234
        }
    ],

    notifications: [
        {
            id: 'notif_001',
            type: 'answer',
            title: 'German answered your question!',
            message: '"How can I improve my productivity while studying?" - Get some great tips!',
            questionId: 'q_001',
            timestamp: '2024-08-21 10:30',
            read: false
        },
        {
            id: 'notif_002',
            type: 'forum_reply',
            title: 'Someone replied in the community',
            message: 'New response in: "Best ways to balance work and studies"',
            postId: 'forum_001',
            timestamp: '2024-08-22 14:15',
            read: false
        },
        {
            id: 'notif_003',
            type: 'professional_update',
            title: 'New mentor joined!',
            message: 'Dieter is now available to help with general knowledge questions',
            professionalId: 'prof_dieter',
            timestamp: '2024-08-22 09:00',
            read: true
        }
    ]
};

// Local Storage Manager
class StorageManager {
    constructor() {
        this.loadData();
    }

    loadData() {
        const stored = localStorage.getItem('mentormate_data');
        if (!stored) {
            localStorage.setItem('mentormate_data', JSON.stringify(SAMPLE_DATA));
            this.data = JSON.parse(JSON.stringify(SAMPLE_DATA));
        } else {
            this.data = JSON.parse(stored);
        }
    }

    saveData() {
        localStorage.setItem('mentormate_data', JSON.stringify(this.data));
    }

    getCurrentUser() {
        return this.data.currentUser;
    }

    getAllProfessionals() {
        return this.data.professionals;
    }

    getProfessionalById(id) {
        return this.data.professionals.find(p => p.id === id);
    }

    searchProfessionals(query, category = null) {
        let results = this.data.professionals.filter(p => 
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.title.toLowerCase().includes(query.toLowerCase()) ||
            p.specialties.some(s => s.toLowerCase().includes(query.toLowerCase())) ||
            p.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
        );

        if (category) {
            results = results.filter(p => p.category === category);
        }

        return results;
    }

    addQuestion(question) {
        const newQuestion = {
            id: 'q_' + Date.now(),
            ...question,
            userId: this.data.currentUser.id,
            createdDate: new Date().toISOString().split('T')[0]
        };
        this.data.questions.push(newQuestion);
        this.saveData();
        return newQuestion;
    }

    getMyQuestions() {
        return this.data.questions.filter(q => q.userId === this.data.currentUser.id);
    }

    getForumPosts() {
        return this.data.forumPosts;
    }

    searchForumPosts(query, category = null) {
        let results = this.data.forumPosts.filter(p =>
            p.title.toLowerCase().includes(query.toLowerCase()) ||
            p.description.toLowerCase().includes(query.toLowerCase())
        );

        if (category) {
            results = results.filter(p => p.category === category);
        }

        return results;
    }

    getNotifications() {
        return this.data.notifications;
    }

    getUnreadNotifications() {
        return this.data.notifications.filter(n => !n.read);
    }

    markNotificationAsRead(id) {
        const notif = this.data.notifications.find(n => n.id === id);
        if (notif) {
            notif.read = true;
            this.saveData();
        }
    }

    // Master account functions
    isMasterAccount() {
        return this.data.currentUser.role === 'master';
    }

    addTagToProfessional(professionalId, tag) {
        if (!this.isMasterAccount()) {
            console.error('Only master account can manage tags');
            return false;
        }

        const prof = this.data.professionals.find(p => p.id === professionalId);
        if (prof && !prof.tags.includes(tag)) {
            prof.tags.push(tag);
            this.saveData();
            return true;
        }
        return false;
    }

    removeTagFromProfessional(professionalId, tag) {
        if (!this.isMasterAccount()) {
            console.error('Only master account can manage tags');
            return false;
        }

        const prof = this.data.professionals.find(p => p.id === professionalId);
        if (prof) {
            prof.tags = prof.tags.filter(t => t !== tag);
            this.saveData();
            return true;
        }
        return false;
    }

    getProfessionalTags(professionalId) {
        const prof = this.data.professionals.find(p => p.id === professionalId);
        return prof ? prof.tags : [];
    }

    addNotification(notification) {
        const newNotif = {
            id: 'notif_' + Date.now(),
            ...notification,
            timestamp: new Date().toLocaleString(),
            read: false
        };
        this.data.notifications.unshift(newNotif);
        this.saveData();
        return newNotif;
    }

    answerQuestion(questionId, answer, professionalId) {
        const question = this.data.questions.find(q => q.id === questionId);
        if (question) {
            question.answer = answer;
            question.answeredBy = professionalId;
            question.answeredDate = new Date().toISOString().split('T')[0];
            question.status = 'answered';
            this.saveData();

            // Add notification
            const prof = this.getProfessionalById(professionalId);
            this.addNotification({
                type: 'answer',
                title: `${prof.name} answered your question!`,
                message: `"${question.title}" - Check out the response!`,
                questionId: questionId
            });

            return question;
        }
        return null;
    }

    getAnswerCount() {
        return this.data.questions.filter(q => q.status === 'answered').length;
    }

    getPendingCount() {
        return this.data.questions.filter(q => q.status === 'pending').length;
    }
}

// Initialize storage manager
const storage = new StorageManager();
