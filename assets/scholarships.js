// Scholarship filtering system
class ScholarshipFilter {
  constructor() {
    this.data = [];
    this.filteredData = [];
    this.elements = {
      tbody: document.querySelector('#schTable tbody'),
      searchInput: document.getElementById('q'),
      countrySelect: document.getElementById('country'),
      levelSelect: document.getElementById('level'),
      fullFundedCheckbox: document.getElementById('full'),
      resultsNote: document.getElementById('resultsNote')
    };
    
    this.init();
  }

  async init() {
    try {
      await this.loadData();
      this.setupFilters();
      this.populateCountryOptions();
      this.render();
      this.bindEvents();
    } catch (error) {
      console.error('Failed to initialize scholarship filter:', error);
      this.showError();
    }
  }

  async loadData() {
    try {
      const response = await fetch('assets/data/scholarships-demo.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      this.data = await response.json();
      this.filteredData = [...this.data];
    } catch (error) {
      console.warn('Failed to load external data, using fallback data');
      // Fallback data in case the JSON file fails to load
      this.data = [
        { name: 'Eiffel Excellence Scholarship', country: 'France', level: "Master's", funding: 'Fully funded ($1,200/month + tuition)', deadline: 'Jan 8, 2025', url: 'https://www.campusfrance.org/en/eiffel-scholarship-program-of-excellence' },
        { name: 'DAAD Development-Related Postgraduate Courses (EPOS)', country: 'Germany', level: "Master's", funding: 'Fully funded (€850/month + tuition)', deadline: 'Aug 31, 2025', url: 'https://www.daad.de/en/study-and-research-in-germany/scholarships/epos/' },
        { name: 'Korean Government Scholarship Program (KGSP)', country: 'South Korea', level: "Bachelor's / Master's / PhD", funding: 'Fully funded (1.3M KRW/month + tuition)', deadline: 'Mar 31, 2025', url: 'https://www.studyinkorea.go.kr/en/sub/gks/allnew_invite.do' }
      ];
      this.filteredData = [...this.data];
    }
  }

  setupFilters() {
    // Ensure all filter elements exist
    if (!this.elements.tbody || !this.elements.searchInput || !this.elements.countrySelect || 
        !this.elements.levelSelect || !this.elements.fullFundedCheckbox || !this.elements.resultsNote) {
      throw new Error('Required filter elements not found');
    }
  }

  populateCountryOptions() {
    // Get unique countries and sort them
    const countries = [...new Set(this.data.map(item => item.country))].sort();
    
    // Clear existing options (except the first "All countries" option)
    while (this.elements.countrySelect.children.length > 1) {
      this.elements.countrySelect.removeChild(this.elements.countrySelect.lastChild);
    }
    
    // Add country options
    countries.forEach(country => {
      const option = document.createElement('option');
      option.value = country;
      option.textContent = country;
      this.elements.countrySelect.appendChild(option);
    });
  }

  matches(item) {
    const searchTerm = (this.elements.searchInput.value || '').toLowerCase().trim();
    const selectedCountry = this.elements.countrySelect.value;
    const selectedLevel = this.elements.levelSelect.value;
    const fullFundedOnly = this.elements.fullFundedCheckbox.checked;

    // Text search in name and country
    const textMatch = !searchTerm || 
      item.name.toLowerCase().includes(searchTerm) || 
      item.country.toLowerCase().includes(searchTerm);

    // Country filter
    const countryMatch = !selectedCountry || item.country === selectedCountry;

    // Level filter  
    const levelMatch = !selectedLevel || item.level.includes(selectedLevel);

    // Funding filter
    const fundingMatch = !fullFundedOnly || item.funding.toLowerCase().includes('fully');

    return textMatch && countryMatch && levelMatch && fundingMatch;
  }

  render() {
    this.filteredData = this.data.filter(item => this.matches(item));
    
    const rows = this.filteredData.map(item => `
      <tr>
        <td>
          <a href="${this.escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer">
            ${this.escapeHtml(item.name)}
          </a>
        </td>
        <td>${this.escapeHtml(item.country)}</td>
        <td>${this.escapeHtml(item.level)}</td>
        <td><span class="badge">${this.escapeHtml(item.funding)}</span></td>
        <td>${this.escapeHtml(item.deadline)}</td>
      </tr>
    `).join('');

    this.elements.tbody.innerHTML = rows;
    
    // Update results note
    const count = this.filteredData.length;
    this.elements.resultsNote.textContent = `${count} result${count === 1 ? '' : 's'} shown`;
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  showError() {
    if (this.elements.tbody) {
      this.elements.tbody.innerHTML = `
        <tr>
          <td colspan="5" style="text-align: center; color: var(--muted); padding: 2rem;">
            Failed to load scholarship data. Please refresh the page or try again later.
          </td>
        </tr>
      `;
    }
    if (this.elements.resultsNote) {
      this.elements.resultsNote.textContent = 'Error loading data';
    }
  }

  bindEvents() {
    // Debounced search input
    let searchTimeout;
    this.elements.searchInput.addEventListener('input', () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => this.render(), 300);
    });

    // Immediate response for selects and checkbox
    this.elements.countrySelect.addEventListener('change', () => this.render());
    this.elements.levelSelect.addEventListener('change', () => this.render());
    this.elements.fullFundedCheckbox.addEventListener('change', () => this.render());
  }
}

// Initialize the scholarship filter when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Only initialize if we're on the scholarships page
  if (document.getElementById('schTable')) {
    new ScholarshipFilter();
  }
});