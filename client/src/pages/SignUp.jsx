import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';

export default function SignUp() {


  const [loading,setloading] = useState(false)
  const [error,setError] = useState(null)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });


  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setloading(true)

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();

      if(data.success === false){

        setError(data.message);
        setloading(false)
        return


      }

      setloading(false);

      setError(null);
      navigate('/Sign-in')
    } catch (error) {
      setloading(false)
      setError(error.message);
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold m-7'>Sign Up</h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type="text"
          placeholder='Username'
          className='border p-3 rounded-lg'
          id='username'
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder='Email'
          className='border p-3 rounded-lg'
          id='email'
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder='Password'
          className='border p-3 rounded-lg'
          id='password'
          value={formData.password}
          onChange={handleChange}
        />

        <button
          disabled={loading}
          type='submit'
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading....':'Sign Up'}
        </button>
      </form>

      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to='/Sign-in'>
          <span className='text-black font-semibold underline'>Sign In</span>
        </Link>
        {error && <p className='text-red-500 mt-5'>{error}</p>}
      </div>
    </div>
  );
}
