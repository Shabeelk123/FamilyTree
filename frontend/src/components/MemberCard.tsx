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
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FavoriteIcon from '@mui/icons-material/Favorite';

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
      if (spouseLineage[0]._id !== lineage[0]._id) {
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
        position: 'relative',
        width: '100%',
        maxWidth: 200,
        cursor: isSpouse ? 'default' : 'pointer',
        display: 'flex',
        flexDirection: 'column',
        opacity: isSpouse ? 0.95 : 1,
        borderRadius: '16px',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        border: '1px solid rgba(0,0,0,0.06)',
        background: '#ffffff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        '&:hover': {
          boxShadow: isSpouse ? '0 4px 16px rgba(0,0,0,0.12)' : '0 8px 24px rgba(0,0,0,0.16)',
          transform: isSpouse ? 'translateY(-2px)' : 'translateY(-4px)',
        }
      }}
      onClick={(e) => handleCardClick(e)}
    >
      {/* Spouse Indicator Badge */}
      {isSpouse && (
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: '#FF4081',
            color: 'white',
            padding: '3px 8px',
            borderRadius: '16px',
            fontSize: '0.65rem',
            fontWeight: 700,
            zIndex: 2,
            textTransform: 'uppercase',
            letterSpacing: '0.3px',
            display: 'flex',
            alignItems: 'center',
            gap: 0.3,
            boxShadow: '0 2px 8px rgba(255, 64, 129, 0.4)',
          }}
        >
          <FavoriteIcon sx={{ fontSize: '0.75rem' }} />
          Spouse
        </Box>
      )}

      {/* Member Image */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          paddingTop: '100%', // 1:1 Aspect Ratio
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        }}
      >
        <CardMedia
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: "cover",
          }}
          image={
            member.gender === "male"
              ? "https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-male-5.png"
              : "https://cdn.pixabay.com/photo/2016/08/20/05/36/avatar-1606914_1280.png"
          }
          title={member.name}
        />
      </Box>

      {/* Member Info */}
      <CardContent sx={{
        '&.MuiCardContent-root': {
          padding: '12px',
          paddingBottom: '8px',
        },
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
      >
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
              fontWeight: 700,
              fontSize: '1rem',
              color: '#2c3e50',
              lineHeight: 1.3,
            }}
          >
            {member.name}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              fontSize: '0.8rem',
              fontWeight: 500,
            }}
          >
            {member.familyName}
          </Typography>
        </Box>
      </CardContent>

      {/* Action Buttons */}
      <CardActions
        sx={{
          padding: "0px 8px 8px 8px",
          justifyContent: "space-between",
          gap: 0.5,
        }}
      >
        <Button
          size="small"
          variant="outlined"
          startIcon={<VisibilityIcon sx={{ fontSize: '0.9rem' }} />}
          sx={{
            flex: 1,
            textTransform: 'none',
            color: '#667eea',
            borderColor: '#667eea',
            fontWeight: 600,
            fontSize: '0.75rem',
            borderRadius: '8px',
            padding: '4px 8px',
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: 'rgba(102, 126, 234, 0.08)',
              borderColor: '#667eea',
              transform: 'scale(1.02)',
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
          variant="outlined"
          startIcon={<DeleteOutlineIcon sx={{ fontSize: '0.9rem' }} />}
          sx={{
            flex: 1,
            textTransform: 'none',
            color: '#f5576c',
            borderColor: '#f5576c',
            fontWeight: 600,
            fontSize: '0.75rem',
            borderRadius: '8px',
            padding: '4px 8px',
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: 'rgba(245, 87, 108, 0.08)',
              borderColor: '#f5576c',
              transform: 'scale(1.02)',
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
