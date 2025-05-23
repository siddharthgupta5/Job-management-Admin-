
import React from 'react';
import { Job } from '@/types/job';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface JobCardProps {
  job: Job;
}

const CompanyLogo: React.FC<{ name: string; logo?: string }> = ({ name, logo }) => {
  // Handle specific company logos
  const getLogoUrl = (companyName: string): string | undefined => {
    const lowerName = companyName.toLowerCase();
    
    if (lowerName.includes('amazon')) {
      return "/lovable-uploads/6bbf8363-da87-4514-9495-978989328de0.png";
    } else if (lowerName.includes('tesla')) {
      return "/lovable-uploads/5dd4ccdc-5959-4713-8254-dedf5fe5ef57.png";
    } else if (lowerName.includes('swiggy') || lowerName.includes('idea')) {
      return "/lovable-uploads/3df5a8d4-908a-4086-80ed-c354e5189288.png";
    }
    
    return logo;
  };

  const logoUrl = getLogoUrl(name);
  
  return (
    <Avatar className="h-12 w-12">
      {logoUrl ? (
        <AvatarImage src={logoUrl} alt={`${name} logo`} className="object-contain" />
      ) : (
        <AvatarFallback className={`bg-gray-800 text-white`}>
          {name.charAt(0).toUpperCase()}
        </AvatarFallback>
      )}
    </Avatar>
  );
};

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const timeAgo = formatDistanceToNow(new Date(job.postedAt), { addSuffix: true });
  const formattedTimeAgo = timeAgo === 'about 1 day ago' ? '24h Ago' : timeAgo;
  
  return (
    <div className="job-card relative border border-gray-100 rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-all">
      <div className="absolute top-3 right-3">
        <span className="timeago-badge bg-gray-100 text-gray-600 text-xs rounded-full px-2 py-1">{formattedTimeAgo}</span>
      </div>
      
      <div className="flex items-start">
        <CompanyLogo name={job.companyName} logo={job.companyLogo} />
        
        <div className="ml-4 flex-1">
          <h3 className="font-semibold text-lg">{job.title}</h3>
          <p className="text-sm text-gray-600">{job.companyName}</p>
          
          <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-600">
            <div className="flex items-center">
              <span>{job.experience}</span>
            </div>
            <div className="flex items-center">
              <span>{job.isRemote ? 'Remote' : 'Onsite'}</span>
            </div>
            <div className="flex items-center">
              <span>₹{job.salaryMin/1000}k - ₹{job.salaryMax/1000}k</span>
            </div>
          </div>
          
          <ul className="mt-4 text-sm text-gray-700 space-y-1">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>A user-friendly interface lets you browse stunning photos and videos</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Filter destinations based on interests and travel style, and create personalized</span>
            </li>
          </ul>
          
          <div className="mt-4">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              Apply Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
