import React from 'react'
import {Container , Logo , LogoutBtn}  from '../index'
import {Link , useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status)

  const navigate = useNavigate()

  const navItems = [
    {
      name:"Home",
      slug: "/",
      active: true   
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus
    },
    ,
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus
    },
  ]


  return (
    <header className=' top-0 border-b-4 bg-white w-full'>
      <Container>
        <nav className='flex items-center pb-5'>
          <div className=''>
            <Link to = '/'>
            <Logo />
            </Link>
          </div>
          <ul className='inline-flex ml-auto'>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button
                className={`inline-block font-semibold px-6 py-2
                duration-200 rounded-full 
                ${item.name === "Login" ?  'text-white bg-blue-500 hover:bg-blue-600' : 'text-gray-800 hover:bg-blue-100'}`}
                 onClick={() => navigate(item.slug)}
                >{item.name}</button>
              </li>
            ) : null
            )}
            {authStatus && ( 
              <li>
                <LogoutBtn />
              </li>
            ) }
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header