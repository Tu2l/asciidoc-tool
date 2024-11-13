"use client"

import { ClassNames } from "@emotion/react";
import { Box, Button, TextField, Typography } from "@mui/material"
import React from "react"

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#2d3748',
        color: 'white',
        padding: '1rem',
    },
    headerTitle: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        margin: 0,
    },
    itemsContainer: {
        display: 'flex',
        justifyContent: 'end',
        gap: '1rem',
    },
    item: {
        padding: 0,
    },
    fileNameInput: {
        fontSize: '1rem',
        backgroundColor: "white",
        color: "black",
        borderRadius: 10,
        margin: 0
    }
};

export default function Toolbar({ items, fileName, handleFileNameChange }) {
    return (
        <Box sx={styles.container}>
            <Typography
                style={styles.headerTitle}>
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
            <Box sx={styles.itemsContainer}>
                {items.map((item, index) => (
                    <Box key={index} sx={styles.item}>
                        <Button
                            key={index}
                            variant="contained"
                            disabled={item.disable}
                            onClick={item.onClick}>
                            {item.label}
                        </Button>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}