import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Story } from "../../utils/types";
import Search from "../../components/search/Search";

const SearchResultsPagePage = () => {
  const location = useLocation();
  const [filteredStories, setFilteredStories] = useState<Story[]>([]);
  const [searchedName, setSearchedName] = useState("");

  useEffect(() => {
    if (location.state) {
      const { filteredStories, searchedName } = location.state;
      if (filteredStories) setFilteredStories(filteredStories);
      if (searchedName) setSearchedName(searchedName);
    }
  }, [location.state]);

  return (
    <div>
      <Search filteredStories={filteredStories} searchedName={searchedName} />
    </div>
  );
};

export default SearchResultsPagePage;
