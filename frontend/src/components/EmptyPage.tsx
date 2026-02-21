import { Box, Typography } from "@mui/material";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
}

const EmptyPage = ({
  title = "No Family Members Yet",
  subtitle = "Add family members using the 'Add Member' button in the navigation bar to start building your family tree.",
}: EmptyStateProps) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="60vh"
      textAlign="center"
      px={3}
    >
      {/* Icon Container */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          mb: 3,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        }}
      >
        <FamilyRestroomIcon
          sx={{
            fontSize: 60,
            color: '#667eea',
            opacity: 0.7,
          }}
        />
      </Box>

      {/* Title */}
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontWeight: 700,
          color: '#2c3e50',
          mb: 1.5,
        }}
      >
        {title}
      </Typography>

      {/* Subtitle */}
      <Typography
        variant="body1"
        sx={{
          color: 'text.secondary',
          maxWidth: 480,
          lineHeight: 1.6,
        }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
};

export default EmptyPage;
