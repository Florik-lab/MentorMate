// Main Application Script
class AnonyQApp {
    constructor() {
        this.currentPage = 'dashboard';
        this.selectedProfessional = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadPage('dashboard');
        this.updateStats();
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.dataset.page;
                this.loadPage(page);
            });
        });

        // Link buttons in modals
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('link-btn')) {
                const page = e.target.dataset.page;
                this.loadPage(page);
                this.closeAllModals();
            }
        });

        // Ask Question Form
        const askForm = document.getElementById('ask-question-form');
        if (askForm) {
            askForm.addEventListener('submit', (e) => this.handleAskQuestion(e));
        }

        // Professional checkbox toggle
        const askProfCheckbox = document.getElementById('ask-professional');
        if (askProfCheckbox) {
            askProfCheckbox.addEventListener('change', (e) => {
                this.toggleProfessionalSection(e.target.checked);
            });
        }

        // Professional search
        const profSearchInput = document.getElementById('professional-search-input');
        if (profSearchInput) {
            profSearchInput.addEventListener('input', (e) => {
                this.searchProfessionals(e.target.value);
            });
            profSearchInput.addEventListener('focus', () => {
                document.getElementById('professional-dropdown').style.display = 'block';
            });
        }

        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.professional-search')) {
                document.getElementById('professional-dropdown').style.display = 'none';
            }
        });

        // Professionals page search and filter
        const profsSearch = document.getElementById('professionals-search');
        const profsCategoryFilter = document.getElementById('professionals-category-filter');
        if (profsSearch) {
            profsSearch.addEventListener('input', () => this.filterProfessionals());
            profsCategoryFilter.addEventListener('change', () => this.filterProfessionals());
        }

        // Forum search and filter
        const forumSearch = document.getElementById('forum-search');
        const forumCategoryFilter = document.getElementById('forum-category-filter');
        if (forumSearch) {
            forumSearch.addEventListener('input', () => this.filterForum());
            forumCategoryFilter.addEventListener('change', () => this.filterForum());
        }

        // Global search
        const globalSearch = document.querySelector('.search-global');
        if (globalSearch) {
            globalSearch.addEventListener('input', (e) => this.globalSearch(e.target.value));
        }

        // Notification bell
        document.querySelector('.notifications-bell').addEventListener('click', () => {
            this.loadPage('notifications');
        });

        // Close modals
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.target.closest('.modal').style.display = 'none';
            });
        });

        // Close modal when clicking outside
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
        });

        // Logout button
        document.querySelector('.logout-btn').addEventListener('click', () => {
            alert('Logged out! (This is a demo)');
        });
    }

    loadPage(pageName) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.style.display = 'none';
            page.classList.remove('active');
        });

        // Remove active class from nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === pageName) {
                link.classList.add('active');
            }
        });

        // Show selected page
        const page = document.getElementById(pageName + '-page');
        if (page) {
            page.style.display = 'block';
            page.classList.add('active');

            // Update page title
            const titles = {
                'dashboard': 'Dashboard',
                'ask-question': 'Ask a Question',
                'professionals': 'Find Professionals',
                'forum': 'Community Forum',
                'notifications': 'Notifications'
            };
            document.getElementById('page-title').textContent = titles[pageName] || 'AnonyQ';

            // Load page content
            switch (pageName) {
                case 'dashboard':
                    this.loadDashboard();
                    break;
                case 'professionals':
                    this.loadProfessionals();
                    break;
                case 'forum':
                    this.loadForum();
                    break;
                case 'notifications':
                    this.loadNotifications();
                    break;
            }
        }

        this.currentPage = pageName;
    }

    loadDashboard() {
        const myQuestions = storage.getMyQuestions();
        const answered = storage.getAnswerCount();
        const pending = storage.getPendingCount();
        const unreadNotifications = storage.getUnreadNotifications().length;

        // Update stats
        document.getElementById('total-questions').textContent = myQuestions.length;
        document.getElementById('answered-questions').textContent = answered;
        document.getElementById('pending-questions').textContent = pending;
        document.getElementById('new-notifications').textContent = unreadNotifications;

        // Load my questions
        const myQuestionsListHtml = myQuestions.length > 0 
            ? myQuestions.map(q => `
                <div class="question-card" onclick="app.viewQuestion('${q.id}')">
                    <h4>${q.title}</h4>
                    <p>${q.description.substring(0, 100)}...</p>
                    <div class="question-meta">
                        <span>📁 ${q.category}</span>
                        <span class="status-badge status-${q.status}">${q.status.charAt(0).toUpperCase() + q.status.slice(1)}</span>
                        <span>📅 ${q.createdDate}</span>
                    </div>
                </div>
            `).join('')
            : '<p class="empty-state">No questions yet. <a href="#" class="link-btn" data-page="ask-question">Ask one now!</a></p>';

        document.getElementById('my-questions-list').innerHTML = myQuestionsListHtml;

        // Load recent answers
        const answeredQuestions = myQuestions.filter(q => q.status === 'answered');
        const recentAnswersHtml = answeredQuestions.length > 0
            ? answeredQuestions.map(q => `
                <div class="answer-card" onclick="app.viewQuestion('${q.id}')">
                    <h4>${q.title}</h4>
                    <p>${q.answer.substring(0, 100)}...</p>
                    <div class="question-meta">
                        <span>✅ Answered by ${storage.getProfessionalById(q.answeredBy)?.name || 'Unknown'}</span>
                        <span>📅 ${q.answeredDate}</span>
                    </div>
                </div>
            `).join('')
            : '<p class="empty-state">No answers yet.</p>';

        document.getElementById('recent-answers-list').innerHTML = recentAnswersHtml;
    }

    loadProfessionals() {
        this.renderProfessionalsGrid(storage.getAllProfessionals());
    }

    renderProfessionalsGrid(professionals) {
        const grid = document.getElementById('professionals-grid');
        const currentUser = storage.getCurrentUser();
        const isMaster = currentUser.role === 'master';

        grid.innerHTML = professionals.map(prof => `
            <div class="professional-card" onclick="app.viewProfessionalProfile('${prof.id}')">
                <div class="professional-header">
                    <div class="professional-avatar">${prof.avatar}</div>
                    <h3>${prof.name}</h3>
                    <p class="professional-title">${prof.title}</p>
                </div>
                <div class="professional-body">
                    <div class="professional-expertise">
                        ${prof.tags.map(tag => `<span class="expertise-badge">${tag}</span>`).join('')}
                        ${prof.expertise.filter(e => !prof.tags.includes(e)).slice(0, 2).map(e => `<span class="expertise-badge">${e}</span>`).join('')}
                    </div>
                    <div class="professional-stats">
                        <div class="professional-stat">
                            <div class="stat-value">${prof.rating}</div>
                            <div class="stat-label">Rating</div>
                        </div>
                        <div class="professional-stat">
                            <div class="stat-value">${prof.answers}</div>
                            <div class="stat-label">Answers</div>
                        </div>
                        <div class="professional-stat">
                            <div class="stat-value">${prof.responseTime}</div>
                            <div class="stat-label">Response</div>
                        </div>
                    </div>
                    <div class="professional-actions">
                        <button class="btn btn-primary btn-sm" onclick="event.stopPropagation(); app.askProfessional('${prof.id}')">Ask Question</button>
                        ${isMaster ? `<button class="btn btn-secondary btn-sm" onclick="event.stopPropagation(); app.manageProfessionalTags('${prof.id}')">Manage Tags</button>` : ''}
                    </div>
                </div>
            </div>
        `).join('');
    }

    filterProfessionals() {
        const search = document.getElementById('professionals-search').value;
        const category = document.getElementById('professionals-category-filter').value;
        const results = storage.searchProfessionals(search, category || null);
        this.renderProfessionalsGrid(results);
    }

    viewProfessionalProfile(profId) {
        const prof = storage.getProfessionalById(profId);
        if (!prof) return;

        const currentUser = storage.getCurrentUser();
        const isMaster = currentUser.role === 'master';

        const modal = document.getElementById('professional-modal');
        const body = document.getElementById('professional-modal-body');

        let tagsHtml = prof.tags.map(tag => `<span class="expertise-badge">${tag}</span>`).join('');

        body.innerHTML = `
            <div style="text-align: center; margin-bottom: 20px;">
                <div style="font-size: 60px; margin-bottom: 15px;">${prof.avatar}</div>
                <h2>${prof.name}</h2>
                <p style="color: var(--text-light); margin-bottom: 10px;">${prof.title}</p>
                ${prof.isVerified ? '<p style="color: var(--success); font-weight: 600;">✓ Verified Professional</p>' : ''}
            </div>

            <div style="background: var(--light-bg); padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <p>${prof.bio}</p>
            </div>

            <div style="margin-bottom: 20px;">
                <h3 style="margin-bottom: 10px;">Tags</h3>
                <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 10px;">
                    ${tagsHtml || '<p class="empty-state">No tags yet.</p>'}
                </div>
                ${isMaster ? `<button class="btn btn-secondary btn-sm" onclick="app.manageProfessionalTags('${prof.id}')">Manage Tags</button>` : ''}
            </div>

            <div style="margin-bottom: 20px;">
                <h3 style="margin-bottom: 10px;">Specialties</h3>
                <ul style="color: var(--text-light);">
                    ${prof.specialties.map(s => `<li>• ${s}</li>`).join('')}
                </ul>
            </div>

            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 20px; text-align: center;">
                <div>
                    <div class="stat-value" style="color: var(--primary-purple);">${prof.rating}</div>
                    <div style="font-size: 12px; color: var(--text-light);">Rating</div>
                </div>
                <div>
                    <div class="stat-value" style="color: var(--primary-purple);">${prof.answers}</div>
                    <div style="font-size: 12px; color: var(--text-light);">Answers</div>
                </div>
                <div>
                    <div class="stat-value" style="color: var(--primary-purple);">${prof.responseTime}</div>
                    <div style="font-size: 12px; color: var(--text-light);">Response</div>
                </div>
            </div>

            <button class="btn btn-primary" style="width: 100%;" onclick="app.askProfessional('${prof.id}'); app.closeAllModals();">Ask This Professional</button>
        `;

        modal.style.display = 'block';
    }

    manageProfessionalTags(profId) {
        const prof = storage.getProfessionalById(profId);
        if (!prof) return;

        const currentUser = storage.getCurrentUser();
        if (currentUser.role !== 'master') {
            alert('Only master account can manage tags!');
            return;
        }

        const modal = document.getElementById('professional-modal');
        const body = document.getElementById('professional-modal-body');

        const availableTags = ['Allgemeinwissen', 'Q&A Expert', 'Technology', 'Business', 'Healthcare', 'Finance'];
        const currentTags = prof.tags;

        let tagsHtml = availableTags.map(tag => `
            <label class="checkbox-label" style="display: flex; align-items: center; gap: 10px; margin: 10px 0; cursor: pointer;">
                <input type="checkbox" value="${tag}" ${currentTags.includes(tag) ? 'checked' : ''} onchange="app.toggleTag('${prof.id}', '${tag}', this.checked)">
                <span>${tag}</span>
            </label>
        `).join('');

        body.innerHTML = `
            <h2>Manage Tags for ${prof.name}</h2>
            <p style="color: var(--text-light); margin-bottom: 20px;">Select tags to assign to this professional:</p>
            <div style="display: flex; flex-direction: column;">
                ${tagsHtml}
            </div>
            <div style="margin-top: 20px; display: flex; gap: 10px;">
                <button class="btn btn-secondary" onclick="app.viewProfessionalProfile('${prof.id}')">Back</button>
            </div>
        `;

        modal.style.display = 'block';
    }

    toggleTag(profId, tag, checked) {
        if (checked) {
            storage.addTagToProfessional(profId, tag);
        } else {
            storage.removeTagFromProfessional(profId, tag);
        }
        // Refresh the view
        this.manageProfessionalTags(profId);
    }

    toggleProfessionalSection(checked) {
        const section = document.querySelector('.professional-section');
        if (checked) {
            section.classList.add('active');
        } else {
            section.classList.remove('active');
            this.selectedProfessional = null;
            document.getElementById('selected-professional').classList.remove('active');
        }
    }

    searchProfessionals(query) {
        const results = storage.searchProfessionals(query);
        const dropdown = document.getElementById('professional-list');
        
        if (results.length === 0) {
            dropdown.innerHTML = '<p style="padding: 10px; color: var(--text-light);">No professionals found</p>';
            return;
        }

        dropdown.innerHTML = results.map(prof => `
            <div class="professional-item" onclick="app.selectProfessional('${prof.id}', '${prof.name}')">
                <strong>${prof.name}</strong> - ${prof.title}
            </div>
        `).join('');
    }

    selectProfessional(profId, profName) {
        this.selectedProfessional = { id: profId, name: profName };
        
        const selected = document.getElementById('selected-professional');
        selected.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span>Selected: <strong>${profName}</strong></span>
                <button type="button" class="btn btn-sm" style="background: var(--accent-orange); color: white; border: none;" onclick="app.clearSelectedProfessional()">✕</button>
            </div>
        `;
        selected.classList.add('active');

        document.getElementById('professional-dropdown').style.display = 'none';
        document.getElementById('professional-search-input').value = '';
    }

    clearSelectedProfessional() {
        this.selectedProfessional = null;
        document.getElementById('selected-professional').classList.remove('active');
        document.getElementById('professional-search-input').value = '';
    }

    handleAskQuestion(e) {
        e.preventDefault();

        const title = document.getElementById('question-title').value;
        const category = document.getElementById('question-category').value;
        const details = document.getElementById('question-details').value;
        const askProfessional = document.getElementById('ask-professional').checked;
        const postOnForum = document.getElementById('post-on-forum').checked;

        if (!title || !category || !details) {
            alert('Please fill in all required fields');
            return;
        }

        if (askProfessional && !this.selectedProfessional) {
            alert('Please select a professional');
            return;
        }

        // Create question object
        const question = {
            title: title,
            category: category,
            description: details,
            sendToProf: askProfessional ? {
                active: true,
                professionalId: this.selectedProfessional.id
            } : {
                active: false,
                professionalId: null
            },
            postOnForum: postOnForum,
            status: 'pending',
            // If posting on forum, generate moderator ID code. If anonymous to professional, no ID
            forumId: postOnForum ? this.generateModeratorId() : null,
            userId: postOnForum ? storage.getCurrentUser().id : null, // Only save ID if posted on forum
            isAnonymous: !postOnForum || askProfessional // Anonymous unless only posted on forum
        };

        // Save question
        const savedQuestion = storage.addQuestion(question);

        // Add notification if sent to professional
        if (askProfessional) {
            const prof = storage.getProfessionalById(this.selectedProfessional.id);
            storage.addNotification({
                type: 'new_question',
                title: 'New Question from Anonymous User',
                message: `"${title}"`,
                questionId: savedQuestion.id
            });
        }

        // Reset form
        document.getElementById('ask-question-form').reset();
        this.clearSelectedProfessional();
        this.toggleProfessionalSection(false);

        alert('Question submitted successfully! ' + (postOnForum ? `\nYour forum ID code: ${question.forumId}` : ''));
        this.loadPage('dashboard');
    }

    generateModeratorId() {
        // Generate a moderator ID code for forum posts
        const currentUser = storage.getCurrentUser();
        const userNumber = currentUser.id.charCodeAt(currentUser.id.length - 1) % 1000;
        const timestamp = Date.now() % 1000;
        return String(userNumber).padStart(3, '0');
    }

    loadForum() {
        this.renderForumThreads(storage.getForumPosts());
    }

    renderForumThreads(threads) {
        const forumThreads = document.getElementById('forum-threads');
        
        forumThreads.innerHTML = threads.map(thread => `
            <div class="thread-card" onclick="app.viewForumThread('${thread.id}')">
                <div class="thread-header">
                    <h3 class="thread-title">${thread.title}</h3>
                    <span class="thread-category">${thread.category}</span>
                </div>
                <p class="thread-description">${thread.description}</p>
                <div class="thread-footer">
                    <span>👤 ${thread.author}</span>
                    <span>📅 ${thread.createdDate}</span>
                    <span class="thread-replies">${thread.replies} replies</span>
                    <span>👁️ ${thread.views} views</span>
                </div>
            </div>
        `).join('');
    }

    filterForum() {
        const search = document.getElementById('forum-search').value;
        const category = document.getElementById('forum-category-filter').value;
        const results = storage.searchForumPosts(search, category || null);
        this.renderForumThreads(results);
    }

    viewForumThread(threadId) {
        const thread = storage.getForumPosts().find(t => t.id === threadId);
        if (!thread) return;

        const modal = document.getElementById('question-modal');
        const body = document.getElementById('modal-body');

        body.innerHTML = `
            <h2>${thread.title}</h2>
            <div style="display: flex; gap: 15px; margin: 15px 0; font-size: 12px; color: var(--text-light);">
                <span>👤 ${thread.author}</span>
                <span>📅 ${thread.createdDate}</span>
                <span>💬 ${thread.replies} replies</span>
                <span>👁️ ${thread.views} views</span>
            </div>
            <div style="background: var(--light-bg); padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <p>${thread.description}</p>
            </div>
            <button class="btn btn-primary" style="width: 100%;">Reply to Thread</button>
        `;

        modal.style.display = 'block';
    }

    loadNotifications() {
        const notifications = storage.getNotifications();
        const notifList = document.getElementById('notifications-list');

        if (notifications.length === 0) {
            notifList.innerHTML = '<p class="empty-state">No notifications yet.</p>';
            return;
        }

        notifList.innerHTML = notifications.map(notif => `
            <div class="notification ${notif.read ? '' : 'unread'}">
                <div>
                    <h3>${notif.title}</h3>
                    <p class="notification-text">${notif.message}</p>
                    <p class="notification-time">${notif.timestamp}</p>
                </div>
                <button class="notification-action" onclick="app.handleNotificationAction('${notif.id}')">
                    ${notif.read ? 'View' : 'Mark as Read'}
                </button>
            </div>
        `).join('');
    }

    handleNotificationAction(notifId) {
        storage.markNotificationAsRead(notifId);
        this.updateStats();
        this.loadNotifications();
    }

    viewQuestion(questionId) {
        const question = storage.getMyQuestions().find(q => q.id === questionId);
        if (!question) return;

        const modal = document.getElementById('question-modal');
        const body = document.getElementById('modal-body');

        let contentHtml = `
            <h2>${question.title}</h2>
            <div style="display: flex; gap: 15px; margin: 15px 0; font-size: 12px; color: var(--text-light);">
                <span>📁 ${question.category}</span>
                <span class="status-badge status-${question.status}">${question.status.toUpperCase()}</span>
                <span>📅 ${question.createdDate}</span>
            </div>
            <div style="background: var(--light-bg); padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <p>${question.description}</p>
            </div>
        `;

        if (question.sendToProf.active) {
            const prof = storage.getProfessionalById(question.sendToProf.professionalId);
            contentHtml += `
                <div style="background: var(--light-purple); padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid var(--primary-purple);">
                    <p><strong>Sent to Professional:</strong> ${prof?.name || 'Unknown'}</p>
                </div>
            `;
        }

        if (question.postOnForum) {
            contentHtml += `
                <div style="background: var(--light-orange); padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid var(--accent-orange);">
                    <p><strong>Posted on Forum</strong></p>
                    <p style="font-size: 12px; color: var(--text-dark);">Forum ID (visible to moderators only): ${question.forumId}</p>
                </div>
            `;
        }

        if (question.status === 'answered' && question.answer) {
            contentHtml += `
                <div style="background: var(--light-bg); padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid var(--success);">
                    <h3 style="margin-bottom: 10px; color: var(--success);">Answer from ${storage.getProfessionalById(question.answeredBy)?.name}</h3>
                    <p>${question.answer}</p>
                    <p style="font-size: 12px; color: var(--text-light); margin-top: 10px;">Answered on ${question.answeredDate}</p>
                </div>
            `;
        }

        body.innerHTML = contentHtml;
        modal.style.display = 'block';
    }

    askProfessional(profId) {
        this.selectedProfessional = { id: profId, name: storage.getProfessionalById(profId).name };
        this.loadPage('ask-question');
        
        document.getElementById('ask-professional').checked = true;
        this.toggleProfessionalSection(true);
        this.selectProfessional(profId, storage.getProfessionalById(profId).name);
    }

    globalSearch(query) {
        if (!query) {
            this.loadPage(this.currentPage);
            return;
        }

        // Search across professionals, questions, and forum posts
        const profResults = storage.searchProfessionals(query);
        const forumResults = storage.searchForumPosts(query);

        console.log('Global Search Results:', { professionals: profResults, forum: forumResults });
        alert(`Found ${profResults.length} professionals and ${forumResults.length} forum posts matching "${query}"`);
    }

    updateStats() {
        const unread = storage.getUnreadNotifications().length;
        document.getElementById('notification-count').textContent = unread;
    }

    closeAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new AnonyQApp();
});
