// Sample Data
const SAMPLE_DATA = {
    currentUser: {
        id: 'user_florik',
        username: 'Florik',
        email: 'florik@anonyq.local',
        role: 'master', // Master role can manage professionals
        avatar: '👤',
        joinedDate: '2024-01-15'
    },

    professionals: [
        {
            id: 'prof_dieter',
            name: 'Dieter',
            title: 'Knowledge Expert',
            bio: 'Passionate about sharing knowledge across various topics and helping others learn.',
            avatar: '👨‍🏫',
            category: 'General Knowledge',
            expertise: ['Allgemeinwissen'],
            tags: ['Allgemeinwissen'],
            specialties: ['General Knowledge', 'Learning Support', 'Topic Research'],
            rating: 4.8,
            answers: 245,
            responseTime: '2 hours',
            isVerified: true,
            joinedDate: '2023-06-20'
        },
        {
            id: 'prof_german',
            name: 'German',
            title: 'Q&A Specialist',
            bio: 'Expert in answering complex questions with detailed, insightful responses.',
            avatar: '🧠',
            category: 'Questions & Answers',
            expertise: ['Q&A Expert'],
            tags: ['Q&A Expert'],
            specialties: ['Complex Questions', 'Problem Solving', 'Expert Advice'],
            rating: 4.9,
            answers: 512,
            responseTime: '1 hour',
            isVerified: true,
            joinedDate: '2023-03-10'
        },
        {
            id: 'prof_tech',
            name: 'Tech Sarah',
            title: 'Technology Consultant',
            bio: 'Full-stack developer and technology enthusiast helping with tech questions.',
            avatar: '💻',
            category: 'Technology',
            expertise: ['Web Development', 'Cloud Services', 'DevOps'],
            tags: [],
            specialties: ['Web Development', 'Cloud Architecture', 'System Design'],
            rating: 4.7,
            answers: 189,
            responseTime: '3 hours',
            isVerified: true,
            joinedDate: '2023-08-05'
        },
        {
            id: 'prof_business',
            name: 'Business Bob',
            title: 'Business Strategist',
            bio: 'Experienced entrepreneur and business consultant offering strategic insights.',
            avatar: '💼',
            category: 'Business',
            expertise: ['Business Strategy', 'Startups', 'Management'],
            tags: [],
            specialties: ['Business Strategy', 'Startup Advice', 'Leadership'],
            rating: 4.6,
            answers: 234,
            responseTime: '4 hours',
            isVerified: true,
            joinedDate: '2023-05-12'
        },
        {
            id: 'prof_health',
            name: 'Dr. Emily',
            title: 'Health & Wellness Expert',
            bio: 'Healthcare professional providing evidence-based health and wellness information.',
            avatar: '👨‍⚕️',
            category: 'Health',
            expertise: ['Health & Wellness', 'Fitness', 'Nutrition'],
            tags: [],
            specialties: ['Health Advice', 'Fitness Guidance', 'Wellness'],
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
            title: 'How can I improve my productivity?',
            category: 'career',
            description: 'I struggle with staying focused on tasks. What are some proven techniques to improve productivity?',
            sendToProf: {
                active: true,
                professionalId: 'prof_german'
            },
            postOnForum: true,
            status: 'answered',
            userId: 'user_florik',
            createdDate: '2024-08-20',
            answer: 'Here are some proven techniques: 1. Pomodoro Technique, 2. Time blocking, 3. Eliminating distractions, 4. Setting clear goals...',
            answeredBy: 'prof_german',
            answeredDate: '2024-08-21'
        },
        {
            id: 'q_002',
            title: 'What is the best way to learn a new programming language?',
            category: 'technology',
            description: 'I want to learn Python. What resources and methods would you recommend?',
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
            title: 'How to start a successful business?',
            category: 'business',
            description: 'I have a business idea but don\'t know where to start. What are the first steps?',
            sendToProf: {
                active: true,
                professionalId: 'prof_business'
            },
            postOnForum: true,
            status: 'answered',
            userId: 'user_florik',
            createdDate: '2024-08-15',
            answer: 'Starting a business requires: 1. Market research, 2. Business plan, 3. Funding, 4. Legal setup...',
            answeredBy: 'prof_business',
            answeredDate: '2024-08-16'
        }
    ],

    forumPosts: [
        {
            id: 'forum_001',
            title: 'Best practices for remote work',
            category: 'career',
            description: 'What are the best practices for working from home effectively?',
            author: 'Anonymous User',
            createdDate: '2024-08-22',
            replies: 12,
            views: 156
        },
        {
            id: 'forum_002',
            title: 'Understanding JavaScript async/await',
            category: 'technology',
            description: 'Can anyone explain how async/await works in JavaScript?',
            author: 'Anonymous User',
            createdDate: '2024-08-21',
            replies: 8,
            views: 98
        },
        {
            id: 'forum_003',
            title: 'Nutrition tips for fitness enthusiasts',
            category: 'health',
            description: 'What nutrition strategies do you follow for fitness?',
            author: 'Anonymous User',
            createdDate: '2024-08-20',
            replies: 15,
            views: 234
        }
    ],

    notifications: [
        {
            id: 'notif_001',
            type: 'answer',
            title: 'Your question has been answered!',
            message: 'German answered: "How can I improve my productivity?"',
            questionId: 'q_001',
            timestamp: '2024-08-21 10:30',
            read: false
        },
        {
            id: 'notif_002',
            type: 'forum_reply',
            title: 'Someone replied to your forum post',
            message: 'New reply in: "Best practices for remote work"',
            postId: 'forum_001',
            timestamp: '2024-08-22 14:15',
            read: false
        },
        {
            id: 'notif_003',
            type: 'professional_update',
            title: 'Professional tag update',
            message: 'Dieter\'s tags have been updated',
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
        const stored = localStorage.getItem('anonyQ_data');
        if (!stored) {
            localStorage.setItem('anonyQ_data', JSON.stringify(SAMPLE_DATA));
            this.data = JSON.parse(JSON.stringify(SAMPLE_DATA));
        } else {
            this.data = JSON.parse(stored);
        }
    }

    saveData() {
        localStorage.setItem('anonyQ_data', JSON.stringify(this.data));
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
                title: 'Your question has been answered!',
                message: `${prof.name} answered: "${question.title}"`,
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
