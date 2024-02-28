"use client"

import { setCookie } from "cookies-next"
import { Button } from "@/components/admin/Button"
import { InputField } from "@/components/admin/InputField"
import { useState } from "react"
import { useRouter } from "next/navigation"

import * as api from "@/api/admin"



const Page = () => {
    const router = useRouter()

    const [passwordInput, setPasswordInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [warning, setWarning] = useState('')

    const handleLoginButton = async () => {
        if (passwordInput) {
            setWarning('')
            setLoading(true)
            const token = await api.Login(passwordInput)
            setLoading(false)

            if (!token) {
                setWarning('Acesso Negado 👎')
            } else {
                setCookie('token', token)
                router.push('/admin')
            }
        }

    }

    return (
        <div className=" text-center py-4">
            <p className=" text-lg">Informe a senha de acesso.</p>
            <div className="mx-auto max-w-lg">
                <InputField
                    type="password"
                    value={passwordInput}
                    onChange={e => setPasswordInput(e.target.value)}
                    placeholder="Informe a Senha!"
                    disabled={loading}
                />
                <Button
                    value={loading ? 'Carregando ...' : 'Entrar'}
                    onClick={handleLoginButton}
                    disabled={loading}
                />
                {warning &&
                    <div className="border border-dashed border-gray-400 p-3">{warning}</div>
                }
            </div>
        </div>
    )
}
export default Page