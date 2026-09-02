"use client"

import { Button } from "@/components/ui/button";
import { Card,
    CardDescription,
     CardHeader,
      CardTitle,
       CardContent,
       CardFooter
     }
        from "@/components/ui/card";
 import { signUp } from "@/lib/auth/auth-client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";       

export default function SignIn(){
    return <div  className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-white p-4">
        <Card className="w-full max-w-md border-gray-200 shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-black">
            Sign In
          </CardTitle>
          <CardDescription className="text-gray-600">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <form>
            <CardContent>
           
             <div className="space-y-2">
                   <Label htmlFor="email" className="text-gray-700"> 
                   Email
                   </Label>
                   <Input id="email"
                    type="email"
                     placeholder="john@example.com" 
                    required
                        className="border-gray-300 focus:border-primary focus:ring-primary"
                     />
                </div>
                 <div>
                   <Label htmlFor="password" className="text-gray-700">
                   Password
                   </Label>
                   <Input id="password" 
                   type="password" 
                    placeholder="John Doe"          
                 required 
                  minLength= {8}
                       className="border-gray-300 focus:border-primary focus:ring-primary"

                    />
                </div>
            </CardContent>
            <CardFooter  className="flex flex-col space-y-4">
                <Button type="submit"
                    className="w-full bg-primary hover:bg-primary/90">
          
                 Sign In
                </Button>
                <p>Don't have an account? <Link href="/sign-up"
                   className="font-medium text-primary hover:underline"
                >
                    Sign Up
                    </Link> 
                </p>
            </CardFooter>
        </form>
         </Card>
    </div>;  
}