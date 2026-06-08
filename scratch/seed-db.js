import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBueUkcslJoo8w4aYrhg4O8pH-vhy8FpUs",
  authDomain: "virelixconsulting.firebaseapp.com",
  projectId: "virelixconsulting",
  storageBucket: "virelixconsulting.firebasestorage.app",
  messagingSenderId: "12728492405",
  appId: "1:12728492405:web:03af0dcb570e6c6b0bf33c",
  measurementId: "G-C4JD1G7S13",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const seed = async () => {
  console.log("Authenticating with Firebase Auth...");
  try {
    await createUserWithEmailAndPassword(auth, "admin@virelixconsulting.com", "admin123456");
    console.log("Admin user created.");
  } catch (err) {
    if (err.code === "auth/email-already-in-use" || err.message?.includes("already-in-use")) {
      await signInWithEmailAndPassword(auth, "admin@virelixconsulting.com", "admin123456");
      console.log("Admin user logged in.");
    } else {
      throw err;
    }
  }

  const currentUser = auth.currentUser;
  if (!currentUser) throw new Error("Authentication failed: No user authenticated.");

  // Seed user role to make sure user has admin rights
  await setDoc(doc(db, "user_roles", currentUser.uid), {
    user_id: currentUser.uid,
    role: "admin",
  });
  console.log("Seeded user role");

  // 1. Seed site_settings
  await setDoc(doc(db, "site_settings", "global"), {
    company_name: "Virelix Consulting",
    contact_email: "info@virelixconsulting.com",
    theme: "mono",
  });
  console.log("Seeded site_settings");

  // 2. Seed page_content
  const homepageDefaults = {
    services_eyebrow: "What we do",
    services_heading: "Services built around how you",
    services_heading_accent: "actually hire.",
    services_intro:
      "Whether you're filling one critical seat or scaling by 10x, we plug in the right model for the moment — and stand behind the work.",
    industries_eyebrow: "Industries",
    industries_heading: "Deep specialization in the sectors shaping the next decade.",
    industries_intro:
      "Our consultants come from the industries they recruit for — that means real conversations with candidates and shortlists that land.",
    industries_badge_value: "USA + India",
    industries_badge_label: "Global delivery across two continents",
    process_eyebrow: "How we work",
    process_heading: "A search process measured in",
    process_heading_accent: "weeks, not quarters.",
    why_heading: "Why organizations choose us",
    why_intro:
      "A global delivery partner — combining quality, speed, and cost efficiency across every engagement.",
    why_bullets: [
      "USA headquartered",
      "Global talent network",
      "Industry-specific expertise",
      "Dedicated recruitment specialists",
    ],
    stats: [
      { value: "USA", label: "Delaware HQ" },
      { value: "2", label: "Continents — USA & India" },
      { value: "10+", label: "Industries served" },
      { value: "24/7", label: "Recruitment delivery" },
    ],
    clients: [
      "DELAWARE, USA",
      "GLOBAL DELIVERY",
      "USA + INDIA",
      "RPO",
      "EXECUTIVE SEARCH",
      "WORKFORCE SOLUTIONS",
    ],
    testimonials_eyebrow: "Client stories",
    testimonials_heading: "What it's like to work with us.",
    cta_heading: "Let's build your next high-performing team.",
    cta_description:
      "Share your hiring or workforce need — a consultant will respond within one business day with a tailored plan.",
    cta_primary_label: "Contact us",
    cta_primary_to: "/contact",
    cta_secondary_label: "Our services",
    cta_secondary_to: "/services",
  };

  // Seed Homepage Content
  await setDoc(doc(db, "page_content", "home"), {
    page_key: "home",
    content: homepageDefaults,
  });
  console.log("Seeded home page content");

  // Seed About Page Content
  const aboutDefaults = {
    title: "A global force in workforce consulting",
    intro:
      "Virelix Consulting was founded to bridge the gap between global enterprises and tier-one professional talent. Through a continuous USA-India delivery pipeline, we provide scale, speed, and exceptional execution across every engagement.",
    mission:
      "To make global hiring frictionless, compliant, and human-centric — empowering organizations to scale high-performing teams without borders.",
    values: [
      "Authentic Vetting: We screen candidates peer-to-peer, ensuring technical and cultural alignment before presentation.",
      "Global-Local Delivery: Headquartered in Delaware with operations in Hyderabad, driving round-the-clock sourcing efficiency.",
      "Regulatory Excellence: 100% compliant international payroll, immigration, and labor classification safeguards.",
      "Demographic Inclusivity: Leveraging unbiased, demographic-neutral pipelines to maximize opportunity for diverse talent.",
    ],
    operating_in: ["United States", "India"],
  };
  await setDoc(doc(db, "page_content", "about"), {
    page_key: "about",
    content: aboutDefaults,
  });
  console.log("Seeded about page content");

  // Seed Contact Page Content
  const contactDefaults = {
    title: "Let's build your next team",
    subtitle:
      "Get in touch with a specialist consultant. We respond to all hiring inquiries within one business day.",
  };
  await setDoc(doc(db, "page_content", "contact"), {
    page_key: "contact",
    content: contactDefaults,
  });
  console.log("Seeded contact page content");

  // 3. Seed services
  const services = [
    {
      slug: "executive-search",
      title: "Executive Search & Leadership Hiring",
      summary:
        "Retained search for C-suite, VP, and Director roles led by senior consultants with deep sector expertise.",
      icon: "target",
      published: true,
      sort_order: 1,
      features: ["Retained search practice", "Sector specialists", "C-level placement portfolio"],
      body: `Finding transformational leaders requires more than a standard search process. At Virelix Consulting, we partner with boards, founders, and executive committees to source leaders who drive long-term business strategy and organizational culture.

Our research-backed methodology maps the entire passive candidate landscape, uncovering leadership talent that traditional job boards miss. We conduct deep competency-based interviews, evaluate culture-fit parameters, and run rigorous background/reference verification checks before making introductions.

We specialize in recruiting:
• Chief Executive Officers & Board Directors
• VP & Director Level Operations Leadership
• Chief Technology Officers & Engineering VPs
• Chief Financial Officers & Quantitative Partners`,
    },
    {
      slug: "it-recruitment",
      title: "IT & Non-IT Recruitment",
      summary:
        "Specialist hiring across technology, engineering, finance, sales, operations, and support functions.",
      icon: "cpu",
      published: true,
      sort_order: 2,
      features: ["Tech talent network", "Contingent placement", "Multi-country delivery"],
      body: `To stay competitive, organizations need specialized talent who can execute complex tech roadmaps and manage operations smoothly. Virelix delivers end-to-end sourcing for contract, contract-to-hire, and direct-hire positions across the United States and India.

We maintain active candidate pools in Software Development, Cloud Architecture, DevOps, and Product Management, as well as critical operations, finance, and marketing roles. Our vetting process is managed by recruitment specialists with deep hands-on background in the industries they serve, ensuring you receive shortlists with real technical maturity.

Key functions we source:
• Full-Stack Developers & System Architects
• DevOps & Site Reliability Engineers
• Financial Analysts & Compliance Officers
• Operations Managers & Administrative Leads`,
    },
    {
      slug: "rpo-workforce-solutions",
      title: "RPO & Workforce Solutions",
      summary:
        "Embedded recruiters and end-to-end hiring operations that scale with your business.",
      icon: "briefcase",
      published: true,
      sort_order: 3,
      features: ["Scale on-demand", "Dedicated recruiter model", "ATS configuration & metrics"],
      body: `Ramping up a team shouldn't mean overwhelming your HR staff or blowing your budget. Our Recruitment Process Outsourcing (RPO) model embeds dedicated recruiters, sourcing tools, and data-backed pipelines directly into your workflow.

We manage the entire talent acquisition cycle—from initial mapping and job posting to candidate screening, scheduling, offer management, and onboarding. This embedded partnership reduces your time-to-hire, decreases cost-per-hire by up to 50%, and ensures a consistent, high-standard candidate journey under your employer brand.

What our RPO solution delivers:
• Fully embedded talent partners in your Slack/Jira
• ATS setup, optimization, and analytics dashboards
• Customized employer brand messaging and outreach
• Seamless scaling of recruitment capacity on demand`,
    },
    {
      slug: "consulting-training",
      title: "Consulting & Professional Training",
      summary:
        "Workforce planning, talent mapping, business consulting, and career development programs.",
      icon: "trending-up",
      published: true,
      sort_order: 4,
      features: ["Org design consulting", "Training bootcamps", "Salary benchmarking"],
      body: `Building a resilient workforce requires continuous alignment of organization design, compensation structures, and internal skills development. Virelix offers consulting and professional training programs designed to keep your business ahead of market shifts.

We advise leadership teams on salary benchmarking, workforce planning, talent retention strategies, and organizational restructuring. Additionally, we deliver tailored bootcamps, technical reskilling initiatives, and compliance workshops to keep your teams certified and efficient in modern technologies.

Consulting practices we offer:
• Organization Design & Restructuring Consulting
• Localized Salary Benchmarking & Intelligence
• Reskilling Bootcamps in Cloud, AI, and Cybersecurity
• Team Leadership and Management Vetting Programs`,
    },
  ];

  for (let i = 0; i < services.length; i++) {
    await setDoc(doc(db, "services", `service-${i + 1}`), services[i]);
  }
  console.log("Seeded services");

  // 4. Seed companies
  const companies = [
    {
      name: "Virelix Tech Corp",
      slug: "vix-tech",
      description: "Leading technology infrastructure and digital platform development agency.",
      website: "https://virelixconsulting.com",
    },
    {
      name: "Delaware Supply Chain",
      slug: "del-supply",
      description: "National logistics, shipping, and storage operations operator.",
      website: "https://delaware-supply.com",
    },
  ];

  for (let i = 0; i < companies.length; i++) {
    await setDoc(doc(db, "companies", `company-${i + 1}`), companies[i]);
  }
  console.log("Seeded companies");

  // 5. Seed jobs
  const jobs = [
    {
      title: "Senior Cloud Infrastructure Architect",
      slug: "senior-cloud-infra-architect",
      company_id: "company-1",
      location: "Remote (USA / India)",
      type: "Full-Time",
      salary: "$160,000 - $190,000",
      description: "Responsible for scaling secure architectures on cloud platforms.",
      published: true,
      featured: true,
      status: "published",
      work_mode: "remote",
      job_type: "full_time",
      salary_min: 160000,
      salary_max: 190000,
      salary_currency: "USD",
      created_at: new Date().toISOString(),
    },
    {
      title: "Lead Technical Recruiter",
      slug: "lead-tech-recruiter",
      company_id: "company-2",
      location: "Delaware, USA",
      type: "Full-Time",
      salary: "$110,000 - $130,000",
      description: "Scale core workforce logistics and operations personnel recruiting.",
      published: true,
      featured: true,
      status: "published",
      work_mode: "hybrid",
      job_type: "full_time",
      salary_min: 110000,
      salary_max: 130000,
      salary_currency: "USD",
      created_at: new Date().toISOString(),
    },
  ];

  for (let i = 0; i < jobs.length; i++) {
    await setDoc(doc(db, "jobs", `job-${i + 1}`), jobs[i]);
  }
  console.log("Seeded jobs");

  // 6. Seed testimonials
  const testimonials = [
    {
      name: "Sarah Jenkins",
      role: "VP of People at TechSphere",
      content:
        "Virelix Consulting transformed our engineering recruitment. We filled three VP roles in less than a month.",
      rating: 5,
    },
    {
      name: "David Chen",
      role: "CEO at Delaware Supply Chain",
      content:
        "Their recruitment process is lightning-fast and quality-focused. Highly recommended for executive searches.",
      rating: 5,
    },
  ];

  for (let i = 0; i < testimonials.length; i++) {
    await setDoc(doc(db, "testimonials", `test-${i + 1}`), testimonials[i]);
  }
  console.log("Seeded testimonials");

  // 7. Seed industries
  const industries = [
    {
      label: "Technology & Software Engineering",
      slug: "technology-software",
      description: "AI, cloud infrastructure, enterprise software, and engineering roles.",
      icon: "cpu",
      published: true,
      sort_order: 1,
      detail_content: {
        hero_title: "Powering the Next Wave of Technology Talent",
        hero_subtitle:
          "From early-stage venture-backed AI firms to enterprise SaaS leaders, we source the software architects and engineering leaders shaping the digital frontier.",
        capabilities: [
          "Software Engineering & Architecture",
          "Artificial Intelligence & Machine Learning",
          "Cloud Infrastructure & Devops",
          "Product Management & UX Design",
          "Cybersecurity & Threat Intel",
        ],
        sourcing_stats: [
          { value: "15 Days", label: "Avg. Tech Time-to-Submit" },
          { value: "450+", label: "Engineers Placed" },
          { value: "94%", label: "Retention Rate at 12 Months" },
        ],
      },
    },
    {
      label: "Healthcare & Life Sciences",
      slug: "healthcare-lifesciences",
      description: "Medical devices, biotech, pharmaceuticals, and healthcare providers.",
      icon: "heart",
      published: true,
      sort_order: 2,
      detail_content: {
        hero_title: "Vetting Specialists for Critical Care & Medical Innovation",
        hero_subtitle:
          "Sourcing clinical research coordinators, regulatory compliance experts, and biomedical engineers for FDA-approved diagnostic and therapeutic platforms.",
        capabilities: [
          "Biomedical & Hardware Engineering",
          "Clinical Trials Operations",
          "FDA Regulatory Affairs & Compliance",
          "Biostatistics & Bioinformatics",
          "Healthcare IT & Patient Portals",
        ],
        sourcing_stats: [
          { value: "22 Days", label: "Avg. Clinical Time-to-Submit" },
          { value: "120+", label: "Medical Devices Placed" },
          { value: "98%", label: "Compliance Audit Pass Rate" },
        ],
      },
    },
    {
      label: "Financial Services & FinTech",
      slug: "financial-services",
      description:
        "Quantitative trading, asset management, risk compliance, banking operations, and financial engineering.",
      icon: "wallet",
      published: true,
      sort_order: 3,
      detail_content: {
        hero_title: "Sourcing Leadership in Quantitative Finance & Risk",
        hero_subtitle:
          "Placing expert financial analysts, risk modeling specialists, and blockchain developers with leading asset management firms and modern FinTech innovators.",
        capabilities: [
          "Quantitative Trading & Analytics",
          "Risk Management & Compliance",
          "Blockchain & Distributed Ledger Technology",
          "Investment Banking & Corporate Finance",
          "Information Security & Auditing",
        ],
        sourcing_stats: [
          { value: "18 Days", label: "Avg. Finance Time-to-Submit" },
          { value: "$10B+", label: "AUM Administered by Placed Talent" },
          { value: "91%", label: "Placement Longevity at 2 Years" },
        ],
      },
    },
    {
      label: "Logistics & Supply Chain",
      slug: "logistics-supply-chain",
      description:
        "Global supply chains, logistics operations, warehouse management systems, and procurement.",
      icon: "truck",
      published: true,
      sort_order: 4,
      detail_content: {
        hero_title: "Strengthening Supply Chains with Modern Leadership",
        hero_subtitle:
          "Delivering logistics directors, fleet operations managers, and warehouse systems experts to build highly resilient distribution pipelines.",
        capabilities: [
          "Fleet Operations & Routing",
          "Warehouse Management Systems (WMS)",
          "Global Procurement & Sourcing",
          "Inventory Optimization & Analytics",
          "Distribution Center Administration",
        ],
        sourcing_stats: [
          { value: "19 Days", label: "Avg. Logistics Time-to-Submit" },
          { value: "24/7", label: "Operations Support" },
          { value: "95%", label: "SLA Sourcing Compliance" },
        ],
      },
    },
  ];

  for (let i = 0; i < industries.length; i++) {
    await setDoc(doc(db, "industries", `ind-${i + 1}`), industries[i]);
  }
  console.log("Seeded industries");

  // 8. Seed team_members
  const team = [
    {
      name: "Alex Mercer",
      role_title: "Managing Director",
      bio: "15+ years experience in global executive talent acquisitions.",
      photo_url:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&h=500&q=80",
      published: true,
      sort_order: 1,
      email: "alex@virelixconsulting.com",
      linkedin: "https://linkedin.com/in/alex-mercer",
    },
    {
      name: "Jessica Taylor",
      role_title: "Principal Tech Recruiter",
      bio: "Ex-Google staffing leader specializing in AI and cloud engineering talent.",
      photo_url:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=500&q=80",
      published: true,
      sort_order: 2,
      email: "jessica@virelixconsulting.com",
      linkedin: "https://linkedin.com/in/jessica-taylor",
    },
  ];

  for (let i = 0; i < team.length; i++) {
    await setDoc(doc(db, "team_members", `team-${i + 1}`), team[i]);
  }
  console.log("Seeded team_members");

  // 9. Seed case_studies
  const caseStudies = [
    {
      title: "Scaling a Unicorn Startup Engineering Team",
      slug: "scaling-unicorn-startup",
      client: "Vix Tech Corp",
      industry: "Technology & Software",
      cover_url:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=70",
      summary:
        "How we designed and executed an embedded RPO strategy to hire 45 software engineers in 90 days.",
      body: `### Background & Challenge
Vix Tech Corp, a fast-scaling tech platform, secured their Series B funding and needed to double their engineering team. They faced severe recruitment bottlenecking and high agency fees. The goal was to hire 45 high-caliber software engineers, including senior cloud architects and frontend leads, within 90 days.

### The Solution
We deployed an embedded Recruitment Process Outsourcing (RPO) team comprising three senior recruiters and two sourcers. Our team fully integrated into Vix Tech’s Slack, Jira, and ATS systems. We established a structured vetting pipeline, streamlined interview processes, and leveraged our global talent network across the USA and India.

### Results
Within 90 days, we successfully filled all 45 engineering positions. The embedded model allowed us to build a sustainable talent pipeline and reduce recruitment agency spend by over 60%. Time-to-hire dropped from 48 days to 26 days.`,
      results: [
        { label: "Hires Completed", value: "45" },
        { label: "Avg. Time to Hire", value: "26 Days" },
        { label: "Cost Savings", value: "62%" },
      ],
      sort_order: 1,
      published: true,
    },
    {
      title: "C-Suite Recruiting for a National Logistics Leader",
      slug: "c-suite-logistics-recruiting",
      client: "Delaware Supply Chain",
      industry: "Logistics & Supply Chain",
      cover_url:
        "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=70",
      summary:
        "Placing a Chief Operating Officer (COO) and VP of Logistics within a tight 60-day schedule.",
      body: `### Background & Challenge
Delaware Supply Chain, a national logistics operator, faced a sudden vacancy in their Chief Operating Officer position during a period of rapid expansion. They needed an experienced operational leader who could oversee 12 distribution centers and manage a team of 400+ personnel.

### The Solution
We launched a target-focused executive search engagement. Our senior partners conducted extensive talent mapping across competing tier-one logistics and supply chain enterprises in North America. We identified 18 highly qualified passive candidates, conducting detailed competency-based assessments and cultural alignment evaluations.

### Results
We presented a shortlist of 4 qualified candidates within 25 days. The chosen candidate, a seasoned logistics VP, accepted the COO offer and started onboarding within 50 days of contract signing. We subsequently placed their new VP of Logistics, compounding their operational leadership.`,
      results: [
        { label: "Positions Placed", value: "2" },
        { label: "Search Duration", value: "42 Days" },
        { label: "Candidate Fit Rate", value: "100%" },
      ],
      sort_order: 2,
      published: true,
    },
    {
      title: "Building the Future of Medical Devices",
      slug: "medical-device-engineering",
      client: "BioPulse Diagnostics",
      industry: "Healthcare & Life Sciences",
      cover_url:
        "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=1200&q=70",
      summary:
        "Sourcing and placing highly specialized hardware and embedded software engineers for clinical diagnostic tools.",
      body: `### Background & Challenge
BioPulse Diagnostics was developing a next-generation clinical diagnostic tool. They required a team of 6 specialist engineers with experience in FDA-regulated embedded software and microfluidics. These roles had been open for over six months due to the extreme scarcity of regional talent.

### The Solution
We initiated a global talent search utilizing our delivery hubs in both the USA and India. By searching globally, we identified candidates with the precise scientific credentials required. We managed the entire interview logistics, technical screen coordination, and immigration/relocation compliance.

### Results
All 6 engineering seats were filled within 75 days, with 4 US-based hires and 2 offshore senior systems developers. The product launch timeline remained on schedule, and BioPulse successfully completed its FDA submission.`,
      results: [
        { label: "Specialists Placed", value: "6" },
        { label: "Relocation Rate", value: "100%" },
        { label: "Retention (1 yr)", value: "95%" },
      ],
      sort_order: 3,
      published: true,
    },
  ];

  for (let i = 0; i < caseStudies.length; i++) {
    await setDoc(doc(db, "case_studies", `case-${i + 1}`), caseStudies[i]);
  }
  console.log("Seeded case_studies");

  // 10. Seed posts
  const posts = [
    {
      title: "Navigating the Executive Talent Search in 2026",
      slug: "navigating-executive-search-2026",
      category: "Executive Search",
      cover_url:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=70",
      excerpt:
        "Key changes in leadership hiring trends post hybrid-work stabilization, and how top organizations secure Tier-1 talent.",
      body: `### The Evolution of Executive Recruitment
As we move through 2026, the landscape of executive search has fundamentally transformed. Hybrid-work models have stabilized, but candidate expectations around autonomy, equity, and strategic impact have reached new heights. Standard recruiting approaches no longer yield Tier-1 leaders.

### Cultural Alignment Over Credentials
While technical capabilities and previous portfolios are important, our placements show that cultural alignment and adaptive intelligence are the primary drivers of executive longevity. Organizations must look beyond resumes to evaluate leadership style under pressure.

### Decisive Executive Search Playbook
1. **Accelerate Decision Timelines**: Top executive talent is often considering multiple options. Excessive delays in your interview loop will cause candidates to drop out.
2. **Offer Real Autonomy**: Executives want ownership of their strategic mandates.
3. **Leverage Expert Search Partners**: Engage specialized recruiters who maintain ongoing relationships with passive executive networks.`,
      published: true,
      published_at: "2026-06-01T10:00:00Z",
    },
    {
      title: "RPO vs. Contingent Recruiting: Which Model Fits Your Scale?",
      slug: "rpo-vs-contingent-recruiting",
      category: "Recruitment Strategy",
      cover_url:
        "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=70",
      excerpt:
        "An operational comparison between embedded RPO and contingent placements for high-growth hiring.",
      body: `### Choosing Your Hiring Vehicle
Scaling companies often face a dilemma: should they engage traditional contingent search agencies or invest in an embedded Recruitment Process Outsourcing (RPO) solution? The answer depends entirely on your target scale, budget, and internal capability.

### The Contingent Model: Tactical Speed
Contingent recruiting is transaction-focused. You pay a percentage of the candidate's salary only when they are successfully placed. This is ideal for sporadic hires or highly specialized roles where you need instant support without ongoing commitment.

### The Embedded RPO Model: Strategic Scale
An RPO partner embeds directly into your organization, functioning as your internal talent acquisition department. They configure ATS systems, build candidate pipelines, manage employer branding, and coordinate interview processes. This model excels when you need to hire 15+ employees over a defined period, dropping cost-per-hire by up to 50% compared to contingent agencies.`,
      published: true,
      published_at: "2026-06-02T12:00:00Z",
    },
    {
      title: "USA-India Global Delivery: The Strategic Advantage",
      slug: "usa-india-global-delivery-advantage",
      category: "Workforce Solutions",
      cover_url:
        "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=70",
      excerpt:
        "How leveraging global delivery hubs across North America and South Asia drives 24/7 sourcing efficiency.",
      body: `### Sourcing Around the Clock
In today's fast-moving business climate, speed is the ultimate competitive advantage. By establishing global delivery hubs in both the USA (Delaware) and India (Hyderabad), Virelix Consulting implements a continuous 24/7 sourcing cycle.

### How Global Delivery Works
1. **USA Leadership**: Client alignment, executive search qualification, and final hiring metrics are managed by our local USA partners.
2. **Offshore Sourcing Excellence**: Our team in India handles initial search list preparation, resume screening, and scheduling overnight.
3. **Continuous Cycle**: When the US team begins their day, they receive qualified shortlists and candidate profiles vetted overnight.

### Key Outcomes
This model reduces search cycle times by 30-40%. Additionally, it allows our clients to access highly technical talent globally, resolving domestic staffing deficits in areas like AI, cloud engineering, and clinical research.`,
      published: true,
      published_at: "2026-06-03T09:00:00Z",
    },
  ];

  for (let i = 0; i < posts.length; i++) {
    await setDoc(doc(db, "posts", `post-${i + 1}`), posts[i]);
  }
  console.log("Seeded posts");

  console.log("Firebase Firestore seeding completed successfully!");
};

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
