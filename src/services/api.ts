
import { Job, JobFilter, JobType } from '../types/job';

// Mock data for job listings
const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Full Stack Developer',
    companyName: 'Amazon',
    companyLogo: '/amazon-logo.png',
    location: 'Chennai',
    jobType: 'FullTime',
    salaryMin: 50000,
    salaryMax: 80000,
    description: 'We are looking for a skilled Full Stack Developer to join our team.',
    requirements: 'Proficiency in React, Node.js, and database management systems.',
    responsibilities: 'Design and develop web applications, collaborate with the team.',
    experience: '1-3 yr Exp',
    postedAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago
    isRemote: true
  },
  {
    id: '2',
    title: 'Node Js Developer',
    companyName: 'Tesla',
    companyLogo: '/tesla-logo.png',
    location: 'Bangalore',
    jobType: 'FullTime',
    salaryMin: 60000,
    salaryMax: 90000,
    description: 'Join our engineering team to build scalable Node.js applications.',
    requirements: 'Strong expertise in JavaScript and Node.js.',
    responsibilities: 'Develop server-side applications, optimize application performance.',
    experience: '1-3 yr Exp',
    postedAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago
    isRemote: false
  },
  {
    id: '3',
    title: 'UX/UI Designer',
    companyName: 'Idea',
    companyLogo: '/idea-logo.png',
    location: 'Mumbai',
    jobType: 'FullTime',
    salaryMin: 45000,
    salaryMax: 75000,
    description: 'Create engaging user experiences for our products.',
    requirements: 'Expertise in UI/UX design tools and principles.',
    responsibilities: 'Design user interfaces, conduct user research, create wireframes.',
    experience: '1-3 yr Exp',
    postedAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago
    isRemote: true
  },
  {
    id: '4',
    title: 'Full Stack Developer',
    companyName: 'Amazon',
    companyLogo: '/amazon-logo.png',
    location: 'Delhi',
    jobType: 'FullTime',
    salaryMin: 55000,
    salaryMax: 85000,
    description: 'Join our team to develop innovative solutions.',
    requirements: 'Experience with React, Node.js, and database systems.',
    responsibilities: 'Develop full-stack applications, participate in code reviews.',
    experience: '1-3 yr Exp',
    postedAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago
    isRemote: true
  }
];

// API service for job operations
export const JobAPI = {
  // Get all jobs with optional filtering
  getJobs: async (filters?: JobFilter): Promise<Job[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filteredJobs = [...mockJobs];
        
        if (filters) {
          if (filters.title) {
            filteredJobs = filteredJobs.filter(job => 
              job.title.toLowerCase().includes(filters.title!.toLowerCase())
            );
          }
          
          if (filters.location) {
            filteredJobs = filteredJobs.filter(job => 
              job.location.toLowerCase().includes(filters.location!.toLowerCase())
            );
          }
          
          if (filters.jobType) {
            filteredJobs = filteredJobs.filter(job => 
              job.jobType === filters.jobType
            );
          }
          
          if (filters.salaryRange) {
            const [min, max] = filters.salaryRange;
            filteredJobs = filteredJobs.filter(job => 
              job.salaryMin >= min && job.salaryMax <= max
            );
          }
        }
        
        resolve(filteredJobs);
      }, 500); // Adding a small delay to simulate API call
    });
  },
  
  // Get job by ID
  getJobById: async (id: string): Promise<Job | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const job = mockJobs.find(job => job.id === id) || null;
        resolve(job);
      }, 500);
    });
  },
  
  // Create a new job
  createJob: async (job: Omit<Job, 'id' | 'postedAt'>): Promise<Job> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newJob: Job = {
          ...job,
          id: (mockJobs.length + 1).toString(),
          postedAt: new Date(),
        };
        mockJobs.push(newJob);
        resolve(newJob);
      }, 500);
    });
  },
  
  // Update an existing job
  updateJob: async (id: string, job: Partial<Job>): Promise<Job | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockJobs.findIndex(j => j.id === id);
        if (index !== -1) {
          mockJobs[index] = { ...mockJobs[index], ...job };
          resolve(mockJobs[index]);
        } else {
          resolve(null);
        }
      }, 500);
    });
  },
  
  // Delete a job
  deleteJob: async (id: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockJobs.findIndex(job => job.id === id);
        if (index !== -1) {
          mockJobs.splice(index, 1);
          resolve(true);
        } else {
          resolve(false);
        }
      }, 500);
    });
  }
};
