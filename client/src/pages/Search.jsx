import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ListingItem from '../Components/ListingItem';

export default function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'created_at',
    order: 'desc',
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);

    const searchTermFromUrl = urlParams.get('searchTerm') || '';
    const typeFromUrl = urlParams.get('type') || 'all';
    const parkingFromUrl = urlParams.get('parking') === 'true';
    const furnishedFromUrl = urlParams.get('furnished') === 'true';
    const offerFromUrl = urlParams.get('offer') === 'true';
    const sortFromUrl = urlParams.get('sort') || 'created_at';
    const orderFromUrl = urlParams.get('order') || 'desc';

    setSidebarData({
      searchTerm: searchTermFromUrl,
      type: typeFromUrl,
      parking: parkingFromUrl,
      furnished: furnishedFromUrl,
      offer: offerFromUrl,
      sort: sortFromUrl,
      order: orderFromUrl,
    });

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      try {
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        const data = await res.json();
        console.log('Fetched Listings:', data); // Log the listings data

        if (data.length > 8) {
          setShowMore(true);
        }

        setListings(data);
      } catch (error) {
        console.error('Error fetching listings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    const { id, type, value, checked } = e.target;

    if (type === 'checkbox') {
      setSidebarData((prevState) => ({
        ...prevState,
        [id]: checked,
      }));
    } else if (type === 'text') {
      setSidebarData((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    } else if (type === 'select-one') {
      const [sort, order] = value.split('_');
      setSidebarData((prevState) => ({
        ...prevState,
        sort: sort || 'created_at',
        order: order || 'desc',
      }));
    } else if (type === 'radio') {
      setSidebarData((prevState) => ({
        ...prevState,
        type: id,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams({
      searchTerm: sidebarData.searchTerm,
      type: sidebarData.type,
      parking: sidebarData.parking,
      furnished: sidebarData.furnished,
      offer: sidebarData.offer,
      sort: sidebarData.sort,
      order: sidebarData.order,
    }).toString();

    navigate(`/search?${urlParams}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();

    try {
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();

      if (data.length < 9) {
        setShowMore(false);
      }

      setListings((prevListings) => [...prevListings, ...data]);
    } catch (error) {
      console.error('Error fetching more listings:', error);
    }
  };

  return (
    <div className='flex flex-col md:flex-row'>
      {/* Left side */}
      <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
          <div className='flex items-center gap-2'>
            <label htmlFor='searchTerm' className='whitespace-nowrap font-semibold'>Search Term</label>
            <input
              type="text"
              id='searchTerm'
              placeholder='Search'
              className='border rounded-lg p-3 w-full'
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>

          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>Type:</label>
            <div className='flex gap-2'>
              <input
                type="radio"
                id='all'
                name='type'
                className='w-5'
                onChange={handleChange}
                checked={sidebarData.type === 'all'}
              />
              <span>Rent & Sale</span>
            </div>
            <div className='flex gap-2'>
              <input
                type="radio"
                id='rent'
                name='type'
                className='w-5'
                onChange={handleChange}
                checked={sidebarData.type === 'rent'}
              />
              <span>Rent</span>
            </div>
            <div className='flex gap-2'>
              <input
                type="radio"
                id='sale'
                name='type'
                className='w-5'
                onChange={handleChange}
                checked={sidebarData.type === 'sale'}
              />
              <span>Sale</span>
            </div>
            <div className='flex gap-2'>
              <input
                type="checkbox"
                id='offer'
                className='w-5'
                onChange={handleChange}
                checked={sidebarData.offer}
              />
              <span>Offer</span>
            </div>
          </div>

          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>Amenities:</label>
            <div className='flex gap-2'>
              <input
                type="checkbox"
                id='parking'
                className='w-5'
                onChange={handleChange}
                checked={sidebarData.parking}
              />
              <span>Parking</span>
            </div>
            <div className='flex gap-2'>
              <input
                type="checkbox"
                id='furnished'
                className='w-5'
                onChange={handleChange}
                checked={sidebarData.furnished}
              />
              <span>Furnished</span>
            </div>
          </div>

          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Sort:</label>
            <select
              id="sort_order"
              className='border rounded-lg p-3'
              onChange={handleChange}
              value={`${sidebarData.sort}_${sidebarData.order}`}
            >
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>

          <button type='submit' className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>Search</button>
        </form>
      </div>

      {/* Right side */}
      <div className='flex-1'>
        <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>Listing results:</h1>
        <div className='p-7 flex flex-col gap-4'>
          {!loading && listings.length === 0 && (
            <p className='text-xl text-slate-700'>No listing found!</p>
          )}

          {loading && (
            <p className='text-xl text-slate-700 text-center w-full'>Loading...</p>
          )}

          {!loading && listings.map((listing) => (
            <ListingItem key={listing._id} listing={listing} />
          ))}

          {showMore && (
            <button
              onClick={onShowMoreClick}
              className='text-green-700 hover:underline p-7 text-center w-full'
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
