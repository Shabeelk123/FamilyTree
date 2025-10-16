// src/redux/memberSlice.tsx
import _ from "lodash";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Member, FamilyState } from "../types/Member";

interface MemberState {
  currentMemberId: string | null;
  isDialogOpen: boolean;
  selectedMember: Member;
  members: Member[];
  currentFamily: FamilyState;
  lineage: Member[];
}

const initialState: MemberState = {
  currentMemberId: "",
  isDialogOpen: false,
  selectedMember: {} as Member,
  members: [],
  currentFamily: {} as FamilyState,
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


    setCurrentFamilyMembers(state, action: PayloadAction<FamilyState>) {
      state.currentFamily = action.payload;
    },

    toggleDialog(state, action: PayloadAction<boolean>) {
      state.isDialogOpen = action.payload;
    },

    removeMember: (state, action) => {
      const memberId = action.payload;

      // if it is root
      if (_.isEmpty(state.currentFamily)) {
        state.members = state.members.filter(
          (member) => member._id !== memberId
        );
        return;
      }; 
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
      // for adding in root
      if (!newMember.parentId) {
        state.members.push(newMember);
        return;
      }
      if (newMember.isSpouse) {
        state.currentFamily.spouse = newMember;
      } else {
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
