import React from "react";
import { Spinner } from "./SpinnerLoading";

interface CompleteLoadingProps {
  loading: boolean;
}

export const CompleteLoading = ({ loading }: CompleteLoadingProps) => {
  if (!loading) return null;

  return (
    <div className="absolute inset-0 z-20">
      <div className="flex items-center justify-center h-dvh w-full bg-gray-100 opacity-80">
        <Spinner show={loading} text="Cargando..." size={"large"} />
      </div>
    </div>
  );
};
