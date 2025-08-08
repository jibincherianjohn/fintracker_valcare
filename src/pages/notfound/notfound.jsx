
const Notfound = () => {
    
      const navigateHome = () => {
    window.location.href = '/';
  };
  return (
     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        
        <h2 className="text-2xl font-semibold text-white mb-4">
          Page Not Found
        </h2>
        
        <p className="text-gray-400 mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <button
          onClick={navigateHome}
          className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors border border-gray-600"
        >
          Go to Home
        </button>
      </div>
    </div>

  )
}

export default Notfound
