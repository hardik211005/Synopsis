const stopword = require('stopword');

// Custom noise words to ignore
const CUSTOM_STOPWORDS = [
  'experience', 'work', 'working', 'responsibilities', 'responsible', 'required', 'requirement', 'requirements',
  'candidate', 'ability', 'abilities', 'strong', 'excellent', 'good', 'role', 'team', 'company', 'position',
  'opportunity', 'qualification', 'qualifications', 'years', 'year', 'day', 'days', 'must', 'have', 'with', 'and',
  'looking', 'join', 'successful', 'degree', 'bachelor', 'master', 'skills', 'skill', 'project', 'projects',
  'include', 'including', 'knowledge', 'understanding', 'familiarity', 'environment', 'solutions', 'tasks'
];

// Dictionary of known technical skills & frameworks for accurate categorization
const KNOWN_TECH_SKILLS = new Set([
  'react', 'reactjs', 'node', 'nodejs', 'express', 'expressjs', 'mongodb', 'python', 'javascript', 'typescript',
  'java', 'c++', 'cpp', 'c#', 'csharp', 'sql', 'postgresql', 'mysql', 'redis', 'graphql', 'rest', 'api', 'aws',
  'docker', 'kubernetes', 'terraform', 'git', 'github', 'ci/cd', 'html', 'css', 'tailwind', 'bootstrap',
  'redux', 'nextjs', 'vite', 'jest', 'cypress', 'pandas', 'numpy', 'scikit-learn', 'pytorch', 'tensorflow',
  'nlp', 'llm', 'tableau', 'powerbi', 'figma', 'jira', 'agile', 'scrum', 'devops', 'linux', 'siem', 'security'
]);

/**
 * Tokenizes text, cleans lowercase words, handles tech tokens (e.g. node.js, c++, c#).
 */
function tokenizeAndClean(text) {
  if (!text || typeof text !== 'string') return [];

  const normalized = text.toLowerCase()
    .replace(/node\.js/g, 'nodejs')
    .replace(/react\.js/g, 'reactjs')
    .replace(/vue\.js/g, 'vuejs')
    .replace(/next\.js/g, 'nextjs')
    .replace(/c\+\+/g, 'cpp')
    .replace(/c#/g, 'csharp')
    .replace(/\.net/g, 'dotnet')
    .replace(/ci\/cd/g, 'cicd')
    .replace(/rest api/g, 'restapi');

  const rawTokens = normalized.match(/[a-z0-9]+/g) || [];
  const cleanTokens = stopword.removeStopwords(rawTokens);

  return cleanTokens.filter(token => token.length >= 2 && !CUSTOM_STOPWORDS.includes(token));
}

/**
 * Extract Bigrams (2-word phrases like "machine learning", "data science", "unit testing")
 */
function extractBigrams(text) {
  if (!text || typeof text !== 'string') return [];
  
  const words = text.toLowerCase().match(/[a-z0-9]+/g) || [];
  const bigrams = [];

  for (let i = 0; i < words.length - 1; i++) {
    const w1 = words[i];
    const w2 = words[i + 1];

    if (w1.length > 2 && w2.length > 2 && !CUSTOM_STOPWORDS.includes(w1) && !CUSTOM_STOPWORDS.includes(w2)) {
      const phrase = `${w1} ${w2}`;
      // Filter high-value phrases
      if (
        phrase.includes('machine learning') || phrase.includes('data science') ||
        phrase.includes('unit testing') || phrase.includes('cloud computing') ||
        phrase.includes('user experience') || phrase.includes('user interface') ||
        phrase.includes('software engineering') || phrase.includes('full stack') ||
        phrase.includes('front end') || phrase.includes('back end') ||
        phrase.includes('web development') || phrase.includes('version control') ||
        phrase.includes('continuous integration') || phrase.includes('product management')
      ) {
        bigrams.push(phrase);
      }
    }
  }

  return bigrams;
}

/**
 * Categorize keyword into domain tags
 */
function categorizeKeyword(word) {
  const w = word.toLowerCase();
  if (KNOWN_TECH_SKILLS.has(w)) {
    return 'Technical Skill';
  }
  if (['figma', 'tableau', 'powerbi', 'jira', 'docker', 'kubernetes', 'terraform', 'git', 'aws', 'redis'].includes(w)) {
    return 'Tools & Platforms';
  }
  if (['agile', 'scrum', 'leadership', 'collaboration', 'communication', 'management'].includes(w)) {
    return 'Methodology & Soft Skills';
  }
  return 'Core Keyword';
}

/**
 * Detect Section Headings with Regex
 */
function detectSections(resumeText) {
  const lower = resumeText.toLowerCase();

  const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(resumeText);
  const hasPhone = /(\+\d{1,3}[\s-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/.test(resumeText);
  const hasLinkedIn = /linkedin\.com|github\.com|portfolio|email|phone/i.test(resumeText);
  const contactInfo = hasEmail || hasPhone || hasLinkedIn;

  const education = /(education|academic|university|bachelor|master|degree|college|institute|gpa)/i.test(lower);
  const experience = /(experience|work history|employment|professional background|internship|position|career)/i.test(lower);
  const projects = /(projects|portfolio|personal projects|key projects|academic projects)/i.test(lower);
  const skills = /(skills|technical skills|technologies|tools|competencies|expertise|programming)/i.test(lower);

  return {
    contactInfo: !!contactInfo,
    education: !!education,
    experience: !!experience,
    projects: !!projects,
    skills: !!skills,
  };
}

/**
 * Measure Impact & Quantifiable Metrics in Resume Text
 * Looks for percentages (e.g. 30%), dollar amounts ($50k), and metrics numbers
 */
function evaluateImpactMetrics(resumeText) {
  const percentMatches = resumeText.match(/\b\d+(\.\d+)?%\b/g) || [];
  const dollarMatches = resumeText.match(/\$\d+([kKmMbB]|\,\d{3})*/g) || [];
  const metricNumbers = resumeText.match(/\b(increased|reduced|improved|grew|managed|led|saved|built|scaled)\s+(\w+\s+){0,3}\d+/gi) || [];

  const totalImpactCount = percentMatches.length + dollarMatches.length + metricNumbers.length;

  let score = 50; // Base score
  if (totalImpactCount >= 5) score = 100;
  else if (totalImpactCount >= 3) score = 85;
  else if (totalImpactCount >= 1) score = 70;

  return {
    score,
    count: totalImpactCount,
    percentMatches,
    dollarMatches,
  };
}

/**
 * Multi-Pillar ATS Compatibility Analysis
 */
function analyzeResumeAgainstJD(resumeText, jobDescriptionText) {
  const resumeTokens = tokenizeAndClean(resumeText);
  const resumeTokenSet = new Set(resumeTokens);
  const resumeLower = resumeText.toLowerCase();

  // Extract JD unigrams & bigrams
  const jdTokens = tokenizeAndClean(jobDescriptionText);
  const jdBigrams = extractBigrams(jobDescriptionText);

  // Term Frequency for JD
  const freqMap = {};
  for (const t of jdTokens) {
    freqMap[t] = (freqMap[t] || 0) + 1;
  }

  // Sort by frequency
  const sortedKeywords = Object.entries(freqMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 30)
    .map(([word, count]) => ({
      word,
      count,
      category: categorizeKeyword(word),
    }));

  const matchedKeywords = [];
  const missingKeywords = [];

  for (const item of sortedKeywords) {
    if (resumeTokenSet.has(item.word)) {
      matchedKeywords.push(item);
    } else {
      missingKeywords.push(item);
    }
  }

  // Check bigram matches
  for (const bg of jdBigrams) {
    if (resumeLower.includes(bg)) {
      if (!matchedKeywords.some(k => k.word === bg)) {
        matchedKeywords.push({ word: bg, count: 2, category: 'Key Phrase' });
      }
    } else {
      if (!missingKeywords.some(k => k.word === bg)) {
        missingKeywords.push({ word: bg, count: 2, category: 'Key Phrase' });
      }
    }
  }

  // 1. Keyword Match Score (Weight: 50%)
  const totalKeywordsToMatch = sortedKeywords.length + jdBigrams.length;
  const matchRatio = totalKeywordsToMatch > 0 ? matchedKeywords.length / totalKeywordsToMatch : 0;
  const keywordMatchScore = Math.round(matchRatio * 100);

  // 2. Section Completeness Score (Weight: 20%)
  const sections = detectSections(resumeText);
  const sectionCount = Object.values(sections).filter(Boolean).length;
  const sectionScore = Math.round((sectionCount / 5) * 100);

  // 3. Impact & Quantifiable Results Score (Weight: 15%)
  const impactEval = evaluateImpactMetrics(resumeText);
  const impactMetricScore = impactEval.score;

  // 4. Document Formatting & Action Verbs (Weight: 15%)
  const wordCount = resumeText.split(/\s+/).filter(Boolean).length;
  const actionVerbs = ['developed', 'engineered', 'built', 'led', 'designed', 'implemented', 'optimized', 'architected', 'created', 'managed', 'spearheaded', 'delivered'];
  const actionVerbCount = actionVerbs.filter(v => resumeLower.includes(v)).length;
  
  let formattingScore = 80;
  if (wordCount >= 250 && wordCount <= 900) formattingScore += 10;
  if (actionVerbCount >= 4) formattingScore += 10;
  formattingScore = Math.min(100, formattingScore);

  // Composite Overall ATS Score (0 - 100)
  const compositeScore = Math.round(
    keywordMatchScore * 0.50 +
    sectionScore * 0.20 +
    impactMetricScore * 0.15 +
    formattingScore * 0.15
  );

  const atsScore = Math.min(100, Math.max(0, compositeScore));

  // Determine Verdict
  let verdict = 'Needs work';
  if (atsScore >= 75) {
    verdict = 'Strong match';
  } else if (atsScore >= 45) {
    verdict = 'Moderate match';
  }

  // Generate Categorized Actionable Suggestions
  const suggestions = [];

  if (missingKeywords.length > 0) {
    const topTechMissing = missingKeywords
      .filter(k => k.category === 'Technical Skill' || k.category === 'Tools & Platforms')
      .slice(0, 5)
      .map(k => k.word)
      .join(', ');

    if (topTechMissing) {
      suggestions.push({
        category: 'Missing Technical Skills',
        text: `Incorporate high-priority technical terms into your skills/experience section: ${topTechMissing}.`,
        type: 'critical',
      });
    }
  }

  if (!sections.skills) {
    suggestions.push({
      category: 'Section Formatting',
      text: 'Add an explicitly labeled "Technical Skills" heading so ATS scanners accurately parse your stack.',
      type: 'critical',
    });
  }

  if (!sections.experience) {
    suggestions.push({
      category: 'Section Formatting',
      text: 'Include a clearly labeled "Work Experience" section with bulleted achievements.',
      type: 'critical',
    });
  }

  if (impactEval.count < 3) {
    suggestions.push({
      category: 'Measurable Impact',
      text: 'Add quantifiable metrics (e.g. "Improved page load speed by 35%", "Managed $50k budget") to demonstrate impact.',
      type: 'warning',
    });
  }

  if (actionVerbCount < 3) {
    suggestions.push({
      category: 'Action Verbs',
      text: 'Begin bullet points with strong action verbs such as Engineered, Spearheaded, Optimized, and Architected.',
      type: 'tip',
    });
  }

  return {
    atsScore,
    verdict,
    scoreBreakdown: {
      keywordMatchScore,
      sectionScore,
      impactMetricScore,
      formattingScore,
    },
    matchedKeywords: matchedKeywords.map(k => k.word),
    missingKeywords: missingKeywords.map(k => k.word),
    categorizedMatched: matchedKeywords,
    categorizedMissing: missingKeywords,
    sectionsDetected: sections,
    impactMetricsCount: impactEval.count,
    suggestions,
    wordCount,
  };
}

/**
 * Cosine similarity between resume token frequencies and job token frequencies.
 */
function calculateCosineSimilarity(resumeText, jobDescriptionText) {
  const rTokens = tokenizeAndClean(resumeText);
  const jTokens = tokenizeAndClean(jobDescriptionText);

  if (rTokens.length === 0 || jTokens.length === 0) return 0;

  const rFreq = {};
  for (const t of rTokens) rFreq[t] = (rFreq[t] || 0) + 1;

  const jFreq = {};
  for (const t of jTokens) jFreq[t] = (jFreq[t] || 0) + 1;

  const allWords = new Set([...Object.keys(rFreq), ...Object.keys(jFreq)]);

  let dotProduct = 0;
  let rMag = 0;
  let jMag = 0;

  for (const word of allWords) {
    const rVal = rFreq[word] || 0;
    const jVal = jFreq[word] || 0;

    dotProduct += rVal * jVal;
    rMag += rVal * rVal;
    jMag += jVal * jVal;
  }

  rMag = Math.sqrt(rMag);
  jMag = Math.sqrt(jMag);

  if (rMag === 0 || jMag === 0) return 0;

  const similarity = dotProduct / (rMag * jMag);
  return Math.round(Math.min(1, similarity * 2.3) * 100);
}

module.exports = {
  tokenizeAndClean,
  extractBigrams,
  detectSections,
  evaluateImpactMetrics,
  analyzeResumeAgainstJD,
  calculateCosineSimilarity,
};
