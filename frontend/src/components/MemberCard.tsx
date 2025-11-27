import {
  Card,
  CardContent,
  Typography,
  Button,
  CardMedia,
  Box,
  CardActions,
} from "@mui/material";
import { Member } from "../types/Member";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentFamilyMembers,
  setSelectedMember,
} from "../redux/memberSlice";
import { RootState } from "../redux/store";
import { checkSpouseLineage } from "../utils/commonUtils";

const MemberCard = ({
  member,
  handleView,
  handleDelete,
  isSpouse = false,
}: {
  member: Member;
  handleView?: (member: Member) => void;
  handleDelete?: (memberId: string) => void;
  isSpouse?: boolean;
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lineage = useSelector((state: RootState) => state.member.lineage);


  const handleCardClick = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // Prevent navigation if this is a spouse from the different family (no family tree to show)
    // But allow navigation if spouse is from a same family (married into the family)
    if (isSpouse) {
      const spouseLineage = await checkSpouseLineage(member._id);
      if (spouseLineage[0]._id !== lineage[0]._id ) {
        return;
      }
    }
    e.preventDefault();
    dispatch(setSelectedMember(member));
    dispatch(setCurrentFamilyMembers(null));
    navigate(`/member/${member._id}`);
  };

  return (
    <Card 
      sx={{ 
        position: 'relative', // Add relative positioning for the absolute badge
        width: '100%', // Allow card to fill its container
        cursor: isSpouse ? 'default' : 'pointer',
        display: 'flex',
        flexDirection: 'column',
        opacity: isSpouse ? 0.85 : 1,
        borderRadius: '16px',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        border: '1px solid rgba(0,0,0,0.08)',
        '&:hover': {
          boxShadow: isSpouse ? '0 4px 12px rgba(0,0,0,0.1)' : '0 8px 24px rgba(0,0,0,0.15)',
          transform: isSpouse ? 'none' : 'translateY(-4px)',
        }
      }} 
      onClick={(e) => handleCardClick(e)}
    >
      {/* Spouse Indicator Badge */}
      {isSpouse && (
        <Box
          sx={{
            position: 'relative',
            top: 8,
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#e91e63',
            color: 'white',
            padding: '2px 8px',
            borderRadius: '12px',
            fontSize: '0.7rem',
            fontWeight: 600,
            zIndex: 1,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          Spouse
        </Box>
      )}
      <CardMedia
        sx={{
          objectFit: "cover",
          height: { xs: 300, sm: 200, md: 200 }, // 300px on mobile, 180px on larger screens
          width: "100%",
        }}
        image={
          member.gender === "male"
            ? "https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-male-5.png"
            : "https://cdn.pixabay.com/photo/2016/08/20/05/36/avatar-1606914_1280.png"
        }
        title="family"
      />
      <CardContent sx={{ 
          '&.MuiCardContent-root': { padding: '12px' },
          flexGrow: 1, // Allow content to take up available space
          display: 'flex',
          flexDirection: 'column' }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            flexGrow: 1,
          }}
        >
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ 
              mb: "4px",
              fontWeight: 600,
              fontSize: '1.1rem',
            }}
          >
            {member.name}
          </Typography>
          <Typography 
            variant="body2"
            sx={{
              color: "text.secondary",
              fontSize: '0.9rem',
            }}
          >
            {member.familyName}
          </Typography>
        </Box>
      </CardContent>
        <CardActions sx={{ padding: "0px 12px 8px 12px", justifyContent: "space-between" }}>
          <Button
            size="small"
            variant="text"
            sx={{
              textTransform: 'none',
              color: '#667eea',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: 'rgba(102, 126, 234, 0.08)',
              }
            }}
            onClick={(e) => {
              e.stopPropagation();
              if (handleView) handleView(member);
            }}
          >
            View
          </Button>
          <Button
            size="small"
            variant="text"
            sx={{
              textTransform: 'none',
              color: '#f5576c',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: 'rgba(245, 87, 108, 0.08)',
              }
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleDelete?.(member._id);
            }}
          >
            Delete
          </Button>
        </CardActions>
    </Card>
  );
};

export default MemberCard;
