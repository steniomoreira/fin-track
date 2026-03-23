import { cn } from '@/lib/utils';

function PageContainer({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="page-container"
      className={cn(
        'bg-muted min-h-screen space-y-4 overflow-hidden p-8',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
function HeaderContainer({
  className,
  children,
  ...props
}: React.ComponentProps<'header'>) {
  return (
    <header
      data-slot="header-container"
      className={cn(
        'flex min-h-16 items-center justify-between px-8',
        className
      )}
      {...props}
    >
      {children}
    </header>
  );
}

export { HeaderContainer, PageContainer };
