// Mock Data for Karnataka State Police Crime Intelligence Platform (KSP-AI)

export const districtsData = [
  {
    id: "blr",
    name: "Bengaluru City",
    code: "BLR",
    coords: { x: 68, y: 82 },
    dangerLevel: "CRITICAL",
    crimeCount: 14520,
    commonCrime: "Cyber Fraud & Ransomware",
    status: "Red Alert",
    details: "Surge in financial cybercrimes in Whitefield & Electronic City IT clusters. Traffic safety critical due to high-density events."
  },
  {
    id: "mys",
    name: "Mysuru",
    code: "MYS",
    coords: { x: 58, y: 86 },
    dangerLevel: "MODERATE",
    crimeCount: 3840,
    commonCrime: "Heritage & Antique Theft",
    status: "Normal Operations",
    details: "High tourist influx leads to transient petty theft. Temple antique security systems being upgraded with AI locks."
  },
  {
    id: "hub",
    name: "Hubballi-Dharwad",
    code: "HUB",
    coords: { x: 40, y: 45 },
    dangerLevel: "HIGH",
    crimeCount: 6120,
    commonCrime: "Phishing & Fake Identity Circles",
    status: "Active Surveillance",
    details: "Underground carding and tele-fraud rings detected in commercial corridors. Multi-agency raids underway."
  },
  {
    id: "mng",
    name: "Mangaluru City",
    code: "MNG",
    coords: { x: 42, y: 78 },
    dangerLevel: "HIGH",
    crimeCount: 5210,
    commonCrime: "Port Smuggling & Contraband",
    status: "Orange Warning",
    details: "Coastal contraband shipping intercepted. Drone patrols active along the Netravati river mouth."
  },
  {
    id: "bel",
    name: "Belagavi",
    code: "BEL",
    coords: { x: 30, y: 32 },
    dangerLevel: "MODERATE",
    crimeCount: 4100,
    commonCrime: "Land Record Forgery & Disputes",
    status: "Normal Operations",
    details: "Border transit point monitoring. Integrated checkposts scanning cargo trucks for unauthorized goods."
  },
  {
    id: "kal",
    name: "Kalaburagi",
    code: "KAL",
    coords: { x: 55, y: 18 },
    dangerLevel: "MODERATE",
    crimeCount: 3950,
    commonCrime: "Property Theft & Smuggling",
    status: "Normal Operations",
    details: "Agricultural property disputes. Automated drone dispatch systems tested for remote rural policing."
  },
  {
    id: "blr_r",
    name: "Bengaluru Rural",
    code: "BLR-R",
    coords: { x: 72, y: 78 },
    dangerLevel: "MODERATE",
    crimeCount: 2900,
    commonCrime: "Illegal Sand Mining",
    status: "Surveillance Active",
    details: "Illegal sand mining reports near lake beds. Seismic acoustic sensors deployed for night monitoring."
  },
  {
    id: "shv",
    name: "Shivamogga",
    code: "SHV",
    coords: { x: 43, y: 64 },
    dangerLevel: "LOW",
    crimeCount: 1820,
    commonCrime: "Forest Timber Poaching",
    status: "Clear",
    details: "Western Ghats security patrols active. Satellite heat signatures analyzed daily for timber logging activity."
  },
  {
    id: "blr_m",
    name: "Ballari",
    code: "BAL",
    coords: { x: 56, y: 48 },
    dangerLevel: "HIGH",
    crimeCount: 4760,
    commonCrime: "Illegal Mining & Transport",
    status: "Active Surveillance",
    details: "Heavy minerals transport scanning active. Automated license plate recognition (ALPR) cameras configured."
  }
];

export const newsArticles = [
  {
    id: "art-1",
    title: "RCB Victory Parade: Stampede at Chinnaswamy Stadium Outskirts",
    date: "2025-06-04",
    city: "Bengaluru",
    category: "Public Safety",
    summary: "Following RCB's historic cricket tournament victory, over 150,000 ecstatic fans swarmed the MG Road and Cubbon Park vicinity. Poor crowd management at Gate 5 led to a localized crush. KSP Command Center used real-time CCTV analysis to dispatch emergency units and redirect pedestrian traffic, mitigating further injuries.",
    casualties: "12 minor injuries, 0 fatalities",
    investigationStatus: "RESOLVED",
    location: "Chinnaswamy Stadium, MG Road, Bengaluru",
    timeline: [
      { time: "18:00", event: "Victory parade commences from Cubbon Road under police escort." },
      { time: "19:15", event: "Crowd surges to critical capacity of 8.5 people per square meter." },
      { time: "20:05", event: "Crush reported at Gate 5; perimeter barricade breached." },
      { time: "20:12", event: "KSP AI feeds flag red alert; DCP dispatches extra reserve battalion." },
      { time: "20:30", event: "Metro gates regulated; emergency channels opened for fans dispersal." },
      { time: "21:15", event: "Area cleared. Injured shifted to Bowring Hospital. Event declared secure." }
    ],
    relatedIncidents: ["FIR-128/2025", "FIR-129/2025"]
  },
  {
    id: "art-2",
    title: "Hubballi Cyber Crime Syndicate Intercepted",
    date: "2026-05-12",
    city: "Hubballi",
    category: "Cybercrime",
    summary: "A joint operation by KSP Cyber Division and Local Police busted an illicit call center ring masquerading as utility helpdesks. The syndicate targeted elder citizens across North Karnataka, extracting OTPs and bank credentials. AI-based financial mapping traced money trails to mule accounts in other states.",
    casualties: "N/A (Financial crime)",
    investigationStatus: "UNDER INVESTIGATION",
    location: "Keshwapur Commercial Complex, Hubballi",
    timeline: [
      { time: "09:00", event: "Simultaneous raids executed at three luxury apartments." },
      { time: "11:30", event: "512 cloned SIM cards, 12 servers, and 30 mobile devices confiscated." },
      { time: "14:00", event: "Mastermind Rohan Kamath apprehended attempting border crossing." },
      { time: "16:45", event: "Forensic mirror imaging of servers completed by KSP Cyber lab." }
    ],
    relatedIncidents: ["FIR-442/2026"]
  },
  {
    id: "art-3",
    title: "Synthetics Drug Seizure Worth ₹45 Cr at Mangaluru Port",
    date: "2026-06-01",
    city: "Mangaluru",
    category: "Drug Trafficking",
    summary: "KSP Narcotic Wing, acting on automated cargo anomalies flagged by predictive AI customs systems, intercepted a container loaded with synthetic substances disguised as chemical shipments. The contraband was destined for local rave networks.",
    casualties: "3 suspects arrested",
    investigationStatus: "TRIAL STAGE",
    location: "New Mangalore Port, Container Yard 4B",
    timeline: [
      { time: "02:15", event: "Vessel 'MV Ocean Star' flags shipping route anomaly." },
      { time: "05:00", event: "KSP canine squad alerts on chemical drum containers." },
      { time: "07:30", event: "Lab testing confirms high-purity methamphetamine compound." },
      { time: "12:00", event: "Reconstruction of supply network maps reveals links to international distributors." }
    ],
    relatedIncidents: ["FIR-510/2026"]
  },
  {
    id: "art-4",
    title: "Idol Theft Syndicate Traced in Temple Town Mysuru",
    date: "2026-04-18",
    city: "Mysuru",
    category: "Theft & Smuggling",
    summary: "A historical bronze idol of the Chola era, stolen from a temple near Nanjangud, was recovered within 48 hours. KSP Intelligence used network graphs to identify an antique dealer consortium attempting to transport the idol to Goa.",
    casualties: "Recovered successfully",
    investigationStatus: "RESOLVED",
    location: "Nanjangud Temple Corridor, Mysuru Rural",
    timeline: [
      { time: "04:30", event: "Temple priest reports sanctum sanctorum breach." },
      { time: "09:00", event: "Forensic division recovers latent partial thumbprints." },
      { time: "23:00", event: "AFIS (Fingerprint system) matches prints with repeat offender Vikram Raj." },
      { time: "15:00", event: "(Day 2) Vehicle intercepted at Mysuru-Bengaluru highway with the idol." }
    ],
    relatedIncidents: ["FIR-290/2026"]
  }
];

export const casesData = [
  {
    id: "FIR-128/2025",
    firNumber: "FIR/2025/BLR/0412",
    title: "Chinnaswamy Gate 5 Crowd Crushes",
    suspect: "Bengaluru Event Org Committee",
    city: "Bengaluru",
    category: "Public Safety",
    status: "Closed",
    assignedOfficer: "DCP Sandeep Patil, IPS",
    date: "2025-06-04",
    dangerLevel: "HIGH",
    evidence: [
      { id: "ev-1", name: "CCTV MG Road Metro Gate 5 Camera", type: "Video Stream", size: "1.4 GB" },
      { id: "ev-2", name: "Crowd Density Analytics Log", type: "Telemetry JSON", size: "12 KB" },
      { id: "ev-3", name: "Event Safety Guidelines Document", type: "Document PDF", size: "4.8 MB" }
    ],
    notes: [
      { date: "2025-06-04 20:30", author: "DCP Sandeep Patil", text: "Command room initiated manual dispersal order. Laser projections directed crowd flow." },
      { date: "2025-06-05 10:00", author: "DCP Sandeep Patil", text: "Statements recorded from event coordinators regarding stadium exit gate closures. Gate 5 was locked early, leading to congestion." }
    ],
    progression: [
      { stage: "FIR Filed", date: "2025-06-04", active: true },
      { stage: "Evidence Collection", date: "2025-06-05", active: true },
      { stage: "Interrogations", date: "2025-06-12", active: true },
      { stage: "Charge Sheet Filed", date: "2025-06-30", active: true },
      { stage: "Verdict / Case Closed", date: "2025-07-15", active: true }
    ]
  },
  {
    id: "FIR-442/2026",
    firNumber: "FIR/2026/HUB/0890",
    title: "Phish-Farming Syndicate Ring",
    suspect: "Rohan Kamath, Vikram Raj (Hawala)",
    city: "Hubballi",
    category: "Cybercrime",
    status: "Under Investigation",
    assignedOfficer: "ACP Kavitha Hegde, Cyber Cell",
    date: "2026-05-12",
    dangerLevel: "CRITICAL",
    evidence: [
      { id: "ev-4", name: "Hard Drive Clone image (HUB-SRV1)", type: "Disk Mirror", size: "256 GB" },
      { id: "ev-5", name: "Seized SIM Card IMSI Database", type: "CSV Ledger", size: "480 KB" },
      { id: "ev-6", name: "VoIP Packet Captures (.pcap)", type: "Network Log", size: "24 MB" }
    ],
    notes: [
      { date: "2026-05-12 11:00", author: "ACP Kavitha Hegde", text: "Raid was successful. Suspects attempted to destroy flash drives by burning; recovered fragments sent to KSP Digital Labs." },
      { date: "2026-05-15 15:30", author: "ACP Kavitha Hegde", text: "Financial audits show ₹3.2 Cr was routed to shell accounts in Mumbai and Mangaluru. Interlinking with suspect Vikram Raj." }
    ],
    progression: [
      { stage: "FIR Filed", date: "2026-05-12", active: true },
      { stage: "Evidence Collection", date: "2026-05-15", active: true },
      { stage: "Interrogations", date: "2026-06-01", active: true },
      { stage: "Charge Sheet Filed", date: "Pending", active: false },
      { stage: "Verdict / Case Closed", date: "Pending", active: false }
    ]
  },
  {
    id: "FIR-510/2026",
    firNumber: "FIR/2026/MNG/1020",
    title: "Port Chemical Shipment Smuggling",
    suspect: "Karthik Shetty, Suresh Gowda",
    city: "Mangaluru",
    category: "Drug Trafficking",
    status: "Trial Stage",
    assignedOfficer: "ACP Rajesh Kumar, Narcotics Unit",
    date: "2026-06-01",
    dangerLevel: "CRITICAL",
    evidence: [
      { id: "ev-7", name: "Chemical Spectroscopy Report", type: "Spectroscopy PDF", size: "1.2 MB" },
      { id: "ev-8", name: "Satellite GPS Ship Track Log", type: "Route Log", size: "85 KB" }
    ],
    notes: [
      { date: "2026-06-01 08:00", author: "ACP Rajesh Kumar", text: "Canine units correctly identified cargo container 4B. The shipper listed 'Industrial Solvents' but chemical analysis showed active illicit stimulant base." }
    ],
    progression: [
      { stage: "FIR Filed", date: "2026-06-01", active: true },
      { stage: "Evidence Collection", date: "2026-06-02", active: true },
      { stage: "Interrogations", date: "2026-06-04", active: true },
      { stage: "Charge Sheet Filed", date: "2026-06-05", active: true },
      { stage: "Verdict / Case Closed", date: "In Progress", active: false }
    ]
  }
];

export const networkData = {
  nodes: [
    { id: "Rohan Kamath", type: "Suspect", role: "Syndicate Lead (Hubballi)", size: 24, group: 1, details: "Phishing mastermind, arrested in Hubballi" },
    { id: "Vikram Raj", type: "Suspect", role: "Hawala Operator (Bengaluru)", size: 20, group: 1, details: "Launders carding profits, under radar" },
    { id: "Dinesh Mehta", type: "Suspect", role: "SIM Card Broker (Mumbai)", size: 16, group: 1, details: "Supplied 500+ spoofed SIM cards" },
    { id: "Karthik Shetty", type: "Suspect", role: "Smuggler (Mangaluru Port)", size: 22, group: 2, details: "Logs customs clearance channels" },
    { id: "Suresh Gowda", type: "Suspect", role: "Logistics Vendor", size: 18, group: 2, details: "Acquires cargo warehouse leases" },
    { id: "Manoj Swamy", type: "Suspect", role: "Local Distributor (Bengaluru)", size: 14, group: 2, details: "Distributes chemical substances to local agents" }
  ],
  links: [
    { source: "Rohan Kamath", target: "Vikram Raj", label: "Fund Routing (₹3.2 Cr)" },
    { source: "Rohan Kamath", target: "Dinesh Mehta", label: "SIM Procurement" },
    { source: "Vikram Raj", target: "Karthik Shetty", label: "Hawala Backing" },
    { source: "Karthik Shetty", target: "Suresh Gowda", label: "Cargo Logistics" },
    { source: "Suresh Gowda", target: "Manoj Swamy", label: "Substance Delivery" },
    { source: "Manoj Swamy", target: "Vikram Raj", label: "Local Protection Kickbacks" }
  ]
};

export const patternPredictions = {
  activeThreatLevel: "HIGH (LEVEL 3)",
  radarPulseZones: [
    { zone: "Whitefield Cyber-Corridor", type: "High Risk of Ransomware", probability: "84%", trend: "Increasing" },
    { zone: "Mangaluru Port Gate 2", type: "Unmanifested Cargo Entry", probability: "71%", trend: "Stable" },
    { zone: "Hubballi Railway Transit", type: "Fake Identity Courier Loop", probability: "65%", trend: "Increasing" }
  ],
  seasonalTrends: [
    { month: "Jan", cybercrime: 120, theft: 150, drugs: 40 },
    { month: "Feb", cybercrime: 140, theft: 160, drugs: 45 },
    { month: "Mar", cybercrime: 190, theft: 130, drugs: 55 },
    { month: "Apr", cybercrime: 220, theft: 145, drugs: 70 },
    { month: "May", cybercrime: 310, theft: 180, drugs: 85 },
    { month: "Jun", cybercrime: 390, theft: 210, drugs: 110 }
  ],
  repeatOffenders: [
    { name: "Vikram Raj", offenses: 6, primaryCrime: "Hawala / Forgery", threatIndex: "88/100", status: "Under Surveillance" },
    { name: "Suresh Gowda", offenses: 4, primaryCrime: "Contraband Logistics", threatIndex: "72/100", status: "Bail Active" },
    { name: "Manoj Swamy", offenses: 9, primaryCrime: "Local Drug Distribution", threatIndex: "91/100", status: "Arrest Warrant Issued" }
  ]
};

export const alertsData = [
  { id: "al-1", type: "CRITICAL", message: "Whitefield Substation: AI anomaly engine flags unauthorized server connection attempt.", time: "1 min ago" },
  { id: "al-2", type: "WARNING", message: "Traffic Density: Surge warning at Majestic Metro Transit hub. Congestion predicted.", time: "4 mins ago" },
  { id: "al-3", type: "INFO", message: "Patrol Dispatch: Unit 42 dispatched for regular coastal check near Ullal Beach, Mangaluru.", time: "12 mins ago" },
  { id: "al-4", type: "CRITICAL", message: "Incident Report: FIR/2026/MNG/1020 updated. Spectroscopy confirms Metamphetamine presence.", time: "18 mins ago" }
];
