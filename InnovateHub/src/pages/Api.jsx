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
    setPage(1); 
  };

  // Function to fetch posts from the API
  const fetchPosts = async () => {
    try {
      setLoading(true);
      // Construct the API URL with pagination and search parameters using DummyJSON
      let url = `https://dummyjson.com/posts?limit=${postsPerPage}&skip=${(page - 1) * postsPerPage}`;
      
      // Add search term if provided
      if (searchTerm) {
        url = `https://dummyjson.com/posts/search?q=${encodeURIComponent(searchTerm)}&limit=${postsPerPage}&skip=${(page - 1) * postsPerPage}`;
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const result = await response.json();
      
      // DummyJSON returns posts in a 'posts' array and includes total count
      if (result && Array.isArray(result.posts)) {
        setPosts(result.posts);
        // Calculate total pages based on total posts count
        setTotalPages(Math.ceil(result.total / postsPerPage) || 1);
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
      <h1 className="text-3xl font-bold mb-8">Featured posts</h1>
      
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
                        <p className="text-gray-600 line-clamp-3">{post.body}</p>
                        {post.tags && post.tags.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-1">
                            {post.tags.map(tag => (
                              <span key={tag} className="px-2 py-1 bg-gray-100 text-xs rounded-full text-gray-600">#{tag}</span>
                            ))}
                          </div>
                        )}
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
          
        </>
      )}
    </div>
  );
}