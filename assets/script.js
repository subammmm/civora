// Footer year and last updated date
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const lastUpdated = document.getElementById('last-updated');
if (lastUpdated) {
  const date = new Date();
  const monthNames = ["January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"];
  lastUpdated.textContent = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
}

// Animated Counter for Stats using IntersectionObserver
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16); // 60fps
  
  const updateCounter = () => {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  };
  
  updateCounter();
}

// Initialize counter animation on scroll
document.addEventListener('DOMContentLoaded', () => {
  const statNumbers = document.querySelectorAll('.stat-number[data-count]');
  
  if (statNumbers.length > 0) {
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.textContent === '0') {
          const target = parseInt(entry.target.getAttribute('data-count'));
          animateCounter(entry.target, target);
        }
      });
    }, observerOptions);
    
    statNumbers.forEach(stat => observer.observe(stat));
  }
});

// Interactive World Map functionality
function initializeWorldMap() {
  const mapPins = document.querySelectorAll('.map-pin');
  const mapCountries = document.querySelectorAll('.map-country');
  
  // Add click interactions to pins
  mapPins.forEach(pin => {
    pin.addEventListener('click', (e) => {
      const country = pin.getAttribute('data-country');
      // Scroll to the corresponding country card
      const countryCards = document.querySelectorAll('.card h3');
      countryCards.forEach(card => {
        if (card.textContent.includes(country) || 
            (country === 'United States' && card.textContent.includes('United States')) ||
            (country === 'United Kingdom' && card.textContent.includes('United Kingdom')) ||
            (country === 'South Korea' && card.textContent.includes('South Korea'))) {
          card.closest('.card').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
          // Add a brief highlight effect
          const cardElement = card.closest('.card');
          cardElement.style.transform = 'scale(1.02)';
          cardElement.style.boxShadow = '0 12px 40px rgba(29, 185, 84, 0.3)';
          setTimeout(() => {
            cardElement.style.transform = '';
            cardElement.style.boxShadow = '';
          }, 2000);
        }
      });
    });
    
    // Add accessible keyboard navigation
    pin.setAttribute('tabindex', '0');
    pin.setAttribute('role', 'button');
    pin.setAttribute('aria-label', `View information about ${pin.getAttribute('data-country')}`);
    
    pin.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        pin.click();
      }
    });
  });
  
  // Enhanced hover effects for map countries
  mapCountries.forEach(country => {
    country.addEventListener('mouseenter', () => {
      if (country.classList.contains('supported')) {
        country.style.fill = 'var(--brand-2)';
        country.style.opacity = '1';
        country.style.filter = 'drop-shadow(0 0 12px rgba(29, 185, 84, 0.6))';
        
        // Find and highlight corresponding pin
        const countryId = country.id;
        const correspondingPin = findPinByCountryId(countryId);
        if (correspondingPin) {
          correspondingPin.style.transform = 'translate(-50%, -50%) scale(1.3)';
          correspondingPin.style.boxShadow = '0 8px 32px rgba(29, 185, 84, 0.8)';
        }
      }
    });
    
    country.addEventListener('mouseleave', () => {
      if (country.classList.contains('supported')) {
        country.style.fill = '';
        country.style.opacity = '';
        country.style.filter = '';
        
        // Reset corresponding pin
        const countryId = country.id;
        const correspondingPin = findPinByCountryId(countryId);
        if (correspondingPin) {
          correspondingPin.style.transform = '';
          correspondingPin.style.boxShadow = '';
        }
      }
    });
    
    // Add click functionality to countries
    country.addEventListener('click', () => {
      if (country.classList.contains('supported')) {
        const countryId = country.id;
        const correspondingPin = findPinByCountryId(countryId);
        if (correspondingPin) {
          correspondingPin.click();
        }
      }
    });
  });
}

// Helper function to find pin by country ID
function findPinByCountryId(countryId) {
  const countryMapping = {
    'united-states': 'United States',
    'united-kingdom': 'United Kingdom', 
    'france': 'France',
    'belgium': 'Belgium',
    'south-korea': 'South Korea',
    'australia': 'Australia'
  };
  
  const countryName = countryMapping[countryId];
  if (countryName) {
    return document.querySelector(`[data-country="${countryName}"]`);
  }
  return null;
}

// Initialize map when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeWorldMap);

// Top navigation toggle for mobile
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.contains('open');
    
    if (isOpen) {
      siteNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    } else {
      siteNav.classList.add('open');
      navToggle.setAttribute('aria-expanded', 'true');
    }
  });

  // Close nav on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && siteNav.classList.contains('open')) {
      siteNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Close nav when clicking outside
  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !siteNav.contains(e.target)) {
      siteNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// i18n strings
const I18N = {
  en: {
    'nav.menu': 'Menu',
    'nav.home': 'Home',
    'nav.scholarships': 'Scholarships',
    'nav.citizenship': 'Citizenship',
    'nav.guides': 'Guides',
    'nav.students_stories': 'Students & Stories',
    'nav.ielts_prep': 'IELTS & Prep',
    'nav.about': 'About',
    'nav.contact': 'Contact',

    'footer.links.about': 'About',
    'footer.links.scholarships': 'Scholarships',
    'footer.links.citizenship': 'Citizenship',
    'footer.links.guides': 'Guides',

    'title.index': 'Civora — Opening doors for Nepali students',
    'title.about': 'About Civora',
    'title.sch': 'Scholarships for Nepali Students — Civora',
    'title.cit': 'Citizenship & Residency Pathways — Civora',
    'title.guides': 'Application Guides & Templates — Civora',

    'index.hero_title': 'Civora – Plan and Build Your Future',
    'index.tagline': 'Opening doors for Nepali students to study, work, and belong anywhere in the world.',
    'index.intro': 'Purpose-built for Nepali students. Streamline scholarships, guides, and pathways.',
    'index.cta_primary': 'Explore Scholarships',
    'index.cta_secondary': 'Learn More',
    'index.cta_tertiary': 'Citizenship Pathways',
    'index.card_sch_title': 'Scholarship Intelligence',
    'index.card_sch_desc': 'Verified, ongoing opportunities — filter by country, deadline, and eligibility. Our database matches students with the most relevant scholarships based on their academic profile and destination preferences.',
    'index.card_guides_title': 'Application Guides',
    'index.card_guides_desc': 'Step-by-step application guides and downloadable templates for scholarships. From SOP writing to visa applications, get comprehensive guides that have helped thousands of students succeed.',
    'index.card_pathway_title': 'Pathway Builder',
    'index.card_pathway_desc': 'Get personalized scholarship recommendations that match your profile.',
    'index.card_cit_title': 'Citizenship Pathways',
    'index.card_cit_desc': 'Quick pathways and official links for study → work → PR → citizenship. Navigate complex immigration processes with clear timelines and requirements for each destination country.',
    'index.card_prep_title': 'IELTS & Test Prep',
    'index.card_prep_desc': 'Free resources, practice materials, and expert tips to ace your English proficiency tests.',
    'index.card_stories_title': 'Success Stories',
    'index.card_stories_desc': 'Learn from students who have successfully navigated the scholarship and visa process. Real experiences, practical tips, and insights from Nepali students studying worldwide.',
    'index.mission_title': 'Mission',
    'index.mission_body': 'Civora helps Nepali students access global education opportunities. We provide verified scholarships, clear immigration pathways, and practical documents to make international education more accessible.',

    'about.title': 'About Civora',
    'about.body': 'I founded Civora to make global opportunities more accessible for Nepali students. Having navigated scholarships, visas, and citizenship systems myself, I wanted to share verified resources in one place. This project is built by students, for students — to help more Nepalis study, work, and thrive abroad.',

    'sch.title': 'Scholarships for Nepali Students',
    'sch.intro': 'This page compiles ongoing scholarships that Nepali students are eligible for. Each entry is verified and linked to the official source.',
    'sch.demo_heading': 'Scholarships Database',
    'sch.demo_intro': 'Filter scholarships by country, level, and funding type. All links go to official program pages.',
    'sch.filter_search_placeholder': 'Search by name or keyword',
    'sch.filter_all_countries': 'All countries/regions',
    'sch.filter_all_levels': 'All levels',
    'sch.filter_bachelors': "Bachelor's",
    'sch.filter_masters': "Master's",
    'sch.filter_phd': 'PhD',
    'sch.filter_full_only': 'Fully funded only',
    'sch.th_name': 'Scholarship',
    'sch.th_country': 'Country/Region',
    'sch.th_level': 'Level',
    'sch.th_funding': 'Funding',
    'sch.th_deadline': 'Deadline',
    'sch.results': '{count} result(s) shown',

    'cit.title': 'Citizenship & Residency Pathways',
    'cit.intro': 'Quick pathways for Nepali students to secure permanent residency and citizenship through education and work.',
    
    // Additional citizenship content
    'cit.canada_title': '🇨🇦 Canada (Easiest for Nepali Students)',
    'cit.australia_title': '🇦🇺 Australia',
    'cit.uk_title': '🇬🇧 UK',
    'cit.germany_title': '🇩🇪 Germany',
    'cit.warning_title': '⚠️ Nepal Dual Citizenship Warning',
    
    // Student stories content
    'stories.title': 'Student Success Stories',
    'stories.intro': 'Real journeys from Nepali students who transformed their dreams into reality through scholarships and international opportunities.',
    'stories.submit_title': 'Share Your Success Story',
    'stories.submit_intro': 'Inspire other Nepali students by sharing your scholarship and study abroad journey.',
    
    // IELTS content  
    'ielts.title': 'IELTS & Test Preparation',
    'ielts.intro': 'Proven strategies and free resources to help Nepali students achieve their target IELTS scores for international admissions.',
    'ielts.essential_resources': 'Essential Resources',
    'ielts.final_reminders': 'Final Reminders',
    'cit.intro': 'Navigating visas, residencies, and citizenship options can be overwhelming. This section summarizes verified pathways for Nepali students, including France’s alternance model, EU residency steps, and comparisons across regions.',
    'cit.li1': 'France Alternance → Work–study residency track from Year 2.',
    'cit.li2': 'EU Residency → Pathways through education + employment.',
    'cit.li3': 'Other Regions → Comparative notes on Asia, US, and beyond.',


    'guides.title': 'Application Guides & Templates',
    'guides.intro': 'This section provides practical tools for Nepali students preparing for international applications.',
    'guides.checklist': 'Checklist',
    'guides.li1': 'Sponsor letter template.',
    'guides.li2': 'Financial proof checklist.',
    'guides.li3': 'Application timeline (from language prep → visa → enrollment).',

    'spotlight.title': 'Scholarship Spotlight',
    'spotlight.subtitle': 'Featured opportunities with proven success rates for Nepali students',
    'impact.title': 'Our Impact',
    'impact.title': 'Powering Students Worldwide',
    'impact.scholarships': 'Scholarships Verified',
    'impact.countries': 'Countries Where Students Supported',
    'impact.visitors': 'Visitors Reached',
    'support.title': 'Support Civora',
    'support.subtitle': 'Help us maintain this free platform and expand our verified scholarship database. Your support enables us to research new opportunities and keep all information current.',
    'support.how_title': 'How Your Support Helps',
    'support.research': 'Research & Verification (70%)',
    'support.research_desc': 'Contacting embassies, universities, and scholarship providers to verify information',
    'support.platform': 'Platform Development (20%)',
    'support.platform_desc': 'Hosting, security, new features, and technical improvements',
    'support.outreach': 'Outreach & Content (10%)',
    'support.outreach_desc': 'Creating multilingual content and expanding to new countries',
    'support.other_title': 'Other Ways to Help',
    'support.contribute': 'Contribute scholarship research or updates',
    'support.translate': 'Help with translations to new languages',
    'support.share': 'Share Civora with friends who need these resources',
    'support.feedback': 'Provide feedback and suggestions for improvement',
    'support.button': 'Support Civora',
    'support.button_subtitle': 'Every contribution helps a student find their pathway',
    'support.contact': 'Contact us',
    'support.contact_suffix': 'for other ways to support',
    'support.volunteer': 'Volunteer to Help',
    
    // IELTS & Test Prep page translations
    'ielts.title': 'IELTS & Test Preparation',
    'ielts.intro': 'Proven strategies and free resources to help Nepali students achieve their target IELTS scores for international admissions.',
    'ielts.essential_resources': 'Essential Resources',
    'ielts.proven_strategies': 'Proven Strategies',
    'ielts.time_management': 'Time Management',
    'ielts.writing_templates': 'Writing Task 2 Templates',
    'ielts.speaking_strategies': 'Speaking Strategies',
    'ielts.reading_techniques': 'Reading Techniques',
    'ielts.listening_practice': 'Listening Practice Drills',
    'ielts.study_timeline': 'Study Timeline',
    'ielts.nepal_tips': 'Nepal-Specific Tips',
    'ielts.common_grammar': 'Common Grammar Issues',
    'ielts.pronunciation_guide': 'Pronunciation Guide for Nepali Speakers',
    'ielts.cultural_context': 'Cultural Context',
    'ielts.final_reminders': 'Final Reminders',
    
    // Student Stories & Support page translations
    'students.title': 'Students Supported & Success Stories',
    'students.intro': 'Through Civora resources and guidance, Nepali students have successfully secured admissions and opportunities globally. Here are their inspiring journeys and the countries where they have achieved their dreams.',
    'students.stats_helped': 'Students Helped',
    'students.stats_countries': 'Countries Reached',
    'students.stats_scholarships': 'Scholarships Secured',
    'students.global_success': 'Global Success Stories',
    'students.global_reach': 'Global Reach',
    'students.success_stories': 'Featured Success Stories',
    'students.share_story': 'Share Your Success Story',
    'students.countries_success': 'Countries Where Our Students Have Succeeded',
    
    // Navigation elements
    'nav.students_stories': 'Students & Stories',
    'nav.ielts_prep': 'IELTS & Prep',
    'nav.contact': 'Contact',
    
    // Footer elements
    'footer.privacy': 'Privacy',
    'footer.terms': 'Terms',
    'footer.copyright': '© {year} Civora',
    'footer.last_updated': 'Last updated: {date}',
    
    // Common buttons and actions
    'btn.download': 'Download',
    'btn.view_guides': 'View Guides',
    'btn.read_stories': 'Read Stories',
    'btn.start_prep': 'Start Prep',
    'btn.explore_scholarships': 'Explore Scholarships',
    'btn.submit': 'Submit',
    'btn.learn_more': 'Learn More',
    
    // Page titles for missing pages
    'title.students': 'Students Supported & Success Stories — Civora',
    'title.ielts': 'IELTS & Test Prep — Civora',
    'title.contact': 'Contact — Civora',
  },

  ne: {
    'nav.menu': 'मेनु',
    'nav.home': 'गृहपृष्ठ',
    'nav.scholarships': 'छात्रवृत्ति',
    'nav.citizenship': 'नागरिकता',
    'nav.guides': 'मार्गदर्शिका',
    'nav.students_stories': 'विद्यार्थी र कथाहरू',
    'nav.ielts_prep': 'IELTS र तयारी',
    'nav.about': 'बारेमा',
    'nav.contact': 'सम्पर्क',

    'footer.links.about': 'बारेमा',
    'footer.links.scholarships': 'छात्रवृत्ति',
    'footer.links.citizenship': 'नागरिकता',
    'footer.links.guides': 'मार्गदर्शिका',

    'title.index': 'Civora — नेपाली विद्यार्थीहरूका लागि अवसर',
    'title.about': 'Civora बारेमा',
    'title.sch': 'नेपाली विद्यार्थीहरूका लागि छात्रवृत्तिहरू — Civora',
    'title.cit': 'नागरिकता र आवासीय मार्गहरू — Civora',
    'title.guides': 'आवेदन मार्गदर्शिका र ढाँचाहरू — Civora',

    'index.hero_title': 'Civora – योजना बनाउनुहोस् र आफ्नो भविष्य निर्माण गर्नुहोस्',
    'index.tagline': 'नेपाली विद्यार्थीहरूलाई विश्वभर अध्ययन, काम र बसोबासका ढोका खोल्दै।',
    'index.intro': 'नेपाली विद्यार्थीहरूका लागि विशेष रूपमा डिजाइन गरिएको। छात्रवृत्ति, मार्गदर्शिका र मार्गहरू सहज बनाउनुहोस्।',
    'index.cta_primary': 'छात्रवृत्ति खोज्नुहोस्',
    'index.cta_secondary': 'थप जान्नुहोस्',
    'index.card_sch_title': 'छात्रवृत्ति बुद्धिमत्ता',
    'index.card_sch_desc': 'प्रमाणित, चलिरहेका अवसरहरू — देश, समयसीमा र पात्रताअनुसार फिल्टर गर्नुहोस्। हाम्रो डाटाबेसले विद्यार्थीहरूलाई उनीहरूको शैक्षिक प्रोफाइल र गन्तव्य प्राथमिकताका आधारमा सबैभन्दा प्रासंगिक छात्रवृत्तिहरूसँग मिलाउँछ।',
    'index.card_guides_title': 'आवेदन मार्गदर्शिका',
    'index.card_guides_desc': 'छात्रवृत्तिका लागि चरणबद्ध आवेदन मार्गदर्शिका र डाउनलोड गर्न मिल्ने टेम्प्लेटहरू। SOP लेखनदेखि भिसा आवेदनसम्म, हजारौं विद्यार्थीहरूलाई सफल बनाउने व्यापक मार्गदर्शिकाहरू पाउनुहोस्।',
    'index.card_pathway_title': 'मार्ग निर्माणकर्ता',
    'index.card_pathway_desc': 'तपाईंको प्रोफाइलसँग मिल्ने व्यक्तिगत छात्रवृत्ति सिफारिसहरू पाउनुहोस्।',
    'index.card_cit_title': 'नागरिकता मार्गहरू',
    'index.card_cit_desc': 'अध्ययन → काम → PR → नागरिकताका लागि द्रुत मार्गहरू र आधिकारिक लिङ्कहरू। प्रत्येक गन्तव्य देशका लागि स्पष्ट समयसीमा र आवश्यकताहरूसहित जटिल आप्रवासन प्रक्रियाहरू नेभिगेट गर्नुहोस्।',
    'index.card_prep_title': 'IELTS र परीक्षा तयारी',
    'index.card_prep_desc': 'निःशुल्क स्रोतहरू, अभ्यास सामग्री, र अंग्रेजी दक्षता परीक्षामा उत्कृष्टता हासिल गर्न विशेषज्ञ सुझावहरू।',
    'index.card_stories_title': 'सफलताका कथाहरू',
    'index.card_stories_desc': 'छात्रवृत्ति र भिसा प्रक्रियामा सफलतापूर्वक नेभिगेट गरेका विद्यार्थीहरूबाट सिक्नुहोस्। वास्तविक अनुभवहरू, व्यावहारिक सुझावहरू, र विश्वभर अध्ययन गरिरहेका नेपाली विद्यार्थीहरूका अन्तर्दृष्टिहरू।',
    'impact.title': 'विश्वभरका विद्यार्थीहरूलाई शक्ति प्रदान गर्दै',
    'index.mission_title': 'उद्देश्य',
    'index.mission_body': 'Civora नेपाली विद्यार्थीहरूलाई विश्वव्यापी शिक्षाका अवसरहरू पहुँच गर्न सहयोग गर्छ। हामी प्रमाणित छात्रवृत्तिहरू, स्पष्ट आप्रवासन मार्गहरू, र व्यावहारिक कागजातहरू प्रदान गर्छौं।',

    'about.title': 'Civora बारेमा',
    'about.body': 'नेपाली विद्यार्थीहरूका लागि विश्वव्यापी अवसरहरू सजिलो बनाउन मैले Civora सुरु गरेको हुँ। छात्रवृत्ति, भिसा र नागरिकता प्रक्रियाहरू आफैं पार गरेको अनुभवका आधारमा, प्रमाणित स्रोतहरू एउटै स्थानमा राखिएको छ। यो परियोजना विद्यार्थीहरूद्वारा, विद्यार्थीहरूकै लागि — विदेशमा पढ्न, काम गर्न र सफल हुन सहयोग गर्न।',

    'sch.title': 'नेपाली विद्यार्थीहरूका लागि छात्रवृत्तिहरू',
    'sch.intro': 'यो पृष्ठमा नेपाली विद्यार्थीहरूका लागि खुला छात्रवृत्तिहरू संकलन गरिएको छ। हरेक प्रविष्टि आधिकारिक स्रोतसँग लिङ्क गरिएको छ।',
    'sch.demo_heading': 'छात्रवृत्ति डाटाबेस',
    'sch.demo_intro': 'देश, स्तर र फन्डिङ प्रकारअनुसार छात्रवृत्ति फिल्टर गर्नुहोस्। सबै लिङ्क आधिकारिक पृष्ठमा जान्छन्।',
    'sch.filter_search_placeholder': 'नाम वा शब्दद्वारा खोज्नुहोस्',
    'sch.filter_all_countries': 'सबै देश/क्षेत्र',
    'sch.filter_all_levels': 'सबै तह',
    'sch.filter_bachelors': 'स्नातक',
    'sch.filter_masters': 'स्नातकोत्तर',
    'sch.filter_phd': 'पीएचडी',
    'sch.filter_full_only': 'केवल पूर्ण वित्तपोषित',
    'sch.th_name': 'छात्रवृत्ति',
    'sch.th_country': 'देश/क्षेत्र',
    'sch.th_level': 'तह',
    'sch.th_funding': 'वित्तपोषण',
    'sch.th_deadline': 'समयसीमा',
    'sch.results': '{count} नतिजा देखाइयो',

    'cit.title': 'नागरिकता र आवासीय मार्गहरू',
    'cit.intro': 'भिसा, आवासीय र नागरिकता विकल्पहरू जटिल हुन सक्छन्। यो भागमा फ्रान्सको alternance, EU आवासीय चरणहरू र अन्य क्षेत्रहरूको तुलना समेटिएको छ।',
    'cit.li1': 'फ्रान्स Alternance → दोस्रो वर्षदेखि work-स्टडी आवासीय ट्र्याक।',
    'cit.li2': 'EU आवासीय → शिक्षा + रोजगारीमार्फत मार्गहरू।',
    'cit.li3': 'अन्य क्षेत्रहरू → एशिया, अमेरिका आदि को तुलनात्मक नोट।',


    'guides.title': 'आवेदन मार्गदर्शिका र ढाँचाहरू',
    'guides.intro': 'अन्तर्राष्ट्रिय आवेदनका लागि उपयोगी उपकरणहरू यहाँ पाइन्छन्।',
    'guides.checklist': 'चेकलिस्ट',
    'guides.li1': 'प्रायोजक पत्र ढाँचा।',
    'guides.li2': 'वित्तीय प्रमाण चेकलिस्ट।',
    'guides.li3': 'आवेदन टाइमलाइन (भाषा तयारी → भिसा → भर्ना)।',

    'spotlight.title': 'छात्रवृत्ति स्पटलाइट',
    'spotlight.subtitle': 'नेपाली विद्यार्थीहरूका लागि सफलताको प्रमाणित दरसहितका विशेष अवसरहरू',
    'impact.title': 'हाम्रो प्रभाव',
    'impact.scholarships': 'प्रमाणित छात्रवृत्तिहरू',
    'impact.countries': 'देशहरू जहाँ विद्यार्थीहरूलाई सहयोग',
    'impact.visitors': 'पुगेका आगन्तुकहरू',
    'support.title': 'Civora लाई सहयोग गर्नुहोस्',
    'support.subtitle': 'यो निःशुल्क प्लेटफर्म कायम राख्न र हाम्रो प्रमाणित छात्रवृत्ति डाटाबेस विस्तार गर्न सहयोग गर्नुहोस्। तपाईंको सहयोगले नयाँ अवसरहरू अनुसन्धान गर्न र सबै जानकारी अद्यावधिक राख्न सक्षम बनाउँछ।',
    'support.how_title': 'तपाईंको सहयोगले कसरी मद्दत गर्छ',
    'support.research': 'अनुसन्धान र प्रमाणीकरण (७०%)',
    'support.research_desc': 'दूतावास, विश्वविद्यालय र छात्रवृत्ति प्रदायकहरूसँग सम्पर्क गरेर जानकारी प्रमाणित गर्ने',
    'support.platform': 'प्लेटफर्म विकास (२०%)',
    'support.platform_desc': 'होस्टिङ, सुरक्षा, नयाँ सुविधाहरू र प्राविधिक सुधारहरू',
    'support.outreach': 'पहुँच र सामग्री (१०%)',
    'support.outreach_desc': 'बहुभाषिक सामग्री सिर्जना र नयाँ देशहरूमा विस्तार',
    'support.other_title': 'मद्दत गर्ने अन्य तरिकाहरू',
    'support.contribute': 'छात्रवृत्ति अनुसन्धान वा अपडेटमा योगदान गर्नुहोस्',
    'support.translate': 'नयाँ भाषाहरूमा अनुवादमा सहयोग गर्नुहोस्',
    'support.share': 'यी स्रोतहरू चाहिने साथीहरूसँग Civora साझा गर्नुहोस्',
    'support.feedback': 'सुधारका लागि प्रतिक्रिया र सुझावहरू दिनुहोस्',
    'support.button': 'Civora लाई सहयोग गर्नुहोस्',
    'support.button_subtitle': 'हरेक योगदानले एक विद्यार्थीलाई आफ्नो मार्ग खोज्न मद्दत गर्छ',
    'support.contact': 'हामीलाई सम्पर्क गर्नुहोस्',
    'support.contact_suffix': 'सहयोगका अन्य तरिकाहरूका लागि',
    'support.volunteer': 'सहयोग गर्न स्वयंसेवक बन्नुहोस्',
    
    // IELTS & Test Prep page translations
    'ielts.title': 'IELTS र परीक्षा तयारी',
    'ielts.intro': 'नेपाली विद्यार्थीहरूलाई अन्तर्राष्ट्रिय भर्नाका लागि लक्षित IELTS स्कोर हासिल गर्न प्रमाणित रणनीति र निःशुल्क स्रोतहरू।',
    'ielts.essential_resources': 'आवश्यक स्रोतहरू',
    'ielts.proven_strategies': 'प्रमाणित रणनीतिहरू',
    'ielts.time_management': 'समय व्यवस्थापन',
    'ielts.writing_templates': 'लेखन कार्य २ ढाँचाहरू',
    'ielts.speaking_strategies': 'बोलाइ रणनीतिहरू',
    'ielts.reading_techniques': 'पढाइ प्रविधिहरू',
    'ielts.listening_practice': 'सुनाइ अभ्यास',
    'ielts.study_timeline': 'अध्ययन समयतालिका',
    'ielts.nepal_tips': 'नेपाल-विशिष्ट सुझावहरू',
    'ielts.common_grammar': 'सामान्य व्याकरणका समस्याहरू',
    'ielts.pronunciation_guide': 'नेपाली वक्ताहरूका लागि उच्चारण गाइड',
    'ielts.cultural_context': 'सांस्कृतिक सन्दर्भ',
    'ielts.final_reminders': 'अन्तिम सम्झनाहरू',
    
    // Student Stories & Support page translations
    'students.title': 'समर्थित विद्यार्थीहरू र सफलताका कथाहरू',
    'students.intro': 'Civora स्रोत र मार्गदर्शनमार्फत नेपाली विद्यार्थीहरूले विश्वभरि भर्ना र अवसरहरू सुरक्षित गरेका छन्। यहाँ तिनीहरूका प्रेरणादायी यात्राहरू र सफलता पाका देशहरू छन्।',
    'students.stats_helped': 'सहयोग प्राप्त विद्यार्थीहरू',
    'students.stats_countries': 'पुगेका देशहरू',
    'students.stats_scholarships': 'सुरक्षित छात्रवृत्तिहरू',
    'students.global_success': 'विश्वव्यापी सफलताका कथाहरू',
    'students.global_reach': 'विश्वव्यापी पहुँच',
    'students.success_stories': 'विशेष सफलताका कथाहरू',
    'students.share_story': 'आफ्नो सफलताको कथा साझा गर्नुहोस्',
    'students.countries_success': 'हाम्रा विद्यार्थीहरू सफल भएका देशहरू',
    
    // Navigation elements
    'nav.students_stories': 'विद्यार्थी र कथाहरू',
    'nav.ielts_prep': 'IELTS र तयारी',
    'nav.contact': 'सम्पर्क',
    
    // Footer elements
    'footer.privacy': 'गोपनीयता',
    'footer.terms': 'सर्तहरू',
    'footer.copyright': '© {year} Civora',
    'footer.last_updated': 'अन्तिम अद्यावधिक: {date}',
    
    // Common buttons and actions
    'btn.download': 'डाउनलोड गर्नुहोस्',
    'btn.view_guides': 'गाइडहरू हेर्नुहोस्',
    'btn.read_stories': 'कथाहरू पढ्नुहोस्',
    'btn.start_prep': 'तयारी सुरु गर्नुहोस्',
    'btn.explore_scholarships': 'छात्रवृत्ति खोज्नुहोस्',
    'btn.submit': 'पेश गर्नुहोस्',
    'btn.learn_more': 'थप जान्नुहोस्',
    
    // Page titles for missing pages
    'title.students': 'समर्थित विद्यार्थीहरू र सफलताका कथाहरू — Civora',
    'title.ielts': 'IELTS र परीक्षा तयारी — Civora',
    'title.contact': 'सम्पर्क — Civora',
  },

  fr: {
    'nav.menu': 'Menu',
    'nav.home': 'Accueil',
    'nav.scholarships': 'Bourses',
    'nav.citizenship': 'Citoyenneté',
    'nav.guides': 'Guides',
    'nav.about': 'À propos',

    'footer.links.about': 'À propos',
    'footer.links.scholarships': 'Bourses',
    'footer.links.citizenship': 'Citoyenneté',
    'footer.links.guides': 'Guides',

    'title.index': 'Civora — Ouvrir des portes aux étudiants népalais',
    'title.about': 'À propos de Civora',
    'title.sch': 'Bourses pour étudiants népalais — Civora',
    'title.cit': 'Parcours de résidence et de citoyenneté — Civora',
    'title.guides': 'Guides et modèles d’application — Civora',

    'index.hero_title': 'Civora',
    'index.tagline': 'Ouvrir des portes pour que les étudiants népalais puissent étudier, travailler et s’intégrer partout dans le monde.',
    'index.intro': 'Civora est un hub fondé sur la recherche qui regroupe des bourses vérifiées, des parcours clairs de visa et de résidence, et des ressources pratiques. Tout est conçu pour rendre l’éducation et la mobilité internationales plus accessibles.',
    'index.cta_primary': 'Explorer les bourses',
    'index.cta_secondary': 'Guides et modèles',
    'index.card_sch_title': 'Base de bourses',
    'index.card_sch_desc': 'Opportunités vérifiées et continues — filtrez par pays, échéance et éligibilité.',
    'index.card_cit_title': 'Citoyenneté & Résidence',
    'index.card_cit_desc': 'Parcours rapides et liens officiels : études → travail → RP → citoyenneté.',
    'index.card_prep_title': 'IELTS & Préparation',
    'index.card_prep_desc': 'Ressources gratuites, matériel de pratique et conseils d\'experts pour réussir vos tests de compétence en anglais.',
    'index.mission_title': 'Mission',
    'index.mission_body': 'Civora aide les étudiants népalais à accéder aux opportunités d\'éducation mondiale. Nous fournissons des bourses vérifiées, des voies d\'immigration claires et des documents pratiques.',

    'about.title': 'À propos de Civora',
    'about.body': 'J’ai fondé Civora pour rendre les opportunités mondiales plus accessibles aux étudiants népalais. Ayant moi-même traversé les systèmes de bourses, de visas et de citoyenneté, je partage des ressources vérifiées en un seul endroit. Un projet par des étudiants, pour des étudiants.',

    'sch.title': 'Bourses pour étudiants népalais',
    'sch.intro': 'Cette page regroupe des bourses en cours pour lesquelles les étudiants népalais sont éligibles. Chaque entrée est vérifiée et liée à la source officielle. Vous pouvez intégrer votre Google Sheet ci-dessous ou utiliser l’ensemble de démonstration.',
    'sch.demo_heading': 'Jeu de données démo (filtrable)',
    'sch.demo_intro': 'À utiliser jusqu’à ce que votre Tous les liens mènent aux pages officielles.',
    'sch.filter_search_placeholder': 'Rechercher par nom ou mot-clé',
    'sch.filter_all_countries': 'Tous pays/régions',
    'sch.filter_all_levels': 'Tous niveaux',
    'sch.filter_bachelors': 'Licence',
    'sch.filter_masters': 'Master',
    'sch.filter_phd': 'Doctorat',
    'sch.filter_full_only': 'Entièrement financées uniquement',
    'sch.th_name': 'Bourse',
    'sch.th_country': 'Pays/Région',
    'sch.th_level': 'Niveau',
    'sch.th_funding': 'Financement',
    'sch.th_deadline': 'Date limite',
    'sch.results': '{count} résultat(s)',

    'cit.title': 'Parcours de citoyenneté & résidence',
    'cit.intro': 'Les visas, résidences et options de citoyenneté peuvent être complexes. Cette section résume des parcours vérifiés, dont l’alternance en France, des étapes UE et des comparaisons régionales.',
    'cit.li1': 'France Alternance → Voie travail-études dès la 2e année.',
    'cit.li2': 'Résidence UE → Parcours via études + emploi.',
    'cit.li3': 'Autres régions → Notes comparatives Asie, États-Unis, etc.',


    'guides.title': 'Guides & modèles d’application',
    'guides.intro': 'Des outils pratiques pour préparer vos dossiers internationaux.',
    'guides.checklist': 'Liste de contrôle',
    'guides.li1': 'Modèle de lettre de sponsor.',
    'guides.li2': 'Check-list de justificatifs financiers.',
    'guides.li3': 'Calendrier (préparation linguistique → visa → inscription).',
  },

  es: {
    'nav.menu': 'Menú',
    'nav.home': 'Inicio',
    'nav.scholarships': 'Becas',
    'nav.citizenship': 'Ciudadanía',
    'nav.guides': 'Guías',
    'nav.about': 'Acerca de',

    'footer.links.about': 'Acerca de',
    'footer.links.scholarships': 'Becas',
    'footer.links.citizenship': 'Ciudadanía',
    'footer.links.guides': 'Guías',

    'title.index': 'Civora — Abriendo puertas para estudiantes nepaleses',
    'title.about': 'Acerca de Civora',
    'title.sch': 'Becas para estudiantes nepaleses — Civora',
    'title.cit': 'Rutas de residencia y ciudadanía — Civora',
    'title.guides': 'Guías y plantillas de solicitud — Civora',

    'index.hero_title': 'Civora',
    'index.tagline': 'Abriendo puertas para que estudiantes nepaleses estudien, trabajen y pertenezcan en todo el mundo.',
    'index.intro': 'Civora es un centro basado en investigación que reúne becas verificadas, rutas claras de visa y residencia, y recursos prácticos. Todo está diseñado para hacer más accesible la educación y movilidad internacional.',
    'index.cta_primary': 'Explorar becas',
    'index.cta_secondary': 'Guías y plantillas',
    'index.card_sch_title': 'Base de becas',
    'index.card_sch_desc': 'Oportunidades verificadas en curso — filtra por país, fecha límite y elegibilidad.',
    'index.card_cit_title': 'Ciudadanía y residencia',
    'index.card_cit_desc': 'Rutas rápidas y enlaces oficiales: estudio → trabajo → PR → ciudadanía.',
    'index.card_prep_title': 'IELTS y Preparación',
    'index.card_prep_desc': 'Recursos gratuitos, materiales de práctica y consejos de expertos para dominar tus exámenes de competencia en inglés.',
    'index.mission_title': 'Misión',
    'index.mission_body': 'Civora ayuda a estudiantes nepaleses a acceder a oportunidades educativas globales. Proporcionamos becas verificadas, vías de inmigración claras y documentos prácticos.',

    'about.title': 'Acerca de Civora',
    'about.body': 'Fundé Civora para que las oportunidades globales sean más accesibles a estudiantes nepaleses. Tras pasar por becas, visas y ciudadanía, quise compartir recursos verificados en un solo lugar. Un proyecto de estudiantes, para estudiantes.',

    'sch.title': 'Becas para estudiantes nepaleses',
    'sch.intro': 'Esta página compila becas vigentes para las que estudiantes nepaleses son elegibles. Cada entrada está verificada y enlaza a la fuente oficial. Puedes integrar tu Google Sheet o usar el conjunto de demostración.',
    'sch.demo_heading': 'Conjunto de datos demo (filtrable)',
    'sch.demo_intro': 'Úsalo hasta que tu Todos los enlaces van a páginas oficiales.',
    'sch.filter_search_placeholder': 'Buscar por nombre o palabra clave',
    'sch.filter_all_countries': 'Todos los países/regiones',
    'sch.filter_all_levels': 'Todos los niveles',
    'sch.filter_bachelors': 'Grado',
    'sch.filter_masters': 'Máster',
    'sch.filter_phd': 'Doctorado',
    'sch.filter_full_only': 'Solo totalmente financiadas',
    'sch.th_name': 'Beca',
    'sch.th_country': 'País/Región',
    'sch.th_level': 'Nivel',
    'sch.th_funding': 'Financiación',
    'sch.th_deadline': 'Plazo',
    'sch.results': '{count} resultado(s)',

    'cit.title': 'Rutas de ciudadanía y residencia',
    'cit.intro': 'Visas, residencias y ciudadanía pueden ser complejas. Resumimos rutas verificadas: alternancia en Francia, pasos en la UE y comparativas por región.',
    'cit.li1': 'Francia Alternance → Vía trabajo-estudio desde el segundo año.',
    'cit.li2': 'Residencia UE → Rutas vía estudios + empleo.',
    'cit.li3': 'Otras regiones → Comparativas Asia, EE. UU., etc.',


    'guides.title': 'Guías y plantillas de solicitud',
    'guides.intro': 'Herramientas prácticas para preparar solicitudes internacionales.',
    'guides.checklist': 'Lista de verificación',
    'guides.li1': 'Plantilla de carta de patrocinio.',
    'guides.li2': 'Lista de comprobación financiera.',
    'guides.li3': 'Cronograma (preparación idioma → visa → matrícula).',
  },

  ur: {
    'nav.menu': 'مینو',
    'nav.home': 'ہوم',
    'nav.scholarships': 'اسکالرشپس',
    'nav.citizenship': 'شہریت',
    'nav.guides': 'رہنمائیں',
    'nav.about': 'تعارف',

    'footer.links.about': 'تعارف',
    'footer.links.scholarships': 'اسکالرشپس',
    'footer.links.citizenship': 'شہریت',
    'footer.links.guides': 'رہنمائیں',

    'title.index': 'Civora — نیپالی طلبہ کے لیے مواقع',
    'title.about': 'Civora — تعارف',
    'title.sch': 'نیپالی طلبہ کے لیے اسکالرشپس — Civora',
    'title.cit': 'رہائش اور شہریت کے راستے — Civora',
    'title.guides': 'درخواست کی رہنمائیں اور ٹیمپلیٹس — Civora',

    'index.hero_title': 'Civora',
    'index.tagline': 'نیپالی طلبہ کے لیے دنیا بھر میں پڑھائی، کام اور رہائش کے دروازے کھولنا۔',
    'index.intro': 'Civora تحقیق پر مبنی مرکز ہے: مصدقہ اسکالرشپس، واضح ویزا و رہائش کے راستے، اور عملی مطالعہ وسائل۔ مقصد بین الاقوامی تعلیم کو قابل رسائی بنانا ہے۔',
    'index.cta_primary': 'اسکالرشپس دیکھیں',
    'index.cta_secondary': 'رہنمائیں اور ٹیمپلیٹس',
    'index.card_sch_title': 'اسکالرشپس ڈیٹابیس',
    'index.card_sch_desc': 'مصدقہ مواقع — ملک، آخری تاریخ اور اہلیت کے مطابق فلٹر کریں۔',
    'index.card_cit_title': 'شہریت اور رہائش',
    'index.card_cit_desc': 'مطالعہ → کام → پی آر → شہریت کے لیے تیز راستے اور سرکاری لنکس۔',
    'index.card_prep_title': 'IELTS اور ٹیسٹ کی تیاری',
    'index.card_prep_desc': 'مفت وسائل، مشق کا مواد، اور انگریزی مہارت کے امتحانات میں کامیابی کے لیے ماہرین کے مشورے۔',
    'index.mission_title': 'مقصد',
    'index.mission_body': 'Civora نیپالی طلبہ کو عالمی تعلیمی مواقع تک رسائی میں مدد کرتا ہے۔ ہم تصدیق شدہ اسکالرشپس، واضح امیگریشن راستے، اور عملی دستاویزات فراہم کرتے ہیں۔',

    'about.title': 'Civora — تعارف',
    'about.body': 'میں نے Civora اس لیے شروع کیا کہ نیپالی طلبہ کے لیے عالمی مواقع زیادہ قابلِ رسائی ہوں۔ اسکالرشپس، ویزا اور شہریت کے نظام سے گزر کر، میں نے مصدقہ وسائل ایک جگہ جمع کیے ہیں۔ یہ منصوبہ طلبہ کی جانب سے، طلبہ کے لیے ہے۔',

    'sch.title': 'نیپالی طلبہ کے لیے اسکالرشپس',
    'sch.intro': 'یہ صفحہ جاری اسکالرشپس کو یکجا کرتا ہے۔ ہر اندراج سرکاری ماخذ سے منسلک ہے۔ آپ اپنا Google Sheet ضم کر سکتے ہیں یا ڈیمو ڈیٹا استعمال کریں۔',
    'sch.demo_heading': 'ڈیمو ڈیٹا سیٹ (قابلِ فلٹر)',
    'sch.demo_intro': 'جب تک آپ کی شیٹ تیار نہ ہو، اسے استعمال کریں۔ تمام لنکس سرکاری صفحات پر جاتے ہیں۔',
    'sch.filter_search_placeholder': 'نام یا کلیدی لفظ سے تلاش کریں',
    'sch.filter_all_countries': 'تمام ممالک/علاقے',
    'sch.filter_all_levels': 'تمام درجات',
    'sch.filter_bachelors': 'بیچلرز',
    'sch.filter_masters': 'ماسٹرز',
    'sch.filter_phd': 'پی ایچ ڈی',
    'sch.filter_full_only': 'صرف مکمل فنڈڈ',
    'sch.th_name': 'اسکالرشپ',
    'sch.th_country': 'ملک/علاقہ',
    'sch.th_level': 'درجہ',
    'sch.th_funding': 'فنڈنگ',
    'sch.th_deadline': 'آخری تاریخ',
    'sch.results': '{count} نتائج',

    'cit.title': 'شہریت اور رہائش کے راستے',
    'cit.intro': 'ویزا، رہائش اور شہریت کے راستے پیچیدہ ہو سکتے ہیں۔ اس حصے میں فرانس کی alternance، یورپی مراحل اور دیگر علاقوں کی تقابل شامل ہیں۔',
    'cit.li1': 'فرانس Alternance → دوسرے سال سے ورک-اسٹڈی رہائش راستہ۔',
    'cit.li2': 'یورپی رہائش → تعلیم + ملازمت کے ذریعے راستے۔',
    'cit.li3': 'دیگر خطے → ایشیا، امریکہ وغیرہ پر تقابل کے نوٹس۔',


    'guides.title': 'درخواست کی رہنمائیں اور ٹیمپلیٹس',
    'guides.intro': 'بین الاقوامی درخواست کی تیاری کے لیے عملی اوزار۔',
    'guides.checklist': 'چیک لسٹ',
    'guides.li1': 'اسپانسر خط ٹیمپلیٹ۔',
    'guides.li2': 'مالی ثبوت کی چیک لسٹ۔',
    'guides.li3': 'ٹائم لائن (زبان کی تیاری → ویزا → داخلہ)۔',
  },

  hi: {
    'nav.menu': 'मेनू',
    'nav.home': 'होम',
    'nav.scholarships': 'छात्रवृत्तियाँ',
    'nav.citizenship': 'नागरिकता',
    'nav.guides': 'गाइड्स',
    'nav.about': 'परिचय',

    'footer.links.about': 'परिचय',
    'footer.links.scholarships': 'छात्रवृत्तियाँ',
    'footer.links.citizenship': 'नागरिकता',
    'footer.links.guides': 'गाइड्स',

    'title.index': 'Civora — नेपाली छात्रों के लिए अवसर',
    'title.about': 'Civora — परिचय',
    'title.sch': 'नेपाली छात्रों के लिए छात्रवृत्तियाँ — Civora',
    'title.cit': 'निवास और नागरिकता मार्ग — Civora',
    'title.guides': 'आवेदन गाइड्स और टेम्पलेट्स — Civora',

    'index.hero_title': 'Civora',
    'index.tagline': 'नेपाली छात्रों के लिए दुनिया भर में पढ़ाई, काम और बसने के अवसर खोलना।',
    'index.intro': 'Civora एक रिसर्च-ड्रिवन हब है: सत्यापित छात्रवृत्तियाँ, स्पष्ट वीज़ा/रहवासी मार्ग, और उपयोगी अध्ययन संसाधन।',
    'index.cta_primary': 'छात्रवृत्तियाँ देखें',
    'index.cta_secondary': 'गाइड्स और टेम्पलेट्स',
    'index.card_sch_title': 'छात्रवृत्ति डेटाबेस',
    'index.card_sch_desc': 'सत्यापित अवसर — देश, समयसीमा और पात्रता के अनुसार फ़िल्टर करें।',
    'index.card_cit_title': 'नागरिकता और निवास',
    'index.card_cit_desc': 'स्टडी → वर्क → PR → नागरिकता के लिए तेज़ मार्ग और आधिकारिक लिंक।',
    'index.card_prep_title': 'IELTS और परीक्षा तैयारी',
    'index.card_prep_desc': 'मुफ्त संसाधन, अभ्यास सामग्री, और अंग्रेजी प्रवाहता परीक्षाओं में सफलता के लिए विशेषज्ञ सुझाव।',
    'index.mission_title': 'उद्देश्य',
    'index.mission_body': 'Civora नेपाली छात्रों को वैश्विक शिक्षा के अवसरों तक पहुंचने में मदद करता है। हम सत्यापित छात्रवृत्तियां, स्पष्ट आप्रवासन मार्ग, और व्यावहारिक दस्तावेज प्रदान करते हैं।',

    'about.title': 'Civora — परिचय',
    'about.body': 'मैंने नेपाली छात्रों के लिए वैश्विक अवसरों को सुलभ बनाने के लिए Civora शुरू किया। छात्रवृत्ति, वीज़ा और नागरिकता प्रक्रियाओं से गुजरकर, मैंने सत्यापित संसाधन एक जगह संकलित किए हैं। यह प्रोजेक्ट छात्रों द्वारा, छात्रों के लिए है।',

    'sch.title': 'नेपाली छात्रों के लिए छात्रवत्तियाँ',
    'sch.intro': 'यह पेज चल रही छात्रवत्तियों को संकलित करता है। हर प्रविष्टि आधिकारिक स्रोत से लिंक है। आप अपना Google Sheet एम्बेड कर सकते हैं या डेमो डेटा इस्तेमाल करें।',
    'sch.demo_heading': 'डेमो डेटा सेट (फ़िल्टर योग्य)',
    'sch.demo_intro': 'जब तक आपकी शीट तैयार न हो, इसका उपयोग करें। सभी लिंक आधिकारिक पेज पर जाते हैं।',
    'sch.filter_search_placeholder': 'नाम या कीवर्ड से खोजें',
    'sch.filter_all_countries': 'सभी देश/क्षेत्र',
    'sch.filter_all_levels': 'सभी स्तर',
    'sch.filter_bachelors': 'स्नातक',
    'sch.filter_masters': 'स्नातकोत्तर',
    'sch.filter_phd': 'पीएचडी',
    'sch.filter_full_only': 'केवल पूर्ण फंडेड',
    'sch.th_name': 'छात्रवृत्ति',
    'sch.th_country': 'देश/क्षेत्र',
    'sch.th_level': 'स्तर',
    'sch.th_funding': 'वित्तपोषण',
    'sch.th_deadline': 'अंतिम तारीख',
    'sch.results': '{count} परिणाम',
  },
};

const RTL_LANGS = new Set(['ur']);

function t(key, params = {}, lang) {
  const L = lang || localStorage.getItem('lang') || 'en';
  const pack = I18N[L] || I18N.en;
  let s = (pack && pack[key]) || I18N.en[key] || '';
  if (params && typeof s === 'string') {
    Object.keys(params).forEach(k => {
      s = s.replace(new RegExp(`\\{${k}\}`, 'g'), String(params[k]));
    });
  }
  return s;
}

function applyI18n(lang) {
  const L = lang || localStorage.getItem('lang') || 'en';
  document.documentElement.lang = L;
  document.documentElement.dir = RTL_LANGS.has(L) ? 'rtl' : 'ltr';

  // Update title if it has data-i18n
  const titleEl = document.querySelector('head title[data-i18n]');
  if (titleEl) {
    const key = titleEl.getAttribute('data-i18n');
    if (key) document.title = t(key, {}, L);
  }

  // Text nodes
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (!key) return;
    el.textContent = t(key, {}, L);
  });

  // Placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (!key) return;
    el.setAttribute('placeholder', t(key, {}, L));
  });

  // Re-render page-specific components if needed
  if (typeof window.renderScholarships === 'function') {
    window.renderScholarships();
  }

  // Sync the selector
  const sel = document.getElementById('lang');
  if (sel && sel.value !== L) sel.value = L;
}

// Expose simple translator for inline scripts
window.I18N_T = (key, params) => t(key, params);

// Initialize language control
(function initLang() {
  const sel = document.getElementById('lang');
  const stored = localStorage.getItem('lang') || 'en';
  if (sel) sel.value = stored;

  if (sel) {
    sel.addEventListener('change', () => {
      const next = sel.value || 'en';
      localStorage.setItem('lang', next);
      applyI18n(next);
    });
  }
  applyI18n(stored);
})();

// Collapsible sections functionality
document.addEventListener('DOMContentLoaded', () => {
  const collapsibleHeaders = document.querySelectorAll('.collapsible-header');
  
  collapsibleHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const isExpanded = header.getAttribute('aria-expanded') === 'true';
      const content = header.nextElementSibling;
      const icon = header.querySelector('.collapsible-icon');
      
      // Toggle this section
      header.setAttribute('aria-expanded', !isExpanded);
      
      if (isExpanded) {
        content.style.display = 'none';
        icon.textContent = '▼';
      } else {
        content.style.display = 'block';
        icon.textContent = '▲';
      }
    });
  });
});

// Contact form error handling
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.querySelector('.contact-form');
  const errorMessage = document.getElementById('form-error');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      // Hide any previous error messages
      if (errorMessage) {
        errorMessage.style.display = 'none';
      }
    });

    // Listen for form submission errors (Formspree will handle most of this)
    // But we can add additional client-side validation if needed
    contactForm.addEventListener('invalid', function(e) {
      if (errorMessage) {
        errorMessage.style.display = 'block';
      }
    }, true);
  }
});

// Load and render scholarship spotlight data
async function loadSpotlightData() {
  try {
    const response = await fetch('/assets/data/spotlight.json');
    if (!response.ok) throw new Error('Failed to load spotlight data');
    const data = await response.json();
    renderSpotlight(data);
  } catch (error) {
    console.warn('Could not load spotlight data:', error);
    // Gracefully degrade - leave existing content or show message
  }
}

function renderSpotlight(scholarships) {
  const grid = document.getElementById('spotlight-grid');
  if (!grid) return;

  const now = new Date();
  
  // Filter out expired scholarships
  const activeScholarships = scholarships.filter(scholarship => {
    if (!scholarship.deadline) return true;
    
    let deadline;
    if (scholarship.deadline.includes('-')) {
      // ISO format (YYYY-MM-DD)
      deadline = new Date(scholarship.deadline);
    } else {
      // Month YYYY format - parse differently
      deadline = new Date(scholarship.deadline);
    }
    
    return deadline > now;
  });

  if (activeScholarships.length === 0) {
    grid.innerHTML = '<p class="spotlight-empty">No active scholarships available at this time. Check back soon!</p>';
    return;
  }

  grid.innerHTML = activeScholarships.map(scholarship => {
    const deadlineText = formatDeadline(scholarship.deadline);
    
    return `
      <div class="spotlight-card">
        <div class="spotlight-header">
          <h3>${escapeHtml(scholarship.title)}</h3>
          <span class="spotlight-badge">${escapeHtml(scholarship.badge)}</span>
        </div>
        <p class="spotlight-desc">${escapeHtml(scholarship.description)}</p>
        <div class="spotlight-details">
          <span class="spotlight-deadline">⏰ Deadline: ${deadlineText}</span>
          <span class="spotlight-level">${escapeHtml(scholarship.academic_level)}</span>
        </div>
        <div class="spotlight-actions">
          <a href="${escapeHtml(scholarship.cta_url)}" target="_blank" rel="noopener noreferrer" class="button button-secondary">
            ${escapeHtml(scholarship.cta_text)}
          </a>
          ${scholarship.source_url ? `
            <a href="${escapeHtml(scholarship.source_url)}" target="_blank" rel="noopener noreferrer" class="spotlight-source">
              Official source
            </a>
          ` : ''}
        </div>
      </div>
    `;
  }).join('');
}

function formatDeadline(deadline) {
  if (!deadline) return 'See official source';
  
  try {
    let date;
    if (deadline.includes('-')) {
      // ISO format
      date = new Date(deadline);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } else {
      // Month YYYY format - return as is
      return deadline;
    }
  } catch (error) {
    return deadline; // Return original if parsing fails
  }
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Update last modified dates using document.lastModified
function updateLastModified() {
  const lastUpdatedEl = document.getElementById('last-updated');
  const footerLastUpdatedEl = document.getElementById('footer-last-updated');
  
  if (lastUpdatedEl || footerLastUpdatedEl) {
    try {
      const lastModified = new Date(document.lastModified);
      const formatted = lastModified.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long' 
      });
      
      if (lastUpdatedEl) lastUpdatedEl.textContent = formatted;
      if (footerLastUpdatedEl) footerLastUpdatedEl.textContent = formatted;
    } catch (error) {
      // Fallback to current date
      const now = new Date();
      const formatted = now.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long' 
      });
      
      if (lastUpdatedEl) lastUpdatedEl.textContent = formatted;
      if (footerLastUpdatedEl) footerLastUpdatedEl.textContent = formatted;
    }
  }
}

function trackScholarshipInteractions() {
  // Track search usage
  const searchInput = document.getElementById('q');
  if (searchInput) {
    let searchTimeout;
    searchInput.addEventListener('input', function() {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        if (this.value.length > 2 && typeof gtag !== 'undefined') {
          gtag('event', 'search', {
            'search_term': this.value,
            'event_category': 'scholarship_search'
          });
        }
      }, 1000);
    });
  }

  // Track filter usage
  const filterSelects = document.querySelectorAll('#country, #level');
  filterSelects.forEach(select => {
    select.addEventListener('change', function() {
      if (typeof gtag !== 'undefined') {
        gtag('event', 'filter_change', {
          'filter_type': this.id,
          'filter_value': this.value,
          'event_category': 'scholarship_filter'
        });
      }
    });
  });
}

// Intersection Observer for Reveal Animations
function initRevealAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('is-visible');
        }, index * 90); // Stagger by 90ms
      }
    });
  }, observerOptions);

  // Observe all elements with .reveal class
  document.querySelectorAll('.reveal').forEach(element => {
    observer.observe(element);
  });

  // Auto-add reveal class to stat cards and feature cards
  document.querySelectorAll('.stat-card, .feature-card, .timeline-step').forEach(element => {
    element.classList.add('reveal');
    observer.observe(element);
  });
}

// Initialize spotlight and last modified on page load
document.addEventListener('DOMContentLoaded', function() {
  loadSpotlightData();
  updateLastModified();
  initializeAnalytics();
  initRevealAnimations();
});

// Analytics tracking functions
function initializeAnalytics() {
  // Track form submissions
  trackFormSubmissions();
  // Track external link clicks
  trackExternalLinks();
  // Track scholarship searches
  trackScholarshipInteractions();
}

function trackFormSubmissions() {
  // Story submission form
  const storyForm = document.querySelector('.story-form');
  if (storyForm) {
    storyForm.addEventListener('submit', function() {
      if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submit', {
          'form_type': 'success_story',
          'event_category': 'engagement',
          'event_label': 'Student Story Submission'
        });
      }
    });
  }

  // Contact forms
  const contactForms = document.querySelectorAll('form[action*="formspree.io"]');
  contactForms.forEach(form => {
    if (!form.classList.contains('story-form')) {
      form.addEventListener('submit', function() {
        if (typeof gtag !== 'undefined') {
          gtag('event', 'form_submit', {
            'form_type': 'contact',
            'event_category': 'engagement',
            'event_label': 'Contact Form'
          });
        }
      });
    }
  });
}

function trackExternalLinks() {
  // Track scholarship link clicks
  document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (!link) return;
    
    const href = link.getAttribute('href');
    if (!href) return;
    
    // Track external scholarship links
    if (href.includes('http') && !href.includes(window.location.hostname)) {
      if (typeof gtag !== 'undefined') {
        gtag('event', 'click', {
          'event_category': 'external_link',
          'event_label': href,
          'transport_type': 'beacon'
        });
      }
    }
  });
}