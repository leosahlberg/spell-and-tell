import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { Link } from "react-router";
// import { Button } from "@mui/material";
import { PublicUser } from "../../utils/types";
import { Box } from "@mui/material";

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
  onDelete?: (id: string) => void;
  children?: React.ReactNode;
};

export default function CardPublic({
  imgs,
  title,
  contributions,
  id,
  // onDelete,
  children
}: CardProps) {
  
  const getFirstTwoSentences = (text: string) => {
    const sentences = text.split(".");  
    const firstTwo = sentences.slice(0, 2).join(".");
    return firstTwo;
  };
  
  const renderFirstContribution = () => {
    if (contributions.length === 0) {
      return (
        <Typography variant="body2" color="text.secondary">
          Inga bidrag ännu
        </Typography>
      );
    }

    const firstContribution = contributions[0]; 
    const firstTwoSentences = getFirstTwoSentences(firstContribution.text);

    return (
      <Typography
        variant="body2"
        sx={{
          paddingTop: 1,
          display: "-webkit-box",
          WebkitLineClamp: 2, 
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis", 
        }}
      >
        {firstTwoSentences}...
      </Typography>
    );
  };

  return (
    <Card
      sx={{
        width: 350,
        height: 400,
        backgroundColor: "white",
      }}
    >
      
      <CardActionArea
        component={Link}
        to={`/story/${id}`}
        sx={{ textDecoration: "none", backgroundColor: "white", "&:hover": {
     
          backgroundColor: "#f1f1f1",
          cursor:"pointer"
        }, }}
      >
        <CardMedia
          component="img"
          height="220"
          image={imgs}
          alt={`Bild för berättelsen: ${title}`}
          sx={{transition: "none"}}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h2"
            component="h1"
            sx={{ fontSize: "1.2rem"}}
          >
            {title}
          </Typography>
          {renderFirstContribution()}
        </CardContent>
       
      </CardActionArea>
       
      {children && (
        <Box
          sx={{
            marginTop: "auto", 
            textAlign: "center",
            paddingBottom: 2,
          }}
        >
          {children}
        </Box>
      )}
      {/* <Button
        variant="contained"
        color="error"
        sx={{ margin: 2 }}
        onClick={() => onDelete?.(id)}
      >
        Ta bort
      </Button> */}
    </Card>
  );
}
