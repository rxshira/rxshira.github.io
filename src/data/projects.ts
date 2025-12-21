export interface Project {
  id: string;
  title: string;
  subtitle: string;
  timeline: string;
  description: string;
  techStack: string[];
  links?: {
    github?: string;
    website?: string;
    video?: string;
  };
  bgColor: string;
  textColor: string;
  featured?: boolean;
  hasImage?: boolean;
  imagePath?: string; // Path to image in public/images/ folder (e.g., "specml.jpg")
  stats?: {
    maxAltitude: { ft: number; m: number };
    maxVelocity: { mph: number; mps: number };
    maxG: number;
    motor: string;
  };
  certification?: string;
  features?: string[];
  collaborator?: string;
  impact?: string;
  role?: string;
  achievement?: string;
}

export const projects: Project[] = [
  {
    id: 'specml',
    title: 'SpecML',
    subtitle: 'Type-safe OCaml pipeline for NASA VIMS data',
    timeline: 'May 2025 - Present',
    description: 'A provably-correct OCaml pipeline for mapping planetary surface chemical compositions from NASA Cassini\'s VIMS hyperspectral imagery. Uses type-theoretic abstractions and the Rocq (Coq) proof assistant for formal verification.',
    techStack: ['OCaml', 'Seq', 'Rocq/Coq', 'Git'],
    links: {
      github: 'https://github.com/rxshira/SpecML'
    },
    bgColor: 'cream',
    textColor: 'orange',
    hasImage: false,
    collaborator: 'with Prof. Robert Harper'
  },
  {
    id: 'robograder',
    title: 'Robo-Grader',
    subtitle: 'Automated robot path grading system',
    timeline: 'October 2024 - December 2024',
    description: 'I made a robot auto-grader that takes a video of a robot moving and compares it to an inputted "correct" path. Built with CMU Graphics—automates evaluation with fast, reproducible feedback.',
    techStack: ['Python', 'CMU Graphics', 'MoviePy', 'Pillow'],
    links: {
      github: 'https://github.com/rxshira/Robo-Grader'
    },
    bgColor: 'magenta',
    textColor: 'white',
    hasImage: false,
    impact: 'Replaces manual grading with fast, reproducible feedback.'
  },
  {
    id: 'asteria1',
    title: 'Asteria 1',
    subtitle: 'I built a Level 1 - High Power Rocket.',
    timeline: 'October 2023 to May 2024',
    description: 'A high-power rocket reaching 1400ft altitude with custom avionics and recovery systems.',
    techStack: ['Rocketry', 'Electronics', 'Engineering'],
    links: {
      video: 'https://youtube.com/watch?v=example'
    },
    bgColor: 'yellow',
    textColor: 'magenta',
    featured: true,
    hasImage: true,
    stats: {
      maxAltitude: { ft: 1400, m: 426.72 },
      maxVelocity: { mph: 237, mps: 105.95 },
      maxG: 11.3,
      motor: 'Cesaroni H90 (38mm)'
    },
    certification: 'NAR Level 1 Certified - May 2024'
  },
  {
    id: 'ligo',
    title: 'LIGO',
    subtitle: '@ Caltech',
    timeline: 'August 2023 - April 2024',
    description: 'Developed Python simulation tool for the Laser Interferometer Gravitational-Wave Observatory (Nobel Prize in Physics, 2017) to optimize mode matching—maximizing laser power transfer. Achievement: Improved optical efficiency from ~30% to ~90% in 40m prototype.',
    techStack: ['Python', 'NumPy', 'Matplotlib'],
    bgColor: 'cream',
    textColor: 'black',
    hasImage: false,
    role: 'Research Intern',
    achievement: 'Improved optical efficiency from ~30% to ~90% in 40m prototype'
  }
];

