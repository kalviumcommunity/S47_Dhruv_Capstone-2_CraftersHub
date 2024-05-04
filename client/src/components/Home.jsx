import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Home1 from '../assets/Home1.jpg'
import Home2 from '../assets/Home2.jpg'
import Home3 from '../assets/Home3.jpg'
import Home4 from '../assets/Home4.jpg'
import Footer from './footer.jsx'
import { Typewriter, Cursor } from 'react-simple-typewriter'
const Home = () => {
  const [count, setCount] = useState(0)

  const bgImages = [
    {
      img: Home1,
      content: 'Crafted with Love, Shared with Joy',
      line: "Elevate your lifestyle with the charm of homemade treasures, crafted with passion and purpose"
    },
    {
      img: Home2,
      content: 'Bringing Homemade Goodness to Your Home',
      line: "Transform your everyday moments into extraordinary experiences with homemade delights."
    },
    {
      img: Home3,
      content: 'Elevate Your Everyday with Homemade Delights',
      line: "Crafted with care, homemade products bring joy to every moment."
    },
    {
      img: Home4,
      content: 'Experience the Magic of Homemade Inspiration',
      line: "Unlock the essence of authenticity with homemade treasures."
    },
  ]
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prevCount => (prevCount + 1) % bgImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  console.log(count);
  return (
    <div>
      <Navbar option='' />
      <div
        style={{
          backgroundImage: `url(${bgImages[count].img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '80vh',
          transition: 'background-image 1s ease-in-out',
        }}>
        <div>
          <h1
            style={{
              backgroundSize: 'cover',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              height: '80vh',
              borderRadius: '10px',
              textAlign: 'center',
              color: 'white',
              padding: '20vh'
            }}
            className='sm:text-[10vh] font-serif'
          > <Typewriter
              words={[bgImages[count].content]}
              cursor
              cursorStyle='|'
              typeSpeed={65} 
              deleteSpeed={40} 
              delaySpeed={500} 
              loop={true}
            />
            <br />
            <p className='text-3xl mt-10 font-serif font-semibold'>{bgImages[count].line}</p></h1>

        </div>
      </div>
      <div className='w-[40vw] text-center mx-auto'>
        <p className='text-2xl font-serif leading-9 my-8 tracking-widest'>Discover the charm and authenticity of homemade products, where every creation is infused with passion and creativity. From handcrafted goods to artisanal delicacies, each item tells a story of dedication and craftsmanship. Embrace the unique essence of homemade treasures, where quality and soul intertwine to enrich your life. Elevate your everyday experience with the warmth and comfort of homemade goodness, bringing joy and fulfillment to every moment.</p>
      </div>

      <Footer />
    </div>
  )
}

export default Home
