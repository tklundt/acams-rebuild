import clsx from 'clsx';

export default function AssetCondition({ condition }: { condition: String }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-red-100 text-red-500': condition === 'Poor',
          'bg-gray-100 text-gray-500': condition === 'Used',
          'bg-green-100 text-green-500': condition === 'Good',
        },
      )}
    >
      {condition === 'Poor' ? (
        <>
          Poor
        </>
      ) : null}
      {condition === 'Used' ? (
        <>
          Used
        </>
      ) : null}
      {condition === 'Good' ? (
        <>
          Good
        </>
      ) : null}
    </span>
  );
}
