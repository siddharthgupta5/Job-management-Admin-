
export type JobType = 'FullTime' | 'PartTime' | 'Contract' | 'Internship';

export interface Job {
  id: string;
  title: string;
  companyName: string;
  companyLogo?: string;
  location: string;
  jobType: JobType;
  salaryMin: number;
  salaryMax: number;
  description: string;
  requirements?: string;
  responsibilities?: string;
  applicationDeadline?: Date;
  experience: string;
  postedAt: Date;
  isRemote: boolean;
}

export interface JobFilter {
  title?: string;
  location?: string;
  jobType?: JobType;
  salaryRange?: [number, number];
}
