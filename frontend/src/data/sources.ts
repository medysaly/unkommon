export interface Source {
  id: string;
  title: string;
  organization: string;
  year: number;
  url?: string;
  type: 'study' | 'report' | 'survey' | 'research';
  description: string;
}

export interface Statistic {
  id: string;
  claim: string;
  value: string;
  sourceIds: string[];
  context?: string;
  disclaimer?: string;
}

export const sources: Source[] = [
  {
    id: 'hbr-mit-lead-response',
    title: 'Lead Response Management Study',
    organization: 'Harvard Business Review / MIT',
    year: 2011,
    url: 'https://cdn2.hubspot.net/hub/25649/file-13535879-pdf/docs/mit_study.pdf',
    type: 'study',
    description: 'Comprehensive study on lead response time impact on qualification and conversion rates. Free PDF download of full research.'
  },
  {
    id: 'velocify-2016',
    title: 'Lead Response Time Statistics',
    organization: 'Velocify',
    year: 2016,
    type: 'research',
    description: 'Analysis of conversion rates based on response time speeds'
  },
  {
    id: 'insidesales-2021',
    title: 'Response Time Matters',
    organization: 'InsideSales',
    year: 2021,
    type: 'research',
    description: 'Lead response time impact on conversion rates and customer engagement'
  },
  {
    id: 'mckinsey-ai-2024',
    title: 'The State of AI in Early 2024',
    organization: 'McKinsey',
    year: 2024,
    url: 'https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai-2024',
    type: 'study',
    description: 'Comprehensive study showing AI can reduce customer service expenses by up to 30%, with 65% of organizations now using generative AI regularly'
  },
  {
    id: 'gartner-ai-cost-savings',
    title: 'Conversational AI Will Reduce Contact Center Labor Costs by $80 Billion',
    organization: 'Gartner',
    year: 2022,
    url: 'https://www.gartner.com/en/newsroom/press-releases/2022-08-31-gartner-predicts-conversational-ai-will-reduce-contact-center-agent-labor-costs-by-80-billion-in-2026',
    type: 'study',
    description: 'Research showing conversational AI deployments will reduce agent labor costs by $80 billion by 2026, automating 1 in 10 agent interactions'
  },
  {
    id: 'deloitte-automation-2022',
    title: 'Automation with Intelligence Survey',
    organization: 'Deloitte',
    year: 2022,
    url: 'https://www2.deloitte.com/content/dam/insights/us/articles/73699-global-intelligent-automation-survey/DI_Automation-with-intelligence.pdf',
    type: 'survey',
    description: 'Global survey showing 31% average cost reduction over 3 years from intelligent automation, with 74% of organizations implementing RPA'
  },
  {
    id: 'hubspot-social-response',
    title: 'Social Media Response Time Customer Expectations',
    organization: 'HubSpot',
    year: 2024,
    type: 'survey',
    description: 'Consumer expectations for social media customer service response times'
  },
  {
    id: 'ibm-ai-roi-2024',
    title: 'ROI of AI Report',
    organization: 'IBM',
    year: 2024,
    url: 'https://newsroom.ibm.com/2024-12-19-IBM-Study-More-Companies-Turning-to-Open-Source-AI-Tools-to-Unlock-ROI',
    type: 'study',
    description: 'Study showing 47% of companies see positive ROI from AI investments, with GenAI yielding 3.7x return'
  }
];

export const statistics: Statistic[] = [
  {
    id: 'ai-cost-savings',
    claim: 'AI automation reduces customer service costs',
    value: '30-31%',
    sourceIds: ['mckinsey-ai-2024', 'deloitte-automation-2022'],
    context: 'Based on research from McKinsey and Deloitte showing average cost reductions from AI and intelligent automation implementations',
    disclaimer: 'Cost savings vary by organization size, implementation scope, and automation complexity'
  },
  {
    id: 'lead-response-5min',
    claim: 'Responding within 5 minutes vs 30 minutes improves lead qualification',
    value: '21x higher',
    sourceIds: ['hbr-mit-lead-response'],
    context: 'Based on analysis of thousands of B2B leads across multiple industries'
  },
  {
    id: 'lead-response-1min',
    claim: 'Responding within 1 minute increases conversions',
    value: '391%',
    sourceIds: ['velocify-2016'],
    context: 'Compared to slower response times of 5+ minutes'
  },
  {
    id: 'first-responder-wins',
    claim: 'Customers buy from the first company that responds',
    value: '78%',
    sourceIds: ['insidesales-2021'],
    context: 'Highlights the critical importance of speed-to-lead in competitive markets'
  },
  {
    id: 'ai-contact-center-savings',
    claim: 'Projected contact center labor cost savings from conversational AI by 2026',
    value: '$80 billion',
    sourceIds: ['gartner-ai-cost-savings'],
    context: 'Gartner research forecasts massive industry-wide savings as AI automates 1 in 10 agent interactions'
  },
  {
    id: 'social-media-expectation',
    claim: 'Consumers expect social media responses',
    value: 'Within 1 hour',
    sourceIds: ['hubspot-social-response'],
    context: '39-43% of consumers expect responses within the first hour on social platforms'
  },
  {
    id: 'ai-roi',
    claim: 'Companies seeing positive ROI from AI investments',
    value: '47%',
    sourceIds: ['ibm-ai-roi-2024'],
    context: 'GenAI investments yield 3.7x return on every dollar invested according to IBM study'
  }
];

export function getSourceById(id: string): Source | undefined {
  return sources.find(s => s.id === id);
}

export function getStatisticById(id: string): Statistic | undefined {
  return statistics.find(s => s.id === id);
}

export function getSourcesByStatistic(statisticId: string): Source[] {
  const stat = getStatisticById(statisticId);
  if (!stat) return [];
  return stat.sourceIds.map(id => getSourceById(id)).filter((s): s is Source => s !== undefined);
}
