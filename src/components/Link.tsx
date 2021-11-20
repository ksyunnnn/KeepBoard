/* eslint-disable jsx-a11y/anchor-is-valid */
import NextLink, { LinkProps } from 'next/link';
import { AnchorHTMLAttributes } from 'react';

type Props = LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>

const Link: React.FCX<Props> = ({
  children, className, id, ...props
}) => (
  <NextLink {...props}>
    <a {...props} title={id} aria-label={id} className={`underline ${className}`}>{children}</a>
  </NextLink>
);

export default Link;
