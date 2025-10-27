"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

// MUI components
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Avatar,
  Tooltip,
  Tabs,
  Tab,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  CssBaseline,
  useMediaQuery,
  useTheme,
  Slide,
  useScrollTrigger,
} from "@mui/material";

// MUI icons
import MenuIcon from "@mui/icons-material/Menu";
import InfoIcon from "@mui/icons-material/Info";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import TimelineIcon from "@mui/icons-material/Timeline";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { Home } from "@mui/icons-material";

// Local images (handled by Next.js)
// import myProfilePic from "./sufi.webp";
// import logo from "./logo.webp";

/**
 * HideOnScroll — hides the AppBar when scrolling down
 */
interface HideOnScrollProps {
  children: React.ReactElement;
}

const HideOnScroll: React.FC<HideOnScrollProps> = ({ children }) => {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

/**
 * ResponsiveAppBar Component
 */
const ResponsiveAppBar: React.FC = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar
          className="navbar1"
          sx={{
            width: "93.5%",
            right: "3.2%",
            border: "2px solid white",
            borderRadius: "30px",
            background:
              "linear-gradient(90deg, rgba(78,78,246,0.647) 0%, rgba(247,90,216,0.696) 100%)",
          }}
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              {/* Logo (Desktop) */}
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                <Avatar
                  sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
                  className="Tab8 animate__animated animate__backInLeft"
                >
                  <Image
                    // src={logo}
                    alt="logo"
                    width={100}
                    height={100}
                    style={{ width: "100%", height: "auto" }}
                    loading="lazy"
                  />
                </Avatar>
              </Typography>

              {/* Mobile Menu Icon */}
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="open navigation"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
              </Box>

              {/* Logo (Mobile) */}
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                <Avatar sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>
                  <Image
                    // src={logo}
                    alt="logo"
                    width={100}
                    height={100}
                    style={{ width: "100%", height: "auto" }}
                    loading="lazy"
                  />
                </Avatar>
              </Typography>

              {/* Desktop Tabs */}
              {!isMobile && (
                <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
                  <Tabs centered>
                    <Tab
                      label={
                        <p>
                          <Home /> Home
                        </p>
                      }
                      onClick={() => (window.location.href = "/")}
                      sx={{ color: "white" }}
                      className="Tab1 animate__animated animate__zoomIn"
                    />

                    <Tab
                      label={
                        <Link href="/about" style={{ color: "white", textDecoration: "none" }}>
                          <p>
                            <InfoIcon /> About
                          </p>
                        </Link>
                      }
                      className="Tab2 animate__animated animate__zoomIn"
                    />

                    <Tab
                      label={
                        <Link href="/skills" style={{ color: "white", textDecoration: "none" }}>
                          <p>
                            <ManageAccountsIcon /> Skills
                          </p>
                        </Link>
                      }
                      className="Tab3 animate__animated animate__zoomIn"
                    />

                    <Tab
                      label={
                        <Link href="/projects" style={{ color: "white", textDecoration: "none" }}>
                          <p>
                            <TimelineIcon /> Projects
                          </p>
                        </Link>
                      }
                      className="Tab4 animate__animated animate__zoomIn"
                    />

                    <Tab
                      label={
                        <Link href="/blogs" style={{ color: "white", textDecoration: "none" }}>
                          <p>
                            <AddReactionIcon /> Blogs
                          </p>
                        </Link>
                      }
                      className="Tab5 animate__animated animate__zoomIn"
                    />

                    <Tab
                      label={
                        <Link href="/contact" style={{ color: "white", textDecoration: "none" }}>
                          <p>
                            <ContactMailIcon /> Contact
                          </p>
                        </Link>
                      }
                      className="Tab6 animate__animated animate__zoomIn"
                    />
                  </Tabs>
                </Box>
              )}

              {/* Profile Avatar */}
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Profile">
                  <IconButton sx={{ p: 0 }}>
                    <Avatar className="Tab7 animate__animated animate__backInRight">
                      <Image
                        // src={myProfilePic}
                        alt="profile"
                        width={100}
                        height={100}
                        style={{ width: "100%", height: "auto" }}
                        loading="lazy"
                      />
                    </Avatar>
                  </IconButton>
                </Tooltip>
              </Box>

              {/* Mobile Drawer Menu */}
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                <List className="DrawerList">
                  {[
                    { text: "Home", icon: <Home />, href: "/" },
                    { text: "About", icon: <InfoIcon />, href: "/about" },
                    { text: "Skills", icon: <ManageAccountsIcon />, href: "/skills" },
                    { text: "Projects", icon: <TimelineIcon />, href: "/projects" },
                    { text: "Blogs", icon: <AddReactionIcon />, href: "/blogs" },
                    { text: "Contact", icon: <ContactMailIcon />, href: "/contact" },
                  ].map(({ text, icon, href }) => (
                    <Link
                      key={text}
                      href={href}
                      style={{ textDecoration: "none", color: "white" }}
                      onClick={handleCloseNavMenu}
                    >
                      <ListItemButton>
                        <ListItemIcon>{icon}</ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItemButton>
                    </Link>
                  ))}
                </List>
              </Menu>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
    </React.Fragment>
  );
};

export default ResponsiveAppBar;
