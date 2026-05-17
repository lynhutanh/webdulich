import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, Compass } from 'lucide-react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetStaticProps } from 'next';
import { toast } from '@lib/toast';
import { authService } from '@services/auth.service';
import { settingService } from '@services/setting.service';
import { useCurrentUserStore } from 'src/stores';
import { AuthSplitLayout, AuthInput, GoogleSignInButton } from '@components/auth';
import type { PublicAuthSettings } from '@services/setting.service';

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'vi', ['common']))
  }
});

export default function LoginPage() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const setCurrentUser = useCurrentUserStore((state) => state.setCurrentUser);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [authSettings, setAuthSettings] = useState<PublicAuthSettings | null>(null);
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: ''
  });

  useEffect(() => {
    settingService.getPublicAuth().then(setAuthSettings).catch(() => setAuthSettings(null));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const value = formData.emailOrUsername.trim();
    const isEmail = value.includes('@');
    const payload = isEmail
      ? { email: value, password: formData.password }
      : { username: value, password: formData.password };

    try {
      const data = await authService.login(payload);
      if (data?.token) {
        setCurrentUser({
          _id: data._id,
          name: data.name,
          email: data.email,
          username: data.username,
          role: data.role,
          status: 'active',
          createdAt: '',
          updatedAt: ''
        });
        toast.success('Đăng nhập thành công');
        router.push('/home');
      } else {
        toast.error('Email/username hoặc mật khẩu không đúng');
      }
    } catch {
      toast.error('Email/username hoặc mật khẩu không đúng');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthSplitLayout>
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight font-heading">
          {t('auth.login')}
        </h1>
        <p className="mt-1.5 text-sm text-white/40 font-body">
          {t('auth.loginSubtitle')}
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <AuthInput
            id="login-email"
            label={t('auth.email')}
            type="text"
            autoComplete="username"
            placeholder={t('auth.emailPlaceholder')}
            value={formData.emailOrUsername}
            onChange={(e) =>
              setFormData({ ...formData, emailOrUsername: e.target.value })
            }
            leftIcon={<Mail className="w-5 h-5" />}
            required
          />

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="login-password" className="block text-sm font-medium text-white/60">
                {t('auth.password')}
              </label>
              <Link href="/auth/forgot-password" className="text-sm text-cyan-400 hover:text-cyan-300 font-medium">
                {t('auth.forgotPassword')}
              </Link>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25">
                <Lock className="w-5 h-5" />
              </span>
              <input id="login-password" type={showPassword ? 'text' : 'password'} autoComplete="current-password"
                placeholder={t('auth.passwordPlaceholder')} value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-11 pr-11 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/25 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10 outline-none transition duration-200"
                required />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/50"
                aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}>
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-lg hover:shadow-cyan-500/25 focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-[#030d1f] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? t('auth.loggingIn') : t('auth.loginButton')}
          </button>
        </form>

        {authSettings?.enable_google_login && authSettings?.google_oauth_client_id && (
          <>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/8" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-[#030d1f] px-3 text-xs font-mono uppercase tracking-wider text-white/25">
                  {t('auth.or')}
                </span>
              </div>
            </div>

            <GoogleSignInButton
              clientId={authSettings.google_oauth_client_id}
              label={t('auth.loginWithGoogle')}
              disabled={googleLoading}
              onSuccess={async (idToken) => {
                setGoogleLoading(true);
                try {
                  const data = await authService.loginWithGoogle(idToken);
                  if (data?.token) {
                    setCurrentUser({
                      _id: data._id,
                      name: data.name,
                      email: data.email,
                      username: data.username,
                      role: data.role,
                      status: 'active',
                      createdAt: '',
                      updatedAt: ''
                    });
                    toast.success('Đăng nhập thành công');
                    router.push('/home');
                  }
                } catch (e) {
                  toast.error(e instanceof Error ? e.message : 'Đăng nhập Google thất bại');
                } finally {
                  setGoogleLoading(false);
                }
              }}
              onError={() => toast.error('Không thể tải Google Sign-In')}
            />
          </>
        )}

        <p className="mt-8 text-center text-sm text-white/40">
          {t('auth.noAccount')}{' '}
          <Link href="/auth/register" className="font-medium text-cyan-400 hover:text-cyan-300">
            {t('auth.registerNow')}
          </Link>
        </p>
      </div>
    </AuthSplitLayout>
  );
}
