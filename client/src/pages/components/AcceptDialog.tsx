import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CalendarCheck, FileSignature } from "lucide-react";
import toast from "react-hot-toast";

const AcceptDialog = ({
  isDialogOpen,
  handleCloseDialog,
  selectedApplication,
  handleSubmit,
  role,
  signature,
  setSignature,
}) => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const handleAccept = (e) => {
    e.preventDefault();
    if (!signature) {
      toast.error("Please provide a signature before proceeding.");
      return;
    }
    if (role === "candidate") {
      handleSubmit(selectedApplication._id, "accepted", signature);
    } else {
      handleSubmit(e);
    }

    handleCloseDialog();
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Sign Offer Letter</DialogTitle>
          <DialogDescription>
            {role === "candidate"
              ? "You are about to sign the offer letter for"
              : "Please sign the offer letter for"}
            <span className="font-medium text-md ml-1 text-primary">
              {selectedApplication?.jobTitle}
            </span>
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-2 pt-1">
          <div className="space-y-2">
            <Label htmlFor="signature" className="flex items-center gap-2">
              <FileSignature className="h-4 w-4" />
              Full Legal Name
            </Label>
            <Input
              id="signature"
              placeholder="Type your full name to sign"
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
              className="w-full"
              required
            />
            <p className="text-sm text-muted-foreground">
              By typing your name above, you acknowledge that this constitutes
              your electronic signature.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarCheck className="h-4 w-4" />
              <span>Signing Date: {currentDate}</span>
            </div>
          </div>

          <DialogFooter className="sm:justify-between">
            <Button type="button" variant="ghost" onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button
              onClick={(e) => handleAccept(e)}
              disabled={!signature.trim()}
            >
              Accept & Sign
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AcceptDialog;
