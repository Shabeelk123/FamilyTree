import { useEffect, useState } from "react";
import axios from "../api/axios";
import { Box, CircularProgress, Grid } from "@mui/material";
import MemberCard from "../components/MemberCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setCurrentMemberId, setRootMembers } from "../redux/memberSlice";
import { SidePanel } from "../components/SidePanel";
import { Member } from "../types/Member";
import { deleteMember } from "../services/memberService";
import BreadCrumb from "../components/BreadCrumb";

const Home = () => {
  const dispatch = useDispatch();
  const lineage = useSelector((state: RootState) => state.member.lineage);
  const rootMembers = useSelector((state: RootState) => state.member.members);
  const [open, setOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);

  const handleClose = () => {
    setOpen(false);
    setSelectedMember(null);
  };

  const handleView = async (member: Member) => {
    setSelectedMember(member);
    setOpen(true);
  };

  // delete member
  const handleDelete = async (id: string) => {
    await deleteMember(id);
  };

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axios.get("/member/root");
        dispatch(setRootMembers(res.data));
        dispatch(setCurrentMemberId(null));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  if (loading) {
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
    <>
      <Box sx={{
        minHeight: 'calc(100vh - 64px)',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        overflow: 'auto',
      }}>
        <BreadCrumb lineage={lineage} />
        {rootMembers && (
          <Grid container spacing={3} sx={{ padding: { xs: 2, sm: 3, md: 4 } }}>
            {rootMembers.map((member) => (
              <Grid key={member._id} size={{ xs: 12, sm: 6, md: 4, lg: 2 }} display="flex" justifyContent="center">
                <MemberCard
                  member={member}
                  handleView={handleView}
                  handleDelete={handleDelete}
                />
              </Grid>
            ))}
          </Grid>
        )}
        <SidePanel
          selectedMember={selectedMember}
          open={open}
          handleClose={handleClose}
        />
      </Box>
    </>
  );
};

export default Home;
