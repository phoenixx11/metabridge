'use client';
import React from 'react';
import styles from '../../styles/dashboard.module.css';

const Dashboard = () => {
  const assets = [
    { id: 1, name: 'Decentraland Land', value: '15 ETH' },
    { id: 2, name: 'Sandbox Estate', value: '10 ETH' },
    { id: 3, name: 'CryptoVoxel Apartment', value: '8 ETH' }
  ];

  const activityFeed = [
    { id: 1, action: 'Collateralized Decentraland Land', status: 'Completed' },
    { id: 2, action: 'Rented out Sandbox Estate', status: 'Ongoing' },
    { id: 3, action: 'Traded CryptoVoxel Apartment', status: 'Pending' }
  ];

  return (
    <section className={styles.dashboard}>
      <div className="container">
        <h2 className={styles.title}>User Dashboard</h2>
        
        {/* Virtual Assets Section */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Your Virtual Assets</h3>
          <div className={styles.grid}>
            {assets.map(asset => (
              <div key={asset.id} className={styles.card}>
                <h3>{asset.name}</h3>
                <p>Value: {asset.value}</p>
                <button className={styles.button}>Manage Asset</button>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Feed Section */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Activity Feed</h3>
          <div className={styles.activityFeed}>
            {activityFeed.map(activity => (
              <div key={activity.id} className={styles.activityItem}>
                <p>{activity.action}</p>
                <p>Status: {activity.status}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
