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
    (state: RootState) => state.member.currentFamily);
  const lineage = useSelector((state: RootState) => state.member.lineage);

  const [open, setOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);

  const handleView = async (member: Member) => {
    setSelectedMember(member);
    setOpen(true);
  };

  // delete member
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
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ 
        height: 'calc(100vh - 80px)',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        overflow: 'auto',
      }}>
        {lineage && lineage.length > 0 && <BreadCrumb lineage={lineage} />}
        <Box sx={{ padding: 4 }}>
          {(currentFamily.children && currentFamily.children.length > 0) ||
          currentFamily.spouse ? (
          <Grid container spacing={4}>
            {/* Display Spouse */}
            {currentFamily.spouse && currentFamily.member && (
              <Grid>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    mb: 3,
                    fontWeight: 700,
                    color: '#2c3e50',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  💑 Spouse
                </Typography>
                <Grid container spacing={3}>
                  <Grid>
                    <MemberCard
                      member={currentFamily.spouse}
                      isSpouse={false}
                      handleView={handleView}
                      handleDelete={handleDelete}
                    />
                  </Grid>
                </Grid>
              </Grid>
            )}

            {/* Display Children (Clickable) */}
            {currentFamily.children && currentFamily.children.length > 0 && (
              <Grid>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    mb: 3,
                    fontWeight: 700,
                    color: '#2c3e50',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  👶 Children
                </Typography>
                <Grid container spacing={3}>
                  {currentFamily.children.map((member) => {
                    // Filter out spouse entries (where member is actually a spouse, not a child)
                    if (member.parentIds && member.parentIds.length > 0) {
                      return (
                        <Grid key={member._id}>
                          <MemberCard
                            member={member}
                            handleView={handleView}
                            handleDelete={handleDelete}
                          />
                        </Grid>
                      );
                    }
                    return null;
                  })}
                </Grid>
              </Grid>
            )}
          </Grid>
          ) : (
            <EmptyPage />
          )}
          <SidePanel
            selectedMember={selectedMember}
            open={open}
            handleClose={handleClose}
          />
        </Box>
      </Box>
    </>
  );
};

export default MemberPage;
