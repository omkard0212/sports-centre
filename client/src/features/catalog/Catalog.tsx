import { useState, useEffect, useCallback } from "react";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";
import agent from "../../app/api/agent";
import Spinner from "../../app/layout/Spinner";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputAdornment,
  Pagination,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Brand } from "../../app/models/brand";
import { Type } from "../../app/models/type";

const sortOptions = [
  { value: "asc", label: "A → Z" },
  { value: "desc", label: "Z → A" },
];

const PAGE_SIZE = 10;

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [types, setTypes] = useState<Type[]>([]);

  // Filter state
  const [selectedSort, setSelectedSort] = useState("asc");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchInput, setSearchInput] = useState(""); // controlled input value

  // Pagination
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // ── Load brands & types once on mount ──────────────────────────────────────
  useEffect(() => {
    Promise.all([agent.Store.brands(), agent.Store.types()])
      .then(([brandsRes, typesRes]) => {
        setBrands(brandsRes);
        setTypes(typesRes);
      })
      .catch((error) => console.error("Failed to load filters:", error));
  }, []);

  // ── Core fetch — runs whenever any filter or page changes ──────────────────
  // All values are passed as parameters so there are no stale closure issues.
  const fetchProducts = useCallback(
    (
      page: number,
      sort: string,
      brandName: string,
      typeName: string,
      keyword: string,
      brandList: Brand[],
      typeList: Type[]
    ) => {
      setLoading(true);

      const brandId =
        brandName !== "All"
          ? brandList.find((b) => b.name === brandName)?.id
          : undefined;
      const typeId =
        typeName !== "All"
          ? typeList.find((t) => t.name === typeName)?.id
          : undefined;

      // Build a clean query string and pass it as the url override
      const params = new URLSearchParams();
      params.set("page", String(page - 1));
      params.set("size", String(PAGE_SIZE));
      params.set("sort", "name");
      params.set("order", sort);
      if (brandId !== undefined) params.set("brandId", String(brandId));
      if (typeId !== undefined) params.set("typeId", String(typeId));
      if (keyword.trim()) params.set("keyword", keyword.trim());

      agent.Store.list(page, PAGE_SIZE, undefined, undefined, `products?${params.toString()}`)
        .then((res) => {
          setProducts(res.content);
          setTotalItems(res.totalElements);
        })
        .catch((error) => console.error("Failed to load products:", error))
        .finally(() => setLoading(false));
    },
    []
  );

  // ── Re-fetch whenever any filter or page changes ───────────────────────────
  useEffect(() => {
    // Wait until brands/types are loaded before fetching (avoids double fetch on mount)
    if (brands.length === 0 && types.length === 0) return;
    fetchProducts(currentPage, selectedSort, selectedBrand, selectedType, searchTerm, brands, types);
  }, [currentPage, selectedSort, selectedBrand, selectedType, searchTerm, brands, types, fetchProducts]);

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleSortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSort(e.target.value);
    setCurrentPage(1); // reset to page 1 on filter change
  };

  const handleBrandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedBrand(e.target.value);
    setCurrentPage(1);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedType(e.target.value);
    setCurrentPage(1);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setSearchTerm(searchInput);
      setCurrentPage(1);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    // Clear search results immediately when input is cleared
    if (e.target.value === "") {
      setSearchTerm("");
      setCurrentPage(1);
    }
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(totalItems / PAGE_SIZE);
  const rangeStart = Math.min((currentPage - 1) * PAGE_SIZE + 1, totalItems);
  const rangeEnd = Math.min(currentPage * PAGE_SIZE, totalItems);

  return (
    <Grid container spacing={4}>

      {/* ── Pagination top ── */}
      {totalItems > 0 && (
        <Grid item xs={12}>
          <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1}>
            <Typography variant="body2" color="text.secondary">
              Showing {rangeStart}–{rangeEnd} of {totalItems} products
            </Typography>
            <Pagination
              count={totalPages}
              page={currentPage}
              color="primary"
              onChange={handlePageChange}
            />
          </Box>
        </Grid>
      )}

      {/* ── Sidebar filters ── */}
      <Grid item xs={12} sm={3}>

        {/* Search */}
        <Paper sx={{ mb: 2, p: 1.5 }}>
          <TextField
            label="Search products"
            variant="outlined"
            fullWidth
            size="small"
            value={searchInput}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
            placeholder="Press Enter to search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        </Paper>

        {/* Sort */}
        <Paper sx={{ mb: 2, p: 2 }}>
          <FormControl>
            <FormLabel>Sort by Name</FormLabel>
            <RadioGroup value={selectedSort} onChange={handleSortChange}>
              {sortOptions.map(({ value, label }) => (
                <FormControlLabel key={value} value={value} control={<Radio size="small" />} label={label} />
              ))}
            </RadioGroup>
          </FormControl>
        </Paper>

        {/* Brands */}
        <Paper sx={{ mb: 2, p: 2 }}>
          <FormControl>
            <FormLabel>Brands</FormLabel>
            <RadioGroup value={selectedBrand} onChange={handleBrandChange}>
              {brands.map((brand) => (
                <FormControlLabel
                  key={brand.id}
                  value={brand.name}
                  control={<Radio size="small" />}
                  label={brand.name}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Paper>

        {/* Types */}
        <Paper sx={{ mb: 2, p: 2 }}>
          <FormControl>
            <FormLabel>Types</FormLabel>
            <RadioGroup value={selectedType} onChange={handleTypeChange}>
              {types.map((type) => (
                <FormControlLabel
                  key={type.id}
                  value={type.name}
                  control={<Radio size="small" />}
                  label={type.name}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Paper>
      </Grid>

      {/* ── Product grid ── */}
      <Grid item xs={12} sm={9}>
        {loading ? (
          <Spinner message="Loading Products..." />
        ) : products.length === 0 ? (
          <Box textAlign="center" mt={8}>
            <Typography variant="h6" color="text.secondary">
              No products found for the selected filters.
            </Typography>
          </Box>
        ) : (
          <ProductList products={products} />
        )}
      </Grid>

      {/* ── Pagination bottom ── */}
      {totalItems > 0 && (
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center">
            <Pagination
              count={totalPages}
              page={currentPage}
              color="primary"
              onChange={handlePageChange}
            />
          </Box>
        </Grid>
      )}
    </Grid>
  );
}
