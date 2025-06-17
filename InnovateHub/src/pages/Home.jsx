import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import TaskManager from '../components/TaskManager';
import Button from '../components/Button';

export default function Home() {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedPosts = async () => {
      try {
        setLoading(true);
        // Fetch only 2 posts for the featured section
        const response = await fetch('https://posts-api-ewav.onrender.com/posts?limit=2');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const result = await response.json();
        
        // Check if the response has the expected structure
        if (result && Array.isArray(result.data)) {
          setFeaturedPosts(result.data);
        } else {
          // If the API doesn't return the expected structure, handle it gracefully
          setFeaturedPosts(Array.isArray(result) ? result : []);
        }
        
        setError(null);
      } catch (err) {
        setError('Failed to fetch featured posts.');
        console.error('Error fetching featured posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedPosts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card title="Task Manager" variant="elevated" className="min-h-[500px]">
        <TaskManager />
      </Card>
      
      <Card title="Featured Posts" variant="outlined">
        <div className="p-4">
          {loading ? (
            <div className="flex justify-center items-center p-4">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : featuredPosts.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">
              No featured posts available at the moment.
            </p>
          ) : (
            <div className="space-y-4">
              {featuredPosts.map((post) => (
                <div key={post.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  {post.image && (
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title || 'Post image'} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/400x200?text=No+Image';
                        }}
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">{post.title}</h3>
                    <p className="text-gray-600 line-clamp-3 mb-4">{post.body}</p>
                    <Link to={`/api`} className="inline-block">
                      <Button variant="primary" size="sm">
                        Read More
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
              
              <div className="flex justify-center mt-4">
                <Link to="/api" className="inline-block">
                  <Button variant="secondary">
                    View All Posts
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}