import React, {useEffect} from 'react';
import axios from 'axios';

// Material-ui components
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LaunchIcon from '@material-ui/icons/Launch';

// Styles
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  redFavIcon: {
    color: '#f54263',
  },
  noFavIcon: {
    color: 'grey',
  },
}));

function RecipePost(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [avatarColor, setAvatarColor] = React.useState();
  const [favColor, setFavColor] = React.useState((props.scene!=='Favorites') ? false : true);
  const [display, setDisplay] = React.useState(false);

  useEffect(() => {
    if(props.scene !== 'Favorites') {
      axios.get('/api/getFavorites')
        .then((res) => {
          // console.log(res);
          const favs = res.data.posts;
          if (favs.filter(function(e) { return e._id === props.id; }).length === 1) {
            setFavColor(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    axios.post('/api/getAvatarColor', {email: props.account})
      .then((res) => {
          setAvatarColor(res.data.color);
          setDisplay(true);
      })
      .catch((error) => {
          console.log(error);
      });
  }, [props.account, props.id, props.scene]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleFavorite = () => {
    setFavColor(!favColor);
    axios.post('/api/favorite', {id: props.id})
      .then(() => {
          console.log('Data has been sent to server');
      })
      .catch((error) => {
          console.log(error);
      });
  };

  if(!display) return <h2 style={{color: '#6c7b8c'}}>Loading...</h2>

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" style={{backgroundColor: avatarColor}}>
            {props.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" href={'/Recipe/' + props.id} target = "_blank" rel="noopener noreferrer">
            <LaunchIcon />
          </IconButton>
        }
        title={props.title}
        subheader={props.date}
      />
      <CardMedia
        className={classes.media}
        image={props.image}
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.body}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={handleFavorite}>
          <FavoriteIcon className={(favColor) ? classes.redFavIcon : classes.noFavIcon} />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph variant='h6'>Ingredients:</Typography>
          <Typography paragraph>
            {props.ingredients}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default RecipePost;
