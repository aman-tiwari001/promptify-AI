'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
  // const isUserLoggedIn = true;
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);

  useEffect(() => {
    const SetUpProvider = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    SetUpProvider();
  }, []);

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image
          src='/assets/images/logo.svg'
          width={40}
          height={40}
          alt='Promptify Logo'
          className='object-contain rounded-full hover:shadow-lg transition-shadow duration-300 hover:shadow-orange-400'
        />
        <p className='logo_text'>Promptify</p>
      </Link>

      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/create-prompt' className='black_btn'>
              Create Post
            </Link>
            <button type='button' onClick={signOut} className='outline_btn'>
              Sign Out
            </button>
            <Link href='/profile'>
              <Image
                className='rounded-full'
                src={session?.user.image}
                alt='User Image'
                width={37}
                height={37}
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => {
                return (
                  <button
                    type='button'
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className='black_btn'
                  >
                    Sign In
                  </button>
                );
              })}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div>
            <Image
              className='rounded-full'
              src={session?.user.image}
              alt='User Image'
              width={37}
              height={37}
              onClick={() => {
                setToggleDropDown((prevState) => !prevState);
              }}
            />
            {toggleDropDown && (
              <div className='dropdown'>
                <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => setToggleDropDown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href='/create-prompt'
                  className='dropdown_link'
                  onClick={() => setToggleDropDown(false)}
                >
                  Create Post
                </Link>
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropDown(false);
                    signOut();
                  }}
                  className='mt-2 w-full black_btn'
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => {
                return (
                  <button
                    type='button'
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className='black_btn'
                  >
                    Sign In
                  </button>
                );
              })}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
