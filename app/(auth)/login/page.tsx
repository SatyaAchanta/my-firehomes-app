import GoogleSignInButton from "@/components/google-signin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function Login() {
    return (
        <Card>
            <CardHeader >
                <CardTitle className="text-3xl font-bold">Login</CardTitle>
            </CardHeader >
            <CardContent>
                <GoogleSignInButton />
            </CardContent>
        </Card >
    );
}

export default Login;