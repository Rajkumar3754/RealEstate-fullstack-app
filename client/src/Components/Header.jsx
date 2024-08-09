import React, { useState, useEffect } from "react";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector(state => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [window.location.search]);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        {/* SIDE NAME */}
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Eclipse</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>

        {/* SEARCH BAR */}
        <form onSubmit={handleSubmit} className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" aria-label="Search">
            <FaSearch />
          </button>
        </form>

        {/* MOBILE MENU BUTTON */}
        <button
          className="block sm:hidden text-xl"
          onClick={toggleDrawer}
          aria-label="Toggle menu"
        >
          {isDrawerOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* NAVBAR */}
        <ul className="hidden sm:flex gap-4">
          <Link to="/">
            <li className="hover:underline">Home</li>
          </Link>
          <Link to="/About">
            <li className="hover:underline">About</li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img className="rounded-full h-7 w-7 object-cover" src={currentUser.avatar} alt="profile" />
            ) : (
              <li className="hover:underline">Sign in</li>
            )}
          </Link>
        </ul>
      </div>

      {/* MOBILE DRAWER */}
      <div
        className={`fixed top-0 right-0 bg-gray-800 bg-opacity-75 z-50 h-full w-64 transform transition-transform ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="bg-white h-full p-4">
          <button
            className="text-xl float-right"
            onClick={toggleDrawer}
            aria-label="Close menu"
          >
            <FaTimes />
          </button>
          <ul className="mt-8">
            <Link to="/" onClick={toggleDrawer}>
              <li className="py-2 hover:bg-gray-200">Home</li>
            </Link>
            <Link to="/About" onClick={toggleDrawer}>
              <li className="py-2 hover:bg-gray-200">About</li>
            </Link>
            <Link to="/profile" onClick={toggleDrawer}>
              {currentUser ? (
                <li className="py-2 flex items-center hover:bg-gray-200">
                  <img className="rounded-full h-7 w-7 object-cover mr-2" src={currentUser.avatar} alt="profile" />
                  Profile
                </li>
              ) : (
                <li className="py-2 hover:bg-gray-200">Sign in</li>
              )}
            </Link>
          </ul>
        </div>
      </div>
    </header>
  );
}
