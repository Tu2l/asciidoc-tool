"use client"

import { Box, Button, TextField, Toolbar, Typography } from "@mui/material"
import React from "react"


export default function TopBar({ items, fileName, handleFileNameChange }) {
    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'space-between',
            color: 'white',
            padding: { xs: '0.5rem', sm: '0.75rem', md: '1rem' }, // Adjusted padding for responsiveness
            backgroundColor: 'primary.light',
        },
        headerTitle: {
            fontSize: { xs: '1rem', sm: '1.3rem', md: '1.5rem' }, // Scaled up font size
            fontWeight: 'bold',
            margin: 0,
        },
        itemsContainer: {
            display: 'flex',
            justifyContent: 'end',
            gap: { xs: '0.5rem', sm: '0.75rem', md: '1rem' },
        },
        item: {
            padding: 0,
        },
        fileNameInput: {
            fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' }, // Scaled font size
            backgroundColor: "white",
            color: "black",
            borderRadius: 4,
            height: 40,
            marginRight: 10
        },
        button: { fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.8rem' } }
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Toolbar sx={{ ...styles.container, flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'center', md: 'normal' } }}>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, ...styles.headerTitle }}
                >
                    AsciiDoc Live Editor
                </Typography>

                <input
                    type="text"
                    style={styles.fileNameInput}
                    value={fileName}
                    onChange={(e) => {
                        handleFileNameChange(e.target.value)
                    }}
                    placeholder="file name" />
                <Box sx={{ ...styles.itemsContainer, justifyContent: { xs: 'center', md: 'end' } }}>
                    {items.map((item, index) => (
                        <Button
                            key={index}
                            variant="contained"
                            disabled={item.disable}
                            onClick={item.onClick}
                            startIcon={item.icon}
                            sx={styles.button}
                        >
                            {item.label}
                        </Button>
                    ))}
                </Box>
            </Toolbar>
        </Box>
    )
}