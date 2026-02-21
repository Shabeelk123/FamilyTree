import { Box, Drawer, Typography, Divider, IconButton } from "@mui/material";
import { Member } from "../types/Member";
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import CakeIcon from '@mui/icons-material/Cake';
import WcIcon from '@mui/icons-material/Wc';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';

interface SidePanelProps {
  selectedMember: Member | null;
  open: boolean;
  handleClose: () => void;
}

export const SidePanel = (props: SidePanelProps) => {
  const { selectedMember, open, handleClose } = props;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      sx={{
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          top: "64px",
          height: "calc(100% - 64px)",
          background: '#ffffff',
          width: { xs: 280, sm: 320 },
          boxShadow: '-4px 0 12px rgba(0, 0, 0, 0.08)',
          borderLeft: '1px solid rgba(0, 0, 0, 0.08)',
        },
      }}
    >
      <Box sx={{ p: 3 }}>
        {selectedMember ? (
          <>
            {/* Header */}
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 3,
            }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: '#2c3e50',
                }}
              >
                Member Details
              </Typography>
              <IconButton
                onClick={handleClose}
                size="small"
                sx={{
                  color: 'text.secondary',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  }
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Member Info */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40,
                    height: 40,
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  }}
                >
                  <PersonIcon sx={{ color: 'white', fontSize: 20 }} />
                </Box>
                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'text.secondary',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Name
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 600,
                      color: '#2c3e50',
                    }}
                  >
                    {selectedMember.name}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40,
                    height: 40,
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
                  }}
                >
                  <CakeIcon sx={{ color: 'white', fontSize: 20 }} />
                </Box>
                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'text.secondary',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Age
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 600,
                      color: '#2c3e50',
                    }}
                  >
                    {selectedMember.age} years
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40,
                    height: 40,
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #FF4081 0%, #F50057 100%)',
                  }}
                >
                  <WcIcon sx={{ color: 'white', fontSize: 20 }} />
                </Box>
                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'text.secondary',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Gender
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 600,
                      color: '#2c3e50',
                      textTransform: 'capitalize',
                    }}
                  >
                    {selectedMember.gender}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40,
                    height: 40,
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  }}
                >
                  <FamilyRestroomIcon sx={{ color: 'white', fontSize: 20 }} />
                </Box>
                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'text.secondary',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Family Name
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 600,
                      color: '#2c3e50',
                    }}
                  >
                    {selectedMember.familyName || 'N/A'}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </>
        ) : (
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            textAlign: 'center',
            color: 'text.secondary',
          }}>
            <PersonIcon sx={{ fontSize: 60, mb: 2, opacity: 0.3 }} />
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              No Member Selected
            </Typography>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};
