import { Box, Drawer, Typography } from "@mui/material";
import { Member } from "../types/Member";

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
          top: "80px", // adjust based on your navbar height
          height: "calc(100% - 80px)",
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          width: 200,
          padding: 2,
        },
      }}
    >
      <Box>
        {selectedMember ? (
          <>
            <Typography variant="h6" gutterBottom>
              Member Details
            </Typography>
            <Typography><strong>Name:</strong> {selectedMember.name}</Typography>
            <Typography><strong>Age:</strong> {selectedMember.age}</Typography>
            <Typography><strong>Gender:</strong> {selectedMember.gender}</Typography>
            <Typography><strong>Family:</strong> {selectedMember.familyName}</Typography>
          </>
        ) : (
          <Typography>No Member Selected</Typography>
        )}
      </Box>
    </Drawer>
  );
};
