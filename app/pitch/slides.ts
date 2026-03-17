export interface Slide {
  id: number;
  title: string;
  category: string;
}

export const TOTAL_SLIDES = 9;

export const SLIDE_META: Slide[] = [
  { id: 1, title: "Encrypted Fi",         category: "COVER"        },
  { id: 2, title: "The Problem",          category: "PROBLEM"      },
  { id: 3, title: "Market Opportunity",   category: "MARKET"       },
  { id: 4, title: "Our Solution",         category: "SOLUTION"     },
  { id: 5, title: "Technology",           category: "TECHNOLOGY"   },
  { id: 6, title: "DeFi Capabilities",    category: "CAPABILITIES" },
  { id: 7, title: "Team",                 category: "TEAM"         },
  { id: 8, title: "Compliance",           category: "COMPLIANCE"   },
  { id: 9, title: "Vision",              category: "VISION"       },
];
