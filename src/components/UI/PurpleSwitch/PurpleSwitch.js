import React from 'react';
import { withStyles, Switch } from '@material-ui/core';

const PurpleSwitch = withStyles({
    switchBase: {
        color: "#DDB3FC",
        "&$checked": {
            color: "#6D00BD",
        },
        "&$checked + $track": {
            backgroundColor: "#B366F2",
        },
    },
    checked: {},
    track: {},
})(Switch);

export default PurpleSwitch;