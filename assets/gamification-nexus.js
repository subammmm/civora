/**
 * Galactic Gamification Nexus - Order #19
 * Epic RPG layer where quests yield real scholarships
 * Features: Procedural worlds, Legendary Leagues, G20 advisor pathway
 */

class GalacticGamificationNexus {
  constructor() {
    this.player = {
      level: 42,
      xp: 15847,
      scholarshipsEarned: 7,
      questsCompleted: 23,
      achievements: new Set(['dragon_slayer', 'scholar', 'funded']),
      currentQuest: null,
      location: 'nepal',
    };

    this.dragonHealth = 100;
    this.battleActive = false;

    this.quests = new Map([
      [
        'visa-dragon',
        {
          name: 'Slay the Visa Dragon',
          type: 'legendary',
          reward: { scholarship: 'Fulbright', amount: 50000 },
          steps: ['requirements', 'documents', 'interview', 'financial', 'language', 'apply'],
          completedSteps: [],
        },
      ],
      [
        'scholarship-hunt',
        {
          name: 'The Great Scholarship Hunt',
          type: 'epic',
          reward: { scholarship: 'DAAD', amount: 35000 },
          steps: ['research', 'filter', 'match', 'apply'],
          completedSteps: [],
        },
      ],
      [
        'network-builder',
        {
          name: 'Network Builder',
          type: 'common',
          reward: { xp: 1000, badge: 'Social Butterfly' },
          steps: ['connect', 'engage', 'collaborate'],
          completedSteps: [],
        },
      ],
      [
        'funding-quest',
        {
          name: 'Quantum Funding Challenge',
          type: 'epic',
          reward: { grant: 25000, title: 'Entrepreneur' },
          steps: ['pitch', 'present', 'fund'],
          completedSteps: [],
        },
      ],
    ]);

    this.leaderboard = [
      { name: 'ScholarMaster2024', xp: 127500, title: 'G20 Education Advisor', rank: 1 },
      { name: 'VisionaryVoyager', xp: 98750, title: 'G20 Youth Representative', rank: 2 },
      { name: 'QuestSeeker', xp: 87230, title: 'Dragon Slayer Elite', rank: 3 },
      { name: 'You', xp: 65847, title: 'Rising Star', rank: 4 },
    ];

    this.proceduralEvents = [
      'Generating new scholarship dungeons...',
      'Spawning visa pathway challenges...',
      'Alumni NPCs joining the world...',
      'Hidden achievements unlocked in sector 7...',
      'Legendary quest chain discovered!',
      'G20 summit preparation event active...',
      'Quantum entanglement detected between players...',
      'New funding opportunities materialized...',
    ];

    this.init();
  }

  async init() {
    this.setupEventListeners();
    this.startProceduralGeneration();
    this.initializeWorldMap();
    this.updatePlayerStats();
    this.checkG20Eligibility();

    console.log('🎮 Galactic Gamification Nexus initialized');
  }

  setupEventListeners() {
    // World map locations
    document.querySelectorAll('.world-location').forEach((location) => {
      location.addEventListener('click', (e) => {
        this.travelToLocation(e.currentTarget.dataset.location);
      });
    });

    // Dynamic quest generation
    setInterval(() => {
      this.generateRandomQuest();
    }, 30000); // Every 30 seconds

    // Auto-save player progress
    setInterval(() => {
      this.savePlayerProgress();
    }, 10000); // Every 10 seconds
  }

  startProceduralGeneration() {
    const logElement = document.getElementById('worldLog');
    if (!logElement) return;

    setInterval(() => {
      const event = this.proceduralEvents[Math.floor(Math.random() * this.proceduralEvents.length)];
      this.addLogEntry(event);
    }, 3000);
  }

  addLogEntry(message) {
    const logElement = document.getElementById('worldLog');
    if (!logElement) return;

    const timestamp = new Date().toLocaleTimeString();
    const entry = `[${timestamp}] > ${message}\n`;

    logElement.textContent += entry;
    logElement.scrollTop = logElement.scrollHeight;

    // Keep only last 20 entries
    const lines = logElement.textContent.split('\n');
    if (lines.length > 20) {
      logElement.textContent = lines.slice(-20).join('\n');
    }
  }

  initializeWorldMap() {
    // Add dynamic effects to world locations
    document.querySelectorAll('.world-location').forEach((location) => {
      // Add pulsing effect for available locations
      if (!location.classList.contains('completed')) {
        setInterval(() => {
          if (Math.random() < 0.3) {
            location.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.8)';
            setTimeout(() => {
              location.style.boxShadow = '';
            }, 1000);
          }
        }, 5000);
      }
    });
  }

  travelToLocation(locationId) {
    console.log(`🚀 Traveling to ${locationId}`);

    const location = document.querySelector(`[data-location="${locationId}"]`);
    if (!location) return;

    this.player.location = locationId;

    // Visual travel effect
    location.style.transform = 'scale(1.5)';
    location.style.boxShadow = '0 0 30px rgba(0, 212, 255, 1)';

    setTimeout(() => {
      location.style.transform = '';
      location.style.boxShadow = '';
    }, 1000);

    // Generate location-specific content
    this.generateLocationContent(locationId);

    // Award XP for exploration
    this.awardXP(500, 'Location Discovery');

    this.addLogEntry(`Player traveled to ${locationId.toUpperCase()}`);
  }

  generateLocationContent(locationId) {
    const locationData = {
      nepal: {
        quests: ['cultural-ambassador', 'language-preservation'],
        scholarships: ['Nepal Government Scholarship'],
        npcs: ['Local Education Officer', 'Cultural Guide'],
      },
      usa: {
        quests: ['innovation-challenge', 'startup-bootcamp'],
        scholarships: ['Fulbright Program', 'USAID Scholarship'],
        npcs: ['University Counselor', 'Tech Entrepreneur'],
      },
      uk: {
        quests: ['academic-excellence', 'research-collaboration'],
        scholarships: ['Chevening Scholarship', 'Commonwealth Scholarship'],
        npcs: ['Oxford Professor', 'Cambridge Researcher'],
      },
      germany: {
        quests: ['engineering-mastery', 'renewable-energy'],
        scholarships: ['DAAD Scholarship', 'Heinrich Böll Foundation'],
        npcs: ['German Engineer', 'Research Scientist'],
      },
    };

    const data = locationData[locationId];
    if (data) {
      console.log(`📍 Location: ${locationId}`);
      console.log('Available quests:', data.quests);
      console.log('Local scholarships:', data.scholarships);
      console.log('NPCs:', data.npcs);
    }
  }

  generateRandomQuest() {
    const questTypes = ['common', 'rare', 'epic', 'legendary'];
    const questTemplates = [
      {
        name: 'Academic Achievement Challenge',
        type: 'rare',
        description: 'Maintain a 3.8+ GPA for one semester',
        reward: { xp: 2000, scholarship: 'Merit Scholarship' },
      },
      {
        name: 'Community Service Marathon',
        type: 'common',
        description: 'Complete 100 hours of community service',
        reward: { xp: 1500, badge: 'Community Hero' },
      },
      {
        name: 'Innovation Hackathon',
        type: 'epic',
        description: 'Win a technology hackathon competition',
        reward: { xp: 5000, scholarship: 'Tech Innovation Grant' },
      },
      {
        name: 'Global Leadership Summit',
        type: 'legendary',
        description: 'Represent your country at an international summit',
        reward: { xp: 10000, title: 'Global Ambassador', g20_points: 50 },
      },
    ];

    if (Math.random() < 0.1) {
      // 10% chance
      const template = questTemplates[Math.floor(Math.random() * questTemplates.length)];
      this.addLogEntry(`New ${template.type.toUpperCase()} quest discovered: ${template.name}`);
      console.log('🎯 New quest generated:', template);
    }
  }

  awardXP(amount, reason) {
    this.player.xp += amount;
    this.updatePlayerStats();

    // Check for level up
    const newLevel = Math.floor(this.player.xp / 1000) + 1;
    if (newLevel > this.player.level) {
      this.levelUp(newLevel);
    }

    console.log(`⭐ +${amount} XP awarded for: ${reason}`);
  }

  levelUp(newLevel) {
    const oldLevel = this.player.level;
    this.player.level = newLevel;

    // Level up effects
    this.showLevelUpEffect(oldLevel, newLevel);

    // Unlock new features based on level
    this.checkLevelUnlocks(newLevel);

    this.addLogEntry(`LEVEL UP! ${oldLevel} → ${newLevel}`);
  }

  showLevelUpEffect(oldLevel, newLevel) {
    // Create level up notification
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(45deg, #ffd700, #ff6b35);
      color: white;
      padding: 2rem 3rem;
      border-radius: 16px;
      font-size: 1.5rem;
      font-weight: 800;
      z-index: 3000;
      text-align: center;
      animation: levelUpPulse 3s ease-in-out;
    `;

    notification.innerHTML = `
      <div style="font-size: 2rem; margin-bottom: 1rem;">🎉</div>
      <div>LEVEL UP!</div>
      <div style="font-size: 1.2rem; margin-top: 0.5rem;">${oldLevel} → ${newLevel}</div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      document.body.removeChild(notification);
    }, 3000);

    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes levelUpPulse {
        0%, 100% { transform: translate(-50%, -50%) scale(1); }
        50% { transform: translate(-50%, -50%) scale(1.1); }
      }
    `;
    document.head.appendChild(style);
  }

  checkLevelUnlocks(level) {
    const unlocks = {
      10: { feature: 'Advanced Quests', description: 'Unlock Epic tier quests' },
      25: { feature: 'Mentor System', description: 'Become a mentor for new players' },
      50: { feature: 'G20 Candidate', description: 'Eligible for G20 advisor selection' },
      75: { feature: 'Legendary Quests', description: 'Access to world-changing quests' },
      100: { feature: 'Game Master', description: 'Create quests for other players' },
    };

    if (unlocks[level]) {
      const unlock = unlocks[level];
      console.log(`🔓 Feature unlocked: ${unlock.feature} - ${unlock.description}`);
      this.addLogEntry(`Feature unlocked: ${unlock.feature}`);
    }
  }

  checkG20Eligibility() {
    if (this.player.level >= 50 && this.player.xp >= 50000) {
      if (!this.player.achievements.has('g20_candidate')) {
        this.player.achievements.add('g20_candidate');
        this.addLogEntry('🏛️ You are now eligible for G20 Advisor selection!');
        console.log('🏛️ Player is now G20 eligible');
      }
    }
  }

  updatePlayerStats() {
    const elements = {
      playerLevel: this.player.level,
      playerXP: this.player.xp.toLocaleString(),
      scholarshipsEarned: this.player.scholarshipsEarned,
      questsCompleted: this.player.questsCompleted,
    };

    Object.entries(elements).forEach(([id, value]) => {
      const element = document.getElementById(id);
      if (element) {
        element.textContent = value;
      }
    });
  }

  savePlayerProgress() {
    try {
      localStorage.setItem(
        'civora_player_progress',
        JSON.stringify({
          ...this.player,
          achievements: Array.from(this.player.achievements),
          lastSaved: Date.now(),
        }),
      );
    } catch (error) {
      console.warn('Failed to save player progress:', error);
    }
  }

  loadPlayerProgress() {
    try {
      const saved = localStorage.getItem('civora_player_progress');
      if (saved) {
        const data = JSON.parse(saved);
        this.player = {
          ...this.player,
          ...data,
          achievements: new Set(data.achievements || []),
        };
        this.updatePlayerStats();
        console.log('Player progress loaded');
      }
    } catch (error) {
      console.warn('Failed to load player progress:', error);
    }
  }
}

// Global quest functions
function startQuest(questId) {
  const nexus = window.gamificationNexus;
  if (!nexus) return;

  const quest = nexus.quests.get(questId);
  if (!quest) return;

  console.log(`🎯 Starting quest: ${quest.name}`);
  nexus.player.currentQuest = questId;

  if (questId === 'visa-dragon') {
    showBattleArena();
  } else {
    // Handle other quest types
    nexus.addLogEntry(`Quest started: ${quest.name}`);

    // Simulate quest progression
    setTimeout(() => {
      nexus.awardXP(1000, `Completing ${quest.name}`);
      nexus.player.questsCompleted++;
      nexus.addLogEntry(`Quest completed: ${quest.name}`);
    }, 5000);
  }
}

function showBattleArena() {
  const arena = document.getElementById('battleArena');
  if (arena) {
    arena.style.display = 'block';
    window.gamificationNexus.battleActive = true;
    window.gamificationNexus.addLogEntry('⚔️ Entering battle with Visa Dragon');
  }
}

function closeBattle() {
  const arena = document.getElementById('battleArena');
  if (arena) {
    arena.style.display = 'none';
    window.gamificationNexus.battleActive = false;
  }
}

function battleAction(action) {
  const nexus = window.gamificationNexus;
  if (!nexus || !nexus.battleActive) return;

  const quest = nexus.quests.get('visa-dragon');
  if (!quest) return;

  // Add action to completed steps
  if (!quest.completedSteps.includes(action)) {
    quest.completedSteps.push(action);

    // Damage the dragon
    nexus.dragonHealth -= 15;

    // Update health bar
    const healthBar = document.getElementById('dragonHealth');
    if (healthBar) {
      healthBar.style.width = Math.max(0, nexus.dragonHealth) + '%';
    }

    nexus.addLogEntry(`Used ${action} attack - Dragon health: ${nexus.dragonHealth}%`);

    // Award XP for each action
    nexus.awardXP(500, `Battle Action: ${action}`);

    // Check if dragon is defeated
    if (nexus.dragonHealth <= 0) {
      setTimeout(() => {
        nexus.addLogEntry('🏆 VICTORY! Visa Dragon defeated!');
        nexus.awardXP(5000, 'Dragon Slayer Achievement');
        nexus.player.achievements.add('dragon_slayer_elite');
        nexus.player.scholarshipsEarned++;
        nexus.player.questsCompleted++;

        // Show victory screen
        alert(
          '🏆 LEGENDARY QUEST COMPLETED!\n\n🎓 Fulbright Scholarship ($50,000) Unlocked!\n⭐ +5,000 XP Bonus\n🏅 Dragon Slayer Elite Achievement',
        );

        closeBattle();
        nexus.dragonHealth = 100; // Reset for next battle
      }, 1000);
    }
  }
}

// Initialize Gamification Nexus when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.nexus-container')) {
    window.gamificationNexus = new GalacticGamificationNexus();

    // Load saved progress
    window.gamificationNexus.loadPlayerProgress();
  }
});
