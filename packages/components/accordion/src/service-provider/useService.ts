import { useContext } from "react";
import { ServiceContext } from "./ServiceProvider";

export function useService() {
  const service = useContext(ServiceContext);
  if (!service) throw new Error("ServiceProvider를 찾지 못했습니다");
  return service;
}
