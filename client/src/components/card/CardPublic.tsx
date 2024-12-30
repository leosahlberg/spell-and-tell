
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import { Link } from 'react-router';

type cardProps = {
    imgs: string
    title: string
}

export default function CardPublic({imgs, title }: cardProps) {
  return (
    <Card sx={{ maxWidth: 400 , maxHeight: 450}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="250"
          image={imgs}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link to="/contribute">
        <Button size="small" color="primary">
          Fortsätt på denna berättelse
        </Button>
        </Link>
      </CardActions>
    </Card>
  );
}

