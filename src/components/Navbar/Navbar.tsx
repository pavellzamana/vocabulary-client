import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './navbar.less';

export const Navbar: React.FC = () => (
  <header className={styles.header}>
    <div className={styles.container}>
      <nav className={styles.menu}>
        <div className={styles.logo}>English map</div>
        <ul className={styles.menuList}>
          <li className={styles.menuItem}>
            <NavLink className={styles.menuLink} to="/" exact>
              Vocabulary
            </NavLink>
          </li>
          <li className={styles.menuItem}>
            <NavLink className={styles.menuLink} to="/login">
              Login
            </NavLink>
          </li>
          <li className={styles.menuItem}>
            <NavLink className={styles.menuLink} to="/signin">
              Sign in
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
);
