import { Box, Button, Typography } from "@mui/material";
import PersonOffIcon from "@mui/icons-material/PersonOff";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

const EmptyPage = ({
  title = "No members found",
  subtitle = "You can add the first member to this family.",
  buttonText = "Add Member",
  onButtonClick,
}: EmptyStateProps) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="70vh"
      textAlign="center"
      px={2}
    >
      <PersonOffIcon sx={{ fontSize: 60, mb: 2, color: "gray" }} />
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body1" mb={2}>
        {subtitle}
      </Typography>
      {onButtonClick && (
        <Button variant="contained" onClick={onButtonClick}>
          {buttonText}
        </Button>
      )}
    </Box>
  );
};

export default EmptyPage;
