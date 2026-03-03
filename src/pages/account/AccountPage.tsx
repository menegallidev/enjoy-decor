import { AlertCircle, CheckCircle2, ShieldCheck } from 'lucide-react'
import { useMemo, useState, type FormEvent } from 'react'
import type { AuthUser, AuthVerifyResult, FeedbackType } from '../../types'

type AccountPageProps = {
  isAuthenticated: boolean
  currentUser: AuthUser | null
  onRegisterAccount: (payload: {
    firstName: string
    lastName: string
    email: string
    phone: string
    password: string
  }) => { ok: boolean; message: string }
  onLoginAccount: (payload: { email: string; password: string }) => { ok: boolean; message: string }
  onUpdateAccountData: (payload: {
    firstName: string
    lastName: string
    email: string
    phone: string
  }) => { ok: boolean; message: string }
  onVerifyCurrentUserData: () => AuthVerifyResult
  onLogoutAccount: () => void
}

type LoginFormData = {
  email: string
  password: string
}

type RegisterFormData = {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
}

type ProfileFormData = {
  firstName: string
  lastName: string
  email: string
  phone: string
}

function isValidEmail(value: string) {
  return /^\S+@\S+\.\S+$/.test(value)
}

function isValidPhone(value: string) {
  return value.replace(/\D/g, '').length >= 10
}

export function AccountPage({
  isAuthenticated,
  currentUser,
  onRegisterAccount,
  onLoginAccount,
  onUpdateAccountData,
  onVerifyCurrentUserData,
  onLogoutAccount,
}: AccountPageProps) {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
  const [loginForm, setLoginForm] = useState<LoginFormData>({ email: '', password: '' })
  const [registerForm, setRegisterForm] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const [profileDraft, setProfileDraft] = useState<Partial<ProfileFormData>>({})
  const [feedbackMessage, setFeedbackMessage] = useState<string>('')
  const [feedbackType, setFeedbackType] = useState<FeedbackType>('info')
  const [verificationResult, setVerificationResult] = useState<AuthVerifyResult | null>(null)

  const profileForm = useMemo<ProfileFormData>(
    () => ({
      firstName: profileDraft.firstName ?? currentUser?.firstName ?? '',
      lastName: profileDraft.lastName ?? currentUser?.lastName ?? '',
      email: profileDraft.email ?? currentUser?.email ?? '',
      phone: profileDraft.phone ?? currentUser?.phone ?? '',
    }),
    [profileDraft, currentUser],
  )

  const verificationStatusText = useMemo(() => {
    if (!verificationResult) return 'Dados ainda não verificados'
    return verificationResult.valid ? 'Dados da conta verificados' : 'Ajuste os dados para concluir a verificação'
  }, [verificationResult])

  const submitLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!loginForm.email.trim() || !loginForm.password.trim()) {
      setFeedbackType('error')
      setFeedbackMessage('Preencha e-mail e senha para entrar.')
      return
    }

    const result = onLoginAccount({
      email: loginForm.email,
      password: loginForm.password,
    })

    setFeedbackType(result.ok ? 'success' : 'error')
    setFeedbackMessage(result.message)
    if (result.ok) {
      setLoginForm({ email: '', password: '' })
      setVerificationResult(null)
      setProfileDraft({})
    }
  }

  const submitRegister = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (
      !registerForm.firstName.trim() ||
      !registerForm.lastName.trim() ||
      !registerForm.email.trim() ||
      !registerForm.phone.trim() ||
      !registerForm.password ||
      !registerForm.confirmPassword
    ) {
      setFeedbackType('error')
      setFeedbackMessage('Preencha todos os campos para criar a conta.')
      return
    }

    if (!isValidEmail(registerForm.email)) {
      setFeedbackType('error')
      setFeedbackMessage('Informe um e-mail válido.')
      return
    }

    if (!isValidPhone(registerForm.phone)) {
      setFeedbackType('error')
      setFeedbackMessage('Informe um telefone válido com DDD.')
      return
    }

    if (registerForm.password.length < 6) {
      setFeedbackType('error')
      setFeedbackMessage('A senha deve ter no mínimo 6 caracteres.')
      return
    }

    if (registerForm.password !== registerForm.confirmPassword) {
      setFeedbackType('error')
      setFeedbackMessage('As senhas não conferem.')
      return
    }

    const result = onRegisterAccount({
      firstName: registerForm.firstName,
      lastName: registerForm.lastName,
      email: registerForm.email,
      phone: registerForm.phone,
      password: registerForm.password,
    })

    setFeedbackType(result.ok ? 'success' : 'error')
    setFeedbackMessage(result.message)

    if (result.ok) {
      setRegisterForm({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
      })
      setVerificationResult(null)
      setProfileDraft({})
    }
  }

  const submitProfile = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!profileForm.firstName.trim() || !profileForm.lastName.trim() || !profileForm.email.trim() || !profileForm.phone.trim()) {
      setFeedbackType('error')
      setFeedbackMessage('Preencha todos os campos obrigatórios do perfil.')
      return
    }

    if (!isValidEmail(profileForm.email)) {
      setFeedbackType('error')
      setFeedbackMessage('Informe um e-mail válido.')
      return
    }

    if (!isValidPhone(profileForm.phone)) {
      setFeedbackType('error')
      setFeedbackMessage('Informe um telefone válido com DDD.')
      return
    }

    const result = onUpdateAccountData(profileForm)
    setFeedbackType(result.ok ? 'success' : 'error')
    setFeedbackMessage(result.message)
  }

  const runVerification = () => {
    const result = onVerifyCurrentUserData()
    setVerificationResult(result)
    setFeedbackType(result.valid ? 'success' : 'info')
    setFeedbackMessage(result.valid ? 'Conta validada com sucesso.' : 'Encontramos pontos para revisar nos seus dados.')
  }

  const logout = () => {
    onLogoutAccount()
    setFeedbackType('info')
    setFeedbackMessage('Você saiu da conta.')
    setVerificationResult(null)
    setProfileDraft({})
  }

  return (
    <main className="main-content account-page">
      <section className="container reveal delay-1">
        <h1>Minha Conta</h1>

        {!isAuthenticated ? (
          <section className="account-auth-layout">
            <article className="account-auth-card">
              <div className="account-auth-tabs">
                <button
                  type="button"
                  className={authMode === 'login' ? 'is-active' : ''}
                  onClick={() => setAuthMode('login')}
                >
                  Entrar
                </button>
                <button
                  type="button"
                  className={authMode === 'register' ? 'is-active' : ''}
                  onClick={() => setAuthMode('register')}
                >
                  Criar conta
                </button>
              </div>

              {authMode === 'login' ? (
                <form className="account-form" onSubmit={submitLogin}>
                  <label htmlFor="login-email">E-mail</label>
                  <input
                    id="login-email"
                    type="email"
                    placeholder="Digite seu e-mail"
                    value={loginForm.email}
                    onChange={(event) => setLoginForm((current) => ({ ...current, email: event.target.value }))}
                    autoComplete="email"
                  />

                  <label htmlFor="login-password">Senha</label>
                  <input
                    id="login-password"
                    type="password"
                    placeholder="Digite sua senha"
                    value={loginForm.password}
                    onChange={(event) => setLoginForm((current) => ({ ...current, password: event.target.value }))}
                    autoComplete="current-password"
                  />

                  <button type="submit" className="account-primary-button">
                    Entrar na conta
                  </button>
                </form>
              ) : (
                <form className="account-form" onSubmit={submitRegister}>
                  <div className="account-grid-two">
                    <div>
                      <label htmlFor="register-first-name">Nome</label>
                      <input
                        id="register-first-name"
                        type="text"
                        placeholder="Nome"
                        value={registerForm.firstName}
                        onChange={(event) => setRegisterForm((current) => ({ ...current, firstName: event.target.value }))}
                        autoComplete="given-name"
                      />
                    </div>
                    <div>
                      <label htmlFor="register-last-name">Sobrenome</label>
                      <input
                        id="register-last-name"
                        type="text"
                        placeholder="Sobrenome"
                        value={registerForm.lastName}
                        onChange={(event) => setRegisterForm((current) => ({ ...current, lastName: event.target.value }))}
                        autoComplete="family-name"
                      />
                    </div>
                  </div>

                  <label htmlFor="register-email">E-mail</label>
                  <input
                    id="register-email"
                    type="email"
                    placeholder="Digite seu e-mail"
                    value={registerForm.email}
                    onChange={(event) => setRegisterForm((current) => ({ ...current, email: event.target.value }))}
                    autoComplete="email"
                  />

                  <label htmlFor="register-phone">Telefone</label>
                  <input
                    id="register-phone"
                    type="tel"
                    placeholder="(00) 00000-0000"
                    value={registerForm.phone}
                    onChange={(event) => setRegisterForm((current) => ({ ...current, phone: event.target.value }))}
                    autoComplete="tel"
                  />

                  <div className="account-grid-two">
                    <div>
                      <label htmlFor="register-password">Senha</label>
                      <input
                        id="register-password"
                        type="password"
                        placeholder="Mínimo de 6 caracteres"
                        value={registerForm.password}
                        onChange={(event) => setRegisterForm((current) => ({ ...current, password: event.target.value }))}
                        autoComplete="new-password"
                      />
                    </div>
                    <div>
                      <label htmlFor="register-confirm-password">Confirmar senha</label>
                      <input
                        id="register-confirm-password"
                        type="password"
                        placeholder="Repita a senha"
                        value={registerForm.confirmPassword}
                        onChange={(event) =>
                          setRegisterForm((current) => ({ ...current, confirmPassword: event.target.value }))
                        }
                        autoComplete="new-password"
                      />
                    </div>
                  </div>

                  <button type="submit" className="account-primary-button">
                    Criar conta
                  </button>
                </form>
              )}
            </article>

            <article className="account-side-card">
              <span className="account-side-icon" aria-hidden="true">
                <ShieldCheck size={20} strokeWidth={2.2} />
              </span>
              <h2>Conta Enjoy</h2>
              <p>Crie sua conta para acompanhar seus dados e acelerar futuras compras.</p>
              <ul>
                <li>Cadastro rápido e simples</li>
                <li>Dados salvos no navegador</li>
                <li>Verificação de informações da conta</li>
              </ul>
            </article>
          </section>
        ) : (
          <section className="account-dashboard-layout">
            <article className="account-profile-card">
              <div className="account-profile-head">
                <h2>Dados da conta</h2>
                <button type="button" className="account-secondary-button" onClick={logout}>
                  Sair da conta
                </button>
              </div>

              <form className="account-form" onSubmit={submitProfile}>
                <div className="account-grid-two">
                  <div>
                    <label htmlFor="profile-first-name">Nome</label>
                    <input
                      id="profile-first-name"
                      type="text"
                      value={profileForm.firstName}
                      onChange={(event) => setProfileDraft((current) => ({ ...current, firstName: event.target.value }))}
                      autoComplete="given-name"
                    />
                  </div>
                  <div>
                    <label htmlFor="profile-last-name">Sobrenome</label>
                    <input
                      id="profile-last-name"
                      type="text"
                      value={profileForm.lastName}
                      onChange={(event) => setProfileDraft((current) => ({ ...current, lastName: event.target.value }))}
                      autoComplete="family-name"
                    />
                  </div>
                </div>

                <label htmlFor="profile-email">E-mail</label>
                <input
                  id="profile-email"
                  type="email"
                  value={profileForm.email}
                  onChange={(event) => setProfileDraft((current) => ({ ...current, email: event.target.value }))}
                  autoComplete="email"
                />

                <label htmlFor="profile-phone">Telefone</label>
                <input
                  id="profile-phone"
                  type="tel"
                  value={profileForm.phone}
                  onChange={(event) => setProfileDraft((current) => ({ ...current, phone: event.target.value }))}
                  autoComplete="tel"
                />

                <button type="submit" className="account-primary-button">
                  Salvar dados
                </button>
              </form>
            </article>

            <aside className="account-verify-card">
              <h2>Verificação da conta</h2>
              <p>{verificationStatusText}</p>
              <button type="button" className="account-primary-button" onClick={runVerification}>
                Verificar dados da conta
              </button>

              {verificationResult ? (
                <ul className="account-checks-list">
                  {verificationResult.checks.map((check) => (
                    <li key={check.label} className={check.valid ? 'is-valid' : 'is-invalid'}>
                      {check.valid ? (
                        <CheckCircle2 size={16} strokeWidth={2.2} aria-hidden="true" />
                      ) : (
                        <AlertCircle size={16} strokeWidth={2.2} aria-hidden="true" />
                      )}
                      <span>{check.label}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </aside>
          </section>
        )}

        {feedbackMessage ? <p className={`account-feedback ${feedbackType}`}>{feedbackMessage}</p> : null}
      </section>
    </main>
  )
}
