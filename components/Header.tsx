import React from 'react'
import Link from 'next/link'

const Header = () => {
  return (
    <>
      <header className='min-h-24 flex justify-between items-center max-w-[1240px] w-full mx-auto'>
        <div>
          <Link href="/">NextAuth v5</Link>
        </div>

        <div>
          <ul className='flex gap-4 items-center'>
            <li><Link href="/" >Home</Link></li>
            <li><Link href="/about" >About</Link></li>
            <li><Link href="/profile" >Profile</Link></li>
          </ul>
        </div>
        <div>
          <Link href="/">Login</Link>
        </div>
      </header>
    </>
  )
}

export default Header