import { ArrowLeft } from "lucide-react";
import React from "react";

import LinedHeading from "@/components/text/lined-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LogInPage = () => {
  return (
    <div>
      <Button variant={"icon"} title="Back"><ArrowLeft /><span className="font-semibold">BACK</span></Button>
      <div className="flex flex-col px-4">
        <div className="mb-2">
          <LinedHeading>Sign in or create an account</LinedHeading>
        </div>
        {/* Sign in form */}
        <form action="" className="flex flex-col">
          <div className="grid w-full items-center mb-4">
            <Label htmlFor="email">Email address</Label>
            <Input id="email" type="email" className="w-full my-2" />
          </div>
          <Button size={"xlg"} variant={"highlight"} type="submit">
            CONTINUE
          </Button>
        </form>
      </div>
    </div>
  );
};
export default LogInPage;
