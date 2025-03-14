'use client'

import React from 'react'
import Asciidoctor from 'asciidoctor'
import dynamic from 'next/dynamic'
import TopBar from './TopBar'
import asciidoctorcss from '../../public/css/asciidoctor.css'
import { Box, TextareaAutosize } from '@mui/material'
import {
  Refresh as RefreshIcon,
  Html as HtmlIcon,
  PictureAsPdf as PictureAsPdfIcon,
  Save as SaveIcon
} from '@mui/icons-material'

const Split = dynamic(() => import('react-split'), { ssr: false })
const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
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
    fontFamily: 'Roboto Mono, monospace',
    fontSize: '16px',
    outline: 'none',
  },
  previewPane: {
    overflow: 'auto',
    height: '100%',
    padding: '1rem',
    backgroundColor: 'white',
  },
}

const converter = Asciidoctor()

// save adoc file
function saveADocFile(adocFile, fileName = "file") {
  const element = document.createElement('a')
  const file = new Blob([adocFile], { type: 'text' })
  element.href = URL.createObjectURL(file)
  element.download = fileName + ".adoc"
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}

// export html page
function exportHTML(htmlContent, name = "exported_html") {
  const element = document.createElement('a')
  const file = new Blob([htmlContent], { type: 'text/html' })
  element.href = URL.createObjectURL(file)
  element.download = name + ".html"
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}

// export pdf
function exportToPDF(htmlContent) {
  const originalContents = document.body.innerHTML
  document.body.innerHTML = htmlContent
  window.print()
  document.body.innerHTML = originalContents
}

function AsciiDocConverter() {
  const [asciidocText, setAsciidocText] = React.useState('')
  const [htmlOutput, setHtmlOutput] = React.useState('')
  const [fileName, setFileName] = React.useState('file')

  const handleAsciidocChange = (event) => {
    setAsciidocText(event.target.value)
  }

  const handleConvertClick = () => {
    const html = converter.convert(asciidocText, { to_file: false, standalone: true, safe: 'safe' })
    setHtmlOutput(html)
    localStorage.setItem('asciidoctext', asciidocText)
  }

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

  const handleExportHtml = () => {
    exportHTML(htmlOutput, fileName)
  }

  const handleExportPdf = () => {
    exportToPDF(htmlOutput)
  }

  const handleSaveAdocFile = () => {
    saveADocFile(asciidocText, fileName)
  }

  const buttonData = [
    { label: 'Convert', onClick: handleConvertClick, disable: !asciidocText, icon: <RefreshIcon /> },
    { label: 'Export', onClick: handleExportHtml, disable: !htmlOutput, icon: <HtmlIcon /> },
    { label: 'Print', onClick: handleExportPdf, disable: !htmlOutput, icon: <PictureAsPdfIcon /> },
    { label: '.adoc', onClick: handleSaveAdocFile, disable: !asciidocText, icon: <SaveIcon /> },
  ];

  return (
    <Box sx={styles.container}>
      <TopBar
        items={buttonData}
        handleFileNameChange={setFileName}
        fileName={fileName}
      />

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
        <Box style={styles.editorPane}>
          <TextareaAutosize
            style={styles.editor}
            value={asciidocText}
            onChange={handleAsciidocChange}
            placeholder="Type your ASCII Doc here..."
          />
        </Box>
        <Box style={styles.previewPane}>
          <div id={'asciidoc_output'} dangerouslySetInnerHTML={{ __html: htmlOutput }} />
        </Box>
      </Split>
    </Box>
  )
}

export default AsciiDocConverter