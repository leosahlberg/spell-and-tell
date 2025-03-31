import React, { useEffect, useState } from "react";
import { TextField, Box, List, ListItem, Typography } from "@mui/material";

interface SearchListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  placeholder?: string;
  onSearch: (item: string) => void;
}


function Search<T>({
  items,
  renderItem,
  placeholder = "Sök...",
  onSearch,
}: SearchListProps<T>) {
  const [listItem, setListItem] = useState("");

  useEffect(() => {
    onSearch(listItem);
  }, [listItem, onSearch]);

  const filteredItems = items?.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(listItem.toLowerCase())
  );

  return (
    <Box>
      <Box sx={{ color:"darkBlue", borderRadius: 3, fontSize: 22, paddingLeft: 3, paddingRight: 3}}>
      <p style={{paddingBottom: 15, paddingLeft:10}}>
        <i >Sök på författarens namn..👇📚</i>

        </p>
        <TextField
          label={placeholder}
          fullWidth
          variant="outlined"
          value={listItem}
          onChange={(e) => setListItem(e.target.value)}
          sx={{ width: 350, backgroundColor:"white" }}
        />
     
      </Box>

      {listItem && (
        <List
          sx={{
            position: "absolute",
            zIndex: 10,
            backgroundColor: "white",
            width: "350px",
            maxHeight: 200,
            overflowY: "auto",
            boxShadow: 3,
            borderRadius: 1,
          }}
        >
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
