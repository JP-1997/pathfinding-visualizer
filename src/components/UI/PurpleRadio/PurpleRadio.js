import React from 'react';
import { withStyles, Radio } from '@material-ui/core';

const PurpleRadio = withStyles({
    root: {
        color: "",
        "&$checked": {
            color: "#6D00BD",
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);

export default PurpleRadio;