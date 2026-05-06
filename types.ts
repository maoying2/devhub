
export enum RegistrationStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  REVIEWING = 'REVIEWING'
}

export interface Developer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company: string;
  companyWebsite?: string;
  companySize?: string;
  industry?: string;
  status: RegistrationStatus;
  appCode?: string;
  appKey?: string;
  passcode: string; // The "口令" required to view appKey and details
  permissions: {
    interfaceExchange: boolean; // 交换接口
    desktopAdaptation: boolean; // 桌面适配
    csharpTemplate: boolean;    // C#模板工程
    fileConversion: boolean;    // 文件转换
  };
  auditInfo?: {
    comment: string;
    auditedAt: string;
    auditor: string;
  };
  technicalContext?: {
    githubUrl?: string;
    region?: string;
    expectedMonthlyRequests?: string;
  };
  purpose: string;
  expiryDate?: string;
}

export type HelperUserType = 'DEVELOPER' | 'USER' | 'ADMIN';

export interface HelpArticle {
  id: string;
  title: string;
  content: string;
  targetTypes: HelperUserType[];
  category: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  role: 'ADMIN' | 'DEVELOPER' | 'GUEST';
  activeAppCode?: string;
}
