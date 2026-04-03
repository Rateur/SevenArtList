"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Clapperboard, MailCheck, ArrowLeft, Loader2 } from "lucide-react"

import { authService } from "@/services/auth"
import { createClient } from "@/lib/supabase/browser"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Field,
  FieldError,
} from "@/components/ui/field"

const authSchema = z.object({
  email: z.string().email({ message: "Email invalide" }),
  password: z.string().min(6, { message: "Le mot de passe doit faire au moins 6 caractères" }),
  confirmPassword: z.string().optional(),
}).refine((data) => {
  if (data.confirmPassword !== undefined && data.confirmPassword !== "" && data.password !== data.confirmPassword) {
    return false;
  }
  return true;
}, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

type AuthFormValues = z.infer<typeof authSchema>

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  async function onLogin(values: AuthFormValues) {
    setLoading(true)
    setError(null)
    try {
      await authService.signInWithEmail(supabase, values.email, values.password)
      router.push("/")
      router.refresh()
    } catch (err: any) {
      setError(err.message || "Erreur lors de la connexion")
    } finally {
      setLoading(false)
    }
  }

  async function onSignUp(values: AuthFormValues) {
    setLoading(true)
    setError(null)
    try {
      await authService.signUpWithEmail(supabase, values.email, values.password)
      setIsEmailSent(true)
    } catch (err: any) {
      setError(err.message || "Erreur lors de l'inscription")
    } finally {
      setLoading(false)
    }
  }

  const inputClasses = "bg-zinc-900 border-zinc-800 text-zinc-100 focus-visible:ring-1 focus-visible:ring-zinc-700"
  
  if (isEmailSent) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#000000]">
        <Card className="w-full max-w-[400px] bg-zinc-950 border-zinc-900 shadow-2xl">
          <CardHeader className="text-center pt-8">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 text-white border border-zinc-800">
              <MailCheck className="h-6 w-6" />
            </div>
            <CardTitle className="text-xl font-bold text-white">Vérifiez vos emails</CardTitle>
            <CardDescription className="text-zinc-400">
              Un lien de confirmation vous attend dans votre boîte de réception.
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-8 flex justify-center">
            <Button 
              variant="link" 
              onClick={() => setIsEmailSent(false)}
              className="text-zinc-400 hover:text-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à la connexion
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#000000]">
      <div className="w-full max-w-[400px] flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <Clapperboard className="h-8 w-8 text-white" />
          <h1 className="text-3xl font-cinzel text-white tracking-widest uppercase">
            SevenArtList
          </h1>
        </div>

        <Card className="bg-zinc-950 border-zinc-900 shadow-2xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold tracking-tight text-white">Connexion</CardTitle>
            <CardDescription className="text-zinc-400">
              Entrez vos identifiants pour continuer
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-zinc-900 border border-zinc-800">
                <TabsTrigger value="login">Se connecter</TabsTrigger>
                <TabsTrigger value="signup">S&apos;inscrire</TabsTrigger>
              </TabsList>
              
              <div className="mt-6">
                {error && (
                  <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-md text-sm text-red-400">
                    {error}
                  </div>
                )}

                <TabsContent value="login" className="m-0">
                  <form onSubmit={handleSubmit(onLogin)} className="flex flex-col gap-4">
                    <Field>
                      <Input 
                        type="email" 
                        placeholder="Email" 
                        className={inputClasses}
                        {...register("email")}
                      />
                      <FieldError errors={[errors.email]} />
                    </Field>
                    <Field>
                      <Input 
                        type="password" 
                        placeholder="Mot de passe"
                        className={inputClasses}
                        {...register("password")}
                      />
                      <FieldError errors={[errors.password]} />
                    </Field>
                    <Button 
                      type="submit" 
                      className="w-full bg-white hover:bg-zinc-200 text-black font-semibold mt-2" 
                      disabled={loading}
                    >
                      {loading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        "Continuer"
                      )}
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="signup" className="m-0">
                  <form onSubmit={handleSubmit(onSignUp)} className="flex flex-col gap-4">
                    <Field>
                      <Input 
                        type="email" 
                        placeholder="Email" 
                        className={inputClasses}
                        {...register("email")}
                      />
                      <FieldError errors={[errors.email]} />
                    </Field>
                    <Field>
                      <Input 
                        type="password" 
                        placeholder="Mot de passe"
                        className={inputClasses}
                        {...register("password")}
                      />
                      <FieldError errors={[errors.password]} />
                    </Field>
                    <Field>
                      <Input 
                        type="password" 
                        placeholder="Confirmer le mot de passe"
                        className={inputClasses}
                        {...register("confirmPassword")}
                      />
                      <FieldError errors={[errors.confirmPassword]} />
                    </Field>
                    <Button 
                      type="submit" 
                      className="w-full bg-white hover:bg-zinc-200 text-black font-semibold mt-2" 
                      disabled={loading}
                    >
                      {loading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        "Créer un compte"
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
        
        <p className="text-center text-xs text-zinc-500 uppercase tracking-widest">
          © 2026 SevenArtList
        </p>
      </div>
    </div>
  )
}

