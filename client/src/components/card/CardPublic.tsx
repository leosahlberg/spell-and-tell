import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { Link } from "react-router";

type cardProps = {
  imgs: string;
  title: string;
};
export default function CardPublic({ imgs, title }: cardProps) {
  return (
    <Card sx={{ maxWidth: 400, maxHeight: 450 }}>
      <CardActionArea>
        <Link to="/story" style={{ textDecoration: "none" }}>
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
              sx={{ fontSize: "1.5rem", textDecoration: "underline" }} 
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", textDecoration: "none" }} 
            >
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica.
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
    </Card>
  );
}
