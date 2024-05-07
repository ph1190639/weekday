import React, { useState, useEffect } from 'react';
import JobCard from './JobCard';
import './JobList.css'; 
import axios from 'axios';

const JobList = ({ filters }) => {
  const [jobs, setJobs] = useState([]);
  const [companyName] = useState('');
  
  
  const filterJobsByCompanyName = (jobs, companyName) => {
    if (!companyName) return jobs; // No company name filter applied
    const filteredJobs = jobs.filter(job => job.companyName.toLowerCase().includes(companyName.toLowerCase()));
    return filteredJobs;
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.post(
          "https://api.weekday.technology/adhoc/getSampleJdJSON",
          {
            limit: 10,
            offset: 0,
            filters: filters || {} // Ensure filters is an object or default to empty object
          }
        );

        if (response.status === 200) {
          const { jdList } = response.data;
          const filteredJobs = jdList.map(job => removeNullProperties(job));
          setJobs(filteredJobs);
        }
      } catch (error) {
        console.error('Error fetching job data:', error);
      }
    };

    fetchJobs();
  }, [filters]);

  useEffect(() => {
    applyFilters(); // Apply filters whenever jobs or filters change
  }, [jobs, filters]);

  const removeNullProperties = (obj) => {
    const newObj = {};
    for (const key in obj) {
      // Replace null values with empty string ('') if they exist
      newObj[key] = obj[key] === null ? '' : obj[key];
    }
    return newObj;
  };

  const applyFilters = () => {
    if (!jobs.length) {
      return; // If jobs array is empty, do nothing
    }

    let filteredJobs = [...jobs]; // Create a copy of jobs array

    // Apply filters based on the provided filters object
    if (filters.role) {
      filteredJobs = filteredJobs.filter(job => job.jobRole.toLowerCase() === filters.role.toLowerCase());
    }
    if (filters.salaryMin) {
      filteredJobs = filteredJobs.filter(job => job.minJdSalary >= filters.salaryMin);
    }
    if (filters.salaryMax) {
      filteredJobs = filteredJobs.filter(job => job.maxJdSalary <= filters.salaryMax);
    }
    if (filters.minExperience !== undefined && filters.minExperience !== null) {
      filteredJobs = filteredJobs.filter(job => job.minExp >= filters.minExperience);
    }
    if (filters.location) {
      const filterLocation = filters.location.toLowerCase().trim();
      filteredJobs = filteredJobs.filter(job => {
        const jobLocation = job.location.toLowerCase().trim();
        switch (filterLocation) {
          case 'remote':
            return jobLocation.includes('remote');
          case 'hybrid':
            return jobLocation.includes('hybrid');
          case 'office':
            return (
              jobLocation === 'delhi ncr' ||
              jobLocation === 'mumbai' ||
              jobLocation === 'bangalore' ||
              jobLocation === 'chennai'
            );
          default:
            return jobLocation === filterLocation;
        }
      });
    }

    // Filter jobs by company name (filters.companyName)
    if (filters.companyName && filters.companyName.trim() !== '') {
      const companyNameFilter = filters.companyName.trim().toLowerCase();
      filteredJobs = filteredJobs.filter(job => job.companyName.toLowerCase().includes(companyNameFilter));
    }

    setJobs(filteredJobs); // Update jobs state with filtered jobs
  };

  const handleApply = (selectedJob) => {
    console.log(`Applying for job at ${selectedJob.companyName}`);
    // Open the job link in a new tab when applying
    window.open(selectedJob.jdLink, '_blank');
  };

  


  return (
  
    <div className="job-list">

    <div className="job-grid">
      {/* Check if jobs is an array before mapping */}
      {Array.isArray(jobs) &&
        jobs.map((job) => (
          <JobCard
            key={job.jdUid}
            job={{
              id: job.jdUid,
              companyName: job.companyName,
              companyLogo: job.logoUrl,
              role: job.jobRole,
              location: job.location,
              estimatedSalary: `${job.minJdSalary} - ${job.maxJdSalary} ${job.salaryCurrencyCode}`,
              aboutCompany: job.jobDetailsFromCompany,
              minExperience: `${job.minExp} years`
            }}
            onApply={() => handleApply(job)}
          />
        ))}
    </div>
    </div>
   
    
  );
};

export default JobList;


 