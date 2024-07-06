import React, { useState, useEffect } from 'react';

const KickCountMonitor = () => {
  const [isActive, setIsActive] = useState(false);
  const [kickCount, setKickCount] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handleStop = () => {
    setIsActive(false);
  };

  const handleKick = () => {
    if (isActive && kickCount < 10) {
      setKickCount((prevCount) => prevCount + 1);
    }
  };

  const handleReset = () => {
    setIsActive(false);
    setKickCount(0);
    setElapsedTime(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '24px', marginBottom: '20px' }}>Kick Count Monitor</h2>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <p style={{ fontSize: '48px', fontWeight: 'bold', margin: '0' }}>{kickCount}</p>
          <p>Kicks Counted</p>
        </div>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{formatTime(elapsedTime)}</p>
          <p>Time Elapsed</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
          {!isActive && kickCount === 0 && (
            <button onClick={handleStart} style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Start
            </button>
          )}
          {isActive && (
            <>
              <button onClick={handleKick} style={{ backgroundColor: '#2196F3', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                Record Kick
              </button>
              <button onClick={handleStop} style={{ backgroundColor: '#f44336', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                Stop
              </button>
            </>
          )}
          {!isActive && kickCount > 0 && (
            <button onClick={handleReset} style={{ backgroundColor: '#9E9E9E', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Reset
            </button>
          )}
        </div>
        {kickCount >= 10 && (
          <div style={{ backgroundColor: '#DFF2BF', color: '#4F8A10', padding: '10px', borderRadius: '5px', marginTop: '20px' }}>
            <p style={{ fontWeight: 'bold', margin: '0 0 5px 0' }}>Great job!</p>
            <p style={{ margin: '0' }}>You've recorded 10 kicks. Your baby's activity is normal.</p>
          </div>
        )}
        {elapsedTime >= 3600 && kickCount < 10 && (
          <div style={{ backgroundColor: '#FEEFB3', color: '#9F6000', padding: '10px', borderRadius: '5px', marginTop: '20px' }}>
            <p style={{ fontWeight: 'bold', margin: '0 0 5px 0' }}>Attention needed</p>
            <p style={{ margin: '0' }}>It's been an hour and you've recorded less than 10 kicks. Please contact your healthcare provider.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default KickCountMonitor;