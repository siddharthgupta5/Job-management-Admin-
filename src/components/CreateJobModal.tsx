import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { JobType } from '@/types/job';
import { JobAPI } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

interface CreateJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJobCreated: () => void;
}

type FormState = {
  title: string;
  companyName: string;
  location: string;
  jobType: JobType;
  salaryMin: string;
  salaryMax: string;
  description: string;
  requirements?: string;
  responsibilities?: string;
  isRemote: boolean;
}

const initialFormState: FormState = {
  title: '',
  companyName: '',
  location: '',
  jobType: 'FullTime',
  salaryMin: '',
  salaryMax: '',
  description: '',
  requirements: '',
  responsibilities: '',
  isRemote: false
};

const CreateJobModal: React.FC<CreateJobModalProps> = ({ isOpen, onClose, onJobCreated }) => {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedJobType, setSelectedJobType] = useState<string>('FullTime');
  const { toast } = useToast();
  
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleJobTypeChange = (value: string) => {
    setSelectedJobType(value);
    setFormState(prev => ({ ...prev, jobType: value as JobType }));
  };
  
  const resetForm = () => {
    setFormState(initialFormState);
    setSelectedJobType('FullTime');
  };
  
  const handleClose = () => {
    resetForm();
    onClose();
  };
  
  const handleSaveDraft = () => {
    // In a real app, we might save this to localStorage or a drafts API
    toast({
      title: "Draft saved",
      description: "Your job posting draft has been saved."
    });
  };
  
  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      
      // Simple validation
      if (!formState.title || !formState.companyName || !formState.location || !formState.description) {
        toast({
          title: "Missing fields",
          description: "Please fill in all required fields.",
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }
      
      // Create job
      await JobAPI.createJob({
        title: formState.title,
        companyName: formState.companyName,
        location: formState.location,
        jobType: formState.jobType,
        salaryMin: parseInt(formState.salaryMin) || 0,
        salaryMax: parseInt(formState.salaryMax) || 0,
        description: formState.description,
        requirements: formState.requirements,
        responsibilities: formState.responsibilities,
        experience: '1-3 yr Exp', // Default for now
        isRemote: formState.isRemote,
      });
      
      toast({
        title: "Job created",
        description: "Your job posting has been created successfully."
      });
      
      // Reset and close
      resetForm();
      onJobCreated();
      onClose();
      
    } catch (error) {
      console.error('Error creating job:', error);
      toast({
        title: "Error",
        description: "There was an error creating the job posting.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Define job type options for the radio group
  const jobTypeOptions = [
    { value: 'FullTime', label: 'Full Time' },
    { value: 'PartTime', label: 'Parttime' },
    { value: 'Contract', label: 'Contract' },
    { value: 'Internship', label: 'Internship' },
  ];
  
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">Create Job Opening</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Job Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Full Stack Developer"
              value={formState.title}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              name="companyName"
              placeholder="Amazon"
              value={formState.companyName}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              placeholder="Chennai"
              value={formState.location}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="jobType">Job Type</Label>
            <Select value={selectedJobType} onValueChange={handleJobTypeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select job type" />
              </SelectTrigger>
              <SelectContent>
                {jobTypeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="salaryMin">Salary Range</Label>
            <div className="flex space-x-2 items-center">
              <span className="text-gray-500">₹</span>
              <Input
                id="salaryMin"
                name="salaryMin"
                placeholder="50,000"
                value={formState.salaryMin}
                onChange={handleInputChange}
                className="form-input"
              />
              <span className="text-gray-500">to</span>
              <span className="text-gray-500">₹</span>
              <Input
                id="salaryMax"
                name="salaryMax"
                placeholder="80,000"
                value={formState.salaryMax}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
          </div>
          
          <div className="col-span-2 space-y-2">
            <Label htmlFor="description">Job Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Please share a description to let the candidate know about the role"
              value={formState.description}
              onChange={handleInputChange}
              className="form-input min-h-32"
            />
          </div>
          
          <div className="col-span-2 flex justify-between mt-4">
            <Button
              variant="outline"
              onClick={handleSaveDraft}
            >
              Save Draft
            </Button>
            
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Publish
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateJobModal;
