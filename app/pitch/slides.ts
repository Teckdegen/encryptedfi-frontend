export interface Slide {
  id: number;
  title: string;
  category: string;
}

export const TOTAL_SLIDES = 15;

export const SLIDE_META: Slide[] = [
  { id: 1,  title: "Encrypted Fi",           category: "COVER"                },
  { id: 2,  title: "The Problem",            category: "PROBLEM"              },
  { id: 3,  title: "Market Size",            category: "MARKET OPPORTUNITY"   },
  { id: 4,  title: "Our Solution",           category: "SOLUTION"             },
  { id: 5,  title: "Product Overview",       category: "PRODUCT"              },
  { id: 6,  title: "How It Works",           category: "TECHNOLOGY"           },
  { id: 7,  title: "DeFi Suite",             category: "CAPABILITIES"         },
  { id: 8,  title: "Competitive Landscape",  category: "COMPETITION"          },
  { id: 9,  title: "Business Model",         category: "MONETISATION"         },
  { id: 10, title: "Go-to-Market",           category: "GTM STRATEGY"         },
  { id: 11, title: "Traction & Milestones",  category: "TRACTION"             },
  { id: 12, title: "Roadmap",               category: "ROADMAP"              },
  { id: 13, title: "Team",                  category: "THE TEAM"             },
  { id: 14, title: "Use of Funds",          category: "THE ASK"              },
  { id: 15, title: "Vision",               category: "CLOSING"              },
];
