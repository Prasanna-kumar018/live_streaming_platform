import { Button } from "@/components/ui/button";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { Clapperboard } from "lucide-react";
import Link from "next/link";
const Actions = async () => {
  var user = await currentUser();
  return (
    <div className="flex items-center justify-end gap-x-2 ml-4 lg:ml-0 ">
      {!user && (
        <SignInButton>
          <Button size={'sm'} variant={'custom'}>Login</Button>
        </SignInButton>
      )}
      {!!user && (
        <div className="flex items-center gap-x-2 mr-1">
          <Button
            size={"sm"}
            variant={"ghost"}
            className="text-muted-foreground hover:text-primary"
            asChild
          >
            <Link href={`/u/${user.username}`}>
              <Clapperboard className="h-5 w-5 lg:mr-2" />
              <span className="hidden lg:block">Dashboard</span>
            </Link>
          </Button>
          <UserButton afterSignOutUrl="/" ></UserButton>
        </div>
      )}
    </div>
  );
};

export default Actions;
