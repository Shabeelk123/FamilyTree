// components/AddMemberForm.tsx
import React, { useState } from "react";
import {
  Box,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  styled,
  ButtonProps,
  FormControlLabel,
  Checkbox,
  MenuItem,
} from "@mui/material";
import { purple } from "@mui/material/colors";
import { addMember } from "../services/memberService";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

type Props = {
  onClose: () => void;
  onSuccess?: () => void;
};

export const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  "&:hover": {
    backgroundColor: purple[700],
  },
}));

const AddMemberForm: React.FC<Props> = ({ onClose, onSuccess }) => {
  const parentId = useSelector((state: RootState) => state.member.currentMemberId)
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    familyName: "",
    parentId: parentId || null,
    isSpouse: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addMember({
        ...formData,
        age: Number(formData.age),
    });
    if (onSuccess) {
      onSuccess();
    } else {
      onClose();
    }
  };

  return (
    <>
      <DialogTitle>Add Family Member</DialogTitle>
      <DialogContent dividers>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <TextField
            size="small"
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            size="small"
            label="Age"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            required
          />
          <TextField
            select
            label="Gender"
            size="small"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </TextField>
          <TextField
            label="Family Name"
            size="small"
            name="familyName"
            value={formData.familyName}
            onChange={handleChange}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="isSpouse"
                checked={formData.isSpouse}
                onChange={handleChange}
              />
            }
            label="Is this member a spouse?"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <ColorButton type="submit" onClick={handleSubmit} variant="contained">
          Add Member
        </ColorButton>
      </DialogActions>
    </>
  );
};

export default AddMemberForm;
