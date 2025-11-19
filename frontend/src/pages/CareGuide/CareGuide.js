import React, { useState } from 'react';
import { DUMMY_ORDERS } from '../../data/orders';
import { getCareGuide } from '../../data/careGuides';
import './CareGuide.css';

const CareGuide = () => {
  const latestOrder = DUMMY_ORDERS[0];
  const [expandedGuides, setExpandedGuides] = useState({});

  const toggleGuide = (plantId) => {
    setExpandedGuides(prevState => ({
      ...prevState,
      [plantId]: !prevState[plantId],
    }));
  };

  return (
    <div className="care-guide-page">
      <h1 className="care-guide-title">My Plant Care Guide</h1>
      <div className="care-guide-section">
        {latestOrder.items.map(item => {
          const careGuide = getCareGuide(item.id);
          const isExpanded = expandedGuides[item.id];

          return (
            <div key={item.id} className="plant-care-guide">
              <h2>{item.name}</h2>
              <div className="timeline">
                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <p className="timeline-day">{careGuide[0].split(':')[0]}</p>
                    <p className="timeline-step">{careGuide[0].split(':')[1]}</p>
                  </div>
                </div>
                {isExpanded && careGuide.slice(1).map((step, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                      <p className="timeline-day">{step.split(':')[0]}</p>
                      <p className="timeline-step">{step.split(':')[1]}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="toggle-guide-btn" onClick={() => toggleGuide(item.id)}>
                {isExpanded ? 'Show less' : 'Show more'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CareGuide;
