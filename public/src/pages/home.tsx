/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Navbar from "components/navbar";
import styles from '../styles/home.module.css';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div className={styles.homeContainer}>
      <Navbar />
      <main className={styles.mainContent}>
        
        {/* Section principale */}
        <section className={styles.heroSection}>
          <div className={styles.heroText}>
            <img src="/logo.png" alt="Carbon Trace Logo" className={styles.logo} />
            <h1 className={styles.heroTitle}>Bringing Blockchain to the World</h1>
            <p className={styles.heroSubtitle}>
              Solana Labs builds products, tools and reference implementations that can be used on the Solana blockchain.
            </p>
            <Link href="/account">
              <button className={styles.connectButton}>Se connecter</button>
            </Link>
          </div>
          <div className={styles.heroImageContainer}>
            <img src="/carbon-.png" alt="Abstract 3D Shape" className={styles.heroImage} />
          </div>
        </section>

        {/* Section sur l'impact environnemental */}
        <section className={styles.impactSection}>
          <h2 className={styles.sectionTitle}>Notre Impact</h2>
          <p className={styles.sectionText}>
            Découvrez comment nous contribuons à un avenir durable en utilisant la technologie blockchain pour compenser les émissions de carbone.
          </p>
          <div className={styles.statsContainer}>
            <div className={styles.stat}>
              <h3 className={styles.statNumber}>500+</h3>
              <p>tonnes de CO2 compensées</p>
            </div>
            <div className={styles.stat}>
              <h3 className={styles.statNumber}>300+</h3>
              <p>utilisateurs satisfaits</p>
            </div>
          </div>
        </section>

        {/* Section partenaires */}
        <section className={styles.partnersSection}>
          <h2 className={styles.sectionTitle}>Nos Partenaires</h2>
          <div className={styles.partnersContainer}>
            <img src="/partenaire1.png" alt="Partenaire 1" className={styles.partnerLogo} />
            <img src="/partenaire2.webp" alt="Partenaire 2" className={styles.partnerLogo} />
            <img src="/partenaire3.jpg" alt="Partenaire 3" className={styles.partnerLogo} />
          </div>
        </section>

        {/* Section éducation blockchain */}
        <section className={styles.educationSection}>
          <h2 className={styles.sectionTitle}>Comprendre la Blockchain</h2>
          <p className={styles.sectionText}>
            La blockchain garantit des transactions transparentes et sécurisées. Apprenez-en plus sur son fonctionnement et comment elle soutient nos efforts de compensation carbone.
          </p>
        </section>

      </main>
    </div>
  );
};

export default Home;
