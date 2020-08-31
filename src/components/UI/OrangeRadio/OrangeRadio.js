import React from 'react';
import { withStyles, Radio } from '@material-ui/core';

const OrangeRadio = withStyles({
    root: {
        color: "",
        "&$checked": {
            color: "#f4511e",
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);

export default OrangeRadio;