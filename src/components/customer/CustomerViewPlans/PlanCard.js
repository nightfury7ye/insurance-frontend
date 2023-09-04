import React from 'react';

const PlanCard = ({ plan, onPlanClick}) => {
  return (
    <div className='plan-card' onClick={() => onPlanClick(plan.planid)}>
      <h3>{plan.plan_name}</h3>
      <div className='plan-details'>
        <p><strong>Plan No.:</strong> {plan.planid}</p>
        {plan.schemes.length > 0 ? (
          <p>Available Schemes: {plan.schemes.length}</p>
        ) : (
          <p>No schemes available for this plan.</p>
        )}
      </div>
    </div>
  );
}

export default PlanCard;
