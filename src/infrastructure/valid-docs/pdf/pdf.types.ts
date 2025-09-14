export type AppPDFFile = {
  uri: string;
  name: string;
  type: string; // 'application/pdf'
  size?: number;
};

/* 
* 🏗️ Recommended Order (Redux + RTK Query)
* Types => AppPDFFile
* Schema => Zod
* Service Layer
* Redux Slice (State Only)
* RTL Query Api (server calls)
* Store Integration
*/