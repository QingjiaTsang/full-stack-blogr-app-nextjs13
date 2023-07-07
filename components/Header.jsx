'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';

const Header = (props) => {
  const curPathname = usePathname();
  const { data: session, status } = useSession();
  const isActive = (pathname) => pathname === curPathname;
  console.log(`session 111`, session);
  console.log(`status 111`, status);

  let left = (
    <Link href='/' className={'flex gap-2 flex-center mb-3'}>
      <Image
        src='assets/images/logo.svg'
        alt='logo'
        width='30'
        height='30'
        className='object-contain'
      />
      <p className={`${isActive('/') && 'text-gray-500'} logo_text`}>Feed</p>
    </Link>
  );
  let right;

  if (!session) {
    if (status === 'loading') {
      right = <div className={`mr-20 mb-3 font-bold`}>Validating session...</div>;
    } else {
      right = (
        <div
          className='mr-32 mb-3 font-bold cursor-pointer border border-solid rounded border-gray-950 p-1 hover:bg-blue-400 hover:border-blue-400 hover:text-white'
          onClick={() => signIn()}
        >
          Log in
        </div>
      );
    }
  } else {
    left = (
      <div className='flex'>
        <Link href='/' className={'flex gap-2 flex-center mb-3'}>
          <Image
            src='assets/images/logo.svg'
            alt='logo'
            width='30'
            height='30'
            className='object-contain'
          />
          <p className={`${isActive('/') && 'text-gray-500'} logo_text`}>Feed</p>
        </Link>
        <Link href='/drafts' className='ml-5'>
          <div className={`${isActive('/drafts') && 'text-gray-500'} logo_text`}>My drafts</div>
        </Link>
      </div>
    );
    right = (
      <div
        className={`flex space-x-3 absolute  ${
          session?.user?.name ? 'right-2 w-[500px]' : 'right-2 w-[250px]'
        } `}
      >
        {session && (
          <div className='mt-1 flex'>
            <div className='mr-2'>
              <Image
                src={session.user.image}
                alt='avatar'
                width='30'
                height='30'
                className='object-contain rounded-full'
              />
            </div>
            <div>
              {session.user.name} ({session.user.email})
            </div>
          </div>
        )}
        <Link
          href='/create'
          className='mb-3 font-bold border border-solid rounded border-gray-950 p-1 hover:bg-blue-400 hover:border-blue-400 hover:text-white'
        >
          New post
        </Link>
        <button
          onClick={() => signOut()}
          className='mb-3 font-bold border border-solid rounded border-gray-950 p-1 hover:bg-blue-400 hover:border-blue-400 hover:text-white'
        >
          Log out
        </button>
      </div>
    );
  }

  return (
    <nav className='flex-between w-full mb-16 ml-8 pt-3'>
      {left}
      {right}
    </nav>
  );
};

export default Header;
