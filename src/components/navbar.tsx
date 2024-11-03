import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Navbar.module.css';
import { InsideConnect } from './ConnectWallet/inside';

const Navbar: React.FC = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={styles.navbar}>
      {/* Conteneur pour le logo */}
      <div className={styles.logoContainer}>
        <Link href="/">
          <img src="/logo.png" alt="Home" className={styles.homeImage} />
        </Link>
      </div>

      {/* Menu de navigation */}
      <ul
        className={`${styles.navItems} ${menuOpen ? styles.navActive : ''}`}
      >
        {['explorer', 'listing', 'account'].map((item) => (
          <li
            key={item}
            className={`${styles.navItem} ${
              router.pathname === `/${item}` ? styles.active : ''
            }`}
            onClick={() => setMenuOpen(false)}
          >
            <Link href={`/${item}`}>
              <span>{item === 'account' ? 'MY ACCOUNT' : item.toUpperCase()}</span>
            </Link>
          </li>
        ))}
        {/* Bouton "Connect Wallet" uniquement dans le menu burger */}
        <li className={styles.navItem}>
          <div onClick={() => setMenuOpen(false)}>
            <InsideConnect />
          </div>
        </li>
      </ul>

      {/* Bouton du menu burger (affiché uniquement sur tablette et mobile) */}
      <div
        className={styles.menuIcon}
        onClick={handleMenuToggle}
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
        role="button"
      >
        <div className={`${styles.bar} ${menuOpen ? styles.change : ''}`}></div>
        <div className={`${styles.bar} ${menuOpen ? styles.change : ''}`}></div>
        <div className={`${styles.bar} ${menuOpen ? styles.change : ''}`}></div>
      </div>
    </nav>
  );
};

export default Navbar;
