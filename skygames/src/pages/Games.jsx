import React from 'react'
import '../assets/css/home.css'
import Footer from '../components/Footer';
import ListGames from '../components/ListGames';
import Navbar from '../components/Navbar';

export default function Games() {
  return (
    <div>
      <Navbar/>
      <ListGames/>
      <Footer/>
    </div>
  )
}
