
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import JobFilters from '@/components/JobFilters';
import JobCard from '@/components/JobCard';
import CreateJobModal from '@/components/CreateJobModal';
import { Job, JobFilter } from '@/types/job';
import { JobAPI } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<JobFilter>({});
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { toast } = useToast();

  // Fetch jobs when filters change
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const data = await JobAPI.getJobs(filters);
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        toast({
          title: "Error fetching jobs",
          description: "There was an error loading job listings.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [filters, toast]);

  const handleFilterChange = (newFilters: JobFilter) => {
    setFilters(newFilters);
  };

  const handleCreateJobClick = () => {
    setIsCreateModalOpen(true);
  };

  const handleJobCreated = async () => {
    try {
      setIsLoading(true);
      const data = await JobAPI.getJobs(filters);
      setJobs(data);
      toast({
        title: "Success!",
        description: "Job posting created successfully."
      });
    } catch (error) {
      console.error('Error refreshing jobs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onCreateJobClick={handleCreateJobClick} />
      
      <main className="container mx-auto py-8 px-4">
        <JobFilters onFilterChange={handleFilterChange} />
        
        <div className="space-y-4">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple"></div>
            </div>
          ) : jobs.length > 0 ? (
            jobs.map((job) => <JobCard key={job.id} job={job} />)
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-700">No job listings found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your search filters</p>
            </div>
          )}
        </div>
      </main>
      
      <CreateJobModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)}
        onJobCreated={handleJobCreated}
      />
    </div>
  );
};

export default Index;
