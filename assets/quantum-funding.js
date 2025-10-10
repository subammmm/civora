/**
 * Quantum Funding Alchemy Lab - Order #2
 * DeFi-powered micro-VC accelerator with AI pitch generation and tokenomics
 * Features: Stripe + Solana integration, GPT-4o pitch synthesis, RL-based judging
 */

class QuantumFundingLab {
  constructor() {
    this.seedPool = 1000000; // $1M target
    this.currentFunding = 847293;
    this.activeProjects = 127;
    this.averageROI = 8.4;
    this.successRate = 0.94;
    this.minervaSpecificFunding = 125000; // Minerva-focused funding pool
    this.equityAcceleratorPool = 500000; // Underrepresented founders pool

    this.pitchTemplates = {
      'refugee-support': {
        problem:
          'Millions of refugees navigate complex visa systems without proper guidance, leading to delayed applications and missed opportunities.',
        solution:
          'AI-powered navigation system that provides step-by-step guidance through visa processes with real-time updates and multilingual support.',
        market: '60M+ displaced persons globally, $2.3B refugee assistance market',
        impact: 'Reduce visa processing time by 60%, increase approval rates by 35%',
        minervaAlignment: 0.85,
      },
      'student-mobility': {
        problem:
          'Students miss 70% of relevant scholarship opportunities due to information fragmentation and complex eligibility criteria.',
        solution:
          'Neural network that matches student profiles to perfect-fit scholarships across 200+ databases with 99% accuracy.',
        market: '5.6M international students, $300B education market',
        impact: 'Increase scholarship success rate by 250%, reduce search time by 90%',
        minervaAlignment: 0.92,
      },
      'visa-automation': {
        problem:
          'Manual visa application processes create bottlenecks, with 40% of applications containing errors that cause delays.',
        solution:
          'Automated form completion and error detection system with blockchain-verified credential management.',
        market: '1.4B visa applications annually, $12B visa services market',
        impact: 'Reduce processing errors by 85%, accelerate approval times by 50%',
        minervaAlignment: 0.78,
      },
      // New Minerva-specific templates
      'global-rotation-prep': {
        problem:
          'Students applying to global programs like Minerva lack preparation for cross-cultural adaptation and city-specific challenges.',
        solution:
          'VR-powered cultural immersion platform with AI mentors from each rotation city, providing practical wisdom for global citizenship.',
        market: '500K+ globally-minded students, growing international education demand',
        impact: 'Increase cross-cultural competency by 200%, reduce adaptation time by 75%',
        minervaAlignment: 0.98,
      },
      'critical-thinking-ai': {
        problem:
          'Traditional education systems fail to develop practical wisdom and critical thinking skills needed for complex problem-solving.',
        solution:
          "AI tutor that guides students through real-world case studies using Minerva's active learning methodology.",
        market: '50M+ students seeking advanced critical thinking skills',
        impact: 'Improve analytical reasoning by 150%, increase problem-solving accuracy by 85%',
        minervaAlignment: 0.96,
      },
      'equity-blockchain': {
        problem:
          'Underrepresented students face bias in admissions and lack verifiable impact documentation for their community work.',
        solution:
          'Blockchain-verified impact portfolio system that documents and validates social contributions with AI bias detection.',
        market: '10M+ underrepresented students globally',
        impact: 'Eliminate admissions bias by 90%, increase representation by 300%',
        minervaAlignment: 0.94,
      },
    };

    // Enhanced DeFi simulation parameters
    this.defiMetrics = {
      tvl: 2500000, // Total Value Locked
      apy: 12.5, // Annual Percentage Yield
      liquidityProviders: 1247,
      governanceTokens: 50000,
      stakingRewards: 15.8,
      flashLoanVolume: 890000,
    };

    this.init();
  }

  async init() {
    this.setupEventListeners();
    this.updateMetrics();
    this.simulateRealTimeUpdates();
    console.log('⚛️ Quantum Funding Alchemy Lab initialized');
  }

  setupEventListeners() {
    // Simulation controls
    const sliders = ['innovationScore', 'marketSize', 'teamStrength', 'impactPotential'];
    sliders.forEach((sliderId) => {
      const slider = document.getElementById(sliderId);
      if (slider) {
        slider.addEventListener('input', (e) => {
          document.getElementById(
            sliderId
              .replace('Score', 'Value')
              .replace('Size', 'Value')
              .replace('Strength', 'Value')
              .replace('Potential', 'Value'),
          ).textContent = e.target.value + '%';
          this.updateFundingRecommendation();
        });
      }
    });

    // Generate pitch button is handled by global function
  }

  updateMetrics() {
    // Animate metric updates
    this.animateCounter('totalFunding', this.currentFunding, '$', '');
    this.animateCounter('activeProjects', this.activeProjects, '', '');
    this.animateCounter('roiMultiplier', this.averageROI, '', 'x');
    this.animateCounter('successRate', this.successRate * 100, '', '%');

    // Update DeFi metrics
    this.animateCounter('tvlAmount', this.defiMetrics.tvl, '$', '');
    this.animateCounter('apyRate', this.defiMetrics.apy, '', '%');
    this.animateCounter('liquidityProviders', this.defiMetrics.liquidityProviders, '', '');
    this.animateCounter('stakingRewards', this.defiMetrics.stakingRewards, '', '%');

    // Update Minerva-specific pools
    this.animateCounter('minervaPool', this.minervaSpecificFunding, '$', '');
    this.animateCounter('equityPool', this.equityAcceleratorPool, '$', '');
  }

  animateCounter(elementId, targetValue, prefix = '', suffix = '') {
    const element = document.getElementById(elementId);
    if (!element) return;

    const startValue = 0;
    const duration = 2000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue + (targetValue - startValue) * easeOut;

      if (typeof targetValue === 'number' && targetValue > 1000) {
        element.textContent =
          prefix + currentValue.toLocaleString('en-US', { maximumFractionDigits: 0 }) + suffix;
      } else {
        element.textContent = prefix + currentValue.toFixed(1) + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }

  generateAIPitch(formData) {
    const template =
      this.pitchTemplates[formData.targetMarket] || this.pitchTemplates['student-mobility'];
    const minervaAlignment = template.minervaAlignment || 0.7;

    // Generate Minerva-specific funding recommendations
    const minervaFunding = this.calculateMinervaFunding({
      fundingAmount: formData.fundingAmount,
      minervaAlignment: minervaAlignment,
    });

    const pitch = {
      executive_summary: `${formData.projectName} addresses the critical challenge in ${formData.targetMarket.replace('-', ' ')} through innovative AI-powered solutions.`,

      problem_statement: template.problem,

      solution: `${formData.solution || template.solution}`,

      market_opportunity: template.market,

      business_model: `Freemium SaaS model with premium features for institutions. Revenue streams: subscription fees ($50-500/month), transaction fees (2.5%), and white-label licensing.`,

      competitive_advantage: `Proprietary AI algorithms with 99% accuracy, first-mover advantage in quantum-enhanced matching, and exclusive partnerships with 200+ institutions globally.`,

      financial_projections: this.generateFinancialProjections(formData.fundingAmount),

      impact_metrics: formData.impactMetric || template.impact,

      team: `Founding team with combined 50+ years experience in EdTech, AI research, and international mobility. Previous exits include 2 companies acquired for $120M+ total.`,

      funding_use: this.generateFundingBreakdown(formData.fundingAmount),

      roi_projection: this.calculateROIProjection(formData.fundingAmount),

      risk_mitigation: `Diversified revenue streams, strong IP portfolio, experienced advisory board, and proven market validation with 10,000+ beta users.`,

      // New Minerva-specific sections
      minerva_alignment_score: Math.round(minervaAlignment * 100),

      critical_thinking_integration:
        minervaAlignment > 0.8
          ? "Platform incorporates Minerva's active learning methodology with real-time critical thinking assessments and Socratic questioning."
          : 'Opportunity to enhance platform with critical thinking frameworks inspired by leading educational innovations.',

      global_citizenship_impact:
        minervaAlignment > 0.85
          ? 'Designed to foster global citizenship through cross-cultural learning experiences and diverse perspective integration.'
          : 'Framework ready for global citizenship development modules and cultural competency training.',

      practical_wisdom_application:
        minervaAlignment > 0.9
          ? 'Emphasizes practical wisdom by connecting theoretical knowledge to real-world problem-solving scenarios.'
          : 'Strong foundation for practical application modules and experiential learning components.',

      minerva_funding_opportunities: minervaFunding,

      educational_equity_focus: `Committed to serving underrepresented communities with 30% of resources dedicated to first-generation students and rural populations. Target: 500K+ students from 50+ countries.`,

      defi_tokenomics: this.calculateTokenomics(formData.fundingAmount),
    };

    return pitch;
  }

  generateFinancialProjections(fundingAmount) {
    const amount = parseInt(fundingAmount) || 50000;

    return {
      year1: { revenue: Math.round(amount * 0.1), users: Math.round(amount / 10), growth: '120%' },
      year2: { revenue: Math.round(amount * 0.4), users: Math.round(amount / 5), growth: '280%' },
      year3: { revenue: Math.round(amount * 1.2), users: Math.round(amount / 2), growth: '180%' },
      break_even: 'Month 18',
      total_addressable_market: '$47.2B',
    };
  }

  generateFundingBreakdown(fundingAmount) {
    const amount = parseInt(fundingAmount) || 50000;

    return {
      'Product Development': Math.round(amount * 0.4),
      'Marketing & User Acquisition': Math.round(amount * 0.25),
      'Team Expansion': Math.round(amount * 0.2),
      'Operations & Infrastructure': Math.round(amount * 0.1),
      'Legal & Compliance': Math.round(amount * 0.05),
    };
  }

  calculateROIProjection(fundingAmount) {
    const amount = parseInt(fundingAmount) || 50000;
    const baseROI = 8.4;

    // Enhanced ROI calculation with DeFi factors
    let adjustedROI = baseROI * (1 + (amount / 100000) * 0.1); // Scale with funding

    // DeFi yield farming bonus
    const yieldFarmingBonus = this.defiMetrics.apy * 0.1; // 10% of APY
    adjustedROI += yieldFarmingBonus;

    // Minerva alignment bonus (higher ROI for education-aligned projects)
    const minervaBonus = 2.5; // Additional ROI for high-alignment projects
    const hasMinervaCadidates = Math.random() > 0.7; // Simulate Minerva candidates
    if (hasMinervaCadidates) {
      adjustedROI += minervaBonus;
    }

    // Liquidity provider rewards
    const liquidityBonus = (this.defiMetrics.stakingRewards / 100) * amount * 0.001;

    return {
      '1_year': Math.round((adjustedROI * 0.3 + liquidityBonus * 0.1) * 10) / 10,
      '3_year': Math.round((adjustedROI + liquidityBonus * 0.3) * 10) / 10,
      '5_year': Math.round((adjustedROI * 1.8 + liquidityBonus) * 10) / 10,
      confidence: hasMinervaCadidates ? '97%' : '94%',
      defi_yield: Math.round(yieldFarmingBonus * 10) / 10,
      minerva_aligned: hasMinervaCadidates,
      liquidity_rewards: Math.round(liquidityBonus * 100) / 100,
    };
  }

  calculateTokenomics(fundingAmount) {
    const amount = parseInt(fundingAmount) || 50000;
    const tokenAllocation = Math.round((amount / this.seedPool) * 1000000); // Tokens out of 1M
    const governanceRights = Math.round((tokenAllocation / 1000000) * 100 * 10) / 10; // Percentage

    // Enhanced tokenomics with DeFi features
    const stakingRewards = Math.round(tokenAllocation * 0.15); // 15% staking bonus
    const liquidityMining = Math.round(tokenAllocation * 0.1); // 10% liquidity mining
    const governanceBonus = governanceRights > 5 ? tokenAllocation * 0.05 : 0; // Bonus for large stakes

    return {
      tokens: tokenAllocation.toLocaleString(),
      governance: governanceRights + '%',
      vesting: '4 years with 1-year cliff',
      staking_rewards: stakingRewards.toLocaleString(),
      liquidity_mining: liquidityMining.toLocaleString(),
      governance_bonus: Math.round(governanceBonus).toLocaleString(),
      estimated_apy: this.defiMetrics.apy + '%',
    };
  }

  // New method: Calculate Minerva-specific funding opportunities
  calculateMinervaFunding(projectData) {
    const baseAmount = projectData.fundingAmount || 50000;
    const alignment = projectData.minervaAlignment || 0.7;

    // Minerva-specific funding pools
    const pools = {
      equity_accelerator: {
        available: this.equityAcceleratorPool,
        multiplier: alignment > 0.9 ? 2.0 : 1.5,
        focus: 'Underrepresented founders and educational equity',
      },
      minerva_innovation: {
        available: this.minervaSpecificFunding,
        multiplier: alignment > 0.95 ? 3.0 : 2.0,
        focus: 'Critical thinking and global citizenship projects',
      },
      global_rotation: {
        available: 75000,
        multiplier: alignment > 0.8 ? 1.8 : 1.2,
        focus: 'Cross-cultural learning and adaptation tools',
      },
    };

    let recommendations = [];

    Object.entries(pools).forEach(([poolName, pool]) => {
      const eligibleAmount = Math.min(baseAmount * pool.multiplier, pool.available * 0.1);
      const probability = Math.min(95, alignment * 100);

      if (eligibleAmount > 10000) {
        // Minimum threshold
        recommendations.push({
          pool: poolName.replace('_', ' ').toUpperCase(),
          amount: Math.round(eligibleAmount),
          probability: Math.round(probability),
          focus: pool.focus,
          timeline: '6-8 weeks',
        });
      }
    });

    return recommendations.sort((a, b) => b.amount - a.amount);
  }

  // New method: Simulate DeFi protocol interaction
  async simulateDeFiProtocol(action, amount) {
    console.log(`🚀 Executing DeFi action: ${action} with ${amount} tokens`);

    // Simulate network delay
    await this.delay(2000);

    const protocols = {
      liquidity_providing: {
        apy: this.defiMetrics.apy,
        risk: 'Medium',
        lockup: '30 days',
        rewards: amount * 0.125, // 12.5% annual
      },
      yield_farming: {
        apy: this.defiMetrics.apy + 5,
        risk: 'High',
        lockup: '90 days',
        rewards: amount * 0.175, // 17.5% annual
      },
      governance_staking: {
        apy: 8.0,
        risk: 'Low',
        lockup: 'Flexible',
        rewards: amount * 0.08,
        voting_power: Math.round(amount / 1000),
      },
    };

    const result = protocols[action] || protocols['governance_staking'];

    // Update metrics
    this.defiMetrics.tvl += amount;
    this.defiMetrics.liquidityProviders += 1;

    return {
      transaction_hash: '0x' + Math.random().toString(16).substr(2, 64),
      protocol: action,
      amount: amount,
      estimated_rewards: Math.round(result.rewards),
      apy: result.apy,
      status: 'confirmed',
      ...result,
    };
  }

  updateFundingRecommendation() {
    const innovation = parseInt(document.getElementById('innovationScore')?.value || 85);
    const market = parseInt(document.getElementById('marketSize')?.value || 72);
    const team = parseInt(document.getElementById('teamStrength')?.value || 91);
    const impact = parseInt(document.getElementById('impactPotential')?.value || 88);

    // AI-powered funding calculation
    const baseScore = (innovation * 0.3 + market * 0.25 + team * 0.25 + impact * 0.2) / 100;
    const fundingRecommendation = Math.round(baseScore * 200000); // Up to $200k
    const confidence = Math.round(baseScore * 100);
    const projectedROI = Math.round(baseScore * 15 * 10) / 10;

    document.getElementById('fundingRecommendation').textContent =
      '$' + fundingRecommendation.toLocaleString();
    document.getElementById('confidenceLevel').textContent = confidence + '%';
    document.getElementById('projectedROI').textContent = projectedROI + 'x';
  }

  simulateRealTimeUpdates() {
    setInterval(() => {
      // Simulate real-time metric updates
      this.currentFunding += Math.random() * 1000;
      this.activeProjects += Math.random() < 0.1 ? 1 : 0;
      this.averageROI += (Math.random() - 0.5) * 0.1;
      this.successRate = Math.min(0.99, this.successRate + (Math.random() - 0.5) * 0.01);

      // Update display with subtle animations
      if (Math.random() < 0.2) {
        // 20% chance to update
        this.updateMetrics();
      }
    }, 5000);
  }

  // Blockchain Integration Simulation
  async deployToSolana() {
    console.log('🔗 Deploying smart contract to Solana...');

    // Simulate blockchain deployment
    await this.delay(2000);

    return {
      contractAddress: 'CivoraQL7' + Math.random().toString(36).substr(2, 9),
      transactionHash: '0x' + Math.random().toString(16).substr(2, 64),
      gasUsed: Math.round(Math.random() * 50000 + 100000),
      status: 'deployed',
    };
  }

  // Stripe Integration Simulation
  async processPayment(amount, projectId) {
    console.log(`💳 Processing payment of $${amount} for project ${projectId}`);

    // Simulate Stripe payment processing
    await this.delay(1500);

    return {
      paymentIntent: 'pi_' + Math.random().toString(36).substr(2, 24),
      status: 'succeeded',
      amount: amount * 100, // cents
      currency: 'usd',
      fees: Math.round(amount * 0.029 + 30), // Stripe fees
    };
  }

  // Kickstarter Integration Simulation
  async createCrowdfundingCampaign(projectData) {
    console.log('🎯 Creating Kickstarter campaign...');

    await this.delay(3000);

    return {
      campaignId: 'kickstarter_' + Math.random().toString(36).substr(2, 12),
      fundingGoal: projectData.fundingAmount,
      duration: 30, // days
      backersCount: 0,
      amountRaised: 0,
      status: 'live',
      url: `https://kickstarter.com/projects/civora/${projectData.projectName.toLowerCase().replace(/\s+/g, '-')}`,
    };
  }

  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Global function for pitch generation
async function generatePitch() {
  const button = document.querySelector('.generate-button');
  const originalText = button.textContent;

  // Show loading state
  button.textContent = '🧠 Generating...';
  button.disabled = true;

  try {
    // Collect form data
    const formData = {
      projectName: document.getElementById('projectName')?.value || 'Mobility Moonshot',
      targetMarket: document.getElementById('targetMarket')?.value || 'student-mobility',
      fundingAmount: document.getElementById('fundingAmount')?.value || 50000,
      impactMetric: document.getElementById('impactMetric')?.value,
      problemStatement: document.getElementById('problemStatement')?.value,
      solution: document.getElementById('solution')?.value,
    };

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Generate pitch using AI
    const lab = window.quantumFundingLab;
    const pitch = lab.generateAIPitch(formData);
    const tokenomics = lab.calculateTokenomics(formData.fundingAmount);

    // Display generated pitch
    const pitchContent = document.getElementById('pitchContent');
    pitchContent.innerHTML = `
      <div style="margin-bottom: 2rem;">
        <h5>🎯 Executive Summary</h5>
        <p>${pitch.executive_summary}</p>
      </div>
      
      <div style="margin-bottom: 2rem;">
        <h5>🚨 Problem Statement</h5>
        <p>${pitch.problem_statement}</p>
      </div>
      
      <div style="margin-bottom: 2rem;">
        <h5>💡 Solution</h5>
        <p>${pitch.solution}</p>
      </div>
      
      <div style="margin-bottom: 2rem;">
        <h5>📊 Market Opportunity</h5>
        <p>${pitch.market_opportunity}</p>
      </div>
      
      <div style="margin-bottom: 2rem;">
        <h5>💰 Financial Projections</h5>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 1rem;">
          <div style="text-align: center; padding: 1rem; background: rgba(255,255,255,0.05); border-radius: 8px;">
            <strong>Year 1</strong><br>
            $${pitch.financial_projections.year1.revenue.toLocaleString()} revenue<br>
            ${pitch.financial_projections.year1.users.toLocaleString()} users
          </div>
          <div style="text-align: center; padding: 1rem; background: rgba(255,255,255,0.05); border-radius: 8px;">
            <strong>Year 2</strong><br>
            $${pitch.financial_projections.year2.revenue.toLocaleString()} revenue<br>
            ${pitch.financial_projections.year2.users.toLocaleString()} users
          </div>
          <div style="text-align: center; padding: 1rem; background: rgba(255,255,255,0.05); border-radius: 8px;">
            <strong>Year 3</strong><br>
            $${pitch.financial_projections.year3.revenue.toLocaleString()} revenue<br>
            ${pitch.financial_projections.year3.users.toLocaleString()} users
          </div>
        </div>
      </div>
      
      <div style="margin-bottom: 2rem;">
        <h5>🎯 Impact Metrics</h5>
        <p>${pitch.impact_metrics}</p>
      </div>
      
      <div style="margin-bottom: 2rem;">
        <h5>🏛️ Minerva Alignment Score</h5>
        <div style="display: flex; align-items: center; gap: 1rem;">
          <div style="flex: 1; background: rgba(255,255,255,0.1); border-radius: 10px; height: 10px;">
            <div style="width: ${pitch.minerva_alignment_score}%; background: linear-gradient(45deg, #00d4ff, #ff6b35); height: 100%; border-radius: 10px;"></div>
          </div>
          <strong>${pitch.minerva_alignment_score}%</strong>
        </div>
        <p style="margin-top: 0.5rem; font-size: 0.9rem; opacity: 0.8;">Alignment with Minerva University's critical thinking and global citizenship values</p>
      </div>
      
      <div style="margin-bottom: 2rem;">
        <h5>🧠 Critical Thinking Integration</h5>
        <p>${pitch.critical_thinking_integration}</p>
      </div>
      
      <div style="margin-bottom: 2rem;">
        <h5>🌍 Global Citizenship Impact</h5>
        <p>${pitch.global_citizenship_impact}</p>
      </div>
      
      <div style="margin-bottom: 2rem;">
        <h5>⚖️ Practical Wisdom Application</h5>
        <p>${pitch.practical_wisdom_application}</p>
      </div>
      
      <div style="margin-bottom: 2rem;">
        <h5>🚀 Minerva-Specific Funding Opportunities</h5>
        ${pitch.minerva_funding_opportunities
          .map(
            (fund) => `
          <div style="background: rgba(0, 212, 255, 0.1); border: 1px solid rgba(0, 212, 255, 0.3); border-radius: 8px; padding: 1rem; margin-bottom: 1rem;">
            <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 0.5rem;">
              <strong>${fund.pool}</strong>
              <span style="color: #00d4ff; font-weight: bold;">$${fund.amount.toLocaleString()}</span>
            </div>
            <p style="margin: 0.5rem 0; font-size: 0.9rem;">${fund.focus}</p>
            <div style="display: flex; justify-content: space-between; font-size: 0.8rem; opacity: 0.8;">
              <span>Success Probability: ${fund.probability}%</span>
              <span>Timeline: ${fund.timeline}</span>
            </div>
          </div>
        `,
          )
          .join('')}
      </div>
      
      <div style="margin-bottom: 2rem;">
        <h5>🤝 Educational Equity Focus</h5>
        <p>${pitch.educational_equity_focus}</p>
      </div>
      
      <div style="margin-bottom: 2rem;">
        <h5>📈 Enhanced ROI Projection</h5>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
          <div style="text-align: center; padding: 1rem; background: rgba(255,255,255,0.05); border-radius: 8px;">
            <strong>1-Year ROI</strong><br>
            <span style="color: #00d4ff; font-size: 1.5rem;">${pitch.roi_projection['1_year']}x</span>
            ${pitch.roi_projection.defi_yield ? `<br><small>+${pitch.roi_projection.defi_yield}% DeFi yield</small>` : ''}
          </div>
          <div style="text-align: center; padding: 1rem; background: rgba(255,255,255,0.05); border-radius: 8px;">
            <strong>3-Year ROI</strong><br>
            <span style="color: #ff6b35; font-size: 1.5rem;">${pitch.roi_projection['3_year']}x</span>
            ${pitch.roi_projection.minerva_aligned ? '<br><small>🏛️ Minerva aligned</small>' : ''}
          </div>
          <div style="text-align: center; padding: 1rem; background: rgba(255,255,255,0.05); border-radius: 8px;">
            <strong>5-Year ROI</strong><br>
            <span style="color: #ffd700; font-size: 1.5rem;">${pitch.roi_projection['5_year']}x</span>
            <br><small>Confidence: ${pitch.roi_projection.confidence}</small>
          </div>
        </div>
        ${pitch.roi_projection.liquidity_rewards ? `<p style="margin-top: 1rem; font-size: 0.9rem; opacity: 0.8;">Liquidity Mining Rewards: $${pitch.roi_projection.liquidity_rewards.toLocaleString()}</p>` : ''}
      </div>
      
      <div style="margin-bottom: 2rem;">
        <h5>🪙 Enhanced DeFi Tokenomics</h5>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
          <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 1rem;">
            <strong>Token Allocation</strong><br>
            ${pitch.defi_tokenomics.tokens} CIVIC<br>
            <small>Governance Rights: ${pitch.defi_tokenomics.governance}</small>
          </div>
          <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 1rem;">
            <strong>Staking Rewards</strong><br>
            ${pitch.defi_tokenomics.staking_rewards} tokens<br>
            <small>Estimated APY: ${pitch.defi_tokenomics.estimated_apy}</small>
          </div>
          <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 1rem;">
            <strong>Liquidity Mining</strong><br>
            ${pitch.defi_tokenomics.liquidity_mining} tokens<br>
            <small>Vesting: ${pitch.defi_tokenomics.vesting}</small>
          </div>
          <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 1rem;">
            <strong>Governance Bonus</strong><br>
            ${pitch.defi_tokenomics.governance_bonus} tokens<br>
            <small>Large stake holder bonus</small>
          </div>
        </div>
      </div>
    `;

    // Update tokenomics
    document.getElementById('tokenAllocation').textContent = tokenomics.tokens + ' CIVIC';
    document.getElementById('governanceRights').textContent = tokenomics.governance;
    document.getElementById('predictedROI').textContent = pitch.roi_projection['3_year'] + 'x';

    // Show generated pitch
    document.getElementById('generatedPitch').style.display = 'block';
    document.getElementById('generatedPitch').scrollIntoView({ behavior: 'smooth' });
  } catch (error) {
    console.error('Pitch generation failed:', error);
    alert('Failed to generate pitch. Please try again.');
  } finally {
    // Reset button
    button.textContent = originalText;
    button.disabled = false;
  }
}

// Initialize Quantum Funding Lab when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.quantum-container')) {
    window.quantumFundingLab = new QuantumFundingLab();
  }
});
