import React from 'react';
import './FilterComponent.css'; // Import your CSS file

const FilterComponent = ({ filters, handleFilterChange }) => {
  // Destructure filters with default values in case filters is undefined
  const {
    role = '',
    numEmployees = '',
    minExperience = '',
    minBaseSalary = '',
    companyName = '',
    workMode = 'remote'
  } = filters || {};

  return (
    <div className="filter-container">
      {/* Role Filter */}
      <div className="filter-item">
        <select
          id="role"
          value={role}
          onChange={(e) => handleFilterChange('role', e.target.value)}
        >
          <option value="">Role</option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="fullstack">Fullstack</option>
        </select>
      </div>

      {/* Number of Employees Filter */}
      <div className="filter-item">
        <select
          id="numEmployees"
          value={numEmployees}
          onChange={(e) => handleFilterChange('numEmployees', e.target.value)}
        >
          <option value="">Number of Employees</option>
          <option value="1-10">1-10</option>
          <option value="11-20">11-20</option>
          <option value="21-30">21-30</option>
          <option value="31-50">31-50</option>
          <option value="51-100">51-100</option>
        </select>
      </div>

      {/* Minimum Experience Filter */}
      <div className="filter-item">
        <select
          value={minExperience}
          onChange={(e) => handleFilterChange('minExperience', e.target.value)}
        >
          <option value="">Experience</option>
          <option value="1">1 year</option>
          <option value="2">2 years</option>
          <option value="3">3 years</option>
          <option value="4">4 years</option>
          <option value="5">5 years</option>
          <option value="6">6+ years</option>
        </select>
      </div>

      {/* Work Mode Filter */}
      <div className="filter-item">
        <select
          value={workMode}
          onChange={(e) => handleFilterChange('workMode', e.target.value)}
        >
          <option value="remote">Remote</option>
          <option value="hybrid">Hybrid</option>
          <option value="delhi ncr">Delhi NCR</option>
          <option value="mumbai">Mumbai</option>
          <option value="bangalore">bangalore</option>
          <option value="chennnai">Chennnai</option>
        </select>
      </div>

      {/* Minimum Base Salary Filter */}
      <div className="filter-item">
        <select
          id="minBaseSalary" 
          value={minBaseSalary}
          onChange={(e) => handleFilterChange('minBaseSalary', e.target.value)}
        >
          <option value="">Minimum Base Salary</option>
          <option value="0L">0L</option>
          <option value="10L">10L</option>
          <option value="20L">20L</option>
          <option value="30L">30L</option>
        </select>
      </div>

      {/* Company Name Filter */}
      <div className="filter-item">
      <input
        type="text"
        placeholder="Search Company Name"
        onChange={(e) => handleFilterChange('companyName', e.target.value)}
      />
    </div>
    </div>
  );
};

export default FilterComponent;
