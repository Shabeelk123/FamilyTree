import { HttpStatusCode } from "axios";
import axios from "../api/axios";
import { addMemberToCurrentFamily, removeMember, setCurrentFamilyMembers, setLineage } from "../redux/memberSlice";
import { store } from "../redux/store";
import { MemberFormData } from "../types/Member";

export const addMember = async (memberData: MemberFormData) => {
  try {
    const response = await axios.post("/member", memberData);
    store.dispatch(addMemberToCurrentFamily(response.data));
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchFamilyMembers = async (id: string) => {
  try {
    const response = await axios.get(`member/family/${id}`);
    store.dispatch(setCurrentFamilyMembers(response.data));
  } catch (error) {
    console.log(error);
  }
};

export const fetchFamilyLineage = async (id: string) => {
  try {
    const response = await axios.get(`member/family/lineage/${id}`);
    store.dispatch(setLineage(response.data));
  } catch (error) {
    console.log(error);
  }
};

export const deleteMember = async (id: string) => {
  try {
    const response = await axios.delete(`member/${id}`);
    console.log(response.data);
    if (response.status === HttpStatusCode.Ok) {
      store.dispatch(removeMember(id));
    }
  } catch (error) {
    console.log(error);
  }
};

export const getMemberById = async (id: string) => {
  try {
    const response = await axios.get(`member/${id}`);
    if (response.status === HttpStatusCode.Ok) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllMembers = async () => {
  try {
    const response = await axios.get("member/all");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const linkSpouse = async (memberId: string, spouseId: string) => {
  try {
    const response = await axios.post("member/link-spouse", {
      memberId,
      spouseId,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

