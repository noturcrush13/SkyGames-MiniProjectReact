import React from 'react'
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import PopularGames from '../components/Popular-games';
import Freetoplay from '../components/Freetoplay';
import Footer from '../components/Footer';

export default function Homepage() {
  return (
    <div>
        <Navbar />
        <Header />
        <PopularGames />
        <Freetoplay />
        <Footer />
    </div>
  )
}
