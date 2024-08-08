import React from 'react'
import  {BrowserRouter, Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Signin from './pages/Signin'
import SignOut from './pages/SignOut'
import Profile from './pages/Profile'
import Header from './Components/Header'
import SignUp from './pages/SignUp'
import PrivateRoute from './Components/PrivateRoute'
import CreateListing from './pages/CreateListing'
import UpdateListing from './pages/UpdateListing'
import Listing from './pages/Listing'



export default function App() {
  return (
    <BrowserRouter>

    <Header />

    <Routes>
      
      <Route path='/'  element={<Home />}/>
      <Route path='/About'  element={<About />}/>
      <Route path='/Sign-in'  element={<Signin />}/>
      <Route path='/Sign-up'  element={<SignUp />}/>
      <Route path='/Sign-out'  element={<SignOut />}/>
      <Route path='/listing/:listingId'  element={<Listing />}/>
     
     
      <Route   element={<PrivateRoute />}>

      <Route path='/Profile'  element={<Profile />}/>
      <Route path='/create-listing'  element={<CreateListing />}/>
      <Route path='/update-listing/:listingId'  element={<UpdateListing />}/>
      
      </Route>
      

    </Routes>
    
    </BrowserRouter>
    
  )
}
