import { createTheme } from '@material-ui/core';

const Theme = createTheme({
    overrides: {
        MuiCssBaseline: {
                "@global": {
                    body: {
                        scrollbarColor: "#f5f7ff #c0d3fc",
                            "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
                                backgroundColor: '#f5efed',
                            },
                            "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
                                borderRadius: 2,
                                backgroundColor: '#31aacc',
                                minHeight: 3,
                                border: '.5px solid #BBDEFB',
                            },
                            "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                            },
                            "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
                                backgroundColor: '#31aacc',
                            },
                            "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
                                backgroundColor: '#0a6882',
                            },
                            "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
                                backgroundColor: '#31aacc',
                            },
                    },
                },
            },
    },
    palette: {
        primary: {
            light: '#2c91de',
            main: '#1f81cc',
            dark: '#0e78c9'
        },
        secondary: {
            light: '#1b8aa8',
            main: '#0a6882',
            dark: '#085e75'
        },
        text: {
            primary: 'rgba(20, 18, 23, 0.87)',
            secondary: 'rgba(14, 57, 71, 0.54)',
            disabled: 'rgba(0, 0, 0, 0.38)',
            hint: 'rgba(0, 0, 0, 0.38)',
        },
        background: {
            paper: 'rgba(245, 239, 237, 0.95)',
            default: 'rgba(237, 237, 245, 1)'
        }
    },
});

export default Theme;