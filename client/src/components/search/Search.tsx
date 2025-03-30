import React, { useState } from "react";
import { TextField, Box, List, ListItem, Typography } from "@mui/material";

interface SearchListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  placeholder?: string;
}

function Search<T>({
  items,
  renderItem,
  placeholder = "Sök...",
}: SearchListProps<T>) {

  const [listItem, setListItem] = useState("");

  const filteredItems = items.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(listItem.toLowerCase())
  );

  return (
    <Box>
      <TextField
        label={placeholder}
        fullWidth
        variant="outlined"
        value={listItem}
        onChange={(e) => setListItem(e.target.value)}
        sx={{width: 350}}
      />

      {listItem && (
        <List sx={{
            position: "absolute",
            zIndex: 10,
            backgroundColor: "white",
            width: "350px",
            maxHeight: 200,
            overflowY: "auto",
            boxShadow: 3,
            borderRadius: 1,
          }}>
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <ListItem key={index}>{renderItem(item)}</ListItem>
            ))
          ) : (
            <Typography sx={{ mt: 2, color: "gray" }}>Inga resultat</Typography>
          )}
        </List>
      )}
    </Box>
  );
}

export default Search;
