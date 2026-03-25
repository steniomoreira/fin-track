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
        'bg-muted min-h-screen space-y-8 overflow-hidden p-8',
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
        'bg-sidebar fixed top-0 flex min-h-16 w-full items-center justify-between border-b-2 px-8 shadow-xs',
        className
      )}
      {...props}
    >
      {children}
    </header>
  );
}

export { HeaderContainer, PageContainer };
