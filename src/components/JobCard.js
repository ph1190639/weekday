import React, { useState } from 'react';
import ModalContent from './ModalContent';
import { truncateAndFade } from '../Utils';
import './JobCard.css';

const JobCard = ({ job, onApply }) => {
  const [expanded, setExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const {
    companyName,
    companyLogo,
    role,
    location,
    estimatedSalary,
    aboutCompany,
    minExperience
  } = job;


  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div className="job-card">
      <p className='upload__date'>Posted 10 days ago</p>
      <div className='company__details'>
        <div className='logo__container'>
          <img src={companyLogo} alt={companyName} className='company__logo'/>
        </div>
        <div className='company__info'>
          <h3 className='company__name'>{companyName}</h3>
          <p className='company__role'>{role}</p>
          <p className='company__location'>{location}</p>
        </div>
      </div>

      <div className="overall-content">
        <p>Estimated Salary: {estimatedSalary}</p>
        <h4>About Company:</h4>
        <div
          className="description"
          dangerouslySetInnerHTML={{
            __html: expanded
              ? job.aboutCompany
              : truncateAndFade(aboutCompany, 200, 40)
          }}
        />
        <div className="about-company">
          
          {job.aboutCompany.length > 100 && (
            <button onClick={() => setShowModal(true)}>Show More</button>
          )}

          {showModal && (
            <ModalContent
              isOpen={showModal}
              onClose={handleModalClose}
              title={job.role}
              content={job.aboutCompany}
            />
          )}
        </div>
        <p>Minimum Experience: {minExperience}</p>
        <div className="action-buttons">
          <button className="apply-button" onClick={() => onApply(job)}>Easy Apply</button>
          <button className="learn-more-button" onClick={() => onApply(job)}>Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
