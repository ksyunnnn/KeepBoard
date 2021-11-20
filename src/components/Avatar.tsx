import Image, { ImageProps } from 'next/image';

type Props = {
  isLoading?: boolean; // ImagePropsのloadingStateと競合しようないように
  src: ImageProps['src'] | null;
} & Omit<ImageProps, 'src' >;

const Avatar: React.FCX<Props> = ({
  isLoading, src, ...props
}) => {
  if (isLoading) {
    return (
      <div className="half-circle-spinner">
        <div className="circle circle-1 active" />
        <div className="circle circle-2 active" />
      </div>
    );
  }
  if (!src) return <span>ss</span>;
  return (
    <Image
      src={src}
      width="40"
      height="40"
      className="rounded-md"
      {...props}
    />
  );
};

export default Avatar;
