import { cn } from '@/lib/utils';

function Headline({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="headeline"
      className={cn('space-y-2', className)}
      {...props}
    >
      {children}
    </div>
  );
}
function HeadlineTitle({
  className,
  children,
  ...props
}: React.ComponentProps<'h2'>) {
  return (
    <h2
      data-slot="headeline-title"
      className={cn('text-3xl font-extrabold', className)}
      {...props}
    >
      {children}
    </h2>
  );
}
function HeadlineDescription({
  className,
  children,
  ...props
}: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="headeline-description"
      className={cn('text-muted-foreground', className)}
      {...props}
    >
      {children}
    </p>
  );
}

export { Headline, HeadlineDescription, HeadlineTitle };
