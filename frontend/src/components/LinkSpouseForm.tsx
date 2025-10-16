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
} from "@mui/material";
import { getAllMembers, linkSpouse } from "../services/memberService";
import { Member } from "../types/Member";
import { ColorButton } from "./AddMemberForm";

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
      <DialogTitle>Link Existing Member as Spouse</DialogTitle>
      <DialogContent dividers>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <TextField
            select
            label="Select Spouse"
            size="small"
            value={selectedSpouseId}
            onChange={(e) => setSelectedSpouseId(e.target.value)}
            required
            helperText="Only members without existing spouses are shown"
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
      <DialogActions>
        <Button onClick={onClose} color="secondary" disabled={loading}>
          Cancel
        </Button>
        <ColorButton
          type="submit"
          onClick={handleSubmit}
          variant="contained"
          disabled={loading || !selectedSpouseId}
        >
          {loading ? "Linking..." : "Link Spouse"}
        </ColorButton>
      </DialogActions>
    </>
  );
};

export default LinkSpouseForm;
