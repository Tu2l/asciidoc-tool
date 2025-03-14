"use client"
import AsciiDocConverter from "../components/AsciiDocConverter"
import themes from '../../config/mui-themes.json'
import { ThemeProvider, createTheme } from '@mui/material/styles'

const muiTheme = createTheme(themes[0])

export default function Home() {
  return (
    <ThemeProvider theme={muiTheme}>
      <AsciiDocConverter />
    </ThemeProvider>
  )
}
