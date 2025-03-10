import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  Box,
} from "@mui/material";
import img1 from "../assets/bok.jpg";
import img2 from "../assets/buss.jpg";
import img3 from "../assets/groda.jpg";
import img4 from "../assets/pyramid.jpg";
import img5 from "../assets/sagolandet.jpg";

const images = [img1, img2, img3, img4, img5];

interface ImagePickerProps {
  onSelectImage: (image: string) => void;
}

export default function ImagePicker({ onSelectImage }: ImagePickerProps) {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  console.log(selectedImage + "test");

  const handleSelectImage = (img: string) => {
    if (img) {
      setSelectedImage(img);
      onSelectImage(img);
      setOpen(false);
      console.log("Bild vald:", img);
    } else {
      console.log("Ingen bild vald");
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
            width={350}
            height={350}
            style={{ borderRadius: 10, marginTop: 15 }}
          />
        </Stack>
      )}

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Välj en bild</DialogTitle>
        <DialogContent>
          <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
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
