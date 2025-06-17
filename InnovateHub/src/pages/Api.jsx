import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';

export default function Api() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const postsPerPage = 6;

  // Function to handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(searchInput);
    setPage(1); // Reset to first page when searching
  };

  // Function to fetch posts from the API
  const fetchPosts = async () => {
    try {
      setLoading(true);
      // Construct the API URL with pagination and search parameters
      let url = `https://posts-api-ewav.onrender.com/posts?page=${page}&limit=${postsPerPage}`;
      
      // Add search term if provided
      if (searchTerm) {
        url += `&search=${encodeURIComponent(searchTerm)}`;
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const result = await response.json();
      
      // Check if the response has the expected structure
      if (result && Array.isArray(result.data)) {
        setPosts(result.data);
        // Calculate total pages if pagination info is available
        if (result.pagination) {
          setTotalPages(result.pagination.totalPages || 1);
        } else {
          // Fallback calculation if pagination info is not provided
          setTotalPages(Math.ceil(result.total / postsPerPage) || 1);
        }
      } else {
        // If the API doesn't return the expected structure, handle it gracefully
        setPosts(Array.isArray(result) ? result : []);
        setTotalPages(1);
      }
      
      setError(null);
    } catch (err) {
      setError('Failed to fetch posts. Please try again later.');
      console.error('Error fetching posts:', err);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch posts when page or search term changes
  useEffect(() => {
    fetchPosts();
  }, [page, searchTerm]);

  return (
    <div className="flex flex-col items-center justify-center max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">API Demo</h1>
      
      {/* Search Form */}
      <Card className="w-full mb-6">
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Search Posts</h2>
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search posts..."
              className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button type="submit" variant="primary">
              Search
            </Button>
          </form>
        </div>
      </Card>
      
      {loading ? (
        <Card className="w-full">
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </Card>
      ) : error ? (
        <Card className="w-full bg-red-50">
          <div className="p-4 text-red-500">{error}</div>
        </Card>
      ) : (
        <>
          <Card className="w-full mb-6">
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">Posts</h2>
              {searchTerm && (
                <p className="text-gray-600 mb-4">
                  Showing results for: <span className="font-medium">{searchTerm}</span>
                  <button 
                    onClick={() => {
                      setSearchTerm('');
                      setSearchInput('');
                    }}
                    className="ml-2 text-blue-500 hover:text-blue-700"
                  >
                    Clear
                  </button>
                </p>
              )}
              
              {posts.length === 0 ? (
                <div className="py-8 text-center text-gray-500">
                  No posts found. Try a different search term.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {posts.map((post) => (
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
                        <p className="text-gray-600 line-clamp-3">{post.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center mt-8 space-x-2">
                  <Button 
                    onClick={() => setPage(prev => Math.max(prev - 1, 1))} 
                    disabled={page === 1}
                    variant="secondary"
                    size="sm"
                  >
                    Previous
                  </Button>
                  
                  <div className="flex items-center space-x-1">
                    {[...Array(totalPages).keys()].map((num) => {
                      // Show limited page numbers with ellipsis for better UX
                      const pageNum = num + 1;
                      
                      // Always show first, last, current, and pages around current
                      if (
                        pageNum === 1 ||
                        pageNum === totalPages ||
                        (pageNum >= page - 1 && pageNum <= page + 1)
                      ) {
                        return (
                          <Button
                            key={pageNum}
                            onClick={() => setPage(pageNum)}
                            variant={pageNum === page ? 'primary' : 'secondary'}
                            size="sm"
                            className="w-8 h-8 p-0"
                          >
                            {pageNum}
                          </Button>
                        );
                      }
                      
                      // Show ellipsis (but only once between groups of shown pages)
                      if (
                        (pageNum === 2 && page > 3) ||
                        (pageNum === totalPages - 1 && page < totalPages - 2)
                      ) {
                        return <span key={pageNum}>...</span>;
                      }
                      
                      return null;
                    })}
                  </div>
                  
                  <Button 
                    onClick={() => setPage(prev => Math.min(prev + 1, totalPages))} 
                    disabled={page === totalPages}
                    variant="secondary"
                    size="sm"
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>
          </Card>
          
          <Card className="w-full">
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">About This Demo</h2>
              <p className="text-gray-600">
                This page demonstrates how to fetch and display data from an external API in a React application.
                Features include pagination, search functionality, and displaying posts with images.
              </p>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}