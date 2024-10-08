'use client'

import React from 'react';
import Asciidoctor from 'asciidoctor';
// import styles from "./AsciiDocConverter.module.css";
import dynamic from 'next/dynamic'

const Split = dynamic(() => import('react-split'), { ssr: false })
const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    backgroundColor: '#2d3748',
    color: 'white',
    padding: '1rem',
  },
  headerTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    margin: 0,
  },
  splitContainer: {
    flex: 1,
    display: 'flex',
  },
  editorPane: {
    overflow: 'auto',
    height: '100%',
  },
  editor: {
    width: '100%',
    height: '100%',
    padding: '1rem',
    border: 'none',
    resize: 'none',
    fontFamily: 'monospace',
    outline: 'none',
  },
  previewPane: {
    overflow: 'auto',
    height: '100%',
    padding: '1rem',
    backgroundColor: 'white',
  },
}

function AsciiDocConverter() {
  const [asciidocText, setAsciidocText] = React.useState('');
  const [htmlOutput, setHtmlOutput] = React.useState('');

  const handleAsciidocChange = (event) => {
    setAsciidocText(event.target.value);
  };

  const handleConvertClick = () => {
    const converter = Asciidoctor();
    const html = converter.convert(asciidocText, { to_file: false, standalone: true, safe: 'safe' });
    setHtmlOutput(html);
    localStorage.setItem('asciidoctext', asciidocText);
  };

  React.useEffect(() => {
    const savedAsciidoctext = localStorage.getItem('asciidoctext')
    if (savedAsciidoctext) {
      setAsciidocText(savedAsciidoctext)
    }

    // Add gutter styles dynamically
    const style = document.createElement('style')
    style.textContent = `
      .gutter {
        background-color: #edf2f7;
        background-repeat: no-repeat;
        background-position: 50%;
      }
      .gutter:hover {
        background-color: #cbd5e0;
      }
      .gutter.gutter-horizontal {
        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==');
        cursor: col-resize;
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>ASCII Doc Live Editor</h1>
        <button onClick={handleConvertClick}>Convert</button>
      </header>
      <Split
        style={styles.splitContainer}
        sizes={[50, 50]}
        minSize={100}
        expandToMin={false}
        gutterSize={10}
        gutterAlign="center"
        snapOffset={30}
        dragInterval={1}
        direction="horizontal"
        cursor="col-resize"
        gutter={(index, direction) => {
          const gutter = document.createElement('div')
          gutter.className = `gutter gutter-${direction} bg-gray-300 hover:bg-gray-400 transition-colors duration-150`
          return gutter
        }}
      >
        <div style={styles.editorPane}>
          <textarea
            style={styles.editor}
            value={asciidocText}
            onChange={handleAsciidocChange}
            placeholder="Type your ASCII Doc here..."
          />
        </div>
        <div style={styles.previewPane}>
          <div dangerouslySetInnerHTML={{ __html: htmlOutput }} />
        </div>
      </Split>
    </div>
  );
}

export default AsciiDocConverter;