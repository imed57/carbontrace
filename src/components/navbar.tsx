import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Navbar.module.css';
import { InsideConnect } from './ConnectWallet/inside';

const Navbar: React.FC = () => {
  const router = useRouter();

  return (
    <nav className={styles.navbar}>
      {/* Link to Home with an image */}
      <Link href="/">
        <img src="/logo.png" alt="Home" className={styles.homeImage} />
      </Link>
      
      <ul className={styles.navItems}>
        {['explorer', 'listing', 'account'].map((item) => (
          <li
            key={item}
            className={`${styles.navItem} ${
              router.pathname === `/${item}` ? styles.active : ''
            }`}
          >
            <Link href={`/${item}`} passHref>
              <span>{item === 'account' ? 'MY ACCOUNT' : item.toUpperCase()}</span>
            </Link>
          </li>
        ))}
      </ul>
      <InsideConnect />
    </nav>
  );
};

export default Navbar;
