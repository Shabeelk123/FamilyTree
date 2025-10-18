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
            display: "flex",
            justifyContent: "space-between",
            minHeight: '70px',
            py: 1,
            flexDirection: 'row',
            gap: { xs: 2, sm: 0 },
            alignItems: 'center',
          }}
        >
          <Box sx={{
            display: "flex",
            alignItems: 'center',
            gap: 1.5,
            width: { xs: '100%', sm: 'auto' },
            justifyContent: { xs: 'center', sm: 'flex-start' }
          }}>
            <Diversity1Icon sx={{
              display: "flex",
              fontSize: { xs: 28, sm: 32 }
            }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                display: "flex",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                letterSpacing: ".05rem",
                color: "inherit",
                textDecoration: "none",
                transition: 'transform 0.2s',
                fontSize: { xs: '1.2rem', sm: '1.5rem' },
                '&:hover': {
                  transform: 'scale(1.05)',
                }
              }}
            >
              Family
            </Typography>
          </Box>

          <Box sx={{
            display: 'flex',
            gap: 2,
            flexDirection: 'row',
            width: { xs: '100%', sm: 'auto' },
            alignItems: 'center',
            mt: { xs: 1, sm: 0 }
          }}>
            {/* --- Mobile: Icon with small label --- */}
          <Box sx={{ display: { xs: 'flex', sm: 'none' }, flexDirection: 'row', alignItems: 'center' }}>
            <ColorButton
              variant="contained"
              onClick={() => setOpenDialog(true)}
              size="small"
              sx={{
                width: '60px',
                height: '50px',
                borderRadius: '8px',
                minWidth: 0,
                px: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <PersonAddIcon fontSize="medium" />
              <Typography
              variant="caption"
              sx={{
                fontSize: '0.75rem',
                fontWeight: 500,
                color: 'white',
                mt: 0.5,
                ml: 0.5,
              }}
            >
              Add
            </Typography>
            </ColorButton>
          </Box>

            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <ColorButton
                variant="contained"
                onClick={() => setOpenDialog(true)}
                startIcon={<PersonAddIcon />}
                size="small"
                sx={{
                  width: 'auto',
                  fontSize: '1rem',
                  minWidth: 'auto',
                  px: 2,
                }}
              >
                Add Member
              </ColorButton>
            </Box>

            {currentMember && !currentMember.spouseId && (
              <>
                {/* Mobile: Icon with tooltip */}
                <Box sx={{ display: { xs: 'flex', sm: 'none' }, flexDirection: 'column', alignItems: 'center' }}>
                  <LinkSpouseButton
                    variant="contained"
                    onClick={() => setLinkSpouseDialog(true)}
                    size="small"
                    sx={{
                      width: '60px',
                      height: '50px',
                      borderRadius: '8px',
                      minWidth: 0,
                      px: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <FavoriteIcon fontSize="medium" />
                    <Typography
              variant="caption"
              sx={{
                fontSize: '0.75rem',
                fontWeight: 500,
                color: 'white',
                mt: 0.5,
                ml: 0.5,
              }}
            >
              Link
            </Typography>
                  </LinkSpouseButton>
                </Box>
                {/* Desktop: Text with icon */}
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                  <LinkSpouseButton
                    variant="contained"
                    onClick={() => setLinkSpouseDialog(true)}
                    startIcon={<FavoriteIcon />}
                    size="small"
                    sx={{
                      width: 'auto',
                      fontSize: '1rem',
                      minWidth: 'auto',
                      px: 2,
                    }}
                  >
                    Link Spouse
                  </LinkSpouseButton>
                </Box>
              </>
            )}
          </Box>
          <Box sx={{
            flexGrow: 0,
            mt: { xs: 1, sm: 0 }
          }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{
                p: 0,
                width: { xs: 40, sm: 56 },
                height: { xs: 40, sm: 56 }
              }}>
                <Avatar
                  alt="User"
                  src="/static/images/avatar/2.jpg"
                  sx={{
                    width: { xs: 32, sm: 40 },
                    height: { xs: 32, sm: 40 }
                  }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{
                mt: "45px",
                '& .MuiPaper-root': {
                  minWidth: { xs: 120, sm: 200 }
                }
              }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={setting === "Logout" ? handleLogout : handleCloseUserMenu}
                  sx={{
                    fontSize: { xs: '0.8rem', sm: '0.9rem' },
                    py: { xs: 1, sm: 1.5 }
                  }}
                >
                  <Typography sx={{
                    textAlign: "center",
                    fontSize: { xs: '0.8rem', sm: '0.9rem' }
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
