import { type FormEvent, useState } from "react"

import { FaGithub } from "react-icons/fa"

import { useAuthActions } from "@convex-dev/auth/react";

import { Card, CardDescription, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SignInFlow } from "../types"

interface SignInCardProps {
    setState: (state: SignInFlow) => void;
}
export const SignInCard = ({ setState }: SignInCardProps) => {
    const { signIn } = useAuthActions()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleProviderSignIn = (value: "github") => {
        signIn(value)
    }

    const handleEmailSignIn = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        signIn("password", { email, password, flow: "signIn" })
    }


    return (
        <Card className="w-full h-full p-8">
            <CardHeader className="px-0 pt-0">
                <CardTitle>
                    Login to continue
                </CardTitle>
                <CardDescription>
                    Use your eamil or another service to coninue
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 px-0 pb-0">
                <form className="space-y-2.5" onSubmit={handleEmailSignIn}>
                    <Input
                        disabled={false}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        type="email"
                        required
                    />
                    <Input
                        disabled={false}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        type="password"
                        required
                    />
                    <Button type="submit" className="w-full" size="lg" disabled={false}>
                        Continue
                    </Button>
                </form>
                <Separator />
                <div className="flex flex-col gap-y-2.5">
                    <Button
                    disabled={false}
                    onClick={() => handleProviderSignIn("github")}
                    variant="outline"
                    size="lg"
                    className="w-full relative"
                    >
                        <FaGithub className="size-5 absolute left-2.5 top-2.3" />
                        Continue with Github
                    </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                    Don&apos;t have an account? <span onClick={() => setState("signUp")} className="text-sky-700 hover:underline cursor-pointer">Sign up</span>
                </p>
            </CardContent>
        </Card>

    )
}

