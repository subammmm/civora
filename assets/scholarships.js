// Scholarship filtering and display functionality
class ScholarshipTable {
  constructor(data) {
    this.data = data;
    this.tbody = document.querySelector('#schTable tbody');
    this.searchInput = document.getElementById('q');
    this.countrySelect = document.getElementById('country');
    this.levelSelect = document.getElementById('level');
    this.fullFundedCheckbox = document.getElementById('full');
    this.resultsNote = document.getElementById('resultsNote');
    
    this.init();
  }

  init() {
    this.populateCountryOptions();
    this.attachEventListeners();
    this.render();
  }

  populateCountryOptions() {
    const countries = Array.from(new Set(this.data.map(d => d.country))).sort();
    countries.forEach(country => {
      const option = document.createElement('option');
      option.textContent = country;
      option.value = country;
      this.countrySelect.appendChild(option);
    });
  }

  matches(scholarship) {
    const searchTerm = (this.searchInput.value || '').toLowerCase().trim();
    const textMatch = !searchTerm || 
      scholarship.name.toLowerCase().includes(searchTerm) || 
      scholarship.country.toLowerCase().includes(searchTerm);
    
    const countryMatch = !this.countrySelect.value || 
      scholarship.country === this.countrySelect.value;
    
    const levelMatch = !this.levelSelect.value || 
      scholarship.level.includes(this.levelSelect.value);
    
    const fundingMatch = !this.fullFundedCheckbox.checked || 
      scholarship.funding.toLowerCase().includes('fully');
    
    return textMatch && countryMatch && levelMatch && fundingMatch;
  }

  render() {
    const filteredData = this.data.filter(scholarship => this.matches(scholarship));
    
    this.tbody.innerHTML = filteredData.map(scholarship => `
      <tr>
        <td>
          <a href="${scholarship.url}" target="_blank" rel="noopener">${scholarship.name}</a>
        </td>
        <td>${scholarship.country}</td>
        <td>${scholarship.level}</td>
        <td><span class="badge">${scholarship.funding}</span></td>
        <td>${scholarship.deadline}</td>
      </tr>
    `).join('');
    
    this.updateResultsNote(filteredData.length);
  }

  updateResultsNote(count) {
    this.resultsNote.textContent = `${count} result${count === 1 ? '' : 's'} shown`;
  }

  attachEventListeners() {
    this.searchInput.addEventListener('input', () => this.render());
    this.countrySelect.addEventListener('change', () => this.render());
    this.levelSelect.addEventListener('change', () => this.render());
    this.fullFundedCheckbox.addEventListener('change', () => this.render());
  }
}

// Initialize scholarship table when DOM is loaded
async function initScholarshipTable() {
  try {
    const response = await fetch('/assets/data/scholarships-demo.json');
    const data = await response.json();
    new ScholarshipTable(data);
  } catch (error) {
    console.error('Failed to load scholarship data:', error);
    // Fallback to inline data if JSON fails to load
    initInlineScholarshipTable();
  }
}

// Fallback function with inline data
function initInlineScholarshipTable() {
  const data = [
    { name: 'Eiffel Excellence Scholarship', country: 'France', level: "Master's", funding: 'Fully funded', deadline: 'Jan 10', url: 'https://www.campusfrance.org/en/eiffel-scholarship-program-of-excellence' },
    { name: 'DAAD Development-Related Postgraduate Courses (EPOS)', country: 'Germany', level: "Master's", funding: 'Fully funded', deadline: 'Aug-Sep (varies)', url: 'https://www.daad.de/en/study-and-research-in-germany/scholarships/epos/' },
    { name: 'Erasmus Mundus Joint Masters', country: 'EU', level: "Master's", funding: 'Fully funded', deadline: 'Dec–Jan (varies)', url: 'https://www.eacea.ec.europa.eu/scholarships/erasmus-mundus-join-master-degrees_en' },
    { name: 'Chevening Scholarships', country: 'UK', level: "Master's", funding: 'Fully funded', deadline: 'Nov (annual)', url: 'https://www.chevening.org/scholarships/' },
    { name: 'MEXT (Monbukagakusho) Scholarship', country: 'Japan', level: "Bachelor's / Master's / PhD", funding: 'Fully funded', deadline: 'Apr–May (varies)', url: 'https://www.studyinjapan.go.jp/en/planning/scholarship/' },
    { name: 'Fulbright Foreign Student Program (Nepal)', country: 'USA', level: "Master's", funding: 'Fully funded', deadline: 'Varies', url: 'https://foreign.fulbrightonline.org/about/foreign-fulbright' },
    { name: 'Australia Awards Scholarships', country: 'Australia', level: "Master's", funding: 'Fully funded', deadline: 'Feb–Apr', url: 'https://www.dfat.gov.au/people-to-people/australia-awards/scholarships' },
    { name: 'Swiss Government Excellence Scholarships', country: 'Switzerland', level: 'PhD', funding: 'Fully funded', deadline: 'Sep–Dec (varies)', url: 'https://www.sbfi.admin.ch/sbfi/en/home/education/scholarships-and-grants/swiss-government-excellence-scholarships.html' },
    { name: 'Stipendium Hungaricum', country: 'Hungary', level: "Bachelor's / Master's", funding: 'Fully funded', deadline: 'Jan', url: 'https://stipendiumhungaricum.hu/' },
    { name: 'ANSO Scholarship for Young Talents', country: 'China', level: "Master's / PhD", funding: 'Fully funded', deadline: 'Feb', url: 'https://www.anso.org.cn/programmes/talent/scholarship/' },
    { name: 'ADB–Japan Scholarship Program (ADB–JSP)', country: 'Asia-Pacific', level: "Master's", funding: 'Fully funded', deadline: 'Varies', url: 'https://www.adb.org/work-with-us/careers/japan-scholarship-program' }
  ];
  
  new ScholarshipTable(data);
}

// Auto-initialize if on scholarships page
if (window.location.pathname.includes('scholarships.html') || 
    document.getElementById('schTable')) {
  document.addEventListener('DOMContentLoaded', initScholarshipTable);
}