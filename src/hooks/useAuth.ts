import { useEffect, useMemo, useState } from 'react'
import type { AuthStoredUser, AuthUser, AuthVerifyResult } from '../types'

type RegisterPayload = {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
}

type LoginPayload = {
  email: string
  password: string
}

type UpdatePayload = {
  firstName: string
  lastName: string
  email: string
  phone: string
}

type AuthActionResult = {
  ok: boolean
  message: string
}

type UseAuthResult = {
  isAuthenticated: boolean
  currentUser: AuthUser | null
  registerAccount: (payload: RegisterPayload) => AuthActionResult
  loginAccount: (payload: LoginPayload) => AuthActionResult
  updateAccountData: (payload: UpdatePayload) => AuthActionResult
  verifyCurrentUserData: () => AuthVerifyResult
  logoutAccount: () => void
}

const USERS_STORAGE_KEY = 'enjoy_auth_users_v1'
const SESSION_STORAGE_KEY = 'enjoy_auth_session_v1'

function normalizeEmail(value: string) {
  return value.trim().toLowerCase()
}

function normalizePhone(value: string) {
  return value.replace(/\D/g, '')
}

function generateId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function loadUsers(): AuthStoredUser[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = window.localStorage.getItem(USERS_STORAGE_KEY)
    if (!stored) return []
    const parsed = JSON.parse(stored)
    return Array.isArray(parsed) ? (parsed as AuthStoredUser[]) : []
  } catch {
    return []
  }
}

function loadSessionUserId(): string | null {
  if (typeof window === 'undefined') return null
  return window.localStorage.getItem(SESSION_STORAGE_KEY)
}

function toPublicUser(storedUser: AuthStoredUser): AuthUser {
  return {
    id: storedUser.id,
    firstName: storedUser.firstName,
    lastName: storedUser.lastName,
    email: storedUser.email,
    phone: storedUser.phone,
    createdAt: storedUser.createdAt,
    updatedAt: storedUser.updatedAt,
  }
}

export function useAuth(): UseAuthResult {
  const [users, setUsers] = useState<AuthStoredUser[]>(() => loadUsers())
  const [sessionUserId, setSessionUserId] = useState<string | null>(() => loadSessionUserId())

  useEffect(() => {
    window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
  }, [users])

  useEffect(() => {
    if (!sessionUserId) {
      window.localStorage.removeItem(SESSION_STORAGE_KEY)
      return
    }
    window.localStorage.setItem(SESSION_STORAGE_KEY, sessionUserId)
  }, [sessionUserId])

  const currentStoredUser = useMemo(
    () => users.find((user) => user.id === sessionUserId) ?? null,
    [users, sessionUserId],
  )

  const currentUser = useMemo(
    () => (currentStoredUser ? toPublicUser(currentStoredUser) : null),
    [currentStoredUser],
  )

  const registerAccount = (payload: RegisterPayload): AuthActionResult => {
    const normalizedEmail = normalizeEmail(payload.email)

    const alreadyExists = users.some((user) => normalizeEmail(user.email) === normalizedEmail)
    if (alreadyExists) {
      return { ok: false, message: 'Já existe uma conta com este e-mail.' }
    }

    const now = new Date().toISOString()
    const newUser: AuthStoredUser = {
      id: generateId(),
      firstName: payload.firstName.trim(),
      lastName: payload.lastName.trim(),
      email: normalizedEmail,
      phone: payload.phone.trim(),
      password: payload.password,
      createdAt: now,
      updatedAt: now,
    }

    setUsers((current) => [...current, newUser])
    setSessionUserId(newUser.id)

    return { ok: true, message: 'Conta criada com sucesso.' }
  }

  const loginAccount = (payload: LoginPayload): AuthActionResult => {
    const normalizedEmail = normalizeEmail(payload.email)
    const user = users.find((item) => normalizeEmail(item.email) === normalizedEmail)

    if (!user || user.password !== payload.password) {
      return { ok: false, message: 'E-mail ou senha inválidos.' }
    }

    setSessionUserId(user.id)
    return { ok: true, message: 'Login realizado com sucesso.' }
  }

  const updateAccountData = (payload: UpdatePayload): AuthActionResult => {
    if (!currentStoredUser) {
      return { ok: false, message: 'Nenhuma conta conectada.' }
    }

    const normalizedEmail = normalizeEmail(payload.email)
    const emailInUse = users.some(
      (user) => user.id !== currentStoredUser.id && normalizeEmail(user.email) === normalizedEmail,
    )

    if (emailInUse) {
      return { ok: false, message: 'Este e-mail já está em uso por outra conta.' }
    }

    setUsers((current) =>
      current.map((user) =>
        user.id === currentStoredUser.id
          ? {
              ...user,
              firstName: payload.firstName.trim(),
              lastName: payload.lastName.trim(),
              email: normalizedEmail,
              phone: payload.phone.trim(),
              updatedAt: new Date().toISOString(),
            }
          : user,
      ),
    )

    return { ok: true, message: 'Dados da conta atualizados.' }
  }

  const verifyCurrentUserData = (): AuthVerifyResult => {
    if (!currentStoredUser) {
      return { valid: false, checks: [] }
    }

    const checks = [
      { label: 'Nome informado', valid: currentStoredUser.firstName.trim().length >= 2 },
      { label: 'Sobrenome informado', valid: currentStoredUser.lastName.trim().length >= 2 },
      { label: 'E-mail válido', valid: /^\S+@\S+\.\S+$/.test(currentStoredUser.email) },
      { label: 'Telefone válido', valid: normalizePhone(currentStoredUser.phone).length >= 10 },
      { label: 'Senha com no mínimo 6 caracteres', valid: currentStoredUser.password.length >= 6 },
    ]

    return { valid: checks.every((check) => check.valid), checks }
  }

  const logoutAccount = () => {
    setSessionUserId(null)
  }

  return {
    isAuthenticated: currentUser !== null,
    currentUser,
    registerAccount,
    loginAccount,
    updateAccountData,
    verifyCurrentUserData,
    logoutAccount,
  }
}
