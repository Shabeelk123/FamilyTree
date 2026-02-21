// components/AddMemberForm.tsx
import React, { useState } from "react";
import {
  Box,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Checkbox,
  MenuItem,
  IconButton,
  Typography,
} from "@mui/material";
import { addMember } from "../services/memberService";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import CloseIcon from '@mui/icons-material/Close';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

type Props = {
  onClose: () => void;
  onSuccess?: () => void;
};

const AddMemberForm: React.FC<Props> = ({ onClose, onSuccess }) => {
  const parentId = useSelector((state: RootState) => state.member.currentMemberId)
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    familyName: "",
    parentId: parentId || null,
    isSpouse: false,
    isRootMember: false,
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
      isRootMember: formData.isRootMember || false,
    });
    if (onSuccess) {
      onSuccess();
    } else {
      onClose();
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
              background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
            }}
          >
            <PersonAddIcon sx={{ color: 'white', fontSize: 20 }} />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#2c3e50' }}>
            Add Family Member
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
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2.5, mt: 1 }}
        >
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                '&:hover fieldset': {
                  borderColor: '#4CAF50',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#4CAF50',
                },
              },
            }}
          />

          <TextField
            label="Age"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            required
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                '&:hover fieldset': {
                  borderColor: '#4CAF50',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#4CAF50',
                },
              },
            }}
          />

          <TextField
            select
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                '&:hover fieldset': {
                  borderColor: '#4CAF50',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#4CAF50',
                },
              },
            }}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </TextField>

          <TextField
            label="Family Name"
            name="familyName"
            value={formData.familyName}
            onChange={handleChange}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                '&:hover fieldset': {
                  borderColor: '#4CAF50',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#4CAF50',
                },
              },
            }}
          />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <FormControlLabel
              control={
                <Checkbox
                  name="isSpouse"
                  checked={formData.isSpouse}
                  onChange={handleChange}
                  sx={{
                    color: '#4CAF50',
                    '&.Mui-checked': {
                      color: '#4CAF50',
                    },
                  }}
                />
              }
              label="Is this member a spouse?"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="isRootMember"
                  checked={formData.isRootMember}
                  onChange={handleChange}
                  sx={{
                    color: '#4CAF50',
                    '&.Mui-checked': {
                      color: '#4CAF50',
                    },
                  }}
                />
              }
              label="Is this member a root member?"
            />
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2.5, pt: 0, gap: 1 }}>
        <Button
          onClick={onClose}
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
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: '10px',
            px: 3,
            background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
            boxShadow: '0 2px 8px rgba(76, 175, 80, 0.3)',
            '&:hover': {
              boxShadow: '0 4px 12px rgba(76, 175, 80, 0.4)',
              transform: 'translateY(-1px)',
            },
          }}
        >
          Add Member
        </Button>
      </DialogActions>
    </>
  );
};

export default AddMemberForm;
