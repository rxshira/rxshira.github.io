export interface Award {
  title: string;
  date: string;
  description: string;
}

export const awards: Award[] = [
  {
    title: 'BC Achievement Scholarship',
    date: 'January 2025',
    description: 'Graduated with 96.1% average from University Hill Secondary'
  },
  {
    title: 'NASA Space Apps 2022: Global Judging Nominee',
    date: '2022',
    description: 'AI-generative art app for solar activity education'
  },
  {
    title: 'NASA Space Apps 2022: Art and Technology Award',
    date: '2022',
    description: 'Seattle region recognition'
  }
];
