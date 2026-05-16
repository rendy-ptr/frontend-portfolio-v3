import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { SectionHeader } from '../PixelArt';
import { GraduationCapIcon } from '../ui/graduation-cap';
import { getGithubCommits } from '../../api/github.ts';
import { useEffect, useState } from 'react';
import { GithubIcon } from '../ui/github.tsx';
import { getWakatimeStats } from '../../api/wakatime.ts';
import { ClockIcon } from '../ui/clock.tsx';
import { FolderCodeIcon } from '../ui/folder-code.tsx';
import { getLeetcodeStats } from '@/api/leetcode.ts';
import { TerminalIcon } from '../ui/terminal.tsx';

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

interface GithubCommit {
  totalCommits: number;
}

interface TopLanguages {
  name: string;
  text: string;
  percent: number;
}

interface WakatimeStats {
  totalHours: string;
  topLanguage: string;
  topLanguages: TopLanguages[];
  bestDay: {
    date: string;
    text: string;
  };
}

interface LeetcodeStats {
  totalSolved: number;
}

export default function About() {
  const { t } = useTranslation();

  const [commits, setCommits] = useState<GithubCommit>({ totalCommits: 0 });
  const [wakatimeStats, setWakatimeStats] = useState<WakatimeStats>({
    totalHours: '',
    topLanguage: '',
    topLanguages: [],
    bestDay: {
      date: '',
      text: '',
    },
  });
  const [leetcodeStats, setLeetcodeStats] = useState<LeetcodeStats>({ totalSolved: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const [githubData, wakatimeData, leetcodeData] = await Promise.all([
          getGithubCommits(),
          getWakatimeStats(),
          getLeetcodeStats(),
        ]);
        if (githubData) {
          setCommits(githubData);
        }
        if (wakatimeData) {
          setWakatimeStats(wakatimeData);
        }
        if (leetcodeData) {
          setLeetcodeStats(leetcodeData);
        }
      } catch (err) {
        console.error('Error fetching about data:', err);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const funFacts = [
    {
      label: t('about.totalCommits'),
      value: commits.totalCommits,
      icon: <GithubIcon size={18} />,
    },
    {
      label: t('about.totalCodingHours'),
      value: wakatimeStats.totalHours,
      icon: <ClockIcon size={18} />,
    },
    {
      label: t('about.topLanguage'),
      value: wakatimeStats.topLanguage,
      icon: <FolderCodeIcon size={18} />,
    },
    {
      label: t('about.totalSolved'),
      value: leetcodeStats.totalSolved,
      icon: <TerminalIcon size={18} />,
    },
  ];

  return (
    <section
      id="about"
      className="relative overflow-hidden"
      style={{
        background: 'var(--surface-alt)',
        paddingTop: 'var(--section-gap)',
        paddingBottom: 'var(--section-gap)',
      }}
    >
      <div className="container">
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, ease }}
        >
          <SectionHeader
            label={t('about.sectionLabel')}
            title={t('about.title')}
          />

          <motion.p
            {...fadeUp}
            transition={{ delay: 0.1, duration: 0.5, ease }}
            className="mb-12"
            style={{
              fontSize: 'var(--text-lg)',
              lineHeight: 1.8,
              color: 'var(--text-muted)',
              maxWidth: '65ch',
            }}
          >
            {t('about.bio')}
          </motion.p>

          <div
            className="about-grid grid gap-8"
            style={{ gridTemplateColumns: '1fr 1fr' }}
          >
            <motion.div
              {...fadeUp}
              transition={{ delay: 0.2, duration: 0.5, ease }}
              className="flex flex-col"
            >
              <div
                className="mb-4"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 600,
                  color: 'var(--text-subtle)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                {t('about.statisticTitle')}
              </div>
              <div className="grid grid-cols-2 gap-3 flex-1">
                {isLoading ? (
                  [...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="card animate-pulse"
                      style={{ padding: '16px 18px', height: 110 }}
                    >
                      <div
                        className="mb-3"
                        style={{
                          width: 36,
                          height: 36,
                          background: 'var(--accent-soft)',
                          borderRadius: 8,
                        }}
                      />
                      <div
                        className="mb-2"
                        style={{
                          width: '60%',
                          height: 12,
                          background: 'var(--border-color)',
                          borderRadius: 4,
                        }}
                      />
                      <div
                        style={{
                          width: '40%',
                          height: 14,
                          background: 'var(--border-color)',
                          borderRadius: 4,
                        }}
                      />
                    </div>
                  ))
                ) : isError ? (
                  <div
                    className="col-span-2 card flex flex-col items-center justify-center text-center"
                    style={{ padding: '32px 24px' }}
                  >
                    <div
                      className="mb-3"
                      style={{ color: 'var(--text-subtle)', opacity: 0.5 }}
                    >
                      <FolderCodeIcon size={32} />
                    </div>
                    <div
                      style={{
                        fontSize: 'var(--text-sm)',
                        color: 'var(--text-muted)',
                        marginBottom: 4,
                      }}
                    >
                      {t('about.error')}
                    </div>
                    <button
                      onClick={() => window.location.reload()}
                      style={{
                        fontSize: 'var(--text-xs)',
                        color: 'var(--accent)',
                        fontWeight: 600,
                        cursor: 'pointer',
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        textDecoration: 'underline',
                      }}
                    >
                      Try again
                    </button>
                  </div>
                ) : (
                  funFacts.map((fact, i) => (
                    <div
                      key={i}
                      className="card"
                      style={{ padding: '16px 18px' }}
                    >
                      <div
                        className="flex items-center justify-center mb-3"
                        style={{
                          width: 36,
                          height: 36,
                          background: 'var(--accent-soft)',
                          color: 'var(--accent)',
                          borderRadius: 8,
                        }}
                      >
                        {fact.icon}
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'var(--text-xs)',
                          fontWeight: 600,
                          color: 'var(--text-subtle)',
                          letterSpacing: '0.03em',
                          textTransform: 'uppercase' as const,
                          marginBottom: 2,
                        }}
                      >
                        {fact.label}
                      </div>
                      <div
                        style={{
                          fontSize: 'var(--text-sm)',
                          fontWeight: 500,
                          color: 'var(--text)',
                        }}
                      >
                        {fact.value || '-'}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ delay: 0.3, duration: 0.5, ease }}
              className="self-stretch flex flex-col gap-3"
            >
              <div
                className="mb-1"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 600,
                  color: 'var(--text-subtle)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                {t('about.education.title')}
              </div>

              <div
                className="card flex-1"
                style={{ padding: '20px 24px' }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="flex items-center justify-center flex-shrink-0"
                    style={{
                      width: 48,
                      height: 48,
                      background: 'var(--accent-soft)',
                      color: 'var(--accent)',
                      borderRadius: 12,
                    }}
                  >
                    <GraduationCapIcon size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 600,
                        fontSize: 'var(--text-base)',
                        color: 'var(--text)',
                        lineHeight: 1.4,
                        marginBottom: 4,
                      }}
                    >
                      {t('about.education.degree')}
                    </div>
                    <div
                      style={{
                        fontSize: 'var(--text-sm)',
                        color: 'var(--text-muted)',
                        marginBottom: 8,
                      }}
                    >
                      {t('about.education.institution')}
                    </div>
                    <span
                      className="tag"
                      style={{
                        color: 'var(--accent)',
                        background: 'var(--accent-soft)',
                        borderColor: 'transparent',
                      }}
                    >
                      {t('about.education.year')}
                    </span>
                  </div>
                </div>
              </div>

              <div
                className="card flex-1"
                style={{ padding: '20px 24px' }}
              >
                <div className="flex items-start gap-4 opacity-60">
                  <div
                    className="flex items-center justify-center flex-shrink-0"
                    style={{
                      width: 48,
                      height: 48,
                      background: 'var(--surface-alt)',
                      color: 'var(--text-subtle)',
                      borderRadius: 12,
                      border: '1px dashed var(--border-color)',
                    }}
                  >
                    <GraduationCapIcon size={24} />
                  </div>
                  <div className="flex-1">
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: 'var(--text-base)',
                        color: 'var(--text)',
                        lineHeight: 1.4,
                        marginBottom: 4,
                      }}
                    >
                      TOEFL
                    </div>
                    <div
                      style={{
                        fontSize: 'var(--text-sm)',
                        color: 'var(--text-subtle)',
                        fontStyle: 'italic',
                      }}
                    >
                      Coming Soon
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
