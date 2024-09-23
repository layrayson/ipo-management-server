import { Request, Response, NextFunction } from "express";
import { Ipo } from "../models/Ipo";

export const createIpo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    ipoNumber,
    issuerName,
    issuerIndustry,
    sharePrice,
    minVolume,
    totalShares,
    issuanceType,
    startDate,
    endDate,
    receivingAgents,
  } = req.body;

  try {
    const ipo = new Ipo({
      ipoNumber,
      issuerName,
      issuerIndustry,
      sharePrice,
      minVolume,
      totalShares,
      issuanceType,
      startDate,
      endDate,
      receivingAgents,
      createdBy: (req as any).user ? (req as any).user.id : null,
    });
    await ipo.save();
    res.json(ipo);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
