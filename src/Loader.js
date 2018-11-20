import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import grey from '@material-ui/core/colors/grey';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 6,
   // paddingLeft: theme.spacing.unit * 4,
   
  },

});

function Loader(props) {
  const { classes } = props;
  return (
    <div style={{display: 'flex', justifyContent: 'center'}}> 
      <CircularProgress  className={classes.progress} style={{ color: grey[500] }} size={82} />
    </div>
  );
}

Loader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Loader);