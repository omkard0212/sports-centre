import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useState } from "react";
import { toast } from "react-toastify";

const contactDetails = [
  {
    icon: <LocationOnIcon color="primary" sx={{ fontSize: 36 }} />,
    title: "Our Store",
    lines: ["12, MG Road, Koramangala", "Bengaluru, Karnataka – 560034", "India"],
  },
  {
    icon: <PhoneIcon color="primary" sx={{ fontSize: 36 }} />,
    title: "Phone",
    lines: ["+91 98765 43210", "+91 80 2345 6789", "(Toll-free: 1800-123-4567)"],
  },
  {
    icon: <EmailIcon color="primary" sx={{ fontSize: 36 }} />,
    title: "Email",
    lines: ["support@sportscenter.in", "orders@sportscenter.in", "corporate@sportscenter.in"],
  },
  {
    icon: <AccessTimeIcon color="primary" sx={{ fontSize: 36 }} />,
    title: "Working Hours",
    lines: ["Mon – Sat: 9:00 AM – 8:00 PM", "Sunday: 10:00 AM – 6:00 PM", "Public Holidays: Closed"],
  },
];

export default function ContactPage() {
  const theme = useTheme();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    // Simulate a network call
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    toast.success("Message sent! We'll get back to you within 24 hours.");
    setForm({ name: "", email: "", subject: "", message: "" });
  }

  return (
    <Box sx={{ overflowX: "hidden" }}>

      {/* ── Page Header ── */}
      <Box
        sx={{
          backgroundImage: "url(/images/hero5.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          py: { xs: 7, md: 10 },
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            bgcolor: "rgba(0,0,0,0.55)",
          },
        }}
      >
        <Container sx={{ position: "relative", zIndex: 1 }}>
          <Typography variant="h3" fontWeight={800} color="white" gutterBottom>
            Get In Touch
          </Typography>
          <Typography variant="h6" color="rgba(255,255,255,0.85)" maxWidth={500}>
            Have a question, a bulk order enquiry, or just want to say hi? We'd love to hear from you.
          </Typography>
        </Container>
      </Box>

      {/* ── Contact Cards ── */}
      <Container sx={{ py: 8 }}>
        <Grid container spacing={3} sx={{ mb: 8 }}>
          {contactDetails.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item.title}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  textAlign: "center",
                  transition: "box-shadow 0.2s",
                  "&:hover": { boxShadow: 5 },
                }}
              >
                <CardContent sx={{ py: 4 }}>
                  <Box sx={{ mb: 1.5 }}>{item.icon}</Box>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    {item.title}
                  </Typography>
                  <Divider sx={{ mb: 1.5 }} />
                  {item.lines.map((line) => (
                    <Typography key={line} variant="body2" color="text.secondary" lineHeight={2}>
                      {line}
                    </Typography>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* ── Contact Form + Map ── */}
        <Grid container spacing={5} alignItems="stretch">

          {/* Form */}
          <Grid item xs={12} md={6}>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                bgcolor: "background.paper",
                borderRadius: 3,
                p: { xs: 3, md: 5 },
                boxShadow: 3,
                height: "100%",
              }}
            >
              <Typography variant="h5" fontWeight={700} gutterBottom>
                Send Us a Message
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Fill in the form and our team will respond within 24 hours.
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    label="Your Name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    label="Email Address"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    label="Your Message"
                    name="message"
                    multiline
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    disabled={submitting}
                    sx={{ py: 1.5, fontWeight: 700, borderRadius: 2 }}
                  >
                    {submitting ? "Sending…" : "Send Message"}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* Map placeholder + social links */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3, height: "100%" }}>

              {/* Embedded map */}
              <Box
                sx={{
                  borderRadius: 3,
                  overflow: "hidden",
                  boxShadow: 3,
                  flexGrow: 1,
                  minHeight: 280,
                }}
              >
                <iframe
                  title="Sports Center Location"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=77.6080%2C12.9340%2C77.6400%2C12.9560&layer=mapnik"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: 280 }}
                  loading="lazy"
                />
              </Box>

              {/* Quick info card */}
              <Card
                sx={{
                  borderRadius: 3,
                  bgcolor:
                    theme.palette.mode === "dark" ? "grey.900" : "primary.main",
                  color: "white",
                }}
              >
                <CardContent sx={{ py: 3 }}>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    Why Choose Sports Center?
                  </Typography>
                  {[
                    "✅  Authorised dealer for Yonex, Babolat, Victor, Adidas & more",
                    "✅  Over 10 years serving athletes across India",
                    "✅  Expert staff who play the sports they sell",
                    "✅  Easy returns & hassle-free warranty claims",
                  ].map((point) => (
                    <Typography key={point} variant="body2" sx={{ opacity: 0.9, lineHeight: 2.2 }}>
                      {point}
                    </Typography>
                  ))}
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* ── Footer strip ── */}
      <Box sx={{ bgcolor: "primary.dark", py: 3, textAlign: "center" }}>
        <Typography variant="body2" color="rgba(255,255,255,0.6)">
          © {new Date().getFullYear()} Sports Center. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
