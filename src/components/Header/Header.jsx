import React from 'react';
import styles from './Header.module.css';
import { FaMoon } from "react-icons/fa6";
import { FaRegSun } from "react-icons/fa";

function Header({filter,filters,onFilterChange, onDarkMode, darkMode}) {

  const handleDarkMode = () => {
    onDarkMode((prev)=> !prev);
    console.log(onDarkMode)
  }

  return (
    <header className={`${styles.header} ${darkMode ? styles.darkMode : ''}`}>

      {
        darkMode ?
          <button onClick={handleDarkMode}><FaRegSun/></button>
          :
          <button onClick={handleDarkMode}><FaMoon/></button>
      }
      <ul className={styles.filters}>
        {filters.map((value, index) => (
          <li key={index}>
            <button
              className={`${styles.filter} ${filter === value && styles.selected}`}
              onClick={() => onFilterChange(value)}>
              {value}
            </button>
          </li>
        ))}
      </ul>
    </header>
  );
}

export default Header;
