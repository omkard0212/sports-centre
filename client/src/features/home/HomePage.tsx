import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import VerifiedIcon from "@mui/icons-material/Verified";
import { useState, useEffect } from "react";

const heroSlides = [
  {
    image: "/images/hero1.jpg",
    title: "Gear Up for Greatness",
    subtitle: "Premium sports equipment for every level of athlete",
    cta: "Shop Now",
  },
  {
    image: "/images/hero2.jpg",
    title: "Dominate the Court",
    subtitle: "Top rackets, shoes and kit bags from world-leading brands",
    cta: "Explore Rackets",
  },
  {
    image: "/images/hero3.jpg",
    title: "Built for Performance",
    subtitle: "Football, badminton, tennis — we've got every sport covered",
    cta: "Browse Store",
  },
];

const categories = [
  {
    icon: <SportsTennisIcon sx={{ fontSize: 48 }} />,
    label: "Racket Sports",
    description: "Badminton, tennis & squash gear",
    color: "#1976d2",
  },
  {
    icon: <SportsBasketballIcon sx={{ fontSize: 48 }} />,
    label: "Footballs",
    description: "Match & training footballs",
    color: "#e65100",
  },
  {
    icon: <DirectionsRunIcon sx={{ fontSize: 48 }} />,
    label: "Footwear",
    description: "Performance shoes for every sport",
    color: "#2e7d32",
  },
  {
    icon: <EmojiEventsIcon sx={{ fontSize: 48 }} />,
    label: "Kit Bags",
    description: "Carry your gear in style",
    color: "#6a1b9a",
  },
];

const features = [
  {
    icon: <LocalShippingIcon sx={{ fontSize: 40 }} />,
    title: "Free Delivery",
    description: "Free shipping on all orders above ₹999",
  },
  {
    icon: <VerifiedIcon sx={{ fontSize: 40 }} />,
    title: "100% Authentic",
    description: "Genuine products from authorised distributors",
  },
  {
    icon: <SupportAgentIcon sx={{ fontSize: 40 }} />,
    title: "24/7 Support",
    description: "Our team is always here to help you",
  },
];

const brands = [
  { name: "Yonex", img: "/images/products/yonex-racket-1.png" },
  { name: "Babolat", img: "/images/products/babolat-racket-1.png" },
  { name: "Adidas", img: "/images/products/adidas_shoe-1.png" },
  { name: "Nike", img: "/images/products/Nike-Football-1.png" },
  { name: "Victor", img: "/images/products/victor-racket-1.png" },
  { name: "Puma", img: "/images/products/puma_shoe-1.png" },
];

export default function HomePage() {
  const theme = useTheme();
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto-advance hero slides
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const slide = heroSlides[activeSlide];

  return (
    <Box sx={{ overflowX: "hidden" }}>

      {/* ── Hero Banner ── */}
      <Box
        sx={{
          position: "relative",
          height: { xs: 340, sm: 480, md: 580 },
          backgroundImage: `url(${slide.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          transition: "background-image 0.6s ease-in-out",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(0,0,0,0.65) 40%, rgba(0,0,0,0.1))",
          },
        }}
      >
        {/* ── Watermark ── */}
        <Typography
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%) rotate(-25deg)",
            fontSize: { xs: "4rem", sm: "7rem", md: "10rem" },
            fontWeight: 900,
            color: "rgba(255,255,255,0.07)",
            whiteSpace: "nowrap",
            userSelect: "none",
            pointerEvents: "none",
            letterSpacing: { xs: 4, md: 10 },
            zIndex: 1,
            textTransform: "uppercase",
          }}
          aria-hidden="true"
        >
          Sports Center
        </Typography>

        <Container sx={{ position: "relative", zIndex: 2 }}>
          <Typography
            variant="h2"
            fontWeight={800}
            color="white"
            sx={{ fontSize: { xs: "2rem", md: "3.5rem" }, mb: 1.5 }}
          >
            {slide.title}
          </Typography>
          <Typography
            variant="h6"
            color="rgba(255,255,255,0.85)"
            sx={{ mb: 3, maxWidth: 480 }}
          >
            {slide.subtitle}
          </Typography>
          <Button
            component={Link}
            to="/store"
            variant="contained"
            size="large"
            sx={{ px: 4, py: 1.5, fontWeight: 700, borderRadius: 2 }}
          >
            {slide.cta}
          </Button>
        </Container>
        {/* Slide dots */}
        <Box
          sx={{
            position: "absolute",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 1,
          }}
        >
          {heroSlides.map((_, i) => (
            <Box
              key={i}
              onClick={() => setActiveSlide(i)}
              sx={{
                width: i === activeSlide ? 28 : 10,
                height: 10,
                borderRadius: 5,
                bgcolor: i === activeSlide ? "primary.main" : "rgba(255,255,255,0.6)",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
            />
          ))}
        </Box>
      </Box>

      {/* ── Features strip ── */}
      <Box sx={{ bgcolor: "primary.main", py: 3 }}>
        <Container>
          <Grid container spacing={2} justifyContent="center">
            {features.map((f) => (
              <Grid item xs={12} sm={4} key={f.title}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    color: "white",
                    justifyContent: { xs: "center", sm: "flex-start" },
                  }}
                >
                  {f.icon}
                  <Box>
                    <Typography fontWeight={700}>{f.title}</Typography>
                    <Typography variant="body2" sx={{ opacity: 0.85 }}>
                      {f.description}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ── Shop by Category ── */}
      <Container sx={{ py: 8 }}>
        <Typography
          variant="h4"
          fontWeight={700}
          textAlign="center"
          gutterBottom
        >
          Shop by Category
        </Typography>
        <Typography
          color="text.secondary"
          textAlign="center"
          sx={{ mb: 5 }}
        >
          Find exactly what you need for your sport
        </Typography>
        <Grid container spacing={3}>
          {categories.map((cat) => (
            <Grid item xs={6} md={3} key={cat.label}>
              <Card
                component={Link}
                to="/store"
                sx={{
                  textDecoration: "none",
                  textAlign: "center",
                  py: 4,
                  borderRadius: 3,
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ color: cat.color, mb: 1 }}>{cat.icon}</Box>
                  <Typography fontWeight={700} variant="h6">
                    {cat.label}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={0.5}>
                    {cat.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* ── Brands ── */}
      <Box
        sx={{
          bgcolor: theme.palette.mode === "dark" ? "grey.900" : "grey.100",
          py: 7,
        }}
      >
        <Container>
          <Typography
            variant="h4"
            fontWeight={700}
            textAlign="center"
            gutterBottom
          >
            Brands We Carry
          </Typography>
          <Typography
            color="text.secondary"
            textAlign="center"
            sx={{ mb: 5 }}
          >
            Trusted by athletes worldwide
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            {brands.map((brand) => (
              <Grid item xs={6} sm={4} md={2} key={brand.name}>
                <Box
                  sx={{
                    bgcolor: "background.paper",
                    borderRadius: 3,
                    p: 2,
                    textAlign: "center",
                    boxShadow: 1,
                    transition: "box-shadow 0.2s",
                    "&:hover": { boxShadow: 4 },
                  }}
                >
                  <Box
                    component="img"
                    src={brand.img}
                    alt={brand.name}
                    sx={{
                      width: "100%",
                      height: 70,
                      objectFit: "contain",
                      mb: 1,
                    }}
                  />
                  <Typography fontWeight={600} variant="body2">
                    {brand.name}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ── Call to Action Banner ── */}
      <Box
        sx={{
          backgroundImage: "url(/images/hero4.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          py: { xs: 8, md: 12 },
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            bgcolor: "rgba(0,0,0,0.55)",
          },
        }}
      >
        <Container sx={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <Typography
            variant="h3"
            fontWeight={800}
            color="white"
            sx={{ mb: 2 }}
          >
            Ready to Play?
          </Typography>
          <Typography
            variant="h6"
            color="rgba(255,255,255,0.85)"
            sx={{ mb: 4, maxWidth: 500, mx: "auto" }}
          >
            Browse our full catalogue and get your gear delivered to your door.
          </Typography>
          <Button
            component={Link}
            to="/store"
            variant="contained"
            color="secondary"
            size="large"
            sx={{ px: 5, py: 1.5, fontWeight: 700, borderRadius: 2 }}
          >
            Browse All Products
          </Button>
        </Container>
      </Box>

      {/* ── Footer strip ── */}
      <Box sx={{ bgcolor: "primary.dark", py: 3, textAlign: "center" }}>
        <Typography variant="body2" color="rgba(255,255,255,0.6)">
          © {new Date().getFullYear()} Sports Center. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
