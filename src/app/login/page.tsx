"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Mail, Lock, User, MailCheck, ArrowLeft, Loader2 } from "lucide-react"

import { authService } from "@/services/auth"
import { createClient } from "@/lib/supabase/browser"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field"

const authSchema = z.object({
  email: z.string().email({ message: "Email invalide" }),
  password: z.string().min(6, { message: "Le mot de passe doit faire au moins 6 caractères" }),
  confirmPassword: z.string().optional(),
}).refine((data) => {
  // On ne valide la confirmation que si elle est présente (cas de l'inscription)
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
    reset,
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

  if (isEmailSent) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#030712] p-4 relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-radial-[at_center,_var(--tw-gradient-stops)] from-[#1e1b4b] via-[#030712] to-[#030712] opacity-80" />
        
        <div className="relative z-10 w-full max-w-md animate-in fade-in zoom-in duration-500">
          <Card className="border-indigo-500/20 bg-[#030712]/40 backdrop-blur-xl shadow-2xl shadow-indigo-500/10 rounded-2xl overflow-hidden">
            <CardHeader className="text-center pt-10">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                <MailCheck className="h-8 w-8" />
              </div>
              <CardTitle className="text-3xl font-bold font-cinzel tracking-widest text-white mb-2">Vérifiez vos emails</CardTitle>
              <CardDescription className="text-indigo-200/70 text-lg">
                Un lien de confirmation vous a été envoyé pour activer votre compte SevenArtList.
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-10 text-center">
              <Button 
                variant="ghost" 
                onClick={() => setIsEmailSent(false)}
                className="text-indigo-300 hover:text-white hover:bg-indigo-500/20 transition-all duration-300"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour au login
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#030712] p-4 relative overflow-hidden">
      {/* Background Gradient Layer */}
      <div className="absolute inset-0 bg-radial-[at_center,_var(--tw-gradient-stops)] from-[#1e1b4b] via-[#030712] to-[#030712] opacity-80" />
      
      {/* Decorative stars/glow effect could go here */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px]" />

      <div className="relative z-10 w-full max-w-md animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold font-cinzel tracking-[0.3em] text-white drop-shadow-[0_0_15px_rgba(99,102,241,0.5)] mb-2">
            SevenArt
          </h1>
          <p className="text-indigo-300/60 font-medium tracking-widest uppercase text-xs">
            List • Share • Watch
          </p>
        </div>

        <Card className="border-indigo-500/20 bg-[#030712]/40 backdrop-blur-xl shadow-2xl shadow-indigo-500/20 rounded-2xl overflow-hidden">
          <CardHeader className="text-center pb-2">
            <CardDescription className="text-indigo-200/50">
              Gérez vos listes de films et séries en solo ou à deux.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-6 rounded-lg bg-red-500/10 p-4 text-sm text-red-400 border border-red-500/20 flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
                <div className="h-1.5 w-1.5 rounded-full bg-red-500 shrink-0" />
                {error}
              </div>
            )}
            
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-indigo-950/30 p-1 mb-8 rounded-xl border border-indigo-500/10">
                <TabsTrigger 
                  value="login" 
                  className="rounded-lg py-2.5 data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
                >
                  Se connecter
                </TabsTrigger>
                <TabsTrigger 
                  value="signup"
                  className="rounded-lg py-2.5 data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
                >
                  S'inscrire
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="mt-0 outline-none">
                <form onSubmit={handleSubmit(onLogin)} className="space-y-6">
                  <div className="space-y-4">
                    <Field>
                      <FieldLabel className="text-indigo-200/70 ml-1">Email</FieldLabel>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-indigo-400/50" />
                        <Input 
                          type="email" 
                          placeholder="exemple@mail.com" 
                          className="pl-10 h-12 bg-indigo-950/20 border-indigo-500/20 focus:border-indigo-500/50 focus:ring-indigo-500/20 transition-all text-indigo-50"
                          {...register("email")}
                        />
                      </div>
                      <FieldError errors={[errors.email]} />
                    </Field>
                    <Field>
                      <FieldLabel className="text-indigo-200/70 ml-1">Mot de passe</FieldLabel>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-indigo-400/50" />
                        <Input 
                          type="password" 
                          placeholder="••••••••"
                          className="pl-10 h-12 bg-indigo-950/20 border-indigo-500/20 focus:border-indigo-500/50 focus:ring-indigo-500/20 transition-all text-indigo-50"
                          {...register("password")}
                        />
                      </div>
                      <FieldError errors={[errors.password]} />
                    </Field>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full h-12 mt-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20 active:scale-[0.98] transition-all disabled:opacity-70" 
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      "Se connecter"
                    )}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup" className="mt-0 outline-none">
                <form onSubmit={handleSubmit(onSignUp)} className="space-y-6">
                  <div className="space-y-4">
                    <Field>
                      <FieldLabel className="text-indigo-200/70 ml-1">Email</FieldLabel>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-indigo-400/50" />
                        <Input 
                          type="email" 
                          placeholder="exemple@mail.com" 
                          className="pl-10 h-12 bg-indigo-950/20 border-indigo-500/20 focus:border-indigo-500/50 focus:ring-indigo-500/20 transition-all text-indigo-50"
                          {...register("email")}
                        />
                      </div>
                      <FieldError errors={[errors.email]} />
                    </Field>
                    <Field>
                      <FieldLabel className="text-indigo-200/70 ml-1">Mot de passe</FieldLabel>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-indigo-400/50" />
                        <Input 
                          type="password" 
                          placeholder="••••••••"
                          className="pl-10 h-12 bg-indigo-950/20 border-indigo-500/20 focus:border-indigo-500/50 focus:ring-indigo-500/20 transition-all text-indigo-50"
                          {...register("password")}
                        />
                      </div>
                      <FieldError errors={[errors.password]} />
                    </Field>
                    <Field>
                      <FieldLabel className="text-indigo-200/70 ml-1">Confirmer le mot de passe</FieldLabel>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-indigo-400/50" />
                        <Input 
                          type="password" 
                          placeholder="••••••••"
                          className="pl-10 h-12 bg-indigo-950/20 border-indigo-500/20 focus:border-indigo-500/50 focus:ring-indigo-500/20 transition-all text-indigo-50"
                          {...register("confirmPassword")}
                        />
                      </div>
                      <FieldError errors={[errors.confirmPassword]} />
                    </Field>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full h-12 mt-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20 active:scale-[0.98] transition-all disabled:opacity-70" 
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      "S'inscrire"
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-center pb-8 pt-4">
            <p className="text-indigo-200/30 text-xs font-medium tracking-tight">
              © {new Date().getFullYear()} SEVENARTLIST — RÉSERVÉ AUX CINÉPHILES
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
