declare global {
  interface FormData {
    append(name: string, value: any): void;
  }
}
export {};
