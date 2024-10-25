import React from 'react';
import  styles from './loader.module.scss';
import LoaderImage from '../../assets/loader.gif';

const Loader: React.FC = () => {
  return (
    <div className={styles.loadercontainer}>
      	<img src={LoaderImage} alt=""/>
    </div>
  );
};

export default Loader;