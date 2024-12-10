'use client';

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useAuth } from "@/context/auth";

function GoogleSignInButton() {
    const auth = useAuth();
    const router = useRouter();
    return (
        <Button onClick={async () => { await auth?.loginWithGoogle(); router.refresh(); }} className="w-full">
            Continue with Google
        </Button>
    );
}

export default GoogleSignInButton;