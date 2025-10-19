// src/redux/memberSlice.tsx
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Member, FamilyState } from "../types/Member";

interface MemberState {
  currentMemberId: string | null;
  isDialogOpen: boolean;
  selectedMember: Member;
  members: Member[];
  currentFamily: FamilyState | null;
  lineage: Member[];
}

const initialState: MemberState = {
  currentMemberId: "",
  isDialogOpen: false,
  selectedMember: {} as Member,
  members: [],
  currentFamily: {} as FamilyState | null,
  lineage: [],
};

const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    setCurrentMemberId(state, action: PayloadAction<string | null>) {
      state.currentMemberId = action.payload;
    },
    setSelectedMember(state, action: PayloadAction<Member>) {
      state.selectedMember = action.payload;
    },

    setRootMembers(state, action: PayloadAction<Member[]>) {
      state.members = action.payload;
    },

    setLineage(state, action: PayloadAction<Member[]>) {
      state.lineage = action.payload;
    },

    setCurrentFamilyMembers(state, action: PayloadAction<FamilyState|null>) {
      state.currentFamily = action.payload;
    },

    toggleDialog(state, action: PayloadAction<boolean>) {
      state.isDialogOpen = action.payload;
    },

    removeMember: (state, action) => {
      const memberId = action.payload;

      // If currentFamily is empty, we're dealing with root members
      if (!state.currentFamily?.member || !state.currentFamily.children || !state.currentFamily.spouse) {
        state.members = state.members.filter(
          (member) => member._id !== memberId
        );
        return;
      }

      // Remove spouse if matched
      if (state.currentFamily.spouse?._id === memberId) {
        state.currentFamily.spouse = null;
      }

      // Remove from children list
      state.currentFamily.children = state.currentFamily.children.filter(
        (child) => child._id !== memberId
      );
    },

    addMemberToCurrentFamily: (state, action) => {
      const newMember = action.payload;

      if (!state.currentFamily) {
        state.currentFamily = {} as FamilyState;
      }

      if (newMember.isSpouse) {
        // If the new member is a spouse, assign them to the current family.
        state.currentFamily.spouse = newMember;
      } else if (!newMember.parentId) {
        // If they are not a spouse and have no parent, they are a new root member.
        state.members.push(newMember);
      } else {
        // Otherwise, they must be a child of the current family.
        state.currentFamily.children.push(newMember);
      }
    }
  },
});

export const {
  setSelectedMember,
  toggleDialog,
  setRootMembers,
  setCurrentFamilyMembers,
  setCurrentMemberId,
  setLineage,
  removeMember,
  addMemberToCurrentFamily
} = memberSlice.actions;
export default memberSlice.reducer;
