import { Request, Response } from "express";
import Member, { IMember } from "../models/member";
import mongoose from "mongoose";

export const addMember = async (req: Request, res: Response) => {
  try {
    const { name, age, gender, familyName, parentId, isSpouse } = req.body;
    const spouseId = isSpouse ? parentId : undefined;

    // If adding a child (not a spouse), get both parent IDs
    let parentIds: any[] = [];
    if (parentId && !isSpouse) {
      parentIds.push(parentId);
      
      // Find the parent and get their spouse ID
      const parent = await Member.findById(parentId);
      if (parent && parent.spouseId) {
        parentIds.push(parent.spouseId);
      }
    }

    const newMember = new Member({
      name,
      age,
      gender,
      familyName,
      parentIds: parentIds.length > 0 ? parentIds : undefined,
      spouseId: spouseId, // This links TO the existing member
    });

    const savedMember = await newMember.save();

    if (isSpouse) {
      // Update the other member to link BACK
      await Member.findByIdAndUpdate(spouseId, {
        spouseId: savedMember._id,
      });
    }
    // const member = await Member.findById(parentId);
    // const spouse = await Member.findOne({ spouseId: parentId });
    // const children = await Member.find({ parentId: parentId });

      // const family = isSpouse ? {
      //   member,
      //   spouse,
      //   children,
      // } :
      // {
      //   member,
      //   children,
      // };

      res.status(201).json(savedMember);
  } catch (error) {
    res.status(500).json({ message: "Error adding member", error });
  }
};

export const getRootMembers = async (req: Request, res: Response) => {
  try {
    const rootMembers = await Member.find({
      $or: [
        { parentIds: { $exists: false } },
        { parentIds: { $size: 0 } }
      ]
    });

    res.status(200).json(rootMembers);
  } catch (error) {
    console.error("Error fetching root members:", error);
    res.status(500).json({ message: "Failed to fetch root members" });
  }
};

export const getAllMembers = async (req: Request, res: Response) => {
  try {
    const members = await Member.find({});
    res.status(200).json(members);
  } catch (error) {
    console.error("Error fetching all members:", error);
    res.status(500).json({ message: "Failed to fetch members" });
  }
};

export const getMemberFamily = async (req: Request, res: Response) => {
  try {
    const memberId = req.params.id;

    const member = await Member.findById(memberId);
    if (!member) {
        res.status(404).json({ message: "Member not found" });
      return;
    }

    const spouse = member.spouseId
      ? await Member.findById(member.spouseId)
      : null;

    // Find children where memberId is in parentIds array
    const children = await Member.find({
      parentIds: memberId
    });

    res.json({ member, spouse, children });
  } catch (error) {
    res.status(500).json({ message: "Error fetching family", error });
  }
};

export const getMemberById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const member = await Member.findById(id)
      .populate("spouseId")
      .populate("parentId");

    if (!member) {
      res.status(404).json({ message: "Member not found" });
      return;
    }

    res.json(member);
  } catch (error) {
    res.status(500).json({ message: "Error fetching member", error });
  }
};

export const deleteMember = async (req: Request, res: Response) => {
  const memberId = req.params.id;

  try {
    // Find the member
    const member = await Member.findById(memberId);
    if (!member) {
        res.status(404).json({ message: "Member not found" });
      return;
    }

    // If this member has a spouse, clear the spouse reference
    if (member.spouseId) {
      await Member.findByIdAndUpdate(member.spouseId, { $unset: { spouseId: "" } });
    }

    // Recursively delete children
    const deleteChildren = async (parentId: string) => {
      const children = await Member.find({ parentIds: parentId });
      for (const child of children) {
        await deleteChildren((child._id as mongoose.Types.ObjectId).toString()); // Recursively delete each child's children
        await Member.findByIdAndDelete(child._id);
      }
    };

    await deleteChildren(memberId);

    // Delete the member
    await Member.findByIdAndDelete(memberId);

    res.status(200).json({ message: "Member and their descendants deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Error deleting member", error });
  }
};

export const getLineage = async (req: Request, res: Response) => {
  try {
    const lineage: any[] = [];
    let current = await Member.findById(req.params.id);

    while (current) {
      lineage.unshift(current); // Add to start
      // Get the first parent from parentIds array (if exists)
      current = current.parentIds && current.parentIds.length > 0 
        ? await Member.findById(current.parentIds[0]) 
        : null;
    }

    res.json(lineage);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch lineage" });
  }
};

export const linkSpouse = async (req: Request, res: Response) => {
  try {
    const { memberId, spouseId } = req.body;

    // Find both members with proper typing
    const member = await Member.findById<IMember>(memberId);
    const spouse = await Member.findById<IMember>(spouseId);

    if (!member || !spouse) {
      res.status(404).json({ message: "One or both members not found" });
      return;
    }

    // Check if either member already has a spouse
    if (member.spouseId) {
      res.status(400).json({ message: "Member already has a spouse" });
      return;
    }
    if (spouse.spouseId) {
      res.status(400).json({ message: "Selected person already has a spouse" });
      return;
    }

    // Link them as spouses (bidirectional)
    member.spouseId = spouse._id as mongoose.Types.ObjectId;
    spouse.spouseId = member._id as mongoose.Types.ObjectId;

    await member.save();
    await spouse.save();

    res.status(200).json({ 
      message: "Spouses linked successfully",
      member,
      spouse
    });
  } catch (error) {
    res.status(500).json({ message: "Error linking spouses", error });
  }
};

