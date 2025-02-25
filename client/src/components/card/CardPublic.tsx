import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { Link } from "react-router";

type CardProps = {
  imgs: string;
  title: string;
  id: string;
};

export default function CardPublic({ imgs, title, id }: CardProps) {
  return (
    <Card
      sx={{
        maxWidth: 400,
        maxHeight: 450,
        transition: "transform 0.3s",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: 2,
        },
      }}
    >
      <CardActionArea
        component={Link}
        to="/story"
        sx={{ textDecoration: "none" }}
      >
        <CardMedia
          component="img"
          height="250"
          image={imgs}
          alt={`Bild för berättelsen: ${title}`}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h2"
            component="div"
            sx={{ fontSize: "1.5rem" }}
          >
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
