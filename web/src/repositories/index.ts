import { http } from "@/lib/http";

export * from "./vehicle";
export * from "./customer";
export * from "./reservation";
export * from "./rental";


export type ApiResponse<T = any> = {
  data: T,
  message: string | null
}