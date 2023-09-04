import React from 'react';

const SchemeCard = ({ scheme, onSchemeClick }) => {
  return (
    <div className='scheme-card' onClick={()=> onSchemeClick(scheme)}>
      <h3>{scheme.scheme_name}</h3>
      <p><strong>Profit Ratio:</strong> {scheme.schemeDetails.profit_ratio}%</p>
    </div>
  );
}

export default SchemeCard;
