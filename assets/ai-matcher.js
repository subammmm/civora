/**
 * AI-Powered Scholarship Matching Engine
 * Provides intelligent recommendations based on user profiles
 */

class ScholarshipMatcher {
  constructor() {
    this.userProfile = this.loadUserProfile();
    this.scholarships = [];
    this.weights = {
      gpa: 0.25,
      level: 0.2,
      field: 0.15,
      country: 0.15,
      funding: 0.1,
      deadline: 0.1,
      workExperience: 0.05,
    };
  }

  async init() {
    await this.loadScholarships();
    return this;
  }

  async loadScholarships() {
    try {
      const response = await fetch('assets/data/scholarships-demo.json');
      if (response.ok) {
        this.scholarships = await response.json();
        // Enhance scholarship data with additional matching fields
        this.scholarships = this.scholarships.map((scholarship) => ({
          ...scholarship,
          fields: this.extractFields(scholarship.name),
          difficulty: this.calculateDifficulty(scholarship),
          urgency: this.calculateUrgency(scholarship.deadline),
        }));
      }
    } catch (error) {
      console.warn('Failed to load scholarships:', error);
    }
  }

  extractFields(name) {
    const fieldKeywords = {
      engineering: ['engineering', 'technology', 'tech', 'stem'],
      business: ['business', 'management', 'mba', 'economics'],
      sciences: ['science', 'research', 'physics', 'chemistry', 'biology'],
      'social-sciences': ['social', 'development', 'policy', 'political'],
      arts: ['arts', 'humanities', 'culture', 'language'],
      medicine: ['medicine', 'medical', 'health', 'public health'],
      law: ['law', 'legal', 'justice'],
    };

    const detectedFields = [];
    const nameLower = name.toLowerCase();

    for (const [field, keywords] of Object.entries(fieldKeywords)) {
      if (keywords.some((keyword) => nameLower.includes(keyword))) {
        detectedFields.push(field);
      }
    }

    return detectedFields.length > 0 ? detectedFields : ['general'];
  }

  calculateDifficulty(scholarship) {
    let difficulty = 0.5; // Base difficulty

    // Prestigious scholarships are harder
    const prestigiousKeywords = ['chevening', 'fulbright', 'rhodes', 'gates', 'eiffel'];
    if (prestigiousKeywords.some((keyword) => scholarship.name.toLowerCase().includes(keyword))) {
      difficulty += 0.3;
    }

    // PhD programs are generally more competitive
    if (scholarship.level.toLowerCase().includes('phd')) {
      difficulty += 0.2;
    }

    // Fully funded scholarships are more competitive
    if (scholarship.funding.toLowerCase().includes('fully')) {
      difficulty += 0.2;
    }

    return Math.min(difficulty, 1.0);
  }

  calculateUrgency(deadline) {
    if (!deadline) return 0.5;

    try {
      const deadlineDate = new Date(deadline);
      const now = new Date();
      const daysUntilDeadline = (deadlineDate - now) / (1000 * 60 * 60 * 24);

      if (daysUntilDeadline < 30) return 1.0; // Very urgent
      if (daysUntilDeadline < 90) return 0.8; // Urgent
      if (daysUntilDeadline < 180) return 0.6; // Moderate
      return 0.3; // Not urgent
    } catch (error) {
      return 0.5; // Default if parsing fails
    }
  }

  calculateMatch(scholarship, profile = this.userProfile) {
    let score = 0;

    // GPA matching
    if (profile.gpa) {
      const gpaScore = this.calculateGpaScore(scholarship, profile.gpa);
      score += gpaScore * this.weights.gpa;
    }

    // Level matching
    if (profile.targetDegree) {
      const levelScore = this.calculateLevelScore(scholarship, profile.targetDegree);
      score += levelScore * this.weights.level;
    }

    // Field matching
    if (profile.fieldOfStudy) {
      const fieldScore = this.calculateFieldScore(scholarship, profile.fieldOfStudy);
      score += fieldScore * this.weights.field;
    }

    // Country preference
    if (profile.preferredCountries && profile.preferredCountries.length > 0) {
      const countryScore = this.calculateCountryScore(scholarship, profile.preferredCountries);
      score += countryScore * this.weights.country;
    }

    // Funding needs
    if (profile.fundingNeeds) {
      const fundingScore = this.calculateFundingScore(scholarship, profile.fundingNeeds);
      score += fundingScore * this.weights.funding;
    }

    // Timeline compatibility
    if (profile.timeline) {
      const timelineScore = this.calculateTimelineScore(scholarship, profile.timeline);
      score += timelineScore * this.weights.deadline;
    }

    // Work experience factor
    if (profile.workExperience) {
      const workScore = this.calculateWorkScore(scholarship, profile.workExperience);
      score += workScore * this.weights.workExperience;
    }

    return Math.max(0, Math.min(1, score));
  }

  calculateGpaScore(scholarship, gpa) {
    const gpaFloat = parseFloat(gpa);
    if (isNaN(gpaFloat)) return 0.5;

    // Higher GPA gives better scores for competitive scholarships
    const difficulty = scholarship.difficulty || 0.5;
    const requiredGpa = 2.5 + difficulty * 1.5; // Range: 2.5-4.0

    if (gpaFloat >= requiredGpa) return 1.0;
    if (gpaFloat >= requiredGpa - 0.5) return 0.8;
    if (gpaFloat >= requiredGpa - 1.0) return 0.6;
    return 0.3;
  }

  calculateLevelScore(scholarship, targetLevel) {
    const scholarshipLevels = scholarship.level.toLowerCase();
    const targetLower = targetLevel.toLowerCase();

    if (scholarshipLevels.includes(targetLower)) return 1.0;

    // Partial matches
    if (targetLower.includes('master') && scholarshipLevels.includes('postgraduate')) return 0.8;
    if (targetLower.includes('bachelor') && scholarshipLevels.includes('undergraduate')) return 0.8;

    return 0.2;
  }

  calculateFieldScore(scholarship, fieldOfStudy) {
    if (!scholarship.fields) return 0.5;

    if (scholarship.fields.includes(fieldOfStudy)) return 1.0;
    if (scholarship.fields.includes('general')) return 0.7;

    // Related fields scoring
    const relatedFields = {
      engineering: ['sciences', 'technology'],
      business: ['economics', 'social-sciences'],
      sciences: ['engineering', 'medicine'],
      medicine: ['sciences', 'public-health'],
    };

    if (
      relatedFields[fieldOfStudy] &&
      relatedFields[fieldOfStudy].some((field) => scholarship.fields.includes(field))
    ) {
      return 0.6;
    }

    return 0.3;
  }

  calculateCountryScore(scholarship, preferredCountries) {
    if (preferredCountries.includes(scholarship.country)) return 1.0;

    // Regional preferences
    const regions = {
      europe: ['UK', 'Germany', 'France', 'Netherlands', 'Sweden', 'Norway'],
      asia: ['South Korea', 'Japan', 'Singapore', 'China', 'Hong Kong'],
      'north-america': ['USA', 'Canada'],
    };

    for (const region of preferredCountries) {
      if (regions[region] && regions[region].includes(scholarship.country)) {
        return 0.7;
      }
    }

    return 0.3;
  }

  calculateFundingScore(scholarship, fundingNeeds) {
    const fundingLower = scholarship.funding.toLowerCase();

    if (fundingNeeds === 'full' && fundingLower.includes('fully')) return 1.0;
    if (fundingNeeds === 'partial' && !fundingLower.includes('fully')) return 1.0;
    if (fundingNeeds === 'any') return 0.8;

    return 0.4;
  }

  calculateTimelineScore(scholarship, timeline) {
    const urgency = scholarship.urgency || 0.5;

    if (timeline === '6-months' && urgency > 0.7) return 1.0;
    if (timeline === '1-year' && urgency > 0.4) return 1.0;
    if (timeline === '2-years') return 0.9;

    return 0.6;
  }

  calculateWorkScore(scholarship, workExperience) {
    const workYears = parseInt(workExperience) || 0;
    const difficulty = scholarship.difficulty || 0.5;

    // More work experience helps with competitive scholarships
    if (workYears >= 3 && difficulty > 0.6) return 1.0;
    if (workYears >= 1 && difficulty > 0.4) return 0.8;
    if (workYears === 0 && difficulty < 0.4) return 0.9; // Good for fresh graduates

    return 0.6;
  }

  getRecommendations(limit = 10) {
    if (!this.scholarships.length) return [];

    const scoredScholarships = this.scholarships.map((scholarship) => ({
      ...scholarship,
      matchScore: this.calculateMatch(scholarship),
      reasons: this.generateMatchReasons(scholarship),
    }));

    return scoredScholarships.sort((a, b) => b.matchScore - a.matchScore).slice(0, limit);
  }

  generateMatchReasons(scholarship) {
    const reasons = [];
    const profile = this.userProfile;

    if (
      profile.targetDegree &&
      scholarship.level.toLowerCase().includes(profile.targetDegree.toLowerCase())
    ) {
      reasons.push(`Matches your ${profile.targetDegree} degree goal`);
    }

    if (
      profile.fieldOfStudy &&
      scholarship.fields &&
      scholarship.fields.includes(profile.fieldOfStudy)
    ) {
      reasons.push(`Perfect field match for ${profile.fieldOfStudy}`);
    }

    if (profile.preferredCountries && profile.preferredCountries.includes(scholarship.country)) {
      reasons.push(`In your preferred country: ${scholarship.country}`);
    }

    if (scholarship.funding.toLowerCase().includes('fully')) {
      reasons.push('Fully funded opportunity');
    }

    if (scholarship.urgency > 0.7) {
      reasons.push('Application deadline approaching soon');
    }

    return reasons;
  }

  updateProfile(newProfile) {
    this.userProfile = { ...this.userProfile, ...newProfile };
    this.saveUserProfile();
  }

  loadUserProfile() {
    try {
      const saved = localStorage.getItem('civora_user_profile');
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      return {};
    }
  }

  saveUserProfile() {
    try {
      localStorage.setItem('civora_user_profile', JSON.stringify(this.userProfile));
    } catch (error) {
      console.warn('Failed to save user profile:', error);
    }
  }

  generateSuccessPrediction(scholarship) {
    const matchScore = this.calculateMatch(scholarship);
    const profile = this.userProfile;

    let prediction = matchScore * 0.7; // Base on match score

    // Adjust based on profile completeness
    const profileCompleteness = this.calculateProfileCompleteness();
    prediction += profileCompleteness * 0.2;

    // Adjust based on scholarship difficulty
    const difficulty = scholarship.difficulty || 0.5;
    prediction = prediction * (1 - difficulty * 0.3);

    return {
      percentage: Math.round(prediction * 100),
      confidence: profileCompleteness > 0.7 ? 'High' : profileCompleteness > 0.4 ? 'Medium' : 'Low',
      tips: this.generateApplicationTips(scholarship, matchScore),
    };
  }

  calculateProfileCompleteness() {
    const profile = this.userProfile;
    const requiredFields = ['gpa', 'targetDegree', 'fieldOfStudy', 'preferredCountries'];
    const completedFields = requiredFields.filter(
      (field) => profile[field] && profile[field].length > 0,
    );
    return completedFields.length / requiredFields.length;
  }

  generateApplicationTips(scholarship, matchScore) {
    const tips = [];
    const profile = this.userProfile;

    if (matchScore > 0.8) {
      tips.push('Excellent match! Focus on crafting a compelling personal statement.');
    } else if (matchScore > 0.6) {
      tips.push('Good match. Highlight your relevant experiences and achievements.');
    } else {
      tips.push('Consider strengthening your application with additional qualifications.');
    }

    if (scholarship.difficulty > 0.7) {
      tips.push('This is a highly competitive scholarship. Consider applying to backup options.');
    }

    if (scholarship.urgency > 0.8) {
      tips.push('Deadline is approaching! Start your application immediately.');
    }

    if (!profile.workExperience || parseInt(profile.workExperience) === 0) {
      tips.push(
        'Consider gaining relevant work or volunteer experience to strengthen your profile.',
      );
    }

    return tips;
  }
}

// Global instance
window.scholarshipMatcher = null;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  try {
    window.scholarshipMatcher = await new ScholarshipMatcher().init();
    console.log('AI Scholarship Matcher initialized');
  } catch (error) {
    console.warn('Failed to initialize scholarship matcher:', error);
  }
});
