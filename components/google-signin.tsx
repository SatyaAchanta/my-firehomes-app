'use client';

import { Button } from "./ui/button";
import { useAuth } from "@/context/auth";

function GoogleSignInButton() {
    const auth = useAuth();
    return (
        <Button onClick={() => { auth?.loginWithGoogle(); }} className="w-full">
            Continue with Google
        </Button>
    );
}

export default GoogleSignInButton;