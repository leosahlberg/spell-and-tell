import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { Link } from "react-router";
import { Button } from "@mui/material";
import { PublicUser } from "../../utils/types";

type Contribution = {
  userId: PublicUser;
  text: string;
  _id: string;
};

type CardProps = {
  imgs: string;
  title: string;
  contributions: Contribution[];
  id: string;
  onDelete: (id: string) => void;
};

export default function CardPublic({
  imgs,
  title,
  contributions,
  id,
  onDelete,
}: CardProps) {
  const renderContributions = () => {
    if (contributions.length === 0) {
      return (
        <Typography variant="body2" color="text.secondary">
          Inga bidrag ännu
        </Typography>
      );
    }

    return contributions.map((contribution, index) => (
      <Typography
        key={index}
        variant="body2"
        sx={{
          paddingTop: 2,
          maxHeight: "450px",
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: 5,
          WebkitBoxOrient: "vertical",
        }}
      >
        {contribution.text}...
      </Typography>
    ));
  };

  return (
    <Card
      sx={{
        maxWidth: 400,
        backgroundColor: "white",
        transition: "transform 0.3s, background-color 0.3s",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: 2,
          backgroundColor: "#f5f5f5",
        },
      }}
    >
      <CardActionArea
        component={Link}
        to={`/story/${id}`}
        sx={{ textDecoration: "none", backgroundColor: "white" }}
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
            component="h1"
            sx={{ fontSize: "1.5rem", paddingTop: 2 }}
          >
            {title}
          </Typography>
          {renderContributions()}
        </CardContent>
      </CardActionArea>
      <Button
        variant="contained"
        color="error"
        sx={{ margin: 2 }}
        onClick={() => onDelete(id)}
      >
        Ta bort
      </Button>
    </Card>
  );
}
