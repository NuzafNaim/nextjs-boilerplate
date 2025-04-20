import Link from 'next/link'
import React from 'react'
import NavLinks from './NavLinks'

const navItems = [
  {
    path: '/',
    text: 'Home'
  }, 
  {
    path: '/our-team',
    text: 'Our Team'
  }, 
  {
    path: '/about-us',
    text: 'About Us'
  }
]

const Header = () => {
  return (
    <header className='bg-white/50'>
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <Link href="/"><img className='py-6' src="next.svg" width={120} alt="N2S Boiler Nextjs" /></Link>
        <nav className="flex gap-4">
          <ul className='flex gap-4 text-gray-500 text-sm font-bold'>
          {
                navItems.map((ulnav, index) => (
                  <li key={index}>
                    <NavLinks path={ulnav.path} text={ulnav.text} />
                  </li>
                ))
          }
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header