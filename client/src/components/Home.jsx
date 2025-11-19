import React from 'react'
import MainBannar from './MainBanner'
import TheBest from './TheBest'
import NewsLatter from './NewsLatter'
import Footer from './Footer'
import Categories from './Categories'
import BestSeller from './BestSeller'

const Home = () => {
  return (
    <div className='mt-10'>
        
    <MainBannar/>
    <Categories/>
    <BestSeller/>
     <TheBest/>
        <NewsLatter/>
       
    </div>
  )
}

export default Home