import { createTheme } from '@material-ui/core'
import { lightBlue, blue } from '@material-ui/core/colors';

const Theme = createTheme({
    overrides: {
        MuiCssBaseline: {
                "@global": {
                    body: {
                        scrollbarColor: "#f5f7ff #c0d3fc",
                            "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
                                backgroundColor: "rgba(255, 255, 255, 0.3)",
                            },
                            "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
                                borderRadius: 2,
                                backgroundColor: blue[100],
                                minHeight: 3,
                                border: '.5px solid #BBDEFB',
                            },
                            "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                            },
                            "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
                                backgroundColor: blue[100],
                            },
                            "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
                                backgroundColor: blue[600],
                            },
                            "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
                                backgroundColor: blue[100],
                            },
                    },
                },
            },
    },
    palette: {
        primary: {
            light: lightBlue[600],
            main: lightBlue[700],
            dark: lightBlue[900]
        },
        secondary: {
            light: blue[500],
            main: blue[600],
            dark: blue[900]
        },
        text: {
            primary: 'rgba(0, 0, 0, 0.87)',
            secondary: 'rgba(0, 0, 0, 0.54)',
            disabled: 'rgba(0, 0, 0, 0.38)',
            hint: 'rgba(0, 0, 0, 0.38)',
        },
        background: {
            paper: 'rgba(255, 255, 255, 0.95)',
            default: 'rgba(255, 255, 255, 1)'
        }
    },
});

export default Theme;