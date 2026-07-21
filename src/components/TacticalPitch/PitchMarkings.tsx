import React from 'react';

export default function PitchMarkings() {
  return (
    <div className="pitch-markings">
      <div className="pitch-outline" />
      <div className="pitch-center-line" />
      <div className="pitch-center-circle" />
      <div className="pitch-center-spot" />
      
      <div className="pitch-penalty-box-top" />
      <div className="pitch-goal-area-top" />
      <div className="pitch-penalty-spot-top" />
      <div className="pitch-penalty-arc-top" />
      
      <div className="pitch-penalty-box-bottom" />
      <div className="pitch-goal-area-bottom" />
      <div className="pitch-penalty-spot-bottom" />
      <div className="pitch-penalty-arc-bottom" />

      <div className="pitch-corner-arc-top-left" />
      <div className="pitch-corner-arc-top-right" />
      <div className="pitch-corner-arc-bottom-left" />
      <div className="pitch-corner-arc-bottom-right" />
    </div>
  );
}
