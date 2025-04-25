import aviaSalesLogo from '../../components/assets/logos/logo.svg';

import styles from './logo.module.scss';

const Logo = () => {
  return (
    <>
      <img src={aviaSalesLogo} alt="Aviasales logo" className={styles.Logo}></img>
    </>
  );
};

export default Logo;
