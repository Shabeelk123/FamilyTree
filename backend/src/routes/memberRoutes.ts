import express from "express";
import Member from "../models/member";
import { getMemberFamily, addMember, getMemberById, deleteMember, getRootMembers, getLineage, linkSpouse, getAllMembers } from "../controllers/memberController";

const router = express.Router();

// Add a new family member
router.post("/", addMember);

// Link two existing members as spouses
router.post("/link-spouse", linkSpouse);

// Get root members
router.get("/root", getRootMembers);

// Get all members
router.get("/all", getAllMembers);

// Get full family by member ID
router.get("/family/:id", getMemberFamily);

// get memeber details
router.get("/:id", getMemberById);

// get lineage
router.get("/family/lineage/:id", getLineage);

// delete a member
router.delete("/:id", deleteMember);


  

export default router;
