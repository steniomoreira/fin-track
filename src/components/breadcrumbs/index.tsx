'use client';

interface BreadcrumbItem {
  key: string;
  content: React.ReactElement | string;
  active?: boolean;
}

export function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: BreadcrumbItem[];
}) {
  return (
    <ul className="flex items-center gap-2 text-sm">
      {breadcrumbs.map(({ key, content, active }) => (
        <li key={key} className={`${!active ? 'opacity-50' : ''}`}>
          {content} {!active && ' | '}
        </li>
      ))}
    </ul>
  );
}
