import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Diversity1Icon from '@mui/icons-material/Diversity1';
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Button, ButtonProps, Dialog, styled } from "@mui/material";
import AddMemberForm from "./AddMemberForm";
import LinkSpouseForm from "./LinkSpouseForm";

import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { useToast } from "./ToastProvider";
import { fetchFamilyMembers, fetchFamilyLineage } from "../services/memberService";

const settings = ["Profile", "Logout"];

export const ColorButton = styled(Button)<ButtonProps>(() => ({
  color: '#fff',
  backgroundColor: '#4CAF50',
  padding: '10px 24px',
  borderRadius: '8px',
  textTransform: 'none',
  fontSize: '15px',
  fontWeight: 600,
  boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#45a049',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 16px rgba(76, 175, 80, 0.4)',
  },
}));

export const LinkSpouseButton = styled(Button)<ButtonProps>(() => ({
  color: '#fff',
  backgroundColor: '#FF4081',
  padding: '10px 24px',
  borderRadius: '8px',
  textTransform: 'none',
  fontSize: '15px',
  fontWeight: 600,
  boxShadow: '0 4px 12px rgba(255, 64, 129, 0.3)',
  transition: 'all 0.3s ease',
  marginLeft: '5 px',
  '&:hover': {
    backgroundColor: '#F50057',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 16px rgba(255, 64, 129, 0.4)',
  },
}));


function Navbar() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [linkSpouseDialog, setLinkSpouseDialog] = React.useState(false);

  const navigate = useNavigate();
  const { showSuccess } = useToast();
  const currentMember = useSelector((state: RootState) => state.member.currentFamily?.member);

  // Extract member ID from URL if on member page
  const getMemberIdFromUrl = () => {
    const match = location.pathname.match(/\/member\/(\w+)/);
    return match ? match[1] : null;
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    showSuccess("Logged out successfully!");
    navigate("/login");
    setAnchorElUser(null);
  };

  const handleAddMemberSuccess = async () => {
    setOpenDialog(false);
    const memberId = getMemberIdFromUrl();
    if (memberId) {
      await fetchFamilyMembers(memberId);
      await fetchFamilyLineage(memberId);
    }
    showSuccess("Member added successfully!");
  };

  const handleLinkSpouseSuccess = async () => {
    setLinkSpouseDialog(false);
    const memberId = getMemberIdFromUrl();
    if (memberId) {
      await fetchFamilyMembers(memberId);
      await fetchFamilyLineage(memberId);
    }
    showSuccess("Spouse linked successfully!");
  };

  return (
    <>
    <AppBar 
      position="static" 
      elevation={2}
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            minHeight: '70px',
            py: 1,
          }}
        >
          {/* Desktop Logo */}
          <Diversity1Icon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              letterSpacing: '.05rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Family
          </Typography>

          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={() => { setOpenDialog(true); handleCloseNavMenu(); }}>
                <Typography textAlign="center">Add Member</Typography>
              </MenuItem>
              {currentMember && !currentMember.spouseId && (
                <MenuItem onClick={() => { setLinkSpouseDialog(true); handleCloseNavMenu(); }}>
                  <Typography textAlign="center">Link Spouse</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>

          {/* Mobile Logo */}
          <Diversity1Icon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              letterSpacing: '.05rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Family
          </Typography>

          {/* Desktop Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            <Box>
              <ColorButton
                variant="contained"
                onClick={() => setOpenDialog(true)}
                startIcon={<PersonAddIcon />}
              >
                Add Member
              </ColorButton>
            </Box>
            {currentMember && !currentMember.spouseId && (
                <Box>
                  <LinkSpouseButton
                    variant="contained"
                    onClick={() => setLinkSpouseDialog(true)}
                    startIcon={<FavoriteIcon />}
                  >
                    Link Spouse
                  </LinkSpouseButton>
                </Box>
            )}
          </Box>

          <Box sx={{
            flexGrow: 0,
          }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{
                p: 0,
                width: { xs: 40, md: 56 },
                height: { xs: 40, md: 56 }
              }}>
                <Avatar
                  alt="User"
                  src="/static/images/avatar/2.jpg"
                  sx={{
                    width: { xs: 32, md: 40 },
                    height: { xs: 32, md: 40 }
                  }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={setting === "Logout" ? handleLogout : handleCloseUserMenu}
                  // sx={{
                  //   fontSize: { xs: '0.8rem', md: '0.9rem' },
                  //   py: { xs: 1, md: 1.5 }
                  // }}
                >
                  <Typography sx={{
                    textAlign: "center",
                    // fontSize: { xs: '0.8rem', md: '0.9rem' }
                  }}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>

    {/* Dialog for Add Member Form */}
    <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <AddMemberForm onClose={() => setOpenDialog(false)} onSuccess={handleAddMemberSuccess} />
    </Dialog>

    {/* Dialog for Link Spouse Form */}
    <Dialog open={linkSpouseDialog} onClose={() => setLinkSpouseDialog(false)} maxWidth="sm" fullWidth>
      {currentMember && (
        <LinkSpouseForm 
          currentMemberId={currentMember._id}
          currentMemberGender={currentMember.gender}
          onClose={() => setLinkSpouseDialog(false)}
          onSuccess={handleLinkSpouseSuccess}
        />
      )}
    </Dialog>
  </>
  );
}
export default Navbar;
