import { developers } from '../../../constants';

import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <span> &copy; {new Date().getFullYear()} GraphiQL</span>
      <div className={styles.devContainer}>
        {developers.map(({ name, href }) => (
          <a key={name} href={href} target="_blank" rel="noreferrer">
            {name}
          </a>
        ))}
      </div>
      <a className={styles.rsLogo} href="https://rs.school/react/" target="_blank" rel="noreferrer" />
    </footer>
  );
};

export default Footer;