'use client';

type AuthCardProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export function AuthCard({ title, description, children }: AuthCardProps) {
  return (
    <div className="mx-auto my-20 max-w-md rounded-2xl border border-neutral-200 bg-white p-8 shadow-xl">
      <h1 className="text-2xl font-bold text-neutral-900">{title}</h1>
      <p className="mt-2 text-sm leading-relaxed text-neutral-500">{description}</p>
      {children}
    </div>
  );
}
