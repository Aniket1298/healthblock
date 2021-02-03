import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 450,
  },
  media: {
    height: 140,
  },
});
export default function PresCard(index,doctor,patient,hash) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          
            Doctor - {doctor}
            <br/>
            Patient - {patient}
          <Typography variant="body4" color="textSecondary" component="p">
            Prescription hash - {hash}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
