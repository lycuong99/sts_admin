import { createMuiTheme } from "@material-ui/core/styles";

const customWhite = "#fff";
const purple = '#3751FF';
const purpleMin = '#ebe9f899';
export default createMuiTheme({
    palette: {
        primary: {
            main: purple
        },
        secondary: {
            main: arcOrange
        },
        common: {
            white: customWhite,
            purpleBg: purpleMin
        },
        danger:{
            main:'#c70000'
        }

    },
    typography: {
        fontFamily: ['Roboto',].join(','),
    }

});