"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

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
})

type AuthFormValues = z.infer<typeof authSchema>

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
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
      router.push("/")
      router.refresh()
    } catch (err: any) {
      setError(err.message || "Erreur lors de l'inscription")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">SevenArtList</CardTitle>
          <CardDescription>
            Gérez vos listes de films et séries en solo ou à deux.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 rounded bg-destructive/15 p-3 text-sm text-destructive border border-destructive/20">
              {error}
            </div>
          )}
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Se connecter</TabsTrigger>
              <TabsTrigger value="signup">S'inscrire</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form onSubmit={handleSubmit(onLogin)} className="space-y-4 pt-4">
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input 
                    type="email" 
                    placeholder="exemple@mail.com" 
                    {...register("email")}
                    aria-invalid={!!errors.email}
                  />
                  <FieldError errors={[errors.email]} />
                </Field>
                <Field>
                  <FieldLabel>Mot de passe</FieldLabel>
                  <Input 
                    type="password" 
                    {...register("password")}
                    aria-invalid={!!errors.password}
                  />
                  <FieldError errors={[errors.password]} />
                </Field>
                <Button type="submit" className="w-full mt-2" disabled={loading}>
                  {loading ? "Chargement..." : "Se connecter"}
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="signup">
              <form onSubmit={handleSubmit(onSignUp)} className="space-y-4 pt-4">
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input 
                    type="email" 
                    placeholder="exemple@mail.com" 
                    {...register("email")}
                    aria-invalid={!!errors.email}
                  />
                  <FieldError errors={[errors.email]} />
                </Field>
                <Field>
                  <FieldLabel>Mot de passe</FieldLabel>
                  <Input 
                    type="password" 
                    {...register("password")}
                    aria-invalid={!!errors.password}
                  />
                  <FieldError errors={[errors.password]} />
                </Field>
                <Button type="submit" className="w-full mt-2" disabled={loading}>
                  {loading ? "Chargement..." : "S'inscrire"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} SevenArtList
        </CardFooter>
      </Card>
    </div>
  )
}
