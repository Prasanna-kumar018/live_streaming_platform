"use client";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { createViwerToken } from "@/actions/token";

 const useViewerToken = (hostIdentity: string) => {
  const [token, settoken] = useState("");
  const [name, setName] = useState("");
  const [identity, setIdentity] = useState("");
  useEffect(() => {
    const createToken = async () => {
      try {
        console.log(hostIdentity);
        const viewerToken = await createViwerToken(hostIdentity);
        settoken(viewerToken);
        const decodedToken = jwtDecode(viewerToken) as JwtPayload & {
          name?: string;
        };
        const name = decodedToken?.name;
        const identity = decodedToken.jti;
        if (identity) {
          setIdentity(identity);
        }
        if (name) {
          setName(name);
        }
        console.log("success")
      } catch {
        toast.error("Something went wrong....");
      }
    };
    createToken();
  }, [hostIdentity]);

  return { token, name, identity };
};
export default useViewerToken;
