interface Props {
  width?: string;
  height?: string;
}

const LoaderShimmer = ({ width, height }: Props) => {
  const shimmerStyle = {
    width: width || '100%',
    height: height || '16px',
  };

  return (
    <div
      className='bg-shimmer animate-shimmer rounded-lg bg-gradient-to-r from-transparent via-slate-400 to-transparent bg-no-repeat dark:via-[#343434]'
      style={shimmerStyle}
    ></div>
  );
};

export { LoaderShimmer };
