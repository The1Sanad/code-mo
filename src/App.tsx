import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/Layout';
import NotificationContainer from './components/NotificationContainer';
import { lazyLoad, LoadingFallback } from './utils/lazyLoad';

// Lazy load pages and tools to improve performance
const Faq = lazyLoad(() => import('./pages/Faq'));
const NotFound = lazyLoad(() => import('./pages/NotFound'));

// Lazy load all tools
const JsonFormatter = lazyLoad(() => import('./tools/JsonFormatter'));
const Base64Tool = lazyLoad(() => import('./tools/Base64Tool'));
const JwtDebugger = lazyLoad(() => import('./tools/JwtDebugger'));
const RegExpTester = lazyLoad(() => import('./tools/RegExpTester'));
const UrlEncoder = lazyLoad(() => import('./tools/UrlEncoder'));
const HtmlEncoder = lazyLoad(() => import('./tools/HtmlEncoder'));
const BackslashEscape = lazyLoad(() => import('./tools/BackslashEscape'));
const UuidGenerator = lazyLoad(() => import('./tools/UuidGenerator'));
const HtmlPreview = lazyLoad(() => import('./tools/HtmlPreview'));
const HashGenerator = lazyLoad(() => import('./tools/HashGenerator'));
const SqlFormatter = lazyLoad(() => import('./tools/SqlFormatter'));
const StringCaseConverter = lazyLoad(() => import('./tools/StringCaseConverter'));
const CronJobParser = lazyLoad(() => import('./tools/CronJobParser'));
const PhpSerializer = lazyLoad(() => import('./tools/PhpSerializer'));
const TextDiffChecker = lazyLoad(() => import('./tools/TextDiffChecker'));
const YamlToJson = lazyLoad(() => import('./tools/YamlToJson'));

function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <BrowserRouter>
          <NotificationContainer />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={null} />
              <Route path="faqs" element={<Faq />} />
              <Route path="tools">
                <Route path="json" element={<JsonFormatter />} />
                <Route path="base64" element={<Base64Tool />} />
                <Route path="jwt" element={<JwtDebugger />} />
                <Route path="regexp" element={<RegExpTester />} />
                <Route path="url" element={<UrlEncoder />} />
                <Route path="html" element={<HtmlEncoder />} />
                <Route path="escape" element={<BackslashEscape />} />
                <Route path="uuid" element={<UuidGenerator />} />
                <Route path="html-preview" element={<HtmlPreview />} />
                <Route path="hash" element={<HashGenerator />} />
                <Route path="sql" element={<SqlFormatter />} />
                <Route path="case" element={<StringCaseConverter />} />
                <Route path="cron" element={<CronJobParser />} />
                <Route path="php" element={<PhpSerializer />} />
                <Route path="diff" element={<TextDiffChecker />} />
                <Route path="yaml" element={<YamlToJson />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App;