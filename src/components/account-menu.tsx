import { ChevronDown, LogOutIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { GetUserProfile } from "@/api/get-profile";

export function AccountMenu() {
  const { signOut } = useAuth();

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: GetUserProfile,
  });

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex select-none items-center gap-2 truncate"
          >
            {isLoading ? (
              <Skeleton className="h-5 w-24" />
            ) : (
              <p className="truncate max-w-28 md:max-w-32">
                {capitalizeFirstLetter(profile?.name || "")}
              </p>
            )}
            <ChevronDown className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem className="flex gap-2">
              <p className="truncate">{profile?.email}</p>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={signOut}
              className="flex gap-2 cursor-pointer group"
            >
              <LogOutIcon className="group-hover:text-red-500 " />
              Sair
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
