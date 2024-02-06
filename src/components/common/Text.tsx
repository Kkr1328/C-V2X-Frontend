interface TextProp {
	style?: string;
	isSentence?: boolean;
	isTruncate?: boolean;
	content: string;
}

export default function Text(props: TextProp) {
	return (
		<p
			className={`${props.style} ${
				props.isTruncate && 'text-ellipsis overflow-hidden'
			} ${
				props.isSentence ? 'break-words' : 'break-all'
			} inline-block align-baseline font-istok`}
		>
			{props.content}
		</p>
	);
}
