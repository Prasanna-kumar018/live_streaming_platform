"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
  Select,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { IngressInput } from "livekit-server-sdk";
import { ElementRef, useState, useTransition, useRef } from "react";
import { createIngress } from "@/actions/ingress";
import { toast } from "sonner";

const RTMP = String(IngressInput.RTMP_INPUT);
const WHIP = String(IngressInput.WHIP_INPUT);

type IngressType = typeof RTMP | typeof WHIP;

const ConnectModel = () => {
  const [isPending, startTransition] = useTransition();
  const ref = useRef<ElementRef<"button">>(null);
  const [ingressType, setIngressType] = useState<IngressType>(RTMP);
  const ongenerate = () => {
    console.log("dlfjsdlf");
    startTransition(() => {
      createIngress(parseInt(ingressType))
        .then(() => {
          toast.success("Ingress Created");
          ref.current?.click();
          console.log("dlfjsdlf");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something went Wrong...");
        });
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="custom">Generate Connection</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate Connection</DialogTitle>
        </DialogHeader>
        <Select
          disabled={isPending}
          value={ingressType}
          onValueChange={(value) => setIngressType(value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Ingress Type"></SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={RTMP}>RTMP</SelectItem>
            <SelectItem value={WHIP}>WHIP</SelectItem>
          </SelectContent>
        </Select>
        <Alert>
          <AlertTriangle className="h-4 w-4" />

          <AlertTitle>Warning!</AlertTitle>
          <AlertDescription>
            This action will reset all active streams using the current
            connection
          </AlertDescription>
        </Alert>
        <div className="flex justify-between">
          <DialogClose ref={ref}>
            <Button variant={"destructive"}>Cancel</Button>
          </DialogClose>
          <Button disabled={isPending} onClick={ongenerate} variant="custom">
            Generate
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectModel;
