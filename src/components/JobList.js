import React, { useState, useEffect } from 'react';
import JobCard from './JobCard';
import './JobList.css'; 
import axios from 'axios';

const JobList = ({ filters }) => {
  const [jobs, setJobs] = useState([]);
  
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.post(
          "https://api.weekday.technology/adhoc/getSampleJdJSON",
          {
            limit: 10,
            offset: 0,
            filters: filters || {}
          }
        );

        if (response.status === 200) {
          const { jdList } = response.data;
          const filteredJobs = jdList.map(job => removeNullProperties(job));
          applyFilters(filteredJobs); // Apply filters to fetched jobs
        }
      } catch (error) {
        console.error('Error fetching job data:', error);
      }
    };

    fetchJobs();
  }, [filters]);

  const applyFilters = (jobsToFilter) => {
    let filteredJobs = [...jobsToFilter];

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
    if (filters.companyName && filters.companyName.trim() !== '') {
      const companyNameFilter = filters.companyName.trim().toLowerCase();
      filteredJobs = filteredJobs.filter(job => job.companyName.toLowerCase().includes(companyNameFilter));
    }

    setJobs(filteredJobs); // Update jobs state with filtered jobs
  };

  const removeNullProperties = (obj) => {
    const newObj = {};
    for (const key in obj) {
      newObj[key] = obj[key] === null ? '' : obj[key];
    }
    return newObj;
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


 