import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-[#5B156F]  text-white'>
        <div className="mycontainer flex  items-center px-4 py-5 justify-between h-12">


        <div className="logo text-2xl font-extrabold text-white ">
            <span className='text-white'>&lt;Vault</span>
            
            <span className='text-green-600'>X/&gt;</span>
            </div>
      
      <button className='text-white bg-black flex justify-between  items-center my-5 rounded-xl '>
        <img className='invert p-1 w-10' src="icons/github-logo.png" alt="github" />
        <span className='font-bold px-2'>GitHub</span>
        
      </button>
      </div>
    </nav>
  )
}

export default Navbar
