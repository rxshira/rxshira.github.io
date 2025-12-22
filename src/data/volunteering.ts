export interface Volunteering {
  id: string;
  title: string;
  organization: string;
  timeline: string;
  description: string;
  location?: string;
  role?: string;
  link?: string;
  achievements?: string[];
}

export const volunteering: Volunteering[] = [
  {
    id: 'lovelace',
    title: 'The Lovelace Foundation',
    organization: 'Co-Founder & Executive Team',
    timeline: '2023 - Present',
    location: 'Vancouver, BC, Canada',
    description: 'Co-founded a provincially registered Non-Profit Organization creating a welcoming space for self-identifying girls to explore STEM. We provide hands-on workshops, outreach activities, and weekly club meetings to ensure young girls feel they have a place in Science, Technology, Engineering, and Math.',
    link: 'https://www.lovelacefoundation.ca/',
    achievements: [
      'Led Robolympics workshops reaching 30+ students per session',
      'Organized weekly club meetings at UHill Secondary School',
      'Created opportunities for members to engage in STEM outreach'
    ]
  },
  {
    id: 'geeringup',
    title: 'UBC Geering Up Engineering Outreach',
    organization: 'Junior Instructor',
    timeline: 'July - August 2023',
    location: 'Vancouver, BC, Canada',
    description: 'Delivered hands-on engineering education to classes of 30+ students in grades K-7. Developed curriculum, prepared materials, and led both main camp sessions (9am-3pm) and aftercare activities for 50+ students. Worked closely with the instructor team to provide engaging STEM education that inspires the next generation of engineers.',
    achievements: [
      'Taught main camp sessions to 30+ students daily',
      'Led aftercare activities for 50+ students',
      'Developed curriculum and prepared educational materials'
    ]
  },
  {
    id: 'gates',
    title: 'Bill and Melinda Gates Foundation',
    organization: 'Youth Ambassador',
    timeline: 'September 2022 - July 2024',
    location: 'Seattle, WA, USA / Virtually',
    description: 'Selected in two consecutive years from a competitive pool of applicants to represent Canada. Created youth-focused programs to inspire positive social change. Assisted in planning and running the Teen Action Fair in 2023 and 2024, focusing on motherhood and mental health, with total attendance of 500+ people.',
    achievements: [
      'Selected for both 2023 and 2024 cohorts (competitive application)',
      'Helped develop and run Teen Action Fair with 500+ attendees',
      'Created programs focused on social change and youth engagement'
    ]
  },
  {
    id: 'youthcouncil',
    title: 'Vancouver Point Grey Youth Council',
    organization: 'Youth Council Leader',
    timeline: 'June 2021 - Present',
    location: 'Vancouver, BC, Canada',
    description: 'Working directly with the Premier of BC and Ministers on events related to youth. Led constituency office stands during events, interacting with 600+ people per day. Spoke in front of 700+ elected delegates at the 2023 British Columbia New Democratic Party Convention in support of a resolution to increase funding for public K-12 education—the resolution passed with overwhelming support.',
    achievements: [
      'Spoke at BC NDP Convention to 700+ elected delegates',
      'Successfully advocated for increased K-12 education funding',
      'Led events interacting with 600+ constituents daily',
      'Working directly with Premier and Cabinet Ministers'
    ]
  }
];
