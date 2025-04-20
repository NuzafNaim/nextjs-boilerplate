"use client"
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import React from 'react'

const NavLinks = (props) => {

    const pathname = usePathname ()
    const isActive = pathname === props.path
  return (
    <Link className={isActive ? 'opacity-100' : 'opacity-50 hover:opacity-65'} href={props.path}>{props.text}</Link>
  )
}

export default NavLinks