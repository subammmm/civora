export const metadata = {
  title: 'Scholarships Database',
  description: 'Discover and compare scholarships tailored for Nepali students worldwide.',
}

export default function ScholarshipsPage() {
  return (
    <div dangerouslySetInnerHTML={{ __html: `      
      <section className="section" style="padding: 2rem 0;">
        <div className="container">
          <div className="card" style="margin-bottom: 2rem;">
            <h1 data-i18n="sch.title"><i className="fas fa-search icon-left" aria-hidden="true"></i>Filter Scholarships</h1>
            <p className="subtext" data-i18n="sch.demo_intro">Find the perfect scholarship by filtering by country, level, field, and deadline.</p>
            
            
            <div className="filter-section" style="margin-top: 2rem;">
              <select className="filter-select" id="country-filter">
                <option value=""><i className="fas fa-globe" aria-hidden="true"></i> All Countries</option>
                <option value="usa">United States</option>
                <option value="canada">Canada</option>
                <option value="uk">United Kingdom</option>
                <option value="australia">Australia</option>
                <option value="germany">Germany</option>
                <option value="netherlands">Netherlands</option>
                <option value="france">France</option>
                <option value="south-korea">South Korea</option>
                <option value="japan">Japan</option>
                <option value="china">China</option>
                <option value="sweden">Sweden</option>
                <option value="new-zealand">New Zealand</option>
                <option value="turkey">Turkey</option>
                <option value="italy">Italy</option>
                <option value="europe">Europe (Multiple)</option>
                <option value="nepal">Nepal</option>
              </select>
              
              <select className="filter-select" id="level-filter">
                <option value=""><i className="fas fa-graduation-cap" aria-hidden="true"></i> All Levels</option>
                <option value="undergraduate">Undergraduate</option>
                <option value="graduate">Graduate</option>
                <option value="phd">PhD</option>
              </select>
              
              <select className="filter-select" id="field-filter">
                <option value=""><i className="fas fa-book" aria-hidden="true"></i> All Fields</option>
                <option value="engineering">Engineering</option>
                <option value="business">Business</option>
                <option value="medicine">Medicine</option>
                <option value="arts">Arts & Humanities</option>
                <option value="science">Science</option>
              </select>
              
              <select className="filter-select" id="deadline-filter">
                <option value=""><i className="fas fa-calendar" aria-hidden="true"></i> All Deadlines</option>
                <option value="open">Applications Open</option>
                <option value="closing">Closing Soon</option>
                <option value="future">Future Deadlines</option>
              </select>
            </div>
          </div>

          
          <div className="card" style="margin-top: 1rem;">
            <div id="no-results-message" className="hidden" style="text-align: center; padding: 3rem; color: var(--text-secondary);">
              <i className="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
              <h3>No scholarships match your criteria</h3>
              <p>Try adjusting your filters or <button id="reset-filters-btn" className="linear-button" style="display: inline-block; margin-top: 1rem;">Reset All Filters</button></p>
            </div>
            <table className="linear-table" id="scholarships-table">
              <thead>
                <tr className="scholarship-item" data-country="other" data-level="undergraduate" data-field="all" data-deadline="open">
                  <th data-i18n="sch.th_name">Scholarship</th>
                  <th>Country</th>
                  <th>Level</th>
                  <th>Field</th>
                  <th>Deadline</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody id="scholarships-tbody">
                <tr className="scholarship-item" data-country="uk" data-level="graduate" data-field="all" data-deadline="open">
                  <td>
                    <strong>Gates Cambridge Scholarships</strong><br>
                    <span className="subtext">For international students; full funding</span>
                  </td>
                  <td>UK</td>
                  <td>Masters/PhD</td>
                  <td>All</td>
                  <td>
                    <span style="color: var(--accent);">Oct 8/Dec 4 2025</span>
                  </td>
                  <td>
                    <a href="https://www.gatescambridge.org/apply" target="_blank" className="linear-button" style="padding: 0.5rem 1rem; font-size: 0.875rem;">
                      <i className="fas fa-external-link-alt icon-left" aria-hidden="true"></i>Apply
                    </a>
                  </td>
                </tr>
                
                <tr className="scholarship-item" data-country="uk" data-level="graduate" data-field="all" data-deadline="open">
                  <td>
                    <strong>Clarendon Fund Scholarships at Oxford</strong><br>
                    <span className="subtext">Full tuition + living costs</span>
                  </td>
                  <td>UK</td>
                  <td>Masters/PhD</td>
                  <td>All</td>
                  <td>
                    <span style="color: var(--accent);">Jan 3/Jan 24 2026</span>
                  </td>
                  <td>
                    <a href="https://www.ox.ac.uk/admissions/graduate/fees-and-funding/fees-funding-and-scholarship-search/clarendon-fund" target="_blank" className="linear-button" style="padding: 0.5rem 1rem; font-size: 0.875rem;">
                      <i className="fas fa-external-link-alt icon-left" aria-hidden="true"></i>Apply
                    </a>
                  </td>
                </tr>
                
                <tr className="scholarship-item" data-country="usa" data-level="undergraduate" data-field="all" data-deadline="open">
                  <td>
                    <strong>ICSP Scholarships at University of Oregon</strong><br>
                    <span className="subtext">Partial tuition</span>
                  </td>
                  <td>USA</td>
                  <td>Bachelors</td>
                  <td>All</td>
                  <td>
                    <span style="color: var(--accent);">Jan 15/Feb 13 2026</span>
                  </td>
                  <td>
                    <a href="https://international.uoregon.edu/icsp" target="_blank" className="linear-button" style="padding: 0.5rem 1rem; font-size: 0.875rem;">
                      <i className="fas fa-external-link-alt icon-left" aria-hidden="true"></i>Apply
                    </a>
                  </td>
                </tr>
                
                <tr className="scholarship-item" data-country="uk" data-level="undergraduate" data-field="all" data-deadline="open">
                  <td>
                    <strong>Reach Oxford Scholarships</strong><br>
                    <span className="subtext">For developing countries; full funding</span>
                  </td>
                  <td>UK</td>
                  <td>Bachelors</td>
                  <td>All</td>
                  <td>
                    <span style="color: var(--accent);">Oct 15 2025</span>
                  </td>
                  <td>
                    <a href="https://www.ox.ac.uk/admissions/undergraduate/fees-and-funding/oxford-support/reach-oxford-scholarships" target="_blank" className="linear-button" style="padding: 0.5rem 1rem; font-size: 0.875rem;">
                      <i className="fas fa-external-link-alt icon-left" aria-hidden="true"></i>Apply
                    </a>
                  </td>
                </tr>
                
                <tr className="scholarship-item" data-country="canada" data-level="undergraduate" data-field="all" data-deadline="open">
                  <td>
                    <strong>International Scholars Program at UBC</strong><br>
                    <span className="subtext">Merit-based</span>
                  </td>
                  <td>Canada</td>
                  <td>Bachelors</td>
                  <td>All</td>
                  <td>
                    <span style="color: var(--accent);">Nov 15/Dec 1 2025</span>
                  </td>
                  <td>
                    <a href="https://you.ubc.ca/financial-planning/scholarships-awards-international-students/" target="_blank" className="linear-button" style="padding: 0.5rem 1rem; font-size: 0.875rem;">
                      <i className="fas fa-external-link-alt icon-left" aria-hidden="true"></i>Apply
                    </a>
                  </td>
                </tr>
                
                <tr className="scholarship-item" data-country="switzerland" data-level="graduate" data-field="all" data-deadline="open">
                  <td>
                    <strong>University of Geneva Excellence Masters Fellowships</strong><br>
                    <span className="subtext">Partial funding</span>
                  </td>
                  <td>Switzerland</td>
                  <td>Masters</td>
                  <td>All</td>
                  <td>
                    <span style="color: var(--accent);">Feb 28 2026</span>
                  </td>
                  <td>
                    <a href="https://www.unige.ch/international/exchanges/masters-fellowship/" target="_blank" className="linear-button" style="padding: 0.5rem 1rem; font-size: 0.875rem;">
                      <i className="fas fa-external-link-alt icon-left" aria-hidden="true"></i>Apply
                    </a>
                  </td>
                </tr>
                
                <tr className="scholarship-item" data-country="usa" data-level="undergraduate" data-field="all" data-deadline="open">
                  <td>
                    <strong>American University Emerging Global Leader Scholarship</strong><br>
                    <span className="subtext">Full tuition for leaders</span>
                  </td>
                  <td>USA</td>
                  <td>Bachelors</td>
                  <td>All</td>
                  <td>
                    <span style="color: var(--accent);">Jan 15 2026</span>
                  </td>
                  <td>
                    <a href="https://www.american.edu/provost/undergrad/emerging-global-leader/" target="_blank" className="linear-button" style="padding: 0.5rem 1rem; font-size: 0.875rem;">
                      <i className="fas fa-external-link-alt icon-left" aria-hidden="true"></i>Apply
                    </a>
                  </td>
                </tr>
                
                <tr className="scholarship-item" data-country="usa" data-level="graduate" data-field="all" data-deadline="open">
                  <td>
                    <strong>East-West Center Graduate Degree Fellowship</strong><br>
                    <span className="subtext">Full support at UH</span>
                  </td>
                  <td>USA (Hawaii)</td>
                  <td>Graduate</td>
                  <td>Relevant to EWC goals</td>
                  <td>
                    <span style="color: var(--accent);">Dec 1 2025</span>
                  </td>
                  <td>
                    <a href="https://www.eastwestcenter.org/education/student-programs/graduate-degree-fellowship" target="_blank" className="linear-button" style="padding: 0.5rem 1rem; font-size: 0.875rem;">
                      <i className="fas fa-external-link-alt icon-left" aria-hidden="true"></i>Apply
                    </a>
                  </td>
                </tr>
                
                <tr className="scholarship-item" data-country="usa" data-level="undergraduate" data-field="all" data-deadline="open">
                  <td>
                    <strong>MPOWER Monthly Scholarship (October)</strong><br>
                    <span className="subtext">$1,000 awards</span>
                  </td>
                  <td>USA/Canada</td>
                  <td>All</td>
                  <td>All</td>
                  <td>
                    <span style="color: var(--accent);">Oct 31 2025 (monthly)</span>
                  </td>
                  <td>
                    <a href="https://www.mpowerfinancing.com/scholarships/" target="_blank" className="linear-button" style="padding: 0.5rem 1rem; font-size: 0.875rem;">
                      <i className="fas fa-external-link-alt icon-left" aria-hidden="true"></i>Apply
                    </a>
                  </td>
                </tr>
                
                <tr className="scholarship-item" data-country="nepal" data-level="undergraduate" data-field="all" data-deadline="open">
                  <td>
                    <strong>Sanima Bank Scholarship for Plus Two</strong><br>
                    <span className="subtext">Local for Nepali students</span>
                  </td>
                  <td>Nepal</td>
                  <td>Plus Two</td>
                  <td>All</td>
                  <td>
                    <span style="color: var(--accent);">Oct 17 2025</span>
                  </td>
                  <td>
                    <a href="https://www.sanimabank.com/" target="_blank" className="linear-button" style="padding: 0.5rem 1rem; font-size: 0.875rem;">
                      <i className="fas fa-external-link-alt icon-left" aria-hidden="true"></i>Apply
                    </a>
                  </td>
                </tr>
                
                <tr className="scholarship-item" data-country="usa" data-level="graduate" data-field="all" data-deadline="open">
                  <td>
                    <strong>Knight-Hennessy Scholars at Stanford</strong><br>
                    <span className="subtext">Full funding for graduate study</span>
                  </td>
                  <td>USA</td>
                  <td>Graduate</td>
                  <td>All</td>
                  <td>
                    <span style="color: var(--accent);">Oct 9 2025</span>
                  </td>
                  <td>
                    <a href="https://knight-hennessy.stanford.edu/admission" target="_blank" className="linear-button" style="padding: 0.5rem 1rem; font-size: 0.875rem;">
                      <i className="fas fa-external-link-alt icon-left" aria-hidden="true"></i>Apply
                    </a>
                  </td>
                </tr>
                
                <tr className="scholarship-item" data-country="usa" data-level="graduate" data-field="all" data-deadline="open">
                  <td>
                    <strong>P.E.O. International Peace Scholarship</strong><br>
                    <span className="subtext">For women</span>
                  </td>
                  <td>USA</td>
                  <td>Graduate</td>
                  <td>All</td>
                  <td>
                    <span style="color: var(--accent);">Dec 15 2025</span>
                  </td>
                  <td>
                    <a href="https://www.peointernational.org/about-peo-international-peace-scholarship-ips" target="_blank" className="linear-button" style="padding: 0.5rem 1rem; font-size: 0.875rem;">
                      <i className="fas fa-external-link-alt icon-left" aria-hidden="true"></i>Apply
                    </a>
                  </td>
                </tr>
                
                <tr className="scholarship-item" data-country="usa" data-level="graduate" data-field="all" data-deadline="open">
                  <td>
                    <strong>Fulbright Foreign Student Program (2026-27 cycle)</strong><br>
                    <span className="subtext">For Nepali citizens; full funding</span>
                  </td>
                  <td>USA</td>
                  <td>Masters/PhD</td>
                  <td>All</td>
                  <td>
                    <span style="color: var(--accent);">May 2026</span>
                  </td>
                  <td>
                    <a href="https://np.usembassy.gov/education-culture/educational-exchanges/fulbright-program/" target="_blank" className="linear-button" style="padding: 0.5rem 1rem; font-size: 0.875rem;">
                      <i className="fas fa-external-link-alt icon-left" aria-hidden="true"></i>Apply
                    </a>
                  </td>
                </tr>
                
                <tr className="scholarship-item" data-country="usa" data-level="graduate" data-field="all" data-deadline="open">
                  <td>
                    <strong>Hubert H. Humphrey Fellowship</strong><br>
                    <span className="subtext">Mid-career</span>
                  </td>
                  <td>USA</td>
                  <td>Professional</td>
                  <td>Various</td>
                  <td>
                    <span style="color: var(--accent);">Oct 1 2025</span>
                  </td>
                  <td>
                    <a href="https://www.humphreyfellowship.org/" target="_blank" className="linear-button" style="padding: 0.5rem 1rem; font-size: 0.875rem;">
                      <i className="fas fa-external-link-alt icon-left" aria-hidden="true"></i>Apply
                    </a>
                  </td>
                </tr>
                
                <tr className="scholarship-item" data-country="usa" data-level="graduate" data-field="all" data-deadline="open">
                  <td>
                    <strong>AAUW International Fellowships</strong><br>
                    <span className="subtext">For women</span>
                  </td>
                  <td>USA</td>
                  <td>Masters/PhD</td>
                  <td>All</td>
                  <td>
                    <span style="color: var(--accent);">Nov 15 2025</span>
                  </td>
                  <td>
                    <a href="https://www.aauw.org/resources/programs/fellowships-grants/international-fellowships/" target="_blank" className="linear-button" style="padding: 0.5rem 1rem; font-size: 0.875rem;">
                      <i className="fas fa-external-link-alt icon-left" aria-hidden="true"></i>Apply
                    </a>
                  </td>
                </tr>
                
                <tr className="scholarship-item" data-country="other" data-level="graduate" data-field="all" data-deadline="open">
                  <td>
                    <strong>Rotary Peace Fellowships</strong><br>
                    <span className="subtext">Full funding</span>
                  </td>
                  <td>Various</td>
                  <td>Masters</td>
                  <td>Peace studies</td>
                  <td>
                    <span style="color: var(--accent);">May 15 2026 (apps open Oct)</span>
                  </td>
                  <td>
                    <a href="https://www.rotary.org/en/our-programs/peace-fellowships" target="_blank" className="linear-button" style="padding: 0.5rem 1rem; font-size: 0.875rem;">
                      <i className="fas fa-external-link-alt icon-left" aria-hidden="true"></i>Apply
                    </a>
                  </td>
                </tr>
                
                <tr className="scholarship-item" data-country="china" data-level="graduate" data-field="all" data-deadline="open">
                  <td>
                    <strong>Schwarzman Scholars</strong><br>
                    <span className="subtext">Global affairs</span>
                  </td>
                  <td>China</td>
                  <td>Masters</td>
                  <td>Leadership</td>
                  <td>
                    <span style="color: var(--accent);">Oct 1 2025</span>
                  </td>
                  <td>
                    <a href="https://www.schwarzmanscholars.org/" target="_blank" className="linear-button" style="padding: 0.5rem 1rem; font-size: 0.875rem;">
                      <i className="fas fa-external-link-alt icon-left" aria-hidden="true"></i>Apply
                    </a>
                  </td>
                </tr>
                
                <tr className="scholarship-item" data-country="europe" data-level="graduate" data-field="all" data-deadline="open">
                  <td>
                    <strong>Erasmus Mundus Joint Masters</strong><br>
                    <span className="subtext">EU-funded; multiple programs</span>
                  </td>
                  <td>Europe</td>
                  <td>Masters</td>
                  <td>Various</td>
                  <td>
                    <span style="color: var(--accent);">Oct 2025 - Feb 2026</span>
                  </td>
                  <td>
                    <a href="https://www.eacea.ec.europa.eu/scholarships/erasmus-mundus-catalogue_en" target="_blank" className="linear-button" style="padding: 0.5rem 1rem; font-size: 0.875rem;">
                      <i className="fas fa-external-link-alt icon-left" aria-hidden="true"></i>Apply
                    </a>
                  </td>
                </tr>
                
                <tr className="scholarship-item" data-country="uk" data-level="graduate" data-field="all" data-deadline="open">
                  <td>
                    <strong>Commonwealth Scholarships</strong><br>
                    <span className="subtext">For Commonwealth countries; full funding</span>
                  </td>
                  <td>UK</td>
                  <td>Masters/PhD</td>
                  <td>All</td>
                  <td>
                    <span style="color: var(--accent);">Dec 17 2025</span>
                  </td>
                  <td>
                    <a href="https://cscuk.fcdo.gov.uk/scholarships/" target="_blank" className="linear-button" style="padding: 0.5rem 1rem; font-size: 0.875rem;">
                      <i className="fas fa-external-link-alt icon-left" aria-hidden="true"></i>Apply
                    </a>
                  </td>
                </tr>
                
                <tr className="scholarship-item" data-country="canada" data-level="phd" data-field="all" data-deadline="open">
                  <td>
                    <strong>Vanier Canada Graduate Scholarships</strong><br>
                    <span className="subtext">Excellence</span>
                  </td>
                  <td>Canada</td>
                  <td>PhD</td>
                  <td>All</td>
                  <td>
                    <span style="color: var(--accent);">Nov 1 2025</span>
                  </td>
                  <td>
                    <a href="https://vanier.gc.ca/" target="_blank" className="linear-button" style="padding: 0.5rem 1rem; font-size: 0.875rem;">
                      <i className="fas fa-external-link-alt icon-left" aria-hidden="true"></i>Apply
                    </a>
                  </td>
                </tr>
                
                <tr className="scholarship-item" data-country="australia" data-level="undergraduate" data-field="all" data-deadline="open">
                  <td>
                    <strong>Australia Awards Scholarships</strong><br>
                    <span className="subtext">For Pacific/Asia</span>
                  </td>
                  <td>Australia</td>
                  <td>All</td>
                  <td>Development</td>
                  <td>
                    <span style="color: var(--accent);">Feb 1 2026</span>
                  </td>
                  <td>
                    <a href="https://www.australiaawards.gov.au/" target="_blank" className="linear-button" style="padding: 0.5rem 1rem; font-size: 0.875rem;">
                      <i className="fas fa-external-link-alt icon-left" aria-hidden="true"></i>Apply
                    </a>
                  </td>
                </tr>
                
                <tr className="scholarship-item" data-country="germany" data-level="undergraduate" data-field="all" data-deadline="open">
                  <td>
                    <strong>DAAD Scholarships</strong><br>
                    <span className="subtext">Exchange</span>
                  </td>
                  <td>Germany</td>
                  <td>All</td>
                  <td>All</td>
                  <td>
                    <span style="color: var(--accent);">Varies Oct-Dec 2025</span>
                  </td>
                  <td>
                    <a href="https://www.daad.de/en/" target="_blank" className="linear-button" style="padding: 0.5rem 1rem; font-size: 0.875rem;">
                      <i className="fas fa-external-link-alt icon-left" aria-hidden="true"></i>Apply
                    </a>
                  </td>
                </tr>
                
                <tr className="scholarship-item" data-country="uk" data-level="graduate" data-field="all" data-deadline="open">
                  <td>
                    <strong>Chevening Scholarships</strong><br>
                    <span className="subtext">UK Government Leadership Scholarship</span>
                  </td>
                  <td>UK</td>
                  <td>Masters</td>
                  <td>All</td>
                  <td>
                    <span style="color: var(--accent);">Nov 5 2025</span>
                  </td>
                  <td>
                    <a href="https://www.chevening.org/scholarships/" target="_blank" className="linear-button" style="padding: 0.5rem 1rem; font-size: 0.875rem;">
                      <i className="fas fa-external-link-alt icon-left" aria-hidden="true"></i>Apply
                    </a>
                  </td>
                </tr>
                
                <tr className="scholarship-item" data-country="netherlands" data-level="undergraduate" data-field="all" data-deadline="future">
                  <td>
                    <strong>Holland Scholarship</strong><br>
                    <span className="subtext">Non-EEA students; €5,000</span>
                  </td>
                  <td>Netherlands</td>
                  <td>Bachelors/Masters</td>
                  <td>All</td>
                  <td>
                    <span style="color: var(--accent);">May 1 2026</span>
                  </td>
                  <td>
                    <a href="https://www.studyinholland.nl/finances/holland-scholarship" target="_blank" className="linear-button" style="padding: 0.5rem 1rem; font-size: 0.875rem;">
                      <i className="fas fa-external-link-alt icon-left" aria-hidden="true"></i>Apply
                    </a>
                  </td>
                </tr>
                
                <tr className="scholarship-item" data-country="south-korea" data-level="undergraduate" data-field="all" data-deadline="open">
                  <td>
                    <strong>Korean Government Scholarship (KGSP/GKS)</strong><br>
                    <span className="subtext">Full tuition + living expenses + language training</span>
                  </td>
                  <td>South Korea</td>
                  <td>Undergraduate/Graduate</td>
                  <td>All</td>
                  <td>
                    <span style="color: var(--accent);">March 31 2026</span>
                  </td>
                  <td>
                    <a href="https://www.studyinkorea.go.kr/en/sub/gks/allnew_invite.do" target="_blank" className="linear-button" style="padding: 0.5rem 1rem; font-size: 0.875rem;">
                      <i className="fas fa-external-link-alt icon-left" aria-hidden="true"></i>Apply
                    </a>
                  </td>
                </tr>
                
                <tr className="scholarship-item" data-country="france" data-level="graduate" data-field="all" data-deadline="open">
                  <td>
                    <strong>Eiffel Excellence Scholarship</strong><br>
                    <span className="subtext">Masters/PhD in engineering, sciences, economics</span>
                  </td>
                  <td>France</td>
                  <td>Masters/PhD</td>
                  <td>Engineering/Sciences</td>
                  <td>
                    <span style="color: var(--accent);">Jan 7 2026</span>
                  </td>
                  <td>
                    <a href="https://www.campusfrance.org/en/eiffel-scholarship-program-of-excellence" target="_blank" className="linear-button" style="padding: 0.5rem 1rem; font-size: 0.875rem;">
                      <i className="fas fa-external-link-alt icon-left" aria-hidden="true"></i>Apply
                    </a>
                  </td>
                </tr>
                
                <tr className="scholarship-item" data-country="japan" data-level="undergraduate" data-field="all" data-deadline="open">
                  <td>
                    <strong>MEXT Scholarship (Japanese Government)</strong><br>
                    <span className="subtext">Full tuition + monthly stipend + airfare</span>
                  </td>
                  <td>Japan</td>
                  <td>Undergraduate/Graduate</td>
                  <td>All</td>
                  <td>
                    <span style="color: var(--accent);">April-June 2026</span>
                  </td>
                  <td>
                    <a href="https://www.studyinjapan.go.jp/en/planning/scholarship/" target="_blank" className="linear-button" style="padding: 0.5rem 1rem; font-size: 0.875rem;">
                      <i className="fas fa-external-link-alt icon-left" aria-hidden="true"></i>Apply
                    </a>
                  </td>
                </tr>
                
                <tr className="scholarship-item" data-country="sweden" data-level="graduate" data-field="all" data-deadline="open">
                  <td>
                    <strong>Swedish Institute Scholarships</strong><br>
                    <span className="subtext">For developing countries; full tuition + living expenses</span>
                  </td>
                  <td>Sweden</td>
                  <td>Masters</td>
                  <td>All</td>
                  <td>
                    <span style="color: var(--accent);">Feb 18 2026</span>
                  </td>
                  <td>
                    <a href="https://si.se/en/apply/scholarships/swedish-institute-scholarships-for-global-professionals/" target="_blank" className="linear-button" style="padding: 0.5rem 1rem; font-size: 0.875rem;">
                      <i className="fas fa-external-link-alt icon-left" aria-hidden="true"></i>Apply
                    </a>
                  </td>
                </tr>
                
                <tr className="scholarship-item" data-country="new-zealand" data-level="graduate" data-field="all" data-deadline="open">
                  <td>
                    <strong>New Zealand Scholarships</strong><br>
                    <span className="subtext">For developing countries; full funding</span>
                  </td>
                  <td>New Zealand</td>
                  <td>Undergraduate/Masters/PhD</td>
                  <td>All</td>
                  <td>
                    <span style="color: var(--accent);">March 31 2026</span>
                  </td>
                  <td>
                    <a href="https://www.nzscholarships.govt.nz/" target="_blank" className="linear-button" style="padding: 0.5rem 1rem; font-size: 0.875rem;">
                      <i className="fas fa-external-link-alt icon-left" aria-hidden="true"></i>Apply
                    </a>
                  </td>
                </tr>
                
                <tr className="scholarship-item" data-country="turkey" data-level="undergraduate" data-field="all" data-deadline="open">
                  <td>
                    <strong>Türkiye Scholarships</strong><br>
                    <span className="subtext">Turkish Government; full funding</span>
                  </td>
                  <td>Turkey</td>
                  <td>Undergraduate/Graduate/PhD</td>
                  <td>All</td>
                  <td>
                    <span style="color: var(--accent);">Feb 20 2026</span>
                  </td>
                  <td>
                    <a href="https://www.turkiyeburslari.gov.tr/" target="_blank" className="linear-button" style="padding: 0.5rem 1rem; font-size: 0.875rem;">
                      <i className="fas fa-external-link-alt icon-left" aria-hidden="true"></i>Apply
                    </a>
                  </td>
                </tr>
                
                <tr className="scholarship-item" data-country="italy" data-level="undergraduate" data-field="all" data-deadline="open">
                  <td>
                    <strong>Italian Government Scholarships</strong><br>
                    <span className="subtext">For international students</span>
                  </td>
                  <td>Italy</td>
                  <td>Undergraduate/Masters/PhD</td>
                  <td>All</td>
                  <td>
                    <span style="color: var(--accent);">April-May 2026</span>
                  </td>
                  <td>
                    <a href="https://studyinitaly.esteri.it/en/scholarships" target="_blank" className="linear-button" style="padding: 0.5rem 1rem; font-size: 0.875rem;">
                      <i className="fas fa-external-link-alt icon-left" aria-hidden="true"></i>Apply
                    </a>
                  </td>
                </tr>
                
                <tr className="scholarship-item" data-country="china" data-level="undergraduate" data-field="all" data-deadline="open">
                  <td>
                    <strong>Chinese Government Scholarship (CSC)</strong><br>
                    <span className="subtext">Full tuition + stipend + accommodation</span>
                  </td>
                  <td>China</td>
                  <td>Undergraduate/Masters/PhD</td>
                  <td>All</td>
                  <td>
                    <span style="color: var(--accent);">Jan 15 - Apr 30 2026</span>
                  </td>
                  <td>
                    <a href="https://www.campuschina.org/" target="_blank" className="linear-button" style="padding: 0.5rem 1rem; font-size: 0.875rem;">
                      <i className="fas fa-external-link-alt icon-left" aria-hidden="true"></i>Apply
                    </a>
                  </td>
                </tr>
                
                <tr className="scholarship-item" data-country="usa" data-level="undergraduate" data-field="all" data-deadline="open">
                  <td>
                    <strong>Yale Young Global Scholars</strong><br>
                    <span className="subtext">Need-based financial aid available</span>
                  </td>
                  <td>USA</td>
                  <td>High School</td>
                  <td>All</td>
                  <td>
                    <span style="color: var(--accent);">Ongoing 2025-2026</span>
                  </td>
                  <td>
                    <a href="https://globalscholars.yale.edu/" target="_blank" className="linear-button" style="padding: 0.5rem 1rem; font-size: 0.875rem;">
                      <i className="fas fa-external-link-alt icon-left" aria-hidden="true"></i>Apply
                    </a>
                  </td>
                </tr>
                
                <tr className="scholarship-item" data-country="usa" data-level="undergraduate" data-field="all" data-deadline="open">
                  <td>
                    <strong>Clark Global Scholars Program</strong><br>
                    <span className="subtext">Full tuition + $2,500/year; at Clark University</span>
                  </td>
                  <td>USA</td>
                  <td>Bachelors</td>
                  <td>All</td>
                  <td>
                    <span style="color: var(--accent);">Nov 1 2025/Jan 15 2026</span>
                  </td>
                  <td>
                    <a href="https://www.clarku.edu/offices/admissions/global-scholars-program/" target="_blank" className="linear-button" style="padding: 0.5rem 1rem; font-size: 0.875rem;">
                      <i className="fas fa-external-link-alt icon-left" aria-hidden="true"></i>Apply
                    </a>
                  </td>
                </tr>
                
                <tr className="scholarship-item" data-country="canada" data-level="graduate" data-field="all" data-deadline="open">
                  <td>
                    <strong>Lester B. Pearson International Scholarship</strong><br>
                    <span className="subtext">University of Toronto; full tuition + books + incidentals</span>
                  </td>
                  <td>Canada</td>
                  <td>Bachelors</td>
                  <td>All</td>
                  <td>
                    <span style="color: var(--accent);">Nov 2025</span>
                  </td>
                  <td>
                    <a href="https://future.utoronto.ca/pearson/" target="_blank" className="linear-button" style="padding: 0.5rem 1rem; font-size: 0.875rem;">
                      <i className="fas fa-external-link-alt icon-left" aria-hidden="true"></i>Apply
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
            <div style="margin-top: 1rem; padding: 1rem; background: var(--bg-secondary); border-radius: 4px; border-left: 3px solid var(--accent);">
              <p style="color: var(--text-secondary); font-size: 0.875rem;">
                <i className="fas fa-info-circle icon-left" aria-hidden="true"></i>
                <strong>Disclaimer:</strong> Deadlines listed as of October 2025; always verify with official sources before applying. Application cycles may vary by year.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
` }} />
  )
}
