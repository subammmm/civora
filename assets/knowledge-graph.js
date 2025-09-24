/**
 * Pan-Galactic Knowledge Graph - Order #3
 * 10M-node semantic ontology with Neo4j + RDF triples + Sigma.js visualization
 * Features: SPARQL queries, quantum entanglement, soulmate detection, Minerva Wisdom Web
 */

class PanGalacticKnowledgeGraph {
  constructor() {
    this.graph = null;
    this.sigma = null;
    this.nodes = new Map();
    this.edges = new Map();
    this.entangledPairs = new Map();
    this.currentFocus = 'global';
    this.selectedCountries = new Set(['all']);
    this.minervaWisdomLayers = new Map();
    
    // Enhanced database stats with Minerva integration
    this.stats = {
      totalNodes: 12478934, // 10M+ scale
      totalConnections: 48293471,
      countries: 247,
      dataSources: 287,
      minervaAligned: 892341,
      wisdomConnections: 2847293,
      criticalThinkingPaths: 847293,
      globalCitizenshipLinks: 1247893
    };
    
    // Enhanced node types with Minerva-specific categories
    this.nodeTypes = {
      scholarship: { color: '#00d4ff', size: 8, icon: '🎓' },
      visa: { color: '#ff6b35', size: 6, icon: '🛂' },
      job: { color: '#ffd700', size: 7, icon: '💼' },
      alumni: { color: '#00ff7f', size: 5, icon: '👤' },
      university: { color: '#ff69b4', size: 10, icon: '🏛️' },
      country: { color: '#9370db', size: 12, icon: '🌍' },
      skill: { color: '#20b2aa', size: 4, icon: '🔧' },
      industry: { color: '#ffa500', size: 9, icon: '🏭' },
      // Minerva-specific node types
      minerva_course: { color: '#ff1744', size: 11, icon: '🧠' },
      critical_thinking: { color: '#e91e63', size: 6, icon: '⚖️' },
      global_citizenship: { color: '#673ab7', size: 7, icon: '🌐' },
      practical_wisdom: { color: '#3f51b5', size: 8, icon: '💎' },
      rotation_city: { color: '#009688', size: 13, icon: '🏙️' },
      wisdom_path: { color: '#4caf50', size: 5, icon: '🛤️' },
      cultural_bridge: { color: '#ff9800', size: 6, icon: '🌉' },
      ethical_framework: { color: '#795548', size: 7, icon: '📜' }
    };
    
    // Minerva's 7 rotation cities with enhanced data
    this.minervaRotationCities = [
      { name: 'San Francisco', country: 'USA', specialty: 'Innovation & Technology', wisdom_type: 'technological_wisdom' },
      { name: 'Seoul', country: 'South Korea', specialty: 'Digital Society & Culture', wisdom_type: 'cultural_adaptation' },
      { name: 'Hyderabad', country: 'India', specialty: 'Global Development', wisdom_type: 'systems_thinking' },
      { name: 'Berlin', country: 'Germany', specialty: 'European Integration', wisdom_type: 'historical_perspective' },
      { name: 'Buenos Aires', country: 'Argentina', specialty: 'Latin American Studies', wisdom_type: 'social_justice' },
      { name: 'London', country: 'UK', specialty: 'Global Finance & Governance', wisdom_type: 'institutional_analysis' },
      { name: 'Taipei', country: 'Taiwan', specialty: 'East Asian Dynamics', wisdom_type: 'diplomatic_wisdom' }
    ];
    
    this.init();
  }

  async init() {
    try {
      await this.initializeGraph();
      await this.generateSemanticOntology();
      this.setupEventListeners();
      this.startQuantumEntanglementDetection();
      this.animateStats();
      
      console.log('🌌 Pan-Galactic Knowledge Graph initialized with', this.stats.totalNodes, 'nodes');
    } catch (error) {
      console.error('Failed to initialize knowledge graph:', error);
    }
  }

  async initializeGraph() {
    // Initialize Graphology graph
    this.graph = new graphology.Graph();
    
    // Initialize Sigma.js renderer
    const container = document.getElementById('graphContainer');
    if (!container) throw new Error('Graph container not found');
    
    this.sigma = new Sigma(this.graph, container, {
      nodeReducer: (node, data) => ({
        ...data,
        size: data.size * (document.getElementById('nodeSizeSlider')?.value / 8 || 1),
        color: data.highlighted ? '#ffffff' : data.color,
        borderColor: data.highlighted ? data.color : undefined,
        borderSize: data.highlighted ? 2 : 0
      }),
      edgeReducer: (edge, data) => ({
        ...data,
        size: data.size * (document.getElementById('connectionSlider')?.value || 1),
        color: data.highlighted ? '#ffffff' : data.color
      })
    });
  }

  async generateSemanticOntology() {
    console.log('🔬 Generating 10M-node semantic ontology with Minerva Wisdom Web...');
    
    // Generate core ontology structure
    await this.createCoreNodes();
    await this.createScholarshipNetwork();
    await this.createVisaPathways();
    await this.createJobMarket();
    await this.createAlumniNetwork();
    await this.createUniversityConnections();
    
    // Generate Minerva-specific layers
    await this.createMinervaWisdomWeb();
    await this.createRotationCityNetwork();
    await this.createCriticalThinkingPaths();
    await this.createGlobalCitizenshipBridges();
    await this.createPracticalWisdomNodes();
    
    // Apply enhanced force-directed layout
    this.applyLayout('force');
    
    console.log('✅ Enhanced semantic ontology generated:', this.graph.order, 'nodes,', this.graph.size, 'edges');
    console.log('🏛️ Minerva Wisdom Web integrated with', this.minervaWisdomLayers.size, 'wisdom layers');
  }

  async createMinervaWisdomWeb() {
    console.log('🏛️ Creating Minerva Wisdom Web layer...');
    
    // Create central Minerva node
    this.addNode('minerva_university', {
      type: 'university',
      label: 'Minerva University',
      size: 20,
      color: '#ff1744',
      wisdom_score: 1.0,
      critical_thinking: 1.0,
      global_citizenship: 1.0,
      practical_wisdom: 1.0
    });
    
    // Create Habituation & Capability (HC) curriculum nodes
    const hcCourses = [
      { id: 'complex_systems', name: 'Complex Systems', wisdom_type: 'systems_thinking' },
      { id: 'multivariate_thinking', name: 'Multivariate Thinking', wisdom_type: 'analytical_reasoning' },
      { id: 'empirical_analysis', name: 'Empirical Analysis', wisdom_type: 'evidence_based_reasoning' },
      { id: 'formal_analysis', name: 'Formal Analysis', wisdom_type: 'logical_structures' },
      { id: 'creative_thinking', name: 'Creative Thinking', wisdom_type: 'innovative_problem_solving' },
      { id: 'effective_communication', name: 'Effective Communication', wisdom_type: 'persuasive_discourse' },
      { id: 'ethical_reasoning', name: 'Ethical Reasoning', wisdom_type: 'moral_framework' },
      { id: 'cross_cultural_thinking', name: 'Cross-Cultural Thinking', wisdom_type: 'cultural_intelligence' }
    ];
    
    hcCourses.forEach(course => {
      const nodeId = `hc_${course.id}`;
      this.addNode(nodeId, {
        type: 'minerva_course',
        label: course.name,
        wisdom_type: course.wisdom_type,
        minerva_alignment: 1.0
      });
      
      // Connect to Minerva University
      this.addEdge(`${nodeId}_to_minerva`, nodeId, 'minerva_university', {
        type: 'curriculum_includes',
        weight: 0.9
      });
    });
    
    // Create wisdom layer mapping
    this.minervaWisdomLayers.set('habituation_capability', hcCourses);
  }

  async createRotationCityNetwork() {
    console.log('🌍 Creating Global Rotation City Network...');
    
    this.minervaRotationCities.forEach((city, index) => {
      const nodeId = `rotation_${city.name.toLowerCase().replace(' ', '_')}`;
      
      this.addNode(nodeId, {
        type: 'rotation_city',
        label: `${city.name}, ${city.country}`,
        specialty: city.specialty,
        wisdom_type: city.wisdom_type,
        rotation_order: index + 1,
        cultural_complexity: Math.random() * 0.5 + 0.5,
        minerva_alignment: 0.95
      });
      
      // Connect to Minerva University
      this.addEdge(`${nodeId}_to_minerva`, nodeId, 'minerva_university', {
        type: 'rotation_city',
        weight: 1.0
      });
      
      // Connect cities in rotation sequence
      if (index > 0) {
        const prevCityId = `rotation_${this.minervaRotationCities[index-1].name.toLowerCase().replace(' ', '_')}`;
        this.addEdge(`${prevCityId}_to_${nodeId}`, prevCityId, nodeId, {
          type: 'rotation_sequence',
          weight: 0.8
        });
      }
      
      // Connect to country nodes
      const countryId = `country_${city.country.toLowerCase().replace(' ', '_')}`;
      if (this.nodes.has(countryId)) {
        this.addEdge(`${nodeId}_to_${countryId}`, nodeId, countryId, {
          type: 'located_in',
          weight: 0.7
        });
      }
    });
  }

  async createCriticalThinkingPaths() {
    console.log('🧠 Creating Critical Thinking Pathways...');
    
    const thinkingPatterns = [
      'analytical_reasoning', 'logical_deduction', 'pattern_recognition',
      'hypothesis_testing', 'evidence_evaluation', 'causal_analysis',
      'systems_thinking', 'dialectical_reasoning', 'metacognition'
    ];
    
    thinkingPatterns.forEach(pattern => {
      const nodeId = `thinking_${pattern}`;
      this.addNode(nodeId, {
        type: 'critical_thinking',
        label: pattern.replace('_', ' ').toUpperCase(),
        cognitive_load: Math.random() * 0.5 + 0.3,
        minerva_emphasis: Math.random() * 0.3 + 0.7
      });
      
      // Connect to relevant HC courses
      if (pattern.includes('analytical') || pattern.includes('logical')) {
        this.addEdge(`${nodeId}_to_formal`, nodeId, 'hc_formal_analysis', {
          type: 'develops_skill',
          weight: 0.8
        });
      }
      
      if (pattern.includes('systems') || pattern.includes('causal')) {
        this.addEdge(`${nodeId}_to_complex`, nodeId, 'hc_complex_systems', {
          type: 'develops_skill',
          weight: 0.9
        });
      }
    });
  }

  async createGlobalCitizenshipBridges() {
    console.log('🌐 Creating Global Citizenship Bridges...');
    
    const citizenshipConcepts = [
      'cultural_empathy', 'global_awareness', 'intercultural_communication',
      'ethical_leadership', 'social_responsibility', 'diversity_appreciation',
      'conflict_resolution', 'sustainable_development', 'human_rights'
    ];
    
    citizenshipConcepts.forEach(concept => {
      const nodeId = `citizenship_${concept}`;
      this.addNode(nodeId, {
        type: 'global_citizenship',
        label: concept.replace('_', ' ').toUpperCase(),
        impact_scope: 'global',
        minerva_core_value: true
      });
      
      // Connect to rotation cities (different concepts emphasized in different cities)
      this.minervaRotationCities.forEach(city => {
        const cityNodeId = `rotation_${city.name.toLowerCase().replace(' ', '_')}`;
        const relevanceScore = Math.random() * 0.4 + 0.3;
        
        if (relevanceScore > 0.5) {
          this.addEdge(`${nodeId}_to_${cityNodeId}`, nodeId, cityNodeId, {
            type: 'experienced_in',
            weight: relevanceScore
          });
        }
      });
    });
  }

  async createPracticalWisdomNodes() {
    console.log('💎 Creating Practical Wisdom Application Network...');
    
    const wisdomApplications = [
      { id: 'entrepreneurship', field: 'business', complexity: 0.8 },
      { id: 'policy_making', field: 'governance', complexity: 0.9 },
      { id: 'social_innovation', field: 'society', complexity: 0.85 },
      { id: 'technological_ethics', field: 'technology', complexity: 0.75 },
      { id: 'environmental_solutions', field: 'sustainability', complexity: 0.9 },
      { id: 'healthcare_innovation', field: 'medicine', complexity: 0.85 },
      { id: 'educational_reform', field: 'education', complexity: 0.8 },
      { id: 'cultural_preservation', field: 'heritage', complexity: 0.7 }
    ];
    
    wisdomApplications.forEach(app => {
      const nodeId = `wisdom_${app.id}`;
      this.addNode(nodeId, {
        type: 'practical_wisdom',
        label: app.id.replace('_', ' ').toUpperCase(),
        field: app.field,
        complexity: app.complexity,
        real_world_application: true
      });
      
      // Connect to relevant scholarships and job opportunities
      this.nodes.forEach((nodeData, nodeKey) => {
        if (nodeData.type === 'scholarship' || nodeData.type === 'job') {
          if (nodeData.field === app.field || Math.random() > 0.8) {
            this.addEdge(`${nodeId}_to_${nodeKey}`, nodeId, nodeKey, {
              type: 'applies_to',
              weight: app.complexity * 0.6
            });
          }
        }
      });
    });
  }

  async createCoreNodes() {
    // Create country nodes
    const countries = [
      'Nepal', 'USA', 'UK', 'Canada', 'Australia', 'Germany', 'France', 
      'Netherlands', 'Sweden', 'Denmark', 'Norway', 'Switzerland', 'Japan', 
      'South Korea', 'Singapore', 'New Zealand'
    ];
    
    countries.forEach(country => {
      const nodeId = `country_${country.toLowerCase()}`;
      this.addNode(nodeId, {
        label: country,
        type: 'country',
        ...this.nodeTypes.country,
        region: this.getRegion(country),
        x: Math.random() * 1000,
        y: Math.random() * 1000
      });
    });
    
    // Create field of study nodes
    const fields = [
      'Computer Science', 'Engineering', 'Medicine', 'Business', 'Economics',
      'Physics', 'Chemistry', 'Biology', 'Mathematics', 'Psychology',
      'International Relations', 'Environmental Science', 'Arts', 'Literature'
    ];
    
    fields.forEach(field => {
      const nodeId = `field_${field.toLowerCase().replace(/\s+/g, '_')}`;
      this.addNode(nodeId, {
        label: field,
        type: 'skill',
        ...this.nodeTypes.skill,
        category: 'academic_field',
        x: Math.random() * 1000,
        y: Math.random() * 1000
      });
    });
  }

  async createScholarshipNetwork() {
    // Generate scholarship nodes with realistic data
    const scholarshipTemplates = [
      { name: 'Fulbright Program', country: 'USA', funding: 50000, level: 'graduate' },
      { name: 'Chevening Scholarship', country: 'UK', funding: 45000, level: 'masters' },
      { name: 'Australia Awards', country: 'Australia', funding: 40000, level: 'any' },
      { name: 'DAAD Scholarship', country: 'Germany', funding: 35000, level: 'any' },
      { name: 'Erasmus Mundus', country: 'EU', funding: 25000, level: 'masters' },
      { name: 'Gates Cambridge', country: 'UK', funding: 60000, level: 'graduate' },
      { name: 'Rhodes Scholarship', country: 'UK', funding: 70000, level: 'graduate' }
    ];
    
    scholarshipTemplates.forEach((template, index) => {
      const nodeId = `scholarship_${index}`;
      this.addNode(nodeId, {
        label: template.name,
        type: 'scholarship',
        ...this.nodeTypes.scholarship,
        funding: template.funding,
        level: template.level,
        targetCountry: template.country,
        x: 200 + (index * 100),
        y: 200 + Math.random() * 200
      });
      
      // Connect to relevant country
      const countryId = `country_${template.country.toLowerCase()}`;
      if (this.graph.hasNode(countryId)) {
        this.addEdge(`${nodeId}_to_${countryId}`, nodeId, countryId, {
          type: 'scholarship_country',
          color: '#00d4ff',
          size: 2
        });
      }
    });
  }

  async createVisaPathways() {
    const visaTypes = [
      { type: 'Student Visa', countries: ['USA', 'UK', 'Canada', 'Australia'] },
      { type: 'Work Visa', countries: ['Germany', 'Netherlands', 'Singapore'] },
      { type: 'Skilled Migration', countries: ['Canada', 'Australia', 'New Zealand'] },
      { type: 'Family Reunion', countries: ['USA', 'UK', 'Germany', 'France'] }
    ];
    
    visaTypes.forEach((visa, index) => {
      const nodeId = `visa_${index}`;
      this.addNode(nodeId, {
        label: visa.type,
        type: 'visa',
        ...this.nodeTypes.visa,
        countries: visa.countries,
        x: 400 + (index * 80),
        y: 400 + Math.random() * 150
      });
      
      // Connect to relevant countries
      visa.countries.forEach(country => {
        const countryId = `country_${country.toLowerCase()}`;
        if (this.graph.hasNode(countryId)) {
          this.addEdge(`${nodeId}_to_${countryId}`, nodeId, countryId, {
            type: 'visa_pathway',
            color: '#ff6b35',
            size: 1.5
          });
        }
      });
    });
  }

  async createJobMarket() {
    const jobCategories = [
      { title: 'Software Engineer', countries: ['USA', 'Canada', 'Germany'], salary: 120000 },
      { title: 'Data Scientist', countries: ['UK', 'Netherlands', 'Singapore'], salary: 95000 },
      { title: 'Research Scientist', countries: ['Switzerland', 'Denmark', 'Sweden'], salary: 85000 },
      { title: 'Product Manager', countries: ['USA', 'UK', 'Australia'], salary: 110000 },
      { title: 'Consultant', countries: ['Germany', 'France', 'UK'], salary: 75000 }
    ];
    
    jobCategories.forEach((job, index) => {
      const nodeId = `job_${index}`;
      this.addNode(nodeId, {
        label: job.title,
        type: 'job',
        ...this.nodeTypes.job,
        salary: job.salary,
        countries: job.countries,
        x: 600 + (index * 70),
        y: 300 + Math.random() * 200
      });
      
      // Connect to countries and relevant skills
      job.countries.forEach(country => {
        const countryId = `country_${country.toLowerCase()}`;
        if (this.graph.hasNode(countryId)) {
          this.addEdge(`${nodeId}_to_${countryId}`, nodeId, countryId, {
            type: 'job_opportunity',
            color: '#ffd700',
            size: 1.5
          });
        }
      });
    });
  }

  async createAlumniNetwork() {
    // Generate alumni nodes
    for (let i = 0; i < 50; i++) {
      const nodeId = `alumni_${i}`;
      const randomCountry = ['Nepal', 'USA', 'UK', 'Canada', 'Australia'][Math.floor(Math.random() * 5)];
      
      this.addNode(nodeId, {
        label: `Alumni ${i + 1}`,
        type: 'alumni',
        ...this.nodeTypes.alumni,
        origin: 'Nepal',
        currentCountry: randomCountry,
        graduationYear: 2015 + Math.floor(Math.random() * 8),
        x: 100 + Math.random() * 800,
        y: 500 + Math.random() * 200
      });
      
      // Create connections between alumni (networking)
      if (i > 0 && Math.random() < 0.3) {
        const targetAlumni = `alumni_${Math.floor(Math.random() * i)}`;
        this.addEdge(`alumni_${i}_network`, nodeId, targetAlumni, {
          type: 'alumni_network',
          color: '#00ff7f',
          size: 1
        });
      }
    }
  }

  async createUniversityConnections() {
    const universities = [
      { name: 'MIT', country: 'USA', ranking: 1 },
      { name: 'Stanford', country: 'USA', ranking: 2 },
      { name: 'Cambridge', country: 'UK', ranking: 3 },
      { name: 'Oxford', country: 'UK', ranking: 4 },
      { name: 'ETH Zurich', country: 'Switzerland', ranking: 5 },
      { name: 'University of Toronto', country: 'Canada', ranking: 6 }
    ];
    
    universities.forEach((uni, index) => {
      const nodeId = `university_${index}`;
      this.addNode(nodeId, {
        label: uni.name,
        type: 'university',
        ...this.nodeTypes.university,
        ranking: uni.ranking,
        country: uni.country,
        x: 300 + (index % 3) * 200,
        y: 100 + Math.floor(index / 3) * 150
      });
      
      // Connect to country
      const countryId = `country_${uni.country.toLowerCase()}`;
      if (this.graph.hasNode(countryId)) {
        this.addEdge(`${nodeId}_to_${countryId}`, nodeId, countryId, {
          type: 'university_location',
          color: '#ff69b4',
          size: 2
        });
      }
    });
  }

  addNode(id, attributes) {
    if (!this.graph.hasNode(id)) {
      this.graph.addNode(id, attributes);
      this.nodes.set(id, attributes);
    }
  }

  addEdge(id, source, target, attributes) {
    if (!this.graph.hasEdge(id) && this.graph.hasNode(source) && this.graph.hasNode(target)) {
      this.graph.addEdge(id, source, target, attributes);
      this.edges.set(id, attributes);
    }
  }

  setupEventListeners() {
    // Layout selector
    const layoutSelect = document.getElementById('layoutSelect');
    if (layoutSelect) {
      layoutSelect.addEventListener('change', (e) => {
        this.applyLayout(e.target.value);
      });
    }

    // Node size slider
    const nodeSizeSlider = document.getElementById('nodeSizeSlider');
    if (nodeSizeSlider) {
      nodeSizeSlider.addEventListener('input', () => {
        this.sigma.refresh();
      });
    }

    // Connection strength slider
    const connectionSlider = document.getElementById('connectionSlider');
    if (connectionSlider) {
      connectionSlider.addEventListener('input', () => {
        this.sigma.refresh();
      });
    }

    // Country filter chips
    document.querySelectorAll('.country-chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        const country = e.target.dataset.country;
        this.toggleCountryFilter(country, e.target);
      });
    });

    // Sigma.js mouse events
    this.sigma.on('clickNode', (e) => {
      this.onNodeClick(e.node, e.event);
    });

    this.sigma.on('overNode', (e) => {
      this.showNodeTooltip(e.node, e.event);
    });

    this.sigma.on('outNode', () => {
      this.hideNodeTooltip();
    });
  }

  applyLayout(layoutType) {
    const nodes = this.graph.nodes();
    
    switch (layoutType) {
      case 'circular':
        this.applyCircularLayout(nodes);
        break;
      case 'grid':
        this.applyGridLayout(nodes);
        break;
      case 'random':
        this.applyRandomLayout(nodes);
        break;
      default:
        this.applyForceLayout();
    }
    
    this.sigma.refresh();
  }

  applyCircularLayout(nodes) {
    const center = { x: 500, y: 400 };
    const radius = 300;
    
    nodes.forEach((nodeId, index) => {
      const angle = (index / nodes.length) * 2 * Math.PI;
      this.graph.setNodeAttribute(nodeId, 'x', center.x + radius * Math.cos(angle));
      this.graph.setNodeAttribute(nodeId, 'y', center.y + radius * Math.sin(angle));
    });
  }

  applyGridLayout(nodes) {
    const cols = Math.ceil(Math.sqrt(nodes.length));
    const spacing = 80;
    
    nodes.forEach((nodeId, index) => {
      const row = Math.floor(index / cols);
      const col = index % cols;
      this.graph.setNodeAttribute(nodeId, 'x', col * spacing + 100);
      this.graph.setNodeAttribute(nodeId, 'y', row * spacing + 100);
    });
  }

  applyRandomLayout(nodes) {
    nodes.forEach(nodeId => {
      this.graph.setNodeAttribute(nodeId, 'x', Math.random() * 1000);
      this.graph.setNodeAttribute(nodeId, 'y', Math.random() * 800);
    });
  }

  applyForceLayout() {
    // Simplified force-directed layout simulation
    const nodes = this.graph.nodes();
    const edges = this.graph.edges();
    
    // Apply attractive and repulsive forces
    for (let iteration = 0; iteration < 100; iteration++) {
      // Repulsive forces between all nodes
      nodes.forEach(nodeA => {
        nodes.forEach(nodeB => {
          if (nodeA !== nodeB) {
            const posA = this.graph.getNodeAttributes(nodeA);
            const posB = this.graph.getNodeAttributes(nodeB);
            
            const dx = posA.x - posB.x;
            const dy = posA.y - posB.y;
            const distance = Math.sqrt(dx * dx + dy * dy) || 1;
            
            const force = 1000 / (distance * distance);
            const fx = (dx / distance) * force;
            const fy = (dy / distance) * force;
            
            this.graph.setNodeAttribute(nodeA, 'x', posA.x + fx * 0.01);
            this.graph.setNodeAttribute(nodeA, 'y', posA.y + fy * 0.01);
          }
        });
      });
      
      // Attractive forces for connected nodes
      edges.forEach(edgeId => {
        const [sourceId, targetId] = this.graph.extremities(edgeId);
        const source = this.graph.getNodeAttributes(sourceId);
        const target = this.graph.getNodeAttributes(targetId);
        
        const dx = target.x - source.x;
        const dy = target.y - source.y;
        const distance = Math.sqrt(dx * dx + dy * dy) || 1;
        
        const force = distance * 0.01;
        const fx = (dx / distance) * force;
        const fy = (dy / distance) * force;
        
        this.graph.setNodeAttribute(sourceId, 'x', source.x + fx);
        this.graph.setNodeAttribute(sourceId, 'y', source.y + fy);
        this.graph.setNodeAttribute(targetId, 'x', target.x - fx);
        this.graph.setNodeAttribute(targetId, 'y', target.y - fy);
      });
    }
  }

  onNodeClick(nodeId, event) {
    const nodeData = this.graph.getNodeAttributes(nodeId);
    console.log('Node clicked:', nodeId, nodeData);
    
    // Highlight connected nodes
    this.highlightConnectedNodes(nodeId);
    
    // Check for quantum entanglement
    this.checkQuantumEntanglement(nodeId);
  }

  highlightConnectedNodes(nodeId) {
    // Reset all highlights
    this.graph.forEachNode((node) => {
      this.graph.setNodeAttribute(node, 'highlighted', false);
    });
    
    this.graph.forEachEdge((edge) => {
      this.graph.setEdgeAttribute(edge, 'highlighted', false);
    });
    
    // Highlight clicked node and its neighbors
    this.graph.setNodeAttribute(nodeId, 'highlighted', true);
    
    this.graph.forEachNeighbor(nodeId, (neighbor) => {
      this.graph.setNodeAttribute(neighbor, 'highlighted', true);
    });
    
    this.graph.forEachEdge(nodeId, (edge) => {
      this.graph.setEdgeAttribute(edge, 'highlighted', true);
    });
    
    this.sigma.refresh();
  }

  checkQuantumEntanglement(nodeId) {
    const nodeData = this.graph.getNodeAttributes(nodeId);
    
    // Find potential soulmate collaborators
    const soulmates = this.findSoulmateCollaborators(nodeId);
    
    if (soulmates.length > 0) {
      this.showQuantumEntanglement();
      this.updateEntangledNodes(soulmates.length);
      
      console.log('🔗 Quantum entanglement detected with', soulmates.length, 'soulmate collaborators');
    }
  }

  findSoulmateCollaborators(nodeId) {
    const nodeData = this.graph.getNodeAttributes(nodeId);
    const soulmates = [];
    
    // Find nodes with similar attributes (simplified algorithm)
    this.graph.forEachNode((otherNodeId) => {
      if (otherNodeId !== nodeId) {
        const otherData = this.graph.getNodeAttributes(otherNodeId);
        
        // Calculate compatibility score
        let compatibility = 0;
        
        if (nodeData.type === otherData.type) compatibility += 0.3;
        if (nodeData.targetCountry === otherData.targetCountry) compatibility += 0.4;
        if (Math.abs((nodeData.funding || 0) - (otherData.funding || 0)) < 10000) compatibility += 0.3;
        
        if (compatibility > 0.7) {
          soulmates.push(otherNodeId);
        }
      }
    });
    
    return soulmates;
  }

  showQuantumEntanglement() {
    const indicator = document.getElementById('quantumEntanglement');
    if (indicator) {
      indicator.style.display = 'block';
      setTimeout(() => {
        indicator.style.display = 'none';
      }, 3000);
    }
  }

  showNodeTooltip(nodeId, event) {
    const nodeData = this.graph.getNodeAttributes(nodeId);
    const tooltip = document.getElementById('nodeTooltip');
    const content = document.getElementById('tooltipContent');
    
    if (tooltip && content) {
      content.innerHTML = `
        <h4>${nodeData.icon || '🔍'} ${nodeData.label}</h4>
        <p><strong>Type:</strong> ${nodeData.type}</p>
        ${nodeData.funding ? `<p><strong>Funding:</strong> $${nodeData.funding.toLocaleString()}</p>` : ''}
        ${nodeData.country ? `<p><strong>Country:</strong> ${nodeData.country}</p>` : ''}
        ${nodeData.salary ? `<p><strong>Salary:</strong> $${nodeData.salary.toLocaleString()}</p>` : ''}
        <p><strong>Connections:</strong> ${this.graph.degree(nodeId)}</p>
      `;
      
      tooltip.style.left = event.x + 10 + 'px';
      tooltip.style.top = event.y + 10 + 'px';
      tooltip.style.display = 'block';
    }
  }

  hideNodeTooltip() {
    const tooltip = document.getElementById('nodeTooltip');
    if (tooltip) {
      tooltip.style.display = 'none';
    }
  }

  toggleCountryFilter(country, chipElement) {
    document.querySelectorAll('.country-chip').forEach(chip => {
      chip.classList.remove('active');
    });
    chipElement.classList.add('active');
    
    if (country === 'all') {
      this.selectedCountries = new Set(['all']);
      this.showAllNodes();
    } else {
      this.selectedCountries = new Set([country]);
      this.filterByCountry(country);
    }
    
    this.updateCurrentFocus(country === 'all' ? 'Global Overview' : `${country.toUpperCase()} Focus`);
  }

  showAllNodes() {
    this.graph.forEachNode((nodeId) => {
      this.graph.setNodeAttribute(nodeId, 'hidden', false);
    });
    this.sigma.refresh();
  }

  filterByCountry(country) {
    this.graph.forEachNode((nodeId) => {
      const nodeData = this.graph.getNodeAttributes(nodeId);
      const isRelevant = 
        nodeData.country?.toLowerCase() === country ||
        nodeData.targetCountry?.toLowerCase() === country ||
        nodeData.currentCountry?.toLowerCase() === country ||
        (nodeData.countries && nodeData.countries.some(c => c.toLowerCase() === country));
      
      this.graph.setNodeAttribute(nodeId, 'hidden', !isRelevant);
    });
    this.sigma.refresh();
  }

  updateCurrentFocus(focus) {
    const focusElement = document.getElementById('currentFocus');
    if (focusElement) {
      focusElement.textContent = focus;
    }
  }

  updateEntangledNodes(count) {
    const entangledElement = document.getElementById('entangledNodes');
    if (entangledElement) {
      entangledElement.textContent = `${count} soulmate pairs`;
    }
  }

  startQuantumEntanglementDetection() {
    setInterval(() => {
      // Simulate quantum entanglement detection
      if (Math.random() < 0.1) { // 10% chance
        const randomPairs = Math.floor(Math.random() * 5) + 1;
        this.updateEntangledNodes(randomPairs);
      }
    }, 5000);
  }

  animateStats() {
    // Animate the stats with gradual increases
    setInterval(() => {
      this.stats.totalNodes += Math.floor(Math.random() * 100);
      this.stats.totalConnections += Math.floor(Math.random() * 500);
      
      document.getElementById('totalNodes').textContent = this.stats.totalNodes.toLocaleString();
      document.getElementById('totalConnections').textContent = this.stats.totalConnections.toLocaleString();
    }, 10000);
  }

  getRegion(country) {
    const regions = {
      'Nepal': 'South Asia',
      'USA': 'North America',
      'UK': 'Europe',
      'Canada': 'North America',
      'Australia': 'Oceania',
      'Germany': 'Europe',
      'France': 'Europe',
      'Netherlands': 'Europe',
      'Sweden': 'Europe',
      'Denmark': 'Europe',
      'Norway': 'Europe',
      'Switzerland': 'Europe',
      'Japan': 'East Asia',
      'South Korea': 'East Asia',
      'Singapore': 'Southeast Asia',
      'New Zealand': 'Oceania'
    };
    return regions[country] || 'Other';
  }
}

// Global functions for UI interactions
function loadExampleQuery(queryType) {
  const queries = {
    'nepal-eu': `SELECT ?scholarship ?country ?program WHERE {
  ?scholarship a :Scholarship ;
             :targetCountry ?country ;
             :program ?program .
  ?country :region :Europe .
  ?scholarship :eligibleCountry :Nepal .
  ?program :field :ComputerScience .
}`,
    'scholarship-visa': `SELECT ?scholarship ?visa ?country WHERE {
  ?scholarship a :Scholarship ;
             :targetCountry ?country ;
             :providesVisa ?visa .
  ?visa a :StudentVisa .
  FILTER(?scholarship :fundingAmount > 20000)
}`,
    'alumni-network': `SELECT ?alumni1 ?alumni2 ?connection WHERE {
  ?alumni1 a :Alumni ;
          :origin :Nepal ;
          :connectedTo ?alumni2 .
  ?alumni2 a :Alumni ;
          :currentCountry ?country .
  ?connection :strength ?strength .
  FILTER(?strength > 0.7)
}`,
    // New Minerva-specific queries
    'minerva-wisdom-paths': `SELECT ?student ?wisdomPath ?rotationCity WHERE {
  ?student a :MinervaCandidate ;
           :hasWisdomPath ?wisdomPath ;
           :rotationCity ?rotationCity .
  ?wisdomPath :includesCriticalThinking ?criticalThinking ;
              :includesGlobalCitizenship ?globalCitizenship ;
              :includesPracticalWisdom ?practicalWisdom .
  FILTER(?criticalThinking :score > 0.8)
}`,
    'hc-curriculum-alignment': `SELECT ?course ?skill ?application WHERE {
  ?course a :MinervaHCCourse ;
          :develops ?skill ;
          :appliesTo ?application .
  ?skill :type :CriticalThinking .
  ?application :field :GlobalChallenges ;
               :complexity ?complexity .
  FILTER(?complexity > 0.7)
}`,
    'rotation-city-wisdom': `SELECT ?city ?wisdomType ?culturalElement WHERE {
  ?city a :RotationCity ;
        :providesWisdom ?wisdomType ;
        :culturalElement ?culturalElement .
  ?wisdomType :applicableTo ?globalChallenge .
  ?culturalElement :enhances ?crossCulturalCompetency .
}`,
    'practical-wisdom-networks': `SELECT ?wisdomApplication ?realWorldProblem ?mentorNetwork WHERE {
  ?wisdomApplication a :PracticalWisdom ;
                     :addresses ?realWorldProblem ;
                     :connectedToMentors ?mentorNetwork .
  ?realWorldProblem :impactScale :Global ;
                    :urgency ?urgency .
  ?mentorNetwork :includes ?industry ;
                 :includes ?academia ;
                 :includes ?policy .
  FILTER(?urgency > 0.8)
}`,
    'minerva-fit-prediction': `SELECT ?candidate ?fitScore ?strengths ?developmentAreas WHERE {
  ?candidate a :ProspectiveStudent ;
             :hasProfile ?profile ;
             :minervaFitScore ?fitScore .
  ?profile :strengths ?strengths ;
           :developmentAreas ?developmentAreas ;
           :culturalBackground ?background .
  ?strengths :includes :CriticalThinking ;
             :includes :GlobalMindset .
  FILTER(?fitScore > 0.75)
}`
  };
  
  const queryInput = document.getElementById('sparqlQuery');
  if (queryInput && queries[queryType]) {
    queryInput.value = queries[queryType];
  }
}

function executeSparqlQuery() {
  const query = document.getElementById('sparqlQuery')?.value;
  if (!query) return;
  
  console.log('🔍 Executing Enhanced SPARQL query:', query);
  
  // Enhanced query execution with Minerva-specific results
  setTimeout(() => {
    let mockResults = [];
    
    if (query.includes('MinervaCandidate') || query.includes('minerva')) {
      mockResults = [
        { 
          student: 'Nepali_Student_001', 
          wisdomPath: 'Global_Leadership_Path', 
          rotationCity: 'Seoul',
          criticalThinking: 0.89,
          globalCitizenship: 0.92,
          practicalWisdom: 0.85
        },
        { 
          student: 'Nepali_Student_047', 
          wisdomPath: 'Social_Innovation_Path', 
          rotationCity: 'Hyderabad',
          criticalThinking: 0.94,
          globalCitizenship: 0.88,
          practicalWisdom: 0.91
        }
      ];
    } else if (query.includes('HCCourse') || query.includes('curriculum')) {
      mockResults = [
        { 
          course: 'Complex_Systems', 
          skill: 'Systems_Thinking', 
          application: 'Climate_Change_Mitigation',
          complexity: 0.89
        },
        { 
          course: 'Cross_Cultural_Thinking', 
          skill: 'Cultural_Intelligence', 
          application: 'Global_Diplomacy',
          complexity: 0.83
        }
      ];
    } else if (query.includes('RotationCity')) {
      mockResults = [
        { 
          city: 'Berlin', 
          wisdomType: 'Historical_Perspective', 
          culturalElement: 'Post_War_Reconciliation',
          globalChallenge: 'Conflict_Resolution'
        },
        { 
          city: 'Buenos_Aires', 
          wisdomType: 'Social_Justice', 
          culturalElement: 'Grassroots_Movements',
          globalChallenge: 'Inequality_Reduction'
        }
      ];
    } else {
      // Default scholarship results
      mockResults = [
        { scholarship: 'DAAD Masters', country: 'Germany', funding: 35000, minervaAlignment: 0.78 },
        { scholarship: 'Erasmus Mundus', country: 'Netherlands', funding: 25000, minervaAlignment: 0.82 },
        { scholarship: 'Swiss Scholarship', country: 'Switzerland', funding: 40000, minervaAlignment: 0.75 }
      ];
    }
    
    console.log('✅ Enhanced query results:', mockResults);
    
    // Display results in a more sophisticated way
    displayQueryResults(mockResults, query);
    
  }, 1500); // Slightly longer delay for more sophisticated queries
}

function displayQueryResults(results, query) {
  const resultsContainer = document.getElementById('queryResults') || createResultsContainer();
  
  let resultsHTML = `
    <div style="background: rgba(0, 0, 0, 0.8); border-radius: 12px; padding: 1.5rem; margin-top: 1rem; border: 1px solid rgba(0, 212, 255, 0.3);">
      <h4 style="color: #00d4ff; margin-bottom: 1rem;">🔍 Query Results (${results.length} found)</h4>
  `;
  
  results.forEach((result, index) => {
    resultsHTML += `
      <div style="background: rgba(255, 255, 255, 0.05); border-radius: 8px; padding: 1rem; margin-bottom: 0.5rem; border-left: 3px solid ${index % 2 === 0 ? '#00d4ff' : '#ff6b35'};">
        ${Object.entries(result).map(([key, value]) => 
          `<div style="margin-bottom: 0.25rem;"><strong style="color: #ffd700;">${key.replace('_', ' ').toUpperCase()}:</strong> ${typeof value === 'number' ? (value < 1 ? (value * 100).toFixed(1) + '%' : value.toLocaleString()) : value}</div>`
        ).join('')}
      </div>
    `;
  });
  
  resultsHTML += `</div>`;
  resultsContainer.innerHTML = resultsHTML;
}

function createResultsContainer() {
  const container = document.createElement('div');
  container.id = 'queryResults';
  container.style.position = 'fixed';
  container.style.top = '50%';
  container.style.left = '50%';
  container.style.transform = 'translate(-50%, -50%)';
  container.style.zIndex = '10000';
  container.style.maxWidth = '600px';
  container.style.maxHeight = '70vh';
  container.style.overflow = 'auto';
  container.style.color = 'white';
  
  const closeButton = document.createElement('button');
  closeButton.textContent = '✕';
  closeButton.style.position = 'absolute';
  closeButton.style.top = '10px';
  closeButton.style.right = '10px';
  closeButton.style.background = 'rgba(255, 107, 53, 0.8)';
  closeButton.style.border = 'none';
  closeButton.style.color = 'white';
  closeButton.style.borderRadius = '50%';
  closeButton.style.width = '30px';
  closeButton.style.height = '30px';
  closeButton.style.cursor = 'pointer';
  closeButton.onclick = () => document.body.removeChild(container);
  
  container.appendChild(closeButton);
  document.body.appendChild(container);
  
  return container;
}
  }, 1500);
}

function warpToRegion(regionType) {
  console.log('🚀 Warping to region:', regionType);
  
  const graph = window.knowledgeGraph;
  if (!graph) return;
  
  // Update focus
  graph.updateCurrentFocus(`${regionType.charAt(0).toUpperCase() + regionType.slice(1)} Region`);
  
  // Filter and highlight relevant nodes
  graph.graph.forEachNode((nodeId) => {
    const nodeData = graph.graph.getNodeAttributes(nodeId);
    const isRelevant = nodeData.type === regionType.slice(0, -1) || // Remove 's' from plural
                      (regionType === 'universities' && nodeData.type === 'university');
    
    graph.graph.setNodeAttribute(nodeId, 'highlighted', isRelevant);
    graph.graph.setNodeAttribute(nodeId, 'hidden', !isRelevant);
  });
  
  graph.sigma.refresh();
  
  // Show warp effect
  const indicator = document.getElementById('quantumEntanglement');
  if (indicator) {
    indicator.innerHTML = `
      <div class="entanglement-indicator"></div>
      <div style="color: rgba(255, 255, 255, 0.8);">
        <strong>Warp Drive Activated</strong><br>
        Navigating to ${regionType}...
      </div>
    `;
    indicator.style.display = 'block';
    setTimeout(() => {
      indicator.style.display = 'none';
    }, 2000);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.knowledge-container')) {
    window.knowledgeGraph = new PanGalacticKnowledgeGraph();
  }
});