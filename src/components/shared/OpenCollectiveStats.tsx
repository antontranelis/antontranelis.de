import { useEffect, useState } from 'react';

interface CollectiveStats {
  balance: number;
  currency: string;
  backers: number;
  loading: boolean;
  error: boolean;
}

interface Props {
  collectiveUrl: string;
}

function parseCollectiveSlug(url: string): string | null {
  const match = url.match(/opencollective\.com\/([^/]+)/);
  return match ? match[1] : null;
}

function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount / 100); // OpenCollective uses cents
}

export default function OpenCollectiveStats({ collectiveUrl }: Props) {
  const [stats, setStats] = useState<CollectiveStats>({
    balance: 0,
    currency: 'EUR',
    backers: 0,
    loading: true,
    error: false,
  });

  useEffect(() => {
    const slug = parseCollectiveSlug(collectiveUrl);
    if (!slug) {
      setStats(s => ({ ...s, loading: false, error: true }));
      return;
    }

    async function fetchStats() {
      try {
        // Use OpenCollective's public JSON endpoint
        const res = await fetch(
          `https://opencollective.com/${slug}.json`
        );
        if (!res.ok) throw new Error('Collective not found');
        const data = await res.json();

        setStats({
          balance: data.balance || 0,
          currency: data.currency || 'EUR',
          backers: data.backersCount || 0,
          loading: false,
          error: false,
        });
      } catch {
        setStats(s => ({ ...s, loading: false, error: true }));
      }
    }

    fetchStats();
  }, [collectiveUrl]);

  if (stats.loading) {
    return (
      <div className="flex gap-4 text-sm text-base-content/50">
        <span className="loading loading-dots loading-xs"></span>
      </div>
    );
  }

  if (stats.error) {
    return null;
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-base-content/60">Guthaben</span>
        <span className="font-semibold text-success">
          {formatCurrency(stats.balance, stats.currency)}
        </span>
      </div>
      {stats.backers > 0 && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-base-content/60">Unterstützer</span>
          <span className="font-medium">{stats.backers}</span>
        </div>
      )}
      <a
        href={collectiveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-sm btn-outline btn-success w-full mt-2"
      >
        Unterstützen
      </a>
    </div>
  );
}
