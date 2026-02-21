import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Alert,
  IconButton,
  Typography,
} from "@mui/material";
import { getAllMembers, linkSpouse } from "../services/memberService";
import { Member } from "../types/Member";
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';

type Props = {
  currentMemberId: string;
  currentMemberGender?: string;
  onClose: () => void;
  onSuccess: () => void;
};

const LinkSpouseForm: React.FC<Props> = ({ currentMemberId, currentMemberGender, onClose, onSuccess }) => {
  const [allMembers, setAllMembers] = useState<Member[]>([]);
  const [selectedSpouseId, setSelectedSpouseId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const members = await getAllMembers();
        // Filter by opposite gender, exclude current member, and exclude members who already have spouses
        const oppositeGender = currentMemberGender === "male" ? "female" : "male";
        const availableMembers = members.filter(
          (m: Member) =>
            m._id !== currentMemberId &&
            !m.spouseId &&
            m.gender === oppositeGender
        );
        setAllMembers(availableMembers);
      } catch (error) {
        setError("Failed to load members");
      }
    };

    fetchMembers();
  }, [currentMemberId, currentMemberGender]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await linkSpouse(currentMemberId, selectedSpouseId);
      onSuccess();
      onClose();
    } catch (err) {
      const errorMessage = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || "Failed to link spouse";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DialogTitle
        sx={{
          m: 0,
          p: 2.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #FF4081 0%, #F50057 100%)',
            }}
          >
            <FavoriteIcon sx={{ color: 'white', fontSize: 20 }} />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#2c3e50' }}>
            Link Spouse
          </Typography>
        </Box>
        <IconButton
          onClick={onClose}
          sx={{
            color: 'text.secondary',
            '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 2.5,
              borderRadius: '12px',
            }}
          >
            {error}
          </Alert>
        )}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2.5, mt: 1 }}
        >
          <TextField
            select
            label="Select Spouse"
            value={selectedSpouseId}
            onChange={(e) => setSelectedSpouseId(e.target.value)}
            required
            fullWidth
            helperText="Only members without existing spouses are shown"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                '&:hover fieldset': {
                  borderColor: '#FF4081',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#FF4081',
                },
              },
            }}
          >
            {allMembers.length === 0 ? (
              <MenuItem disabled>No available members</MenuItem>
            ) : (
              allMembers.map((member) => (
                <MenuItem key={member._id} value={member._id}>
                  {member.name} ({member.gender}, {member.familyName})
                </MenuItem>
              ))
            )}
          </TextField>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2.5, pt: 0, gap: 1 }}>
        <Button
          onClick={onClose}
          disabled={loading}
          sx={{
            textTransform: 'none',
            color: 'text.secondary',
            fontWeight: 600,
            borderRadius: '10px',
            px: 3,
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            }
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          onClick={handleSubmit}
          variant="contained"
          disabled={loading || !selectedSpouseId}
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: '10px',
            px: 3,
            background: 'linear-gradient(135deg, #FF4081 0%, #F50057 100%)',
            boxShadow: '0 2px 8px rgba(255, 64, 129, 0.3)',
            '&:hover': {
              boxShadow: '0 4px 12px rgba(255, 64, 129, 0.4)',
              transform: 'translateY(-1px)',
            },
            '&:disabled': {
              background: 'linear-gradient(135deg, #FF4081 0%, #F50057 100%)',
              opacity: 0.5,
            },
          }}
        >
          {loading ? "Linking..." : "Link Spouse"}
        </Button>
      </DialogActions>
    </>
  );
};

export default LinkSpouseForm;
