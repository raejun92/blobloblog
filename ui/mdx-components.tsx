import { useMDXComponent } from 'next-contentlayer2/hooks';
import Image from 'next/image';

const components = {
  Image,
};

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return <Component components={components} />;
}
