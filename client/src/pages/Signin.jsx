import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SignInStart ,SignInSuccess,SignInFailure } from '../redux/user/userSlice';
import OAuth from '../Components/OAuth';

export default function Signin() {


 const {loading,error} = useSelector((state)=>state.user);
 
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });


  const navigate = useNavigate();
  
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // setloading(true)

    try {

      dispatch(SignInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      // if (!res.ok) {
      //   throw new Error(`HTTP error! Status: ${res.status}`);
      // }

      const data = await res.json();

      if(data.success === false){

      dispatch(SignInFailure(data.message))
        return


      }

     dispatch(SignInSuccess(data));
      navigate('/')
    } catch (error) {
      dispatch(SignInFailure(error.message));
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold m-7'>Sign In</h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
     
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
          {loading ? 'Loading....':'Sign In'}
        </button>

        <OAuth />
      </form>

      <div className='flex gap-2 mt-5'>
        <p>Dont have an account?</p>
        <Link to='/Sign-up'>
          <span className='text-black font-semibold underline'>Sign up</span>
        </Link>
        {error && <p className='text-red-500 mt-5'>{error}</p>}
      </div>
    </div>
  );
}
