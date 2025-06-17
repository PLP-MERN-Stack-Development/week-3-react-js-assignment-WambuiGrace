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
        // Fetch only 2 posts for the featured section from DummyJSON
        const response = await fetch('https://dummyjson.com/posts?limit=2');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const result = await response.json();
        
        // DummyJSON returns posts in a 'posts' array
        if (result && Array.isArray(result.posts)) {
          setFeaturedPosts(result.posts);
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
                  <div className="h-48 overflow-hidden bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center">
                    <img 
                      src={`https://source.unsplash.com/300x200/?${encodeURIComponent(post.tags?.[0] || 'blog')}`} 
                      alt={post.title || 'Post image'} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/400x200?text=No+Image';
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-300 mb-2">{post.title}</h3>
                    <p className="text-gray-600 line-clamp-3 mb-4">{post.body}</p>
                    {post.tags && post.tags.length > 0 && (
                      <div className="mb-3 flex flex-wrap gap-1">
                        {post.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="px-2 py-1 bg-gray-100 text-xs rounded-full text-gray-600">#{tag}</span>
                        ))}
                      </div>
                    )}
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