import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minWidth:300,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.primary,
    
  },
}));

export default function CenteredGrid(index,name,url) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={7}>
        
        <Paper className={classes.paper} elevation={3}>
          <Typography variant="h5" component="h2">
          {index}. {name}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Hash {url}
          </Typography>
        </Paper>
        </Grid>
      </Grid>
    </div>
  );
}



const useStyles2 = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function ReportCard(index,patient,report,hash) {
  const classes = useStyles2();
  const bull = <span className={classes.bullet}>•</span>;
  return (
    <Card className={classes.root}>
      <CardContent>

        <Typography variant="h5" component="h2">
          {index} Patient Name:{patient}
          {report}
          Hash {hash}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography>
      </CardContent>
    </Card>
  );
}