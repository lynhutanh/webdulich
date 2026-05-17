import '../style/globals.css';

import React, { useEffect, Suspense, useCallback } from 'react';
import { useRouter } from 'next/router';
import { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { SWRConfig } from 'swr';
import { useCurrentUserStore } from 'src/stores';
import dynamic from 'next/dynamic';
import DefaultLayout from '@layouts/DefaultLayout';
import SiteSettingsHead from '@components/SiteSettingsHead';
import { authService } from '@services/auth.service';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const nextI18NextConfig = require('../next-i18next.config.js');

const Toasty = dynamic(() => import('src/components/common/toasty'), {
  ssr: false,
  loading: () => null
});

// Travel pages that don't require auth
const TRAVEL_PAGES = ['/', '/tours', '/blog', '/wishlist', '/profile', '/booking', '/admin'];
const isTravelPage = (pathname: string) =>
  TRAVEL_PAGES.some((p) => pathname === p || pathname.startsWith(p + '/') || pathname.startsWith(p + '?'));

function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { setCurrentUser, clearCurrentUser, setLoading } = useCurrentUserStore();

  const checkAuth = useCallback(async () => {
    const isAuthPage = router.pathname.startsWith('/auth');
    const isTravelRoute = isTravelPage(router.pathname);

    // Travel pages are publicly accessible — skip auth check
    if (isTravelRoute) {
      setLoading(false);
      return;
    }

    const token = authService.getToken();

    if (!token) {
      clearCurrentUser();
      if (!isAuthPage) {
        router.push('/auth/login');
      }
      return;
    }

    try {
      const response = await authService.me();
      if (response?.data) {
        setCurrentUser(response.data);
      } else {
        clearCurrentUser();
        if (!isAuthPage) {
          router.push('/auth/login');
        }
      }
    } catch {
      clearCurrentUser();
      if (!isAuthPage) {
        router.push('/auth/login');
      }
    }
  }, [setCurrentUser, clearCurrentUser, router, setLoading]);

  useEffect(() => {
    setLoading(true);
    checkAuth();
  }, [checkAuth, setLoading]);

  return <>{children}</>;
}

// Pages that manage their own layout (travel pages + auth pages)
const SELF_LAYOUT_PAGES = ['/', '/tours', '/blog', '/wishlist', '/profile', '/booking', '/admin', '/auth'];
const isSelfLayout = (pathname: string) =>
  SELF_LAYOUT_PAGES.some((p) => pathname === p || pathname.startsWith(p + '/') || pathname.startsWith(p + '?'));

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isAuthPage = router.pathname.startsWith('/auth');
  const selfLayout = isSelfLayout(router.pathname);

  return (
    <SWRConfig
      value={{
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        shouldRetryOnError: true
      }}
    >
      <AuthProvider>
        <SiteSettingsHead />
        <Toasty />
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
            </div>
          }
        >
          {selfLayout ? (
            <Component {...pageProps} />
          ) : (
            <DefaultLayout>
              <Component {...pageProps} />
            </DefaultLayout>
          )}
        </Suspense>
      </AuthProvider>
    </SWRConfig>
  );
}

export default appWithTranslation(App, nextI18NextConfig);
