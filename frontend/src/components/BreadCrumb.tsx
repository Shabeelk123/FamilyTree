// components/BreadcrumbTrail.tsx
import { Breadcrumbs, Link, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import { BreadcrumbProps } from "../types/Member";
import { setLineage } from "../redux/memberSlice";
import { useDispatch } from "react-redux";

const BreadCrumb = ({ lineage }: BreadcrumbProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Breadcrumbs 
      maxItems={2} 
      aria-label="breadcrumb" 
      sx={{
        px: 4,
        pt: 2,
      }}
    >
      <Link
        underline="hover"
        sx={{ 
          display: 'flex', 
          alignItems: 'center',
          color: '#667eea',
          fontWeight: 600,
          cursor: 'pointer',
          '&:hover': {
            color: '#764ba2',
          }
        }}
        onClick={() => {
          dispatch(setLineage([]));
          navigate("/");
        }}
      >
        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
        Home
      </Link>
      {lineage.length > 0 &&
        lineage.map((member, index) =>
          index === lineage.length - 1 ? (
            <Typography 
              key={member._id} 
              sx={{ 
                color: '#2c3e50',
                fontWeight: 700,
              }}
            >
              {member.name}
            </Typography>
          ) : (
            <Link
              key={member._id}
              underline="hover"
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                color: '#667eea',
                fontWeight: 600,
                cursor: 'pointer',
                '&:hover': {
                  color: '#764ba2',
                }
              }}
              onClick={() => navigate(`/member/${member._id}`)}
            >
              {member.name}
            </Link>
          )
        )}
    </Breadcrumbs>
  );
};

export default BreadCrumb;
