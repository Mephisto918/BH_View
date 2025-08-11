export enum PermitEnum {
  BIR = "BIR", // Bureau of Internal Revenue
  FIRE_CERTIFICATE = "FIRE_CERTIFICATE", // Fire Certificate
  MAYORS_PERMIT = "MAYORS_PERMIT", // Mayor's Permit
  DTI = "DTI", // Department of Trade and Industry
  BUSINESS_PERMIT = "BUSINESS_PERMIT", // Business Permit
}

export interface Permit {
  id: number;
  ownerId: number;
  type: PermitEnum;
  fileUrl: string;
  expiresAt: Date;
}