import React, { useState, useEffect } from 'react';
import FilterComponent from './components/FilterComponent';
import JobList from './components/JobList';

const App = () => {
  const [filters, setFilters] = useState({}); // Initialize filters state

  const handleFilterChange = (filterKey, filterValue) => {
    setFilters({
      ...filters,
      [filterKey]: filterValue
    });
  };
  

  return (
    <div>
      <FilterComponent filters={filters} handleFilterChange={handleFilterChange} />
      <JobList filters={filters} />
    </div>
  );
};


export default App;
