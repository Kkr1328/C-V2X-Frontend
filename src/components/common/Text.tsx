interface TextProp {
	style?: string;
	isSentence?: boolean;
	content: string;
}

export default function Text(props: TextProp) {
	return (
		<p
			className={`${
				props.isSentence ? 'break-words' : 'break-all'
			} inline-block align-baseline font-istok ${props.style}`}
		>
			{props.content}
		</p>
	);
}
