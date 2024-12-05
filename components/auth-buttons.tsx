'use client';

import { useAuth } from "@/context/auth";
import Link from "next/link";
import { DropdownMenu, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import Image from "next/image";
import { DropdownMenuContent, DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";

function AuthButtons() {
    const auth = useAuth();
    return (
        <div>
            {!!auth?.currentUser &&
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Avatar>
                            {
                                !!auth.currentUser.photoURL &&
                                <Image src={auth.currentUser.photoURL} alt={`${auth.currentUser.displayName} avatar`} height={70} width={70} />
                            }
                            <AvatarFallback>
                                {(auth.currentUser.displayName || auth.currentUser.email)?.[0]}
                            </AvatarFallback>

                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-sky-950 p-5">
                        <DropdownMenuLabel>
                            <div>{auth.currentUser.displayName}</div>
                            <div className="font-normal text-xs">{auth.currentUser.email}</div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href="/account">My Account</Link>
                        </DropdownMenuItem>
                        {
                            !!auth.customClaims?.admin && (
                                <DropdownMenuItem asChild>
                                    <Link href="/admin-dashboard">Admin Dashboard</Link>
                                </DropdownMenuItem>
                            )
                        }
                        {
                            !auth.customClaims?.admin && (
                                <DropdownMenuItem asChild>
                                    <Link href="/account/my-favorites">My Favorites</Link>
                                </DropdownMenuItem>
                            )
                        }
                        <DropdownMenuItem onClick={async () => {
                            await auth.logout();
                        }}>
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            }
            {
                !auth?.currentUser &&
                <div className="flex gap-2 items-center">
                    <Link href="/login" className="uppercase tracking-widest hover:underline">Login</Link>
                    <div className="h-8 w-[1px] bg-white/50"></div>
                    <Link href="/sign-up" className="uppercase tracking-widest hover:underline">Sign Up</Link>
                </div>
            }
        </div>
    );
}

export default AuthButtons;