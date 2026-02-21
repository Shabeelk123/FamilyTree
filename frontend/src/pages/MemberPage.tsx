import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  deleteMember,
  fetchFamilyLineage,
  fetchFamilyMembers,
} from "../services/memberService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Grid, Typography, Box, CircularProgress } from "@mui/material";
import MemberCard from "../components/MemberCard";
import EmptyPage from "../components/EmptyPage";
import { setCurrentMemberId } from "../redux/memberSlice";
import { Member } from "../types/Member";
import { SidePanel } from "../components/SidePanel";
import BreadCrumb from "../components/BreadCrumb";

const MemberPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const currentFamily = useSelector(
    (state: RootState) => state.member.currentFamily
  );
  const lineage = useSelector((state: RootState) => state.member.lineage);

  const [open, setOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);

  const handleView = (member: Member) => {
    setSelectedMember(member);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    await deleteMember(id);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMember(null);
  };

  useEffect(() => {
    const fetchFamily = async () => {
      try {
        if (id) {
          dispatch(setCurrentMemberId(id));
          await fetchFamilyMembers(id);
          await fetchFamilyLineage(id);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFamily();
  }, [id, dispatch]);

  if (loading || !id || !currentFamily) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="calc(100vh - 64px)"
        sx={{
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        }}
      >
        <CircularProgress sx={{ color: '#667eea' }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px)",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        overflow: "auto",
      }}
    >
      {lineage && lineage.length > 0 && <BreadCrumb lineage={lineage} />}

      <Box sx={{ padding: { xs: 2, sm: 3, md: 4 } }}>
        {(currentFamily.spouse || (currentFamily.children && currentFamily.children.length > 0)) ? (
          <Box>
            <Typography
              variant="h5"
              sx={{
                mb: 3,
                fontWeight: 700,
                color: "#2c3e50",
                display: "flex",
                alignItems: "center",
                gap: 1,
                fontSize: { xs: '1.25rem', sm: '1.5rem' },
              }}
            >
              👨‍👩‍👧 Family Members
            </Typography>

            {/* Combined Spouse + Children */}
            <Grid
              container
              spacing={3}
            >
              {/* Spouse */}
              {currentFamily.spouse && (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }} display="flex" justifyContent="center">
                  <MemberCard
                    member={currentFamily.spouse}
                    isSpouse={true}
                    handleView={handleView}
                    handleDelete={handleDelete}
                  />
                </Grid>
              )}

              {/* Children */}
              {currentFamily.children?.map((member) => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }} key={member._id} display="flex" justifyContent="center">
                  <MemberCard
                    member={member}
                    handleView={handleView}
                    handleDelete={handleDelete}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : (
          <EmptyPage />
        )}

        <SidePanel selectedMember={selectedMember} open={open} handleClose={handleClose} />
      </Box>
    </Box>
  );
};

export default MemberPage;
