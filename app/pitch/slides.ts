export interface Slide {
  id: number;
  title: string;
  category: string;
}

export const TOTAL_SLIDES = 10;

export const SLIDE_META: Slide[] = [
  { id: 1,  title: "Encrypted Fi",         category: "COVER"        },
  { id: 2,  title: "The Problem",          category: "PROBLEM"      },
  { id: 3,  title: "Market Opportunity",   category: "MARKET"       },
  { id: 4,  title: "Our Solution",         category: "SOLUTION"     },
  { id: 5,  title: "Technology",           category: "TECHNOLOGY"   },
  { id: 6,  title: "Why Somnia",           category: "WHY SOMNIA"   },
  { id: 7,  title: "DeFi Capabilities",    category: "CAPABILITIES" },
  { id: 8,  title: "Team",                 category: "TEAM"         },
  { id: 9,  title: "Compliance",           category: "COMPLIANCE"   },
  { id: 10, title: "Vision",               category: "VISION"       },
];
