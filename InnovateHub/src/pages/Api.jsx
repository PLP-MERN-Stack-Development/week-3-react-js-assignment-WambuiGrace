import React, { useState, useEffect } from 'react';
import Card from '../components/Card';

export default function Api() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Using JSONPlaceholder as a demo API
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">API Demo</h1>
      
      <Card title="API Data" variant="elevated" className="mb-6">
        {loading ? (
          <div className="p-6 text-center">
            <p className="text-gray-500 dark:text-gray-400">Loading data...</p>
          </div>
        ) : error ? (
          <div className="p-6 text-center">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <div className="p-6">
            <ul className="space-y-4">
              {data.map((item) => (
                <li key={item.id} className="border-b border-gray-200 dark:border-gray-700 pb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Card>
      
      <Card title="About This Demo" variant="outlined">
        <div className="p-6">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            This page demonstrates fetching data from an external API and displaying it in a structured format.
            We're using the JSONPlaceholder API, which provides fake data for testing and prototyping.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            In a real application, you would replace this with your actual API endpoints.
          </p>
        </div>
      </Card>
    </div>
  );
}