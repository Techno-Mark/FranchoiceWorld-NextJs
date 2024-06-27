import React from 'react';
import styles from './title.module.css';

interface TitleProps {
  title: string;
  desc?: string;
}

const Title: React.FC<TitleProps> = ({ title, desc }) => {
  return (
    <>
      <h3 className={`font-bold ${styles.title}`}>{title}</h3>
      {desc && <p className={`px-5 ${styles.description}`}>{desc}</p>}
    </>
  );
};

export default Title;
