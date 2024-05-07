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
          console.log(response.data)
          setJobs(jdList);
        }
      } catch (error) {
        console.error('Error fetching job data:', error);
      }
    };

    fetchJobs();
  }, [filters]); // Trigger fetchJobs only when filters change

  useEffect(() => {
    applyFilters(); // Apply filters whenever jobs or filters change
  }, [jobs, filters, companyName]);

  const applyFilters = () => {
    if (!jobs.length) {
      return; // If jobs array is empty, do nothing
    }

    let filteredJobs = [...jobs]; // Create a copy of jobs array

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
  
        // Check the selected filter location
        switch (filterLocation) {
          case 'remote':
            return jobLocation.includes('remote');
          case 'hybrid':
            return jobLocation.includes('hybrid');
          case 'office':
            // For office locations, match specific cities
            return (
              jobLocation === 'delhi ncr' ||
              jobLocation === 'mumbai' ||
              jobLocation === 'bangalore' ||
              jobLocation === 'chennai'
            );
          default:
            // Default to exact match of job location with selected filter
            return jobLocation === filterLocation;
        }
      });
    }
    filteredJobs = filterJobsByCompanyName(jobs, filters.companyName);
    

    // Additional filters can be applied similarly...

    if (!arraysEqual(filteredJobs, jobs)) {
      setJobs(filteredJobs); // Update jobs state only if filtered jobs are different
    }
  };

  const arraysEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  };

  const handleApply = (selectedJob) => {
    console.log(`Applying for job at ${selectedJob.companyName}`);
    alert(`Applying for job at ${selectedJob.companyName}`);
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
            onApply={handleApply}
          />
        ))}
    </div>
    </div>
   
    
  );
};

export default JobList;


 