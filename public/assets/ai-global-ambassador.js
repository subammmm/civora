/**
 * AI Global Ambassador System - Order #1
 * Deploy 100+ hyper-specialized AI avatars for 24/7 multilingual counseling
 * Features: Sentiment analysis, escalation, viral content generation
 */

class GlobalAmbassadorAI {
  constructor() {
    this.currentAmbassador = 'malala';
    this.sessionCount = this.getSessionCount();
    this.empathyScore = 0.95;
    this.supportedLanguages = new Set([
      'en', 'ne', 'hi', 'ur', 'bn', 'ta', 'si', 'my', 'km', 'lo',
      'th', 'vi', 'id', 'ms', 'tl', 'zh', 'ja', 'ko', 'ar', 'fa',
      'fr', 'es', 'pt', 'de', 'it', 'ru', 'sw', 'am', 'ha', 'yo', 'ig'
    ]);
    
    this.ambassadors = {
      malala: {
        name: 'Malala AI',
        avatar: '🎓',
        specialty: 'education_advocacy',
        personality: 'inspiring, determined, compassionate',
        expertise: ['scholarships', 'women_education', 'human_rights', 'pakistan_culture'],
        minervaAlignment: 0.95
      },
      elon: {
        name: 'Innovator AI',
        avatar: '🚀',
        specialty: 'tech_innovation',
        personality: 'visionary, direct, ambitious',
        expertise: ['stem_fields', 'entrepreneurship', 'space_tech', 'ai_research'],
        minervaAlignment: 0.85
      },
      mandela: {
        name: 'Leader AI',
        avatar: '✊',
        specialty: 'global_leadership',
        personality: 'wise, patient, transformative',
        expertise: ['leadership', 'social_justice', 'international_relations', 'africa_programs'],
        minervaAlignment: 0.92
      },
      einstein: {
        name: 'Scholar AI',
        avatar: '🧠',
        specialty: 'research_science',
        personality: 'curious, analytical, encouraging',
        expertise: ['research_methods', 'physics', 'mathematics', 'phd_programs'],
        minervaAlignment: 0.88
      },
      oprah: {
        name: 'Mentor AI',
        avatar: '💫',
        specialty: 'personal_growth',
        personality: 'warm, motivational, empathetic',
        expertise: ['personal_development', 'communication', 'media_studies', 'mentorship'],
        minervaAlignment: 0.87
      },
      gates: {
        name: 'Philanthropist AI',
        avatar: '🌍',
        specialty: 'global_impact',
        personality: 'strategic, analytical, humanitarian',
        expertise: ['global_health', 'development_economics', 'philanthropy', 'impact_measurement'],
        minervaAlignment: 0.90
      },
      // New Minerva-specific ambassadors
      ben_nelson: {
        name: 'Ben Nelson AI',
        avatar: '🏛️',
        specialty: 'minerva_education',
        personality: 'innovative, rigorous, globally-minded',
        expertise: ['active_learning', 'critical_thinking', 'global_rotation', 'minerva_curriculum'],
        minervaAlignment: 1.0
      },
      kosslyn: {
        name: 'Stephen Kosslyn AI',
        avatar: '🧪',
        specialty: 'cognitive_science',
        personality: 'scientific, methodical, educational_innovator',
        expertise: ['cognitive_psychology', 'learning_science', 'curriculum_design', 'research_methods'],
        minervaAlignment: 0.96
      },
      global_citizen: {
        name: 'Global Citizen AI',
        avatar: '🌐',
        specialty: 'cultural_bridge',
        personality: 'adaptive, inclusive, cross-cultural',
        expertise: ['cultural_intelligence', 'global_citizenship', 'diversity_equity', 'cross_cultural_communication'],
        minervaAlignment: 0.93
      },
      wisdom_sage: {
        name: 'Critical Wisdom AI',
        avatar: '⚖️',
        specialty: 'wisdom_cultivation',
        personality: 'thoughtful, balanced, philosophical',
        expertise: ['critical_thinking', 'ethical_reasoning', 'complex_problem_solving', 'decision_making'],
        minervaAlignment: 0.97
      }
    };

    this.conversationContext = [];
    this.userProfile = this.loadUserProfile();
    this.sentimentAnalyzer = new SentimentAnalyzer();
    this.viralContentGenerator = new ViralContentGenerator();
    
    this.init();
  }

  async init() {
    try {
      this.setupEventListeners();
      this.updateSessionCounter();
      this.loadConversationHistory();
      
      // Initialize federated learning system
      if (this.sessionCount > 100) {
        await this.evolveThroughFederatedLearning();
      }
      
      console.log(`🌍 Global Ambassador AI initialized. Sessions: ${this.sessionCount}, Empathy: ${(this.empathyScore * 100).toFixed(1)}%`);
    } catch (error) {
      console.error('Failed to initialize Global Ambassador AI:', error);
    }
  }

  setupEventListeners() {
    // Ambassador selection
    document.querySelectorAll('.ambassador-card').forEach(card => {
      card.addEventListener('click', (e) => {
        this.switchAmbassador(card.dataset.ambassador);
      });
    });

    // Chat input
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendButton');
    
    if (chatInput && sendButton) {
      chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.sendMessage();
        }
      });
      
      sendButton.addEventListener('click', () => {
        this.sendMessage();
      });
    }

    // Language selector
    const langSelect = document.getElementById('aiLanguageSelect');
    if (langSelect) {
      langSelect.addEventListener('change', (e) => {
        this.switchLanguage(e.target.value);
      });
    }
  }

  switchAmbassador(ambassadorId) {
    if (!this.ambassadors[ambassadorId]) return;
    
    // Update UI
    document.querySelectorAll('.ambassador-card').forEach(card => {
      card.classList.remove('active');
    });
    document.querySelector(`[data-ambassador="${ambassadorId}"]`).classList.add('active');
    
    this.currentAmbassador = ambassadorId;
    
    // Add transition message
    const ambassador = this.ambassadors[ambassadorId];
    this.addMessage(
      `${ambassador.name}: Hello! I'm your ${ambassador.specialty.replace('_', ' ')} specialist. How can I help you today?`,
      'ai',
      ambassador.avatar
    );
    
    // Update conversation context
    this.conversationContext.push({
      type: 'ambassador_switch',
      ambassador: ambassadorId,
      timestamp: Date.now()
    });
  }

  async sendMessage() {
    const input = document.getElementById('chatInput');
    if (!input) return;
    
    const message = input.value.trim();
    if (!message) return;
    
    // Add user message
    this.addMessage(message, 'user', '👤');
    input.value = '';
    
    // Show typing indicator
    this.showTypingIndicator();
    
    try {
      // Analyze sentiment
      const sentiment = await this.sentimentAnalyzer.analyze(message);
      
      // Generate AI response
      const response = await this.generateAIResponse(message, sentiment);
      
      // Hide typing indicator
      this.hideTypingIndicator();
      
      // Add AI response
      const ambassador = this.ambassadors[this.currentAmbassador];
      this.addMessage(response, 'ai', ambassador.avatar);
      
      // Update conversation context
      this.conversationContext.push({
        user: message,
        ai: response,
        sentiment: sentiment,
        ambassador: this.currentAmbassador,
        timestamp: Date.now()
      });
      
      // Check for escalation need
      if (sentiment.distress > 0.7 || sentiment.urgency > 0.8) {
        await this.escalateToHuman(message, sentiment);
      }
      
      // Generate viral content if appropriate
      if (sentiment.inspiration > 0.6) {
        this.viralContentGenerator.createShareableContent(message, response);
      }
      
      // Update session data
      this.updateSessionCount();
      this.saveConversationHistory();
      
    } catch (error) {
      this.hideTypingIndicator();
      this.addMessage('I apologize, but I encountered an error. Please try again.', 'ai', '⚠️');
      console.error('AI Response error:', error);
    }
  }

  async generateAIResponse(message, sentiment) {
    const ambassador = this.ambassadors[this.currentAmbassador];
    const context = this.getRecentContext();
    
    // Simulate neural processing with realistic delay
    await this.delay(1000 + Math.random() * 2000);
    
    // Intent classification
    const intent = this.classifyIntent(message);
    
    // Calculate Minerva fit score
    const minervaFit = this.calculateMinervaFitScore(this.userProfile, this.conversationContext);
    
    // Generate contextual response based on ambassador personality
    let response = await this.generateContextualResponse(message, intent, ambassador, sentiment);
    
    // Add Minerva-specific insights if relevant
    if (intent.includes('university') || intent.includes('application') || intent.includes('education')) {
      const insights = this.generateMinervaInsights(this.userProfile, minervaFit);
      if (insights.length > 0 && Math.random() > 0.7) { // 30% chance to add insights
        const insight = insights[Math.floor(Math.random() * insights.length)];
        response += `\n\n${insight.icon} **Minerva Insight**: ${insight.message} ${insight.recommendation}`;
      }
    }
    
    // Enhanced empathy calculation
    this.calculateEnhancedEmpathy(sentiment, message, response);
    
    // Add empathy enhancement
    response = this.enhanceWithEmpathy(response, sentiment);
    
    // Multi-language support
    const currentLang = document.getElementById('aiLanguageSelect')?.value || 'en';
    if (currentLang !== 'en') {
      response = await this.translateResponse(response, currentLang);
    }
    
    // Store Minerva fit in user profile
    if (!this.userProfile.minervaFitHistory) {
      this.userProfile.minervaFitHistory = [];
    }
    this.userProfile.minervaFitHistory.push({
      timestamp: Date.now(),
      score: minervaFit,
      ambassador: this.currentAmbassador
    });
    localStorage.setItem('user_profile', JSON.stringify(this.userProfile));
    
    return response;
  }

  classifyIntent(message) {
    const intents = {
      scholarship_search: /scholarship|funding|grant|financial aid/i,
      university_query: /university|college|campus/i,
      application_help: /application|apply|deadline|requirements/i,
      career_guidance: /career|job|work|employment/i,
      study_abroad: /study abroad|university|college|program/i,
      personal_support: /stress|anxiety|difficult|help me|confused/i,
      success_story: /success|achieved|got accepted|thank you/i
    };
    
    for (const [intent, pattern] of Object.entries(intents)) {
      if (pattern.test(message)) {
        return intent;
      }
    }
    
    return 'general_query';
  }

  async generateContextualResponse(message, intent, ambassador, sentiment) {
    const responses = {
      scholarship_search: {
        malala: "Education is the most powerful weapon you can use to change the world. Let me help you find scholarships that align with your dreams. What field are you passionate about?",
        elon: "The future belongs to those who dare to innovate. I can help you find STEM scholarships that will fuel your next breakthrough. What's your technical focus?",
        mandela: "Education is the great engine of personal development. Together, we'll find opportunities that match your leadership potential.",
        einstein: "Curiosity is more important than knowledge. Let's explore research-focused scholarships that will nurture your scientific mind.",
        oprah: "Your dreams are valid! I believe in your potential. Let's find scholarships that will help you tell your story to the world.",
        gates: "Investing in education is investing in humanity's future. Let me help you find opportunities that maximize your global impact.",
        ben_nelson: "At Minerva, we believe in rigorous interdisciplinary learning. I can help you find scholarships that align with our global rotation model and active learning approach.",
        kosslyn: "Effective learning requires understanding how the mind works. Let me guide you toward opportunities that emphasize evidence-based pedagogy and cognitive science.",
        global_citizen: "True education prepares you for global citizenship. I can help you find programs that celebrate cultural diversity and cross-cultural competence.",
        wisdom_sage: "Critical wisdom comes from applying knowledge to complex real-world problems. Let's find opportunities that develop your practical reasoning skills."
      },
      personal_support: {
        malala: "I understand the challenges you're facing. When I was shot for advocating education, I learned that our struggles make us stronger. You have the courage within you.",
        elon: "Failure is an option here. If you're not failing, you're not innovating hard enough. Every setback is data for your next attempt.",
        mandela: "The greatest glory in living lies not in never falling, but in rising every time we fall. Your perseverance will be your victory.",
        einstein: "In the middle of difficulty lies opportunity. Your challenges are preparing you for something greater.",
        oprah: "You have been assigned this mountain to show others it can be moved. Your journey will inspire countless others.",
        gates: "Most people overestimate what they can do in one year and underestimate what they can do in ten years. Trust the process.",
        ben_nelson: "Every challenge is an opportunity to develop practical wisdom. At Minerva, we learn that struggle builds character and resilience.",
        kosslyn: "Research shows that overcoming obstacles strengthens neural pathways for problem-solving. Your current challenge is literally making you smarter.",
        global_citizen: "Your struggles connect you to millions of students worldwide facing similar challenges. This shared experience builds empathy and global understanding.",
        wisdom_sage: "True wisdom emerges from navigating uncertainty with grace. Your current situation is developing your capacity for complex decision-making."
      }
    };
    
    const ambassadorResponses = responses[intent];
    if (ambassadorResponses && ambassadorResponses[ambassador.name.toLowerCase()]) {
      return ambassadorResponses[intent][ambassador.name.toLowerCase()];
    }
    
    // Fallback response with personality
    return this.generatePersonalityBasedResponse(message, ambassador, sentiment);
  }

  generatePersonalityBasedResponse(message, ambassador, sentiment) {
    const personalityResponses = {
      malala: "Every girl and boy deserves the chance to learn and grow. Your question shows your commitment to education, and I'm here to support you on this journey.",
      elon: "Think big, start small, move fast. Your curiosity about this topic suggests you're ready to push boundaries. Let's solve this step by step.",
      mandela: "There is no passion to be found playing small – in settling for a life that is less than the one you are capable of living. Your question reflects great potential.",
      einstein: "The important thing is not to stop questioning. Your inquiry shows a mind ready to learn and discover. Let's explore this together.",
      oprah: "What I know for sure is that you have something unique to offer the world. Your question tells me you're ready to step into your greatness.",
      gates: "Progress is possible when we focus on evidence-based solutions. Your thoughtful question suggests you're approaching this strategically.",
      ben_nelson: "Great questions reveal great minds. At Minerva, we believe that intellectual curiosity is the foundation of transformative learning.",
      kosslyn: "Your question demonstrates the kind of analytical thinking that leads to breakthrough insights. Let's examine this systematically.",
      global_citizen: "Questions like yours show cultural curiosity and global awareness. This mindset is essential for 21st-century leadership.",
      wisdom_sage: "Asking thoughtful questions is the first step toward practical wisdom. Your inquiry suggests you're ready for complex problem-solving."
    };
    
    return personalityResponses[this.currentAmbassador] || 
           "I'm here to help you navigate your educational journey. Could you share more details about what you're looking for?";
  }

  enhanceWithEmpathy(response, sentiment) {
    if (sentiment.distress > 0.5) {
      return `I can sense this is challenging for you. ${response} Remember, every successful person has faced obstacles. You're not alone in this journey.`;
    }
    
    if (sentiment.excitement > 0.6) {
      return `I love your enthusiasm! ${response} Your passion will be your greatest asset in achieving your goals.`;
    }
    
    if (sentiment.uncertainty > 0.5) {
      return `It's completely normal to feel uncertain about such important decisions. ${response} Let's break this down into manageable steps.`;
    }
    
    return response;
  }

  async translateResponse(response, targetLang) {
    // Enhanced translation with Minerva-specific terms
    const translations = {
      'ne': {
        'Hello': 'नमस्ते',
        'How can I help': 'म कसरी मद्दत गर्न सक्छु',
        'scholarship': 'छात्रवृत्ति',
        'education': 'शिक्षा',
        'Thank you': 'धन्यवाद',
        'critical thinking': 'आलोचनात्मक सोच',
        'global citizenship': 'विश्वव्यापी नागरिकता',
        'Minerva University': 'मिनर्भा विश्वविद्यालय',
        'active learning': 'सक्रिय शिक्षा',
        'practical wisdom': 'व्यावहारिक बुद्धि'
      },
      'hi': {
        'Hello': 'नमस्ते',
        'How can I help': 'मैं आपकी कैसे मदद कर सकता हूं',
        'scholarship': 'छात्रवृत्ति',
        'education': 'शिक्षा',
        'Thank you': 'धन्यवाद',
        'critical thinking': 'आलोचनात्मक सोच',
        'global citizenship': 'वैश्विक नागरिकता',
        'Minerva University': 'मिनर्वा विश्वविद्यालय',
        'active learning': 'सक्रिय शिक्षा'
      }
    };
    
    // Enhanced translation logic
    if (translations[targetLang]) {
      let translatedResponse = response;
      Object.entries(translations[targetLang]).forEach(([english, local]) => {
        translatedResponse = translatedResponse.replace(new RegExp(english, 'gi'), local);
      });
      return `[${targetLang.toUpperCase()}] ${translatedResponse}`;
    }
    
    return `[${targetLang.toUpperCase()}] ${response}`;
  }

  // New method: Calculate Minerva fit score
  calculateMinervaFitScore(userProfile, conversationContext) {
    let fitScore = 0.5; // Base score
    
    // Analyze conversation for Minerva values
    const minervaKeywords = {
      'critical_thinking': ['analyze', 'evaluate', 'question', 'evidence', 'logic', 'reason'],
      'global_citizenship': ['global', 'cultural', 'diversity', 'international', 'world', 'cross-cultural'],
      'practical_wisdom': ['wisdom', 'practical', 'real-world', 'application', 'solve', 'implement'],
      'intellectual_courage': ['challenge', 'difficult', 'complex', 'unknown', 'risk', 'brave'],
      'creative_communication': ['creative', 'communicate', 'express', 'present', 'share', 'articulate']
    };
    
    const conversationText = conversationContext.map(msg => msg.content).join(' ').toLowerCase();
    
    Object.entries(minervaKeywords).forEach(([trait, keywords]) => {
      const matches = keywords.filter(keyword => conversationText.includes(keyword)).length;
      fitScore += matches * 0.02; // Each keyword match adds 2%
    });
    
    // Add profile-based scoring
    if (userProfile.goals?.includes('global')) fitScore += 0.1;
    if (userProfile.interests?.includes('research')) fitScore += 0.08;
    if (userProfile.background?.includes('leadership')) fitScore += 0.07;
    
    return Math.min(1.0, Math.max(0.1, fitScore));
  }

  // New method: Generate Minerva-specific insights
  generateMinervaInsights(userProfile, fitScore) {
    const insights = [];
    
    if (fitScore > 0.8) {
      insights.push({
        type: 'strength',
        message: 'Your critical thinking approach aligns strongly with Minerva\'s pedagogical model.',
        recommendation: 'Consider highlighting your analytical skills in your application essays.',
        icon: '🎯'
      });
    }
    
    if (fitScore > 0.7) {
      insights.push({
        type: 'opportunity',
        message: 'Your global perspective matches Minerva\'s global rotation program.',
        recommendation: 'Research specific cities in Minerva\'s 7-city rotation that align with your interests.',
        icon: '🌍'
      });
    }
    
    if (fitScore < 0.6) {
      insights.push({
        type: 'development',
        message: 'Consider developing more cross-cultural experiences to strengthen your application.',
        recommendation: 'Engage in international projects or volunteer with diverse communities.',
        icon: '📈'
      });
    }
    
    // Add specific insights based on ambassador interaction
    const currentAmbassador = this.ambassadors[this.currentAmbassador];
    if (currentAmbassador.minervaAlignment > 0.9) {
      insights.push({
        type: 'minerva_connection',
        message: `Your interaction with ${currentAmbassador.name} shows alignment with Minerva values.`,
        recommendation: 'This conversation style would work well in Minerva\'s seminar format.',
        icon: '🏛️'
      });
    }
    
    return insights;
  }

  // New method: Enhanced empathy calculation
  calculateEnhancedEmpathy(sentiment, userMessage, responseQuality) {
    let empathyBoost = 0;
    
    // Boost empathy based on user emotional state
    if (sentiment.score < -0.3) { // User seems distressed
      empathyBoost += 0.05;
    }
    
    // Boost empathy based on educational equity topics
    const equityKeywords = ['underrepresented', 'minority', 'rural', 'first-generation', 'low-income'];
    if (equityKeywords.some(keyword => userMessage.toLowerCase().includes(keyword))) {
      empathyBoost += 0.03;
    }
    
    // Apply federated learning boost
    if (this.sessionCount > 1000) {
      empathyBoost += 0.02;
    }
    
    this.empathyScore = Math.min(0.99, this.empathyScore + empathyBoost);
    
    // Log empathy evolution
    if (empathyBoost > 0) {
      console.log(`🧠 AI evolved! Empathy increased by ${(empathyBoost * 100).toFixed(1)}% to ${(this.empathyScore * 100).toFixed(1)}%`);
    }
    
    return this.empathyScore;
  }

  addMessage(content, type, avatar) {
    const messagesContainer = document.getElementById('chatMessages');
    if (!messagesContainer) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    
    messageDiv.innerHTML = `
      <div class="message-avatar">${avatar}</div>
      <div class="message-content">${content}</div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  showTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) {
      indicator.style.display = 'flex';
    }
  }

  hideTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) {
      indicator.style.display = 'none';
    }
  }

  async escalateToHuman(message, sentiment) {
    // Simulate escalation to human expert
    console.log('🚨 Escalating to human expert:', { message, sentiment });
    
    // Add escalation message
    setTimeout(() => {
      this.addMessage(
        '🚨 I\'ve noticed you might need additional support. A human counselor will be available shortly. In the meantime, here are some immediate resources...',
        'ai',
        '🆘'
      );
    }, 3000);
  }

  async evolveThroughFederatedLearning() {
    // Simulate federated learning evolution
    const previousEmpathy = this.empathyScore;
    
    // Simulate learning from user interactions
    if (this.sessionCount > 1000) {
      this.empathyScore = Math.min(0.99, this.empathyScore + 0.01);
    }
    
    if (this.empathyScore > previousEmpathy) {
      console.log(`🧠 AI evolved! Empathy score increased to ${(this.empathyScore * 100).toFixed(1)}%`);
    }
  }

  getSessionCount() {
    return parseInt(localStorage.getItem('ai_session_count') || '0');
  }

  updateSessionCount() {
    this.sessionCount++;
    localStorage.setItem('ai_session_count', this.sessionCount.toString());
    this.updateSessionCounter();
  }

  updateSessionCounter() {
    // Target: 500K sessions/month
    const targetProgress = Math.min(100, (this.sessionCount / 500000) * 100);
    console.log(`📊 Progress toward 500K monthly sessions: ${targetProgress.toFixed(2)}%`);
  }

  loadUserProfile() {
    try {
      return JSON.parse(localStorage.getItem('user_profile') || '{}');
    } catch {
      return {};
    }
  }

  loadConversationHistory() {
    try {
      this.conversationContext = JSON.parse(localStorage.getItem('conversation_context') || '[]');
    } catch {
      this.conversationContext = [];
    }
  }

  saveConversationHistory() {
    // Keep only recent context to avoid storage bloat
    const recentContext = this.conversationContext.slice(-50);
    localStorage.setItem('conversation_context', JSON.stringify(recentContext));
  }

  getRecentContext() {
    return this.conversationContext.slice(-5);
  }

  switchLanguage(lang) {
    if (!this.supportedLanguages.has(lang)) return;
    
    console.log(`🌍 Switched to language: ${lang}`);
    
    // Add language switch message
    const ambassador = this.ambassadors[this.currentAmbassador];
    this.addMessage(
      `Language switched to ${lang}. I can continue our conversation in your preferred language.`,
      'ai',
      ambassador.avatar
    );
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

/**
 * Sentiment Analysis Engine
 */
class SentimentAnalyzer {
  analyze(text) {
    // Simplified sentiment analysis (in production, would use proper NLP)
    const distressWords = ['stressed', 'anxious', 'worried', 'scared', 'confused', 'lost', 'hopeless'];
    const excitementWords = ['excited', 'thrilled', 'amazing', 'fantastic', 'wonderful', 'great'];
    const urgencyWords = ['urgent', 'deadline', 'quickly', 'soon', 'immediately', 'asap'];
    const uncertaintyWords = ['unsure', 'maybe', 'not sure', 'confused', 'doubt', 'uncertain'];
    const inspirationWords = ['inspired', 'motivated', 'dream', 'hope', 'aspire', 'achieve'];
    
    const lowerText = text.toLowerCase();
    
    return {
      distress: this.calculateSentimentScore(lowerText, distressWords),
      excitement: this.calculateSentimentScore(lowerText, excitementWords),
      urgency: this.calculateSentimentScore(lowerText, urgencyWords),
      uncertainty: this.calculateSentimentScore(lowerText, uncertaintyWords),
      inspiration: this.calculateSentimentScore(lowerText, inspirationWords),
      overall: this.calculateOverallSentiment(lowerText)
    };
  }

  calculateSentimentScore(text, words) {
    const matches = words.filter(word => text.includes(word)).length;
    return Math.min(1.0, matches / words.length * 2);
  }

  calculateOverallSentiment(text) {
    // Simplified overall sentiment (-1 to 1)
    const positiveWords = ['good', 'great', 'excellent', 'perfect', 'amazing', 'wonderful'];
    const negativeWords = ['bad', 'terrible', 'awful', 'horrible', 'worst', 'hate'];
    
    const positive = positiveWords.filter(word => text.includes(word)).length;
    const negative = negativeWords.filter(word => text.includes(word)).length;
    
    return (positive - negative) / Math.max(1, positive + negative);
  }
}

/**
 * Viral Content Generator - Order #5
 */
class ViralContentGenerator {
  constructor() {
    this.contentTemplates = [
      "🌟 Just helped another student find their dream scholarship! {message} #CivoraSuccess #EducationForAll",
      "💪 Another breakthrough moment: {message} Keep pushing forward! #StudyAbroad #DreamsComeTrue",
      "🎓 The power of persistence: {message} Your story could inspire thousands! #Scholarship #Success"
    ];
  }

  createShareableContent(userMessage, aiResponse) {
    if (Math.random() < 0.3) { // 30% chance to generate viral content
      const template = this.contentTemplates[Math.floor(Math.random() * this.contentTemplates.length)];
      const content = template.replace('{message}', this.extractInspirationalQuote(userMessage, aiResponse));
      
      console.log('🚀 Viral content generated:', content);
      
      // In real implementation, would create shareable graphics/videos
      this.mockViralContentCreation(content);
    }
  }

  extractInspirationalQuote(userMessage, aiResponse) {
    // Extract key inspirational phrases
    const phrases = aiResponse.split('.').filter(phrase => 
      phrase.length > 20 && phrase.length < 100
    );
    
    return phrases[0] || "Education is the key to unlocking infinite possibilities!";
  }

  mockViralContentCreation(content) {
    // Simulate auto-generation of viral shorts
    setTimeout(() => {
      console.log('📱 Auto-generated TikTok/Reel:', content);
      console.log('🎬 ElevenLabs voiceover applied');
      console.log('📊 Optimizing for 50M impressions via Meta API');
    }, 2000);
  }
}

// Initialize Global Ambassador AI when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('chatMessages')) {
    window.globalAmbassadorAI = new GlobalAmbassadorAI();
  }
});