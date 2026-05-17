import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
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

export default function RegisterPage() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const setCurrentUser = useCurrentUserStore((state) => state.setCurrentUser);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [authSettings, setAuthSettings] = useState<PublicAuthSettings | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    settingService.getPublicAuth().then(setAuthSettings).catch(() => setAuthSettings(null));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Mật khẩu xác nhận không khớp');
      return;
    }
    setLoading(true);
    try {
      const data = await authService.register({
        name: formData.name.trim(),
        username: formData.username.trim().toLowerCase(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password
      });
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
        toast.success('Đăng ký thành công');
        router.push('/home');
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Đăng ký thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthSplitLayout>
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight font-heading">
          {t('auth.createAccount')}
        </h1>
        <p className="mt-1.5 text-sm text-white/40 font-body">
          {t('auth.createAccountSubtitle')}
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <AuthInput
            id="reg-name"
            label={t('auth.fullName')}
            type="text"
            autoComplete="name"
            placeholder={t('auth.fullNamePlaceholder')}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            leftIcon={<User className="w-5 h-5" />}
            required
          />

          <AuthInput
            id="reg-username"
            label={t('auth.username')}
            type="text"
            autoComplete="username"
            placeholder={t('auth.usernamePlaceholder')}
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            leftIcon={<User className="w-5 h-5" />}
            minLength={3}
            maxLength={30}
            pattern="^[a-zA-Z0-9_]+$"
            required
          />

          <AuthInput
            id="reg-email"
            label={t('auth.email')}
            type="email"
            autoComplete="email"
            placeholder={t('auth.emailPlaceholder')}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            leftIcon={<Mail className="w-5 h-5" />}
            required
          />

          <div>
            <label
              htmlFor="reg-password"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              {t('auth.password')}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25">
                <Lock className="w-5 h-5" />
              </span>
              <input id="reg-password" type={showPassword ? 'text' : 'password'} autoComplete="new-password"
                placeholder={t('auth.minPassword')} value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-11 pr-11 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/25 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10 outline-none transition duration-200"
                minLength={6} required />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/50"
                aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}>
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="reg-confirm"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              {t('auth.confirmPassword')}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25">
                <Lock className="w-5 h-5" />
              </span>
              <input id="reg-confirm" type={showConfirm ? 'text' : 'password'} autoComplete="new-password"
                placeholder={t('auth.passwordPlaceholder')} value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full pl-11 pr-11 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/25 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10 outline-none transition duration-200"
                minLength={6} required />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/50"
                aria-label={showConfirm ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}>
                {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-lg hover:shadow-cyan-500/25 focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-[#030d1f] transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            {loading ? t('auth.creatingAccount') : t('auth.createAccountButton')}
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
              label={t('auth.signUpWithGoogle')}
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
                    toast.success('Đăng ký thành công');
                    router.push('/home');
                  }
                } catch (e) {
                  toast.error(e instanceof Error ? e.message : 'Đăng ký Google thất bại');
                } finally {
                  setGoogleLoading(false);
                }
              }}
              onError={() => toast.error('Không thể tải Google Sign-In')}
            />
          </>
        )}

        <p className="mt-6 text-center text-sm text-white/40">
          {t('auth.termsPrefix')}{' '}
          <Link href="/terms" className="font-medium text-cyan-400 hover:text-cyan-300">{t('auth.termsOfService')}</Link>{' '}
          {t('auth.and')}{' '}
          <Link href="/privacy" className="font-medium text-cyan-400 hover:text-cyan-300">{t('auth.privacyPolicy')}</Link>.
        </p>
        <p className="mt-6 text-center text-sm text-white/40">
          {t('auth.hasAccount')}{' '}
          <Link href="/auth/login" className="font-medium text-cyan-400 hover:text-cyan-300">{t('auth.login')}</Link>
        </p>
      </div>
    </AuthSplitLayout>
  );
}
