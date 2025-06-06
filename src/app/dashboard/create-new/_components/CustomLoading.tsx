import React from "react";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import Image from "next/image";

const CustomLoading = ({ loading }: { loading: boolean }) => {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent className="bg-white">
        <div className="bg-white flex flex-col items-center my-10 justify-center">
          <Image src={"/loading.gif"} width={100} height={100} alt="loading" />
          <h2>Generating Video.... Do not refresh</h2>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CustomLoading;
