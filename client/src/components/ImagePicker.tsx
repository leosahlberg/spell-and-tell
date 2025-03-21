import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  Box,
} from "@mui/material";
import img1 from "../assets/gold.jpg";
import img2 from "../assets/buss.jpg";
import img3 from "../assets/groda.jpg";
import img4 from "../assets/pyramid.jpg";
import img5 from "../assets/sagolandet.jpg";
import img6 from "../assets/bookimg.jpg";
import img7 from "../assets/tunnel.jpg";
import img8 from "../assets/bok.jpg";
import img9 from "../assets/cows.jpg";
import img10 from "../assets/dragonfly.jpg";
import img11 from "../assets/goose.jpg";
import img12 from "../assets/ice-cream.jpg";

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12];

type ImagePickerProps = {
  onSelectImage: (image: string) => void;
}

export default function ImagePicker({ onSelectImage }: ImagePickerProps) {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleSelectImage = (img: string) => {
    if (img) {
      setSelectedImage(img);
      onSelectImage(img);
      setOpen(false);
    }
  };

  return (
    <Stack spacing={2} p={1} mb={5}>
      <Button
        sx={{
          width: 150,
          backgroundColor: "rgb(259, 199, 130)",
          color: "rgb(12, 23, 79)",
          fontWeight: "bold",
        }}
        variant="contained"
        onClick={() => setOpen(true)}
      >
        {selectedImage ? "Byt bild" : "Välj en bild"}
      </Button>

      {selectedImage && (
        <Stack>
          <img
            src={selectedImage}
            alt="Vald bild"
            className="rounded-md shadow-md"
            width={300}
            height={300}
            style={{ borderRadius: 10, marginTop: 15 }}
          />
        </Stack>
      )}

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle sx={{marginLeft: 3}}>Välj en bild</DialogTitle>
        <DialogContent>
          <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                width={500}
                height={500}
                alt={`Option ${index + 1}`}
                className="w-24 h-24 cursor-pointer rounded-md border-2 border-transparent hover:border-blue-500"
                onClick={() => handleSelectImage(img)}
              />
            ))}
          </Box>
        </DialogContent>
      </Dialog>
    </Stack>
  );
}
