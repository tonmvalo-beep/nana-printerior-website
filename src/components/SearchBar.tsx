import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import Fuse from "fuse.js";

interface SearchItem {
  title: string;
  path: string;
  category: string;
}

const searchData: SearchItem[] = [
  { title: "Domov", path: "/", category: "stran" },
  { title: "O nas", path: "/about", category: "stran" },
  { title: "Storitve", path: "/services", category: "stran" },
  { title: "Izdelki", path: "/products", category: "stran" },
  { title: "Galerija", path: "/gallery", category: "stran" },
  { title: "Kontakt", path: "/contact", category: "stran" },
  { title: "FAQ", path: "/faq", category: "stran" },
  { title: "Mnenja", path: "/testimonials", category: "stran" },
  { title: "Reklamni panoji", path: "/products", category: "izdelek" },
  { title: "Majice", path: "/products", category: "izdelek" },
  { title: "Custom tisk", path: "/services", category: "storitev" },
];

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const fuse = new Fuse(searchData, {
    keys: ["title", "category"],
    threshold: 0.3,
  });

  useEffect(() => {
    if (query.length > 0) {
      const searchResults = fuse.search(query);
      setResults(searchResults.map((result) => result.item));
      setShowResults(true);
    } else {
      setResults([]);
      setShowResults(false);
    }
  }, [query]);

  const handleResultClick = (path: string) => {
    navigate(path);
    setQuery("");
    setShowResults(false);
  };

  return (
    <div className="relative w-full max-w-xl">
      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Išči po straneh, storitvah, izdelkih..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onBlur={() => setTimeout(() => setShowResults(false), 200)}
        onFocus={() => query && setShowResults(true)}
        className="pl-10 bg-background text-foreground border-border"
      />
      {showResults && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-popover border border-border rounded-md shadow-lg z-50">
          {results.map((result, index) => (
            <div
              key={index}
              onMouseDown={() => handleResultClick(result.path)}
              className="px-4 py-2 cursor-pointer text-popover-foreground hover:bg-muted transition-colors duration-200"
            >
              <div className="text-sm font-normal">{result.title}</div>
              <div className="text-xs text-muted-foreground">
                {result.category}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
