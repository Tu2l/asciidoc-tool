'use client'

import React, { useState } from 'react';
import Asciidoctor from 'asciidoctor';
import styles from "./styles.module.css";

function AsciiDocConverter() {
  const [asciidocText, setAsciidocText] = useState('');
  const [htmlOutput, setHtmlOutput] = useState('');

  const handleAsciidocChange = (event) => {
    setAsciidocText(event.target.value);
  };

  const handleConvertClick = () => {
    const converter = Asciidoctor();
    // console.log(asciidocText);
    const html = converter.convert(asciidocText, { to_file: false, standalone: true, safe: 'safe' });
    setHtmlOutput(html);
    // console.log(html);

  };

  return (
  
    <>
  <div className={styles.fullWidthRow}>
    <button onClick={handleConvertClick}>Convert</button>
  </div>

    <div className={styles.gridContainer}>
     
      <div className={styles.gridItem}>
        <textarea className={styles.largeTextArea}
          value={asciidocText}
          onChange={handleAsciidocChange}
        />
      </div>
      <div className={styles.gridItem}>
        <div dangerouslySetInnerHTML={{ __html: htmlOutput }} />
      </div>
    </div>
    </>
  );
}

export default AsciiDocConverter;