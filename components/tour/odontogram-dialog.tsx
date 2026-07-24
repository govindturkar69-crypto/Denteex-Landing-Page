"use client";

import { Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Odontogram } from "@/components/tour/odontogram";

export function OdontogramDialog() {
  return (
    <Dialog>
      <DialogTrigger render={<Button className="w-full" />}>
        <Smile className="size-4" />
        Try the Interactive Odontogram
      </DialogTrigger>
      <DialogContent className="max-w-lg sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Interactive 3D Odontogram</DialogTitle>
          <DialogDescription>
            A live demo of the dental charting tool dentists use inside
            Denteex during patient diagnosis.
          </DialogDescription>
        </DialogHeader>
        <Odontogram />
      </DialogContent>
    </Dialog>
  );
}
