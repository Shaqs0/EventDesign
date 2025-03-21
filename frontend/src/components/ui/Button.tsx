import { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  appearance?: 'smallButton' | 'bigButton';
  onClick?: () => void;
}

export function Button({
	title,
	appearance,
	onClick,
}: ButtonProps) {
	return (
		<button
			onClick={onClick}
			className={`cursor-pointer transition-colors duration-200 ${
				appearance === 'bigButton'
					? 'w-full rounded-lg bg-primary-blue py-2 font-bold text-[white] hover:bg-[gray-800] dark:bg-[black]'
					: 'flex h-[42px] w-[135px] items-center justify-center rounded-md bg-primary-blue dark:bg-[black]'
			}`}
		>
			<p className="font-semibold text-[white]">{title}</p>
		</button>
	);
}