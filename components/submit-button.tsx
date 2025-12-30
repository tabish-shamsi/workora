import { ReactNode } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

export default function SubmitButton({
  children,
  className,
  pending,
}: {
  children: ReactNode;
  className?: string;
  pending: boolean;
}) {
  return (
    <Button type="submit" disabled={pending} className={className}>
      {children}
      {pending && <Loader2 className="animate-spin"></Loader2>}
    </Button>
  );
}
