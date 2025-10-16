import {
  Card,
  CardContent,
  Typography,
  Button,
  CardMedia,
  Box,
  CardActions,
} from "@mui/material";
import { FamilyState, Member } from "../types/Member";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setCurrentFamilyMembers,
  setSelectedMember,
} from "../redux/memberSlice";

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

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // Prevent navigation if this is a spouse from the same family (no family tree to show)
    // But allow navigation if spouse is from a different family (married into the family)
    if (isSpouse) {
      return;
    }
    e.preventDefault();
    dispatch(setSelectedMember(member));
    dispatch(setCurrentFamilyMembers({} as FamilyState));
    navigate(`/member/${member._id}`);
  };

  return (
    <Card 
      sx={{ 
        maxWidth: 180,
        cursor: isSpouse ? 'default' : 'pointer',
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
      <CardMedia
        sx={{
          objectFit: "cover",
          height: { xs: "180px", sm: "180px", md: "160px" },
          width: "100%",
        }}
        image={
          member.gender === "male"
            ? "https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-male-5.png"
            : "https://cdn.pixabay.com/photo/2016/08/20/05/36/avatar-1606914_1280.png"
        }
        title="family"
      />
      <CardContent sx={{ '&.MuiCardContent-root': { padding: '0px' } }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
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
        <CardActions sx={{ padding: "8px 12px", justifyContent: "space-between" }}>
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
