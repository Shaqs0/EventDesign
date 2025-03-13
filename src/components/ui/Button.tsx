import { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  appearance?: 'smallButton' | 'bigButton';
}

export function Button({
	title,
	appearance,
	onClick,
}: ButtonProps) {
	if (appearance === 'bigButton') {
		return (
			<button
				type="submit"
				className="mt-16 h-[53px] w-full rounded-[4px] bg-[black] py-2 font-bold text-[white] hover:bg-[gray-800]"
			>
				{title}
			</button>
		);
	}

	return (
		<button
			className={`${
				appearance === 'smallButton'
					? 'flex h-[42px] w-[135px] items-center justify-center rounded-md bg-primary-blue'
					: ''
			}`}
			onClick={onClick}
		>
			<p className=''>
				{title}
			</p>
		</button>
	);
}