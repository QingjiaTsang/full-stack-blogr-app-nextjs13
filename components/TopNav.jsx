import Image from 'next/image';
import Link from 'next/link';
const TopNav = (props) => {
  return (
    <div>
      <nav className='flex-between w-full mb-16 ml-8 pt-3'>
        <Link href='/' className='flex gap-2 flex-center mb-3'>
          <Image
            src='assets/images/logo.svg'
            alt='logo'
            width='30'
            height='30'
            className='object-contain'
          />
          <p className='logo_text'>Feed</p>
        </Link>
      </nav>
    </div>
  );
};

export default TopNav;
