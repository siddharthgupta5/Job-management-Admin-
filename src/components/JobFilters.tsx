
import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { JobFilter, JobType } from '@/types/job';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

interface JobFiltersProps {
  onFilterChange: (filters: JobFilter) => void;
}

const JobFilters: React.FC<JobFiltersProps> = ({ onFilterChange }) => {
  const [title, setTitle] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [jobType, setJobType] = useState<JobType | 'all'>('all');
  const [salaryRange, setSalaryRange] = useState<[number, number]>([50, 80]);
  
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    updateFilters({ title: e.target.value });
  };
  
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
    updateFilters({ location: e.target.value });
  };
  
  const handleJobTypeChange = (value: string) => {
    const newJobType = value as JobType | 'all';
    setJobType(newJobType);
    updateFilters({ jobType: newJobType === 'all' ? undefined : newJobType as JobType });
  };
  
  const handleSalaryRangeChange = (value: number[]) => {
    const newRange: [number, number] = [value[0], value[1]];
    setSalaryRange(newRange);
    updateFilters({ salaryRange: [newRange[0] * 1000, newRange[1] * 1000] });
  };
  
  const updateFilters = (newFilters: Partial<JobFilter>) => {
    const filters: JobFilter = {
      title: title || undefined,
      location: location || undefined,
      jobType: jobType === 'all' ? undefined : jobType as JobType,
      salaryRange: salaryRange ? [salaryRange[0] * 1000, salaryRange[1] * 1000] : undefined,
      ...newFilters
    };
    
    // Remove undefined values
    Object.keys(filters).forEach(key => {
      if (filters[key as keyof JobFilter] === undefined) {
        delete filters[key as keyof JobFilter];
      }
    });
    
    onFilterChange(filters);
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search By Job Title, Role"
            value={title}
            onChange={handleTitleChange}
            className="pl-10 pr-4 form-input"
          />
        </div>
        
        <div className="flex-1 relative">
          <MapPin className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Preferred Location"
            value={location}
            onChange={handleLocationChange}
            className="pl-10 pr-4 form-input"
          />
        </div>
        
        <div className="flex-1">
          <Select value={jobType} onValueChange={handleJobTypeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Job type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="FullTime">Full Time</SelectItem>
              <SelectItem value="PartTime">Part Time</SelectItem>
              <SelectItem value="Contract">Contract</SelectItem>
              <SelectItem value="Internship">Internship</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex-1">
          <div className="flex flex-col space-y-2">
            <div className="text-sm text-gray-600">
              Salary Per Month
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>₹{salaryRange[0]}k</span>
              <span>₹{salaryRange[1]}k</span>
            </div>
            <Slider
              defaultValue={[50, 80]}
              max={100}
              min={0}
              step={5}
              value={salaryRange}
              onValueChange={handleSalaryRangeChange}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobFilters;
