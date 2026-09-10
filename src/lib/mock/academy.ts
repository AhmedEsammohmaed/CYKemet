import courseImage from '@/assets/images/course-example.png'
import instructorImage from '@/assets/images/instructor-example.png'

import type {
  AcademyCourse,
  AcademyStats,
  CourseDetail,
  AcademySubscription,
  AcademyGift,
  AcademyCertification,
  CertificationDetail,
  AcademyInternship,
  InternshipDetail,
} from '@/types'

export const mockHackerCoinsBalance = 558789

export const mockAcademyStats: AcademyStats = {
  coinsAvailable: 245896,
}

export const mockAcademyCourses: AcademyCourse[] = [
  {
    id: 'course-001',
    title: 'Web Application Security Essentials',
    description: 'Learn how to identify, exploit, and responsibly report real-world web vulnerabilities.',
    instructor: 'DR. Sara Tawfeek',
    priceCoins: 345,
    studentsCount: 1256,
    durationWeeks: 10,
    rating: 2.6,
    thumbnailUrl: courseImage.src,
    difficulty: 'beginner',
  },
  {
    id: 'course-002',
    title: 'Network Penetration Testing',
    description: 'Master the techniques used by professional penetration testers to find and exploit network vulnerabilities.',
    instructor: 'DR. Ahmed Khalil',
    priceCoins: 490,
    studentsCount: 873,
    durationWeeks: 8,
    rating: 4.1,
    thumbnailUrl: courseImage.src,
    difficulty: 'intermediate',
  },
  {
    id: 'course-003',
    title: 'Mobile Security & Bug Bounty',
    description: 'Deep-dive into iOS and Android security testing with hands-on labs and real bug bounty targets.',
    instructor: 'DR. Sara Tawfeek',
    priceCoins: 399,
    studentsCount: 542,
    durationWeeks: 6,
    rating: 3.8,
    thumbnailUrl: courseImage.src,
    difficulty: 'intermediate',
  },
  {
    id: 'course-004',
    title: 'Advanced OSINT Techniques',
    description: 'Leverage open-source intelligence tools and methodologies for reconnaissance during security assessments.',
    instructor: 'DR. Omar Farouk',
    priceCoins: 275,
    studentsCount: 2041,
    durationWeeks: 4,
    rating: 4.5,
    thumbnailUrl: courseImage.src,
    difficulty: 'advanced',
  },
]

export const mockCourseDetail: CourseDetail = {
  id: 'course-001',
  title: 'Web Application Security Essentials',
  description: 'Learn how to identify, exploit, and responsibly report real-world web vulnerabilities through hands-on labs and guided challenges.',
  level: 'advanced',
  studentsCount: 1256,
  rating: 4.6,
  durationWeeks: 10,
  priceCoins: 345,
  instructor: {
    name: 'DR. Sara Tawfeek',
    title: 'Senior Security Researcher & Certified Ethical Hacker',
    bio: 'Sara has over 10 years of experience in offensive security, bug bounty hunting, and secure application development. She has trained hundreds of security professionals across the Middle East and North Africa.',
    linkedinUrl: 'https://linkedin.com',
    githubUrl: 'https://github.com',
    avatarUrl: instructorImage.src,
  },
  whatYouWillLearn: [
    'Understand the OWASP Top 10 and how to test for each vulnerability',
    'Perform manual and automated web application penetration tests',
    'Write professional, high-quality vulnerability reports',
    'Use tools like Burp Suite, OWASP ZAP, and Nikto',
    'Develop a responsible disclosure mindset',
    'Submit your first bug bounty report with confidence',
  ],
  modules: [
    { id: 'm-01', title: 'Introduction to Web Security',              duration: '45 min' },
    { id: 'm-02', title: 'HTTP Fundamentals & Burp Suite Setup',      duration: '1h 10min' },
    { id: 'm-03', title: 'Injection Attacks (SQLi, XSS, SSTI)',       duration: '2h 30min' },
    { id: 'm-04', title: 'Authentication & Session Management',       duration: '1h 45min' },
    { id: 'm-05', title: 'Broken Access Control',                     duration: '1h 20min' },
    { id: 'm-06', title: 'Security Misconfiguration & XXE',           duration: '1h 05min' },
    { id: 'm-07', title: 'SSRF & Insecure Deserialization',           duration: '1h 30min' },
    { id: 'm-08', title: 'API Security Testing',                      duration: '2h 00min' },
    { id: 'm-09', title: 'Bug Bounty Methodology & Reporting',        duration: '1h 15min' },
    { id: 'm-10', title: 'Final Lab & Capstone Challenge',            duration: '3h 00min' },
  ],
  requirements: [
    'Basic knowledge of HTML, HTTP, and how websites work',
    'A computer with at least 8 GB RAM to run virtual machines',
    'Familiarity with Linux command line basics',
    'Curiosity and a willingness to learn offensive security ethically',
  ],
  includes: [
    '10 weeks of structured, self-paced content',
    'Hands-on labs and real-world targets',
    'Downloadable cheat sheets and reference guides',
    'Certificate of completion upon passing the final assessment',
  ],
  totalModules: 10,
  totalLessons: 42,
}

// ── SUBSCRIPTIONS ─────────────────────────────────────────────────────────────

export const mockSubscriptions: AcademySubscription[] = [
  {
    id: 'sub-001',
    name: 'PenTester Lab',
    description: 'Unlock unlimited access to 150+ real-world cybersecurity labs, practice environments, and security tools. Master penetration testing, vulnerability assessment, and ethical hacking through hands-on challenges designed for professional security researchers.',
    level: 'beginner',
    subscribersCount: 1267,
    rating: 4.9,
    durationWeeks: 10,
    priceCoins: 345263,
    about: "Gain unlimited access to our advanced cybersecurity lab environment designed for ethical hackers, penetration testers, and security researchers.\n\nThis subscription provides you with a comprehensive platform to sharpen your skills, practice real-world attacks, and master cutting-edge security techniques.\n\nWhether you're preparing for certifications, conducting security research, or staying ahead of emerging threats, this subscription gives you the tools and environments you need to succeed.",
    whatYouGetAccess: [
      '150+ hands-on security labs covering OWASP Top 10 vulnerabilities',
      'Isolated virtual environments for safe exploitation practice',
      'Weekly updated scenarios based on latest CVEs and exploits',
      'Detailed walkthroughs and video tutorials for each lab',
    ],
    prerequisites: [
      'Basic understanding of networking concepts (TCP/IP, HTTP/HTTPS)',
      'Familiarity with Linux command line',
      'Basic programming knowledge (Python, Bash recommended)',
      'Understanding of common web vulnerabilities (XSS, SQLi, CSRF)',
    ],
    recommendedTools: [
      'Burp Suite Professional (recommended) or Community Edition',
      'Kali Linux or Parrot OS (virtual machine or native)',
      'Metasploit Framework',
      'Wireshark for network analysis',
    ],
    systemRequirements: [
      'Stable internet connection (minimum 10 Mbps recommended)',
      'VPN client for secure lab access (OpenVPN compatible)',
      'Modern web browser (Chrome, Firefox, or Edge)',
      'Minimum 8GB RAM, 50GB free disk space',
    ],
    labEnvironment: {
      totalLabs: '150+ hands-on security challenges',
      difficulties: ['advanced', 'intermediate', 'beginner'],
      realWorldScenarios: [
        'E-commerce application with payment processing vulnerabilities',
        'Corporate network with Active Directory misconfigurations',
        'Cloud infrastructure with IAM privilege escalation paths',
        'Mobile banking app with authentication bypass vulnerabilities',
        'API gateway with OAuth 2.0 implementation flaws',
      ],
      progressFeatures: [
        'Detailed dashboard showing completion rate and time spent',
        'Point-based scoring system with global leaderboards',
        'Achievement badges for milestone completions',
        'Skill assessment reports for resume and portfolio',
      ],
    },
    accessDuration: 'Your subscription provides 3 months of unlimited access to all labs and features. Access begins immediately after subscription and expires 90 days from the purchase date',
    renewalPolicy: [
      'This is a non-recurring subscription. You will not be charged automatically',
      "You'll receive notifications 7 days and 1 day before expiration",
      'Renewal can be purchased at any time, even before expiration',
      'All progress and lab completions are saved permanently on your account',
    ],
    refundPolicy: "7-Day Money-Back Guarantee: If you're not satisfied within the first 7 days, you can request a full refund (points credited back to your account).",
    careerImpact: 'Completing this subscription demonstrates practical, hands-on cybersecurity skills to potential employers. Many of our users have successfully transitioned into penetration testing, security consulting, and bug bounty hunting roles after completing these labs.',
  },
  {
    id: 'sub-002',
    name: 'PenTester Lab',
    description: 'Unlock unlimited access to 150+ real-world cybersecurity labs, practice environments, and security tools.',
    level: 'intermediate',
    subscribersCount: 987,
    rating: 4.7,
    durationWeeks: 8,
    priceCoins: 280000,
    about: 'Advanced cybersecurity lab environment for intermediate practitioners.',
    whatYouGetAccess: ['100+ security labs', 'Virtual environments', 'Weekly CVE updates'],
    prerequisites: ['Networking basics', 'Linux command line'],
    recommendedTools: ['Burp Suite', 'Kali Linux'],
    systemRequirements: ['10 Mbps internet', 'Modern browser', '8GB RAM'],
    labEnvironment: { totalLabs: '100+ challenges', difficulties: ['intermediate', 'beginner'], realWorldScenarios: [], progressFeatures: [] },
    accessDuration: '2 months access',
    renewalPolicy: ['Non-recurring subscription'],
    refundPolicy: '7-day money-back guarantee',
    careerImpact: 'Strengthens your security career profile.',
  },
  {
    id: 'sub-003',
    name: 'PenTester Lab',
    description: 'Unlock unlimited access to 150+ real-world cybersecurity labs.',
    level: 'advanced',
    subscribersCount: 543,
    rating: 4.8,
    durationWeeks: 12,
    priceCoins: 420000,
    about: 'Expert-level cybersecurity lab environment.',
    whatYouGetAccess: ['200+ security labs', 'Expert-only environments'],
    prerequisites: ['Advanced networking', 'Scripting proficiency'],
    recommendedTools: ['Burp Suite Pro', 'Metasploit'],
    systemRequirements: ['High-speed internet', '16GB RAM'],
    labEnvironment: { totalLabs: '200+ expert challenges', difficulties: ['advanced'], realWorldScenarios: [], progressFeatures: [] },
    accessDuration: '4 months access',
    renewalPolicy: ['Non-recurring subscription'],
    refundPolicy: '7-day money-back guarantee',
    careerImpact: 'Demonstrates expert-level security skills.',
  },
  {
    id: 'sub-004',
    name: 'PenTester Lab',
    description: 'Unlock unlimited access to 150+ real-world cybersecurity labs.',
    level: 'intermediate',
    subscribersCount: 1100,
    rating: 4.5,
    durationWeeks: 6,
    priceCoins: 195000,
    about: 'Foundational cybersecurity lab access.',
    whatYouGetAccess: ['75+ security labs', 'Guided learning paths'],
    prerequisites: ['Basic web knowledge'],
    recommendedTools: ['OWASP ZAP', 'Burp Suite Community'],
    systemRequirements: ['5 Mbps internet', '4GB RAM'],
    labEnvironment: { totalLabs: '75+ challenges', difficulties: ['beginner', 'intermediate'], realWorldScenarios: [], progressFeatures: [] },
    accessDuration: '6 weeks access',
    renewalPolicy: ['Non-recurring subscription'],
    refundPolicy: '7-day money-back guarantee',
    careerImpact: 'Builds foundational security skills.',
  },
]

export const mockSubscriptionDetail: AcademySubscription = mockSubscriptions[0]

// ── GIFTS ─────────────────────────────────────────────────────────────────────

export const mockGifts: AcademyGift[] = [
  { id: 'gift-001', name: 'Mechanical keyboard', description: 'Mechanical keyboard designed for long coding and hacking sessions.', priceCoins: 345, deliveryType: 'physical', deliveryDays: 5, rating: 2.6, level: 'new',   imageUrl: null },
  { id: 'gift-002', name: 'Mechanical keyboard', description: 'Mechanical keyboard designed for long coding and hacking sessions.', priceCoins: 345, deliveryType: 'physical', deliveryDays: 5, rating: 2.6, level: 'pro',   imageUrl: null },
  { id: 'gift-003', name: 'Mechanical keyboard', description: 'Mechanical keyboard designed for long coding and hacking sessions.', priceCoins: 345, deliveryType: 'physical', deliveryDays: 5, rating: 2.6, level: 'elite', imageUrl: null },
  { id: 'gift-004', name: 'Mechanical keyboard', description: 'Mechanical keyboard designed for long coding and hacking sessions.', priceCoins: 345, deliveryType: 'physical', deliveryDays: 5, rating: 2.6, level: 'pro',   imageUrl: null },
  { id: 'gift-005', name: 'Mechanical keyboard', description: 'Mechanical keyboard designed for long coding and hacking sessions.', priceCoins: 345, deliveryType: 'physical', deliveryDays: 5, rating: 2.6, level: 'elite', imageUrl: null },
  { id: 'gift-006', name: 'Mechanical keyboard', description: 'Mechanical keyboard designed for long coding and hacking sessions.', priceCoins: 345, deliveryType: 'physical', deliveryDays: 5, rating: 2.6, level: 'new',   imageUrl: null },
]

// ── CERTIFICATIONS ────────────────────────────────────────────────────────────

export const mockCertifications: AcademyCertification[] = [
  { id: 'cert-001', title: 'Certified web security analyst', description: 'Validate your skills in identifying, exploiting, and reporting real-world security vulnerabilities.', level: 'intermediate', durationHours: 3, format: 'MCQ', rating: 2.6, priceCoins: 345 },
  { id: 'cert-002', title: 'Certified web security analyst', description: 'Validate your skills in identifying, exploiting, and reporting real-world security vulnerabilities.', level: 'intermediate', durationHours: 3, format: 'MCQ', rating: 2.6, priceCoins: 345 },
  { id: 'cert-003', title: 'Certified web security analyst', description: 'Validate your skills in identifying, exploiting, and reporting real-world security vulnerabilities.', level: 'advanced',     durationHours: 3, format: 'MCQ', rating: 2.6, priceCoins: 345 },
  { id: 'cert-004', title: 'Certified web security analyst', description: 'Validate your skills in identifying, exploiting, and reporting real-world security vulnerabilities.', level: 'intermediate', durationHours: 3, format: 'MCQ', rating: 2.6, priceCoins: 345 },
  { id: 'cert-005', title: 'Certified web security analyst', description: 'Validate your skills in identifying, exploiting, and reporting real-world security vulnerabilities.', level: 'advanced',     durationHours: 3, format: 'MCQ', rating: 2.6, priceCoins: 345 },
  { id: 'cert-006', title: 'Certified web security analyst', description: 'Validate your skills in identifying, exploiting, and reporting real-world security vulnerabilities.', level: 'beginner',     durationHours: 3, format: 'MCQ', rating: 2.6, priceCoins: 345 },
]

export const mockCertificationDetail: CertificationDetail = {
  ...mockCertifications[0],
  issuedBy: 'Global Cybersecurity Institute',
  fullDescription: 'This certification is designed to validate your practical cybersecurity skills and real-world vulnerability assessment abilities. It demonstrates your understanding of common attack vectors, security best practices, and responsible disclosure processes. Earning this certification strengthens your professional profile and proves your readiness to work on real security programs and technical challenges',
  discountNote: "you'll receive an exclusive 70% discount code to use when registering for the certification exam, making it more accessible to prove your expertise",
  overview: 'The Certified Web Application Security Professional (CWASP) certification validates your practical knowledge and skills in identifying, exploiting, and mitigating web application vulnerabilities. This certification is designed for bug bounty hunters, penetration testers, and security researchers who want to demonstrate their expertise to potential employers and clients.',
  topicsTestedOn: [
    'SQL injection', 'XSS', 'CSRF', 'IDOR',
    'Auth bypass', 'Path traversal', 'XXE', 'SSRF',
    'RCE', 'Business logic', 'API security', 'Race conditions',
  ],
  requiredKnowledge: [
    'Strong understanding of HTTP/HTTPS protocols and web application architecture',
    'Familiarity with common web vulnerabilities and exploitation techniques',
    'Basic scripting skills in Python, JavaScript, or Bash',
    'Experience using security testing tools like Burp Suite or similar',
  ],
  recommendedBackground: [
    '6+ months of hands-on web application security testing experience',
    'Completion of beginner/intermediate cybersecurity training courses',
    'Active participation in bug bounty programs or CTF competitions',
  ],
  retakePolicy: [
    { step: 1, title: 'Attempt limit',  description: "You're allowed 3 exam attempts per calendar year" },
    { step: 2, title: 'Waiting Period', description: '7-day mandatory waiting period between attempts to allow for additional preparation' },
    { step: 3, title: 'Retake Cost',    description: 'First retake is free, subsequent retakes require 50 platform coins or $25 payment' },
  ],
}

// ── INTERNSHIPS ───────────────────────────────────────────────────────────────

export const mockInternships: AcademyInternship[] = [
  { id: 'intern-001', title: 'Penetration Tester Intern', description: 'Learn how to identify, exploit, and report security vulnerabilities in real-world systems.', location: 'remote',  durationMonths: 2, rating: 2.6, status: 'paid' },
  { id: 'intern-002', title: 'Penetration Tester Intern', description: 'Learn how to identify, exploit, and report security vulnerabilities in real-world systems.', location: 'on-site', durationMonths: 2, rating: 2.6, status: 'open' },
  { id: 'intern-003', title: 'Penetration Tester Intern', description: 'Learn how to identify, exploit, and report security vulnerabilities in real-world systems.', location: 'hybrid',  durationMonths: 2, rating: 2.6, status: 'paid' },
  { id: 'intern-004', title: 'Penetration Tester Intern', description: 'Learn how to identify, exploit, and report security vulnerabilities in real-world systems.', location: 'hybrid',  durationMonths: 2, rating: 2.6, status: 'open' },
]

export const mockInternshipDetail: InternshipDetail = {
  ...mockInternships[0],
  fullDescription: "Join CyberShield Security's elite red team and gain hands-on experience in offensive security testing. This internship offers real-world exposure to penetration testing methodologies, vulnerability assessment, and ethical hacking techniques.\n\nYou'll work alongside seasoned security professionals on live client engagements, helping organizations identify and remediate security vulnerabilities before malicious actors can exploit them.",
  whatYouWillDo: [
    'Perform reconnaissance using OSINT techniques',
    'Perform reconnaissance using OSINT techniques',
    'Perform reconnaissance using OSINT techniques',
    'Perform reconnaissance using OSINT techniques',
  ],
  technicalRequirements: [
    'Solid understanding of networking protocols, Linux/Unix systems, and web technologies',
    'Familiarity with penetration testing tools (Burp Suite, Metasploit, Nmap, Wireshark)',
    'Basic knowledge of scripting languages (Python, Bash, PowerShell)',
    'Available to commit 25-35 hours per week for 3 months',
    'Currently pursuing or completed degree in Cybersecurity, Computer Science, or related field',
    'Strong problem-solving skills and hacker mindset',
  ],
  whatYouWillGain: [
    { icon: 'medal', title: 'Certificate of completion', description: 'Official certification from CyberShield Security' },
    { icon: 'users', title: 'Mentorship',                description: 'Official certification from CyberShield Security' },
    { icon: 'star',  title: 'Career Opportunities',      description: 'Official certification from CyberShield Security' },
  ],
  timeline: {
    startDate:           'March 15, 2026',
    endDate:             'June 15, 2026',
    applicationDeadline: 'March 1, 2026',
  },
}
