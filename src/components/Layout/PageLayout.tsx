import type { ReactNode } from 'react';

type PageLayoutProps = {
  title: string;
  children: ReactNode;
};

function PageLayout(props: PageLayoutProps) {
  return (
    <main className="page-content">
      <h1>{props.title}</h1>

      {props.children}
    </main>
  );
}

export default PageLayout;