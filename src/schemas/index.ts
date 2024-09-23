import Joi from "joi";

export const createIPOSchema = Joi.object({
  ipoNumber: Joi.string().required(),
  issuerName: Joi.string().required(),
  issuerLogo: Joi.string().uri().optional(),
  issuerIndustry: Joi.string()
    .valid("Finance", "Technology", "Health", "Energy", "Retail")
    .required(),
  sharePrice: Joi.number().positive().required(),
  minVolume: Joi.number().integer().positive().required(),
  totalShares: Joi.number().integer().positive().required(),
  issuanceType: Joi.string().valid("Public", "Private").required(),
  documents: Joi.array().items(Joi.string().uri()).max(3).optional(),
  startDate: Joi.date().iso().required(),
  endDate: Joi.date().min(Joi.ref("startDate")).required(),
  receivingAgents: Joi.array().items(Joi.string()).min(1).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const ipoSubscriptionSchema = Joi.object({
  ipoNumber: Joi.string().required(),
  volume: Joi.number().integer().positive().required(),
  paymentMethod: Joi.string().valid("online", "offline").required(),
  paymentDetails: Joi.object().optional(),
});

export const registrationSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),

  password: Joi.string().min(6).required(),
  role: Joi.string().valid("institution", "investor").required(),
});
