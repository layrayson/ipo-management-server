import { Request, Response, NextFunction } from "express";
import { Ipo } from "../models/Ipo";
import { Subscription } from "../models/Subscription";

export const createIpo = async (req: Request, res: Response) => {
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
    const documents = req.files
      ? (req.files as Express.Multer.File[]).map((file) => file.path)
      : [];
    const ipo = new Ipo({
      ipoNumber,
      issuerName,
      issuerIndustry,
      sharePrice,
      minVolume,
      totalShares,
      issuanceType,
      documents,
      startDate,
      endDate,
      receivingAgents,
      createdBy: (req as any).user.id,
    });
    await ipo.save();
    res.json(ipo);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllIpos = async (req: Request, res: Response) => {
  try {
    const ipos = await Ipo.find({ endDate: { $gte: new Date() } });
    res.json(ipos);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getIposByInstitution = async (req: Request, res: Response) => {
  try {
    const ipos = await Ipo.find({ createdBy: (req as any).user.id });
    res.json(ipos);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getIpoById = async (req: Request, res: Response) => {
  try {
    const ipo = await Ipo.findById(req.params.id);
    if (!ipo) return res.status(404).json({ message: "IPO not found" });
    res.json(ipo);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const subscribeToIpo = async (req: Request, res: Response) => {
  const { volume, paymentMethod } = req.body;
  try {
    const ipo = await Ipo.findById(req.params.id);
    if (!ipo) return res.status(404).json({ message: "IPO not found" });

    if (ipo.endDate < new Date())
      return res.status(400).json({ message: "IPO has expired" });
    if (volume < ipo.minVolume)
      return res
        .status(400)
        .json({ message: `Minimum volume is ${ipo.minVolume}` });

    const subscription = new Subscription({
      ipo: ipo._id,
      investor: (req as any).user.id,
      volume,
      paymentMethod,
    });

    await subscription.save();
    res.json(subscription);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getSubscriptionsForIpo = async (req: Request, res: Response) => {
  try {
    const subscriptions = await Subscription.find({
      ipo: req.params.id,
    }).populate("investor", "name email");
    res.json(subscriptions);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
